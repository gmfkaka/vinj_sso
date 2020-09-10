<template>
  <div>
    <header-view :userInfo = currentInfo ></header-view>
    <div class="myhome">
      <user-info :userInfo = userInfo :source = source></user-info>
      <div class="content">
        <ul class="home-top flexBox flexLeft flexAlign">
          <li
          @click="changeTab('0')"
          :class="{active:0 == currentIndex}">TA的作品</li>
           <li
          @click="changeTab('1')"
          :class="{active:1 == currentIndex}">TA的收藏</li>
        </ul>
        <div class="home-content">
          <my-works v-if="currentIndex == 1" :picList = collectionList :count = count @handlePageChange = handlePageChange @goWebDeatil = goWebDeatil></my-works>
          <my-works v-if="currentIndex == 0" :picList = workList :count = count @handlePageChange = handlePageChange @goWebDeatil = goWebDeatil></my-works>
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
      currentInfo: {},
      workList: {},
      collectionList: {},
      page: 1,
      count: 12,
      source: 'other'
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
      let param = {
        access_token: this.$util.getCookie('accessToken')
      }
      this.$api.userInfo(param).then(res => {
        if (res.ErrorCode === 0) {
          this.currentInfo = res.data
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
    // ta的收藏
    getData () {
      let param = {
        // access_token: this.$util.getCookie('accessToken'),
        author_id: this.author_id,
        offset: (this.page - 1) * this.count,
        count: this.count
      }
      this.$api.otherCollect(param).then(res => {
        if (res.ErrorCode === 0) {
          this.collectionList = res.data
        }
      })
    },
    // ta的作品
    getPublishData (title) {
      let param = {
        author_id: this.author_id,
        page: this.page,
        per_num: this.count
      }
      this.$api.otherPhotos(param).then(res => {
        // console.log(res)
        if (res.ErrorCode === 0) {
          this.workList = res.data
        }
      })
    },
    // 获取他人信息
    getOthersInfo () {
      let param = {
        author_id: this.author_id
      }
      this.$api.othersInfo(param).then(res => {
        if (res.ErrorCode === 0) {
          this.userInfo = res.data
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
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
    },
    goWebDeatil (value) {
      // location.href = value
      window.open(value)
    }
  },
  mounted () {
    if (this.author_id && this.author_id != null && this.$util.getCookie('accessToken')) {
      this.getOthersInfo()
      this.getData()
      this.getPublishData()
      this.getUserInfo()
    } else if (!this.author_id && this.$util.getCookie('accessToken')) {
      // this.getUserInfo()
      this.$router.push({
        name: 'homepage'
      })
    } else if (this.author_id && this.author_id != null && !this.$util.getCookie('accessToken')) {
      this.getOthersInfo()
      this.getData()
      this.getPublishData()
    } else if (!this.author_id && !this.$util.getCookie('accessToken')) {
      this.$router.push({
        name: 'login'
      })
    }
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
