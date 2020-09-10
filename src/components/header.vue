<template>
  <div>
    <div class="header">
      <!-- <div class='tips flexBox flexBetween' v-if="tipsFlag">
      <div class="title flexBox flexCenter">
          <p>2019 年度南京市优秀新闻摄影作品评选</p>
          <p class="enroll">即刻报名！</p>
      </div>
        <div class="close" @click="closeTop()">
          <i class="el-icon-close"></i>
        </div>
      </div> -->
      <div class="top flexBox flexBetween">
        <div class="top-left flexBox flexAlign flexBetween">
          <div class="top-logo" @click="goIndex()">
            <img src="../assets/image/logo.png" alt="">
          </div>
        </div>
        <div class="top-tab">
          <ul class="flexBox flexBetween">
            <li v-for="(item, index) in columnListData" :key="index">
              <a :href="'http://www.vinj.cn/' + item.unique_sign" target="_blank">{{item.name}}</a>
            </li>
          </ul>
        </div>
        <div class="top-other flexBox flexMiddle flexBetween">
          <!-- <div class="search">
            <i class="el-icon-search"></i>
          </div>
          <div class="badge">
            <el-badge is-dot class="item">
              <i class="el-icon-bell"></i>
            </el-badge>
          </div> -->
          <div class="msg-tip-box">
            <span class="tip_reddot" v-if="msgNum > 0"></span>
            <img src="http://www.vinj.cn/themes/default/images/tongzhi.png" alt="">
            <a href="http://www.vinj.cn/folder69"></a>
          </div>
          <!-- 签约状态 is_verify 0:未认证；1：已申请待审核；2：已审核；3：已打回；-1：删除； -->
          <div class="agreement" v-if='userInfo.isVerify == 2'></div>
          <div class="agreement" v-else-if="userInfo.isVerify == 0">
            <router-link tag="a" target="_blank"  to='/sigingentry'>签约</router-link>
          </div>
          <div class="agreement" v-else>
            <router-link tag="a" target="_blank"  to="/signing">签约</router-link>
          </div>
          <div class="publish" v-if="userInfo && userInfo.avatar">
            <el-dropdown class="contribute-btn">
              <el-button type="danger" size="mini" @click="goPost()">我要发片</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="goPost(0)">发图片</el-dropdown-item>
                <el-dropdown-item @click.native="goPost(1)">发视频</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <el-dropdown v-if="userInfo && userInfo.id">
            <div class="userLogo">
              <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
              <img v-else src="../assets/image/userInfo/avatar.png" alt="">
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item style="font-size:14px; color: #333333;font-weight:500;" @click.native="goHome()">{{userInfo.nick_name}}</el-dropdown-item>
              <el-dropdown-item divided @click.native="layout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div v-else>
            <el-button type="danger" size="mini" @click="goLogin">登录</el-button>
            <el-button type="danger" size="mini" @click="register">注册</el-button>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 66px;background: #f8f8f8;" ref='heightDiv'></div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      tipsFlag: true,
      columnListData: [],
      access_token: this.$util.getCookie('accessToken'),
      msgNum: 0
    }
  },
  props: ['userInfo'],
  methods: {
    // closeTop () {
    //   console.log(this.$refs)
    //   this.$refs.heightDiv.style.height = '66px'
    //   this.tipsFlag = false
    // }
    goLogin () {
      this.$router.push({
        name: 'login'
      })
      this.$util.setCookie('url', window.location.href)
    },
    register () {
      this.$router.push({
        name: 'register'
      })
      this.$util.setCookie('url', window.location.href)
    },
    goHome () {
      // let routeData = this.$router.resolve({
      //   name: 'homepage'
      // })
      // window.open(routeData.href)
    //   this.$router.push({
    //     name: 'homepage'
    //   })
      this.$router.push({path: '/works'})
    },
    goPost (flag) {
      if (this.userInfo.group_id !== 2) {
        this.$message({
          showClose: true,
          message: '非签约摄影师不能发布作品，签约后再来哦',
          type: 'warning'
        })
        return
      }
      if (flag === 0) {
        let routeData = this.$router.resolve({
          name: 'post'
        })
        window.open(routeData.href, '_blank')
      }
      if (flag === 1) {
        let routeData = this.$router.resolve({
          name: 'postVideo'
        })
        window.open(routeData.href, '_blank')
      }
    },
    layout () {
      this.$util.setCookie('accessToken', '')
      localStorage.clear('accessToken')
      this.$router.push({
        path: '/login'
      })
    },
    getColumn () {
      this.$api.columnList().then(res => {
        // console.log(res)
        if (!res.error_code) {
          this.columnListData = res.data
          this.columnListData.unshift({
            name: '首页',
            unique_sign: ''
          })
        }
      })
    },
    goIndex () {
      // location.href = 'http://www.vinj.cn/'
      window.open('http://www.vinj.cn/', '_blank')
    },
    getMsgUnread () {
      // getMsgUnread
      let param = {
        access_token: this.access_token
      }
      this.$api.getMsgUnread(param).then((res) => {
        // console.log(res)
        if (res.error_code === 0) {
          this.msgNum = res.data
        }
      })
    }
  },
  mounted () {
    this.getColumn()
    this.getMsgUnread()
  }
  // 签约状态 is_verify 0:未认证；1：已申请待审核；2：已审核；3：已打回；-1：删除；
}
</script>
<style lang='scss' scoped>
.content{
  width: 1200px;
  margin: 0 auto;
}
.header {
  position: fixed;
  z-index: 2000;
  background-color: #fff;
  box-shadow:0px 4px 4px 0px rgba(0,0,0,0.06);
  width: 100%;
  margin-bottom: 66px;
  .tips{
    width: 100%;
    height: 36px;
    background: rgba(0,0,0,.66);
    text-align: center;
    line-height: 36px;
    padding: 0 30px;
    .title{
      width: 100%;
      p{
        height:20px;
        font-size:14px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(255,255,255,1);
      }
      .enroll{
        margin-left: 16px;
      }
    }
    .close{
      color: #BFBFBF;
    }
  }
  .top{
    height: 66px;
    padding: 0 50px;
    align-items: center;
    .top-logo{
      width: 112px;
      height: 36px;
      background: #fff;
      overflow: hidden;
      img{
        width: 100%;
        max-height: 100%;
      }
    }
    .top-tab{
      margin: 0 50px 0 -30px;
      width: 70%;
      ul{
        width: 100%;
        li a{
          // margin-left:50px;
          font-size:16px;
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(51,51,51,1);
          &:hover{
            color: #DD2F3C;
            text-decoration: underline;
          }
          &:first-child{
            margin-left: 0;
          }
          &.active{
            color:rgba(221,47,60,1);
          }
        }
      }
    }
    .top-other{
      color: rgba(102,102,102,1);
      font-size: 16px;
      min-width: 128px;
      .msg-tip-box{
        position: relative;
        width:30px;
        .tip_reddot{
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #DD2F3C;
          left: 13px;
        }
        a{
          display: block;
          width: 100%;
          height: 17px;
          position: absolute;
          top: 0;
          opacity: 0;
        }
      }
      .agreement a{
        color:rgba(51,51,51,1);
        font-size: 12px;
        margin-right: 25px;
        width: 25px;
      }
      .userLogo{
        width: 36px;
        height: 36px;
        overflow: hidden;
        background: #000;
        border-radius: 50%;
        margin-left: 25px;
        img{
          width: 100%;
          max-height: 100%;
        }
      }
      .badge{
        margin: 18px 40px;
      }
    }
  }
}
/deep/{
  .el-dropdown-menu__item:not(.is-disabled):hover{
    color: #DD2F3C;
    background: #fff;
  }
}
</style>
