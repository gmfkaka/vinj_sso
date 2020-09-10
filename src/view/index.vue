<template>
  <div class="home">
    <header-view :userInfo = userInfo></header-view>
    <user-info :userInfo = userInfo></user-info>
    <div class="personal-center">
      <div class="personal-center-box">
        <div class="nav-box">
          <div class="list-box" v-for="(listItem,index) in navList" :key="index" @click="toggleNav(index,listItem.path)">
            <div class="min-list-box" :class="{isActive: isActive == listItem.path}">
              <span>{{listItem.name}}</span>
            </div>
          </div>
        </div>
        <div class="content-box">
          <router-view :userInfo = userInfo @submitForm = submitForm @avatorUpload = avatorUpload />
        </div>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>
<script>
import userInfo from '../components/userInfo'
import headerView from '../components/header'
import footerView from '../components/footer'
export default {
  components: {
    userInfo,
    headerView,
    footerView
  },
  data () {
    return {
      userInfo: {},
      access_token: this.$util.getCookie('accessToken'),
      isActive: '',
      currentTab: 0,
      isMinActive: 0,
      inputText: '',
      navList: [{
        name: '我的作品',
        path: 'works',
        type: 'works'
      },
      {
        name: '我的活动',
        path: 'activitylist',
        type: 'activity'
      },
      {
        name: '我的收藏',
        path: 'collection',
        type: 'collection'
      },
      {
        name: '我的下载',
        path: 'download',
        type: 'download'
      },
      {
        name: '个人资料',
        path: 'personal',
        type: 'data'
      }],
      tabList: [{
        tabName: '全部',
        num: 36,
        type: 'all'
      },
      {
        tabName: '图片',
        num: 36,
        type: 'pic'
      },
      {
        tabName: '视频',
        num: 36,
        type: 'video'
      }],
      minTabList: [{
        minTabName: '签约投稿',
        type: 'signing'
      },
      {
        minTabName: '活动投稿',
        type: 'activityContribute'
      }],
      picData: [{
        dateMonth: '08',
        dateYear: '2019',
        picList: ['1', '2', '3']
      },
      {
        dateMonth: '06',
        dateYear: '2019',
        picList: ['1', '2', '3', '4', '5', '6']
      },
      {
        dateMonth: '03',
        dateYear: '2019',
        picList: ['1', '2', '3', '4', '5', '6', '7']
      }]
    }
  },
  methods: {
    toggleNav (currentIndex, path) {
      this.isActive = path
      this.$router.push({'path': path})
    },
    toggleTab (tabIndex) {
      this.currentTab = tabIndex
    },
    toggleMinTab (minIndex) {
      this.isMinActive = minIndex
    },
    // 获取用户信息
    getUserInfo () {
      let param = {
        access_token: this.access_token
      }
      this.$api.userInfo(param).then(res => {
        if (res.ErrorCode === 0) {
          this.userInfo = res.data
          this.getWorkData()
        } else if (res.ErrorCode === 1005) {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
          this.$router.push({
            name: 'login',
            path: '/login'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
        }
      })
    },
    // 完善个人信息
    submitForm (value) {
      // console.log(value)
      let formData = new FormData()
      // let avatarData = new FormData()
      let sex
      if (value.sex === '男') {
        sex = 1
      } else if (value.sex === '女') {
        sex = 2
      } else {
        sex = value.sex
      }
      formData.append('access_token', this.access_token)
      formData.append('province', value.province)
      formData.append('city', value.city)
      formData.append('sex', Number(sex))
      formData.append('brief', value.desc)
      formData.append('qq', value.qq)
      formData.append('wechat', value.wechat)
      // 用户信息修改
      this.$api.updateInfo(formData).then(res => {
        if (res.ErrorCode === 0) {
          this.$message({
            showClose: true,
            message: '修改成功',
            type: 'success'
          })
          this.getUserInfo()
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
        }
      })
    },
    // 修改用户头像
    avatorUpload (value) {
      this.$api.updateAvatar(value).then(res => {
        if (res.ErrorCode === 0) {
          this.$message({
            showClose: true,
            message: '上传成功',
            type: 'success'
          })
          this.getUserInfo()
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
        }
      })
    },
    // 获取用户信息的统计数
    getWorkData () {
      let param = {
        access_token: this.access_token
      }
      this.$api.worksDatas(param).then(res => {
        if (res.ErrorCode === 0) {
          this.$set(this.userInfo, 'clicks', res.data.clicks)
          this.$set(this.userInfo, 'collects', res.data.collects)
          this.$set(this.userInfo, 'downloads', res.data.downloads)
          this.$set(this.userInfo, 'works', res.data.works)
          this.$set(this.userInfo, 'photo_count', res.data.photo_count)
        }
      })
    }
  },
  mounted () {
    this.getUserInfo()
    if (this.$route.name === 'scorelist') {
      this.isActive = 'activitylist'
    } else {
      this.isActive = this.$route.name
    }
  }
}
</script>
<style lang="scss" scoped>
.personal-center{
  width: 100%;
  height: 100%;
  background: #F8F8F8;
}
.personal-center-box{
  width: 1200px;
  margin: 0 auto;
  display: flex;
  padding-top: 20px;
  .nav-box{
    width: 220px;
    background: #fff;
    margin-right: 20px;
    height: 300px;
    .list-box{
      height: 60px;
      line-height: 60px;
      padding: 10px 0;
      cursor: pointer;
      .min-list-box{
        height: 40px;
        line-height: 40px;
        padding-left: 50px;
        color: #333333;
      }
      &:last-child{
          border-top: 1px solid #EEEEEE;
        }
      &:hover{
        .min-list-box{
          color: #fff;
        }
        background: #DD2F3C;
      }
      .min-list-box.isActive{
        border-left: 2px solid #DD2F3C;
      }
    }
  }
}
</style>
