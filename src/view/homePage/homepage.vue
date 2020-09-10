<template>
  <div>
    <header-view :userInfo = userInfo ></header-view>
    <div class="myhome">
      <user-info :userInfo = userInfo ></user-info>
      <div class="content">
        <ul class="home-top flexBox flexLeft flexAlign">
          <li
          @click="changeTab('0')"
          :class="{active:0 == currentIndex}">我的作品</li>
           <li
          @click="changeTab('1')"
          :class="{active:1 == currentIndex}" style="flex: 1">我的收藏</li>
        </ul>
        <div class="home-content">
          <my-works v-if="currentIndex == 1" :picList = collectionList :count = count @handlePageChange = handlePageChange></my-works>
          <my-works v-if="currentIndex == 0" :picList = workList :count = count @handlePageChange = handlePageChange></my-works>
          <!-- <my-comment v-if="currentIndex == 2"></my-comment> -->
        </div>
      </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>
<script>
import userInfo from '../../components/userInfo'
import myWorks from './components/myworks'
import myComment from './components/mycomment'
import headerView from '../../components/header'
import footerView from '../../components/footer'
export default {
  name: '',
  components: {
    userInfo,
    myWorks,
    myComment,
    footerView,
    headerView
  },
  data () {
    return {
      author_id: this.GetQueryString('author_id'),
      currentIndex: 0,
      hoverIndex: '',
      userInfo: {},
      topList: [
        // {name: '他的作品', num: this.workList.total},
        // {name: '他的收藏', num: this.collectionList.total}
      ],
      workList: {},
      collectionList: {},
      page: 1,
      count: 12
      // access_token: this.$util.getCookie('accessToken')
    }
  },
  methods: {
    GetQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    changeTab (index) {
      this.currentIndex = index
      if (index === 1) {
        this.getData()
      } else {
        this.getPublishData()
      }
    },
    // 获取用户信息
    getUserInfo () {
      // console.log(this.$util.getCookie('accessToken'))
      let param = {
        access_token: this.$util.getCookie('accessToken')
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
    // 我的收藏
    getData () {
      let param = {
        access_token: this.$util.getCookie('accessToken'),
        offset: (this.page - 1) * this.count,
        count: this.count
      }
      this.$api.collection(param).then(res => {
        if (res.ErrorCode === 0) {
          this.collectionList = res.data
        }
      })
    },
    // 我的作品
    getPublishData (title) {
      let param = {
        title: title,
        page: this.page,
        per_num: this.count,
        access_token: this.$util.getCookie('accessToken')
      }
      this.$api.publishList(param).then(res => {
        // console.log(res)
        if (res.ErrorCode === 0) {
          this.workList = res.data
        }
      })
    },
    // 获取用户信息的统计数
    getWorkData () {
      let param = {
        access_token: this.$util.getCookie('accessToken')
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
    },
    handlePageChange (value) {
      this.page = value.page
      if (value.source === 'works') {
        this.getPublishData()
      } else {
        this.getData()
      }
    }
  },
  mounted () {
    this.getUserInfo()
    this.getData()
    this.getPublishData()
  }
}
</script>
<style lang='scss' scoped>
.content{
  width: 1200px;
  margin: 0 auto;
}
.myhome{
  background:rgba(248,248,248,1);
  height: 100%;
  .home-top{
    margin-top: 20px;
    padding: 0 30px;
    height: 63px;
    background-color: #fff;
    border:1px solid rgba(240,240,240,1);
    li{
      font-size:16px;
      font-weight:400;
      color:rgba(51,51,51,1);
      margin-right: 34px;
      &.active{
        position: relative;
        font-weight:500;
        &::before{
          position: absolute;
          content: "";
          display: inline-block;
          width:64px;
          height:2px;
          background:rgba(221,47,60,1);
          bottom: -22px;
        }
      }
    }
  }
}
</style>
