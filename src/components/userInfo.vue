<template>
  <div class="userInfo">
    <div class="userBox content flexBox flexBetween">
      <div class="user-left flexBox flexBetween">
        <div class="user-avatar flexBox flexMiddle" @click="goHome()">
          <img v-if="userInfo.avatar" :src="userInfo.avatar" alt="">
          <img v-else src="../assets/image/userInfo/avatar.png" alt="">
        </div>
        <div class="user-info">
          <div class="username"><span>{{userInfo.nick_name}}</span>
            <i class="womenIcon" v-if="userInfo.extension&&userInfo.extension.gender.value == '女'"></i>
            <i class="manIcon" v-else-if="userInfo.extension&&userInfo.extension.gender.value == '男'"></i>
            <i v-else></i>
          </div>
          <el-button type="danger" size="mini" v-if="userInfo.isVerify==0 ||userInfo.isVerify==3" @click="goSigning()">成为签约摄影师</el-button>
          <div class="userType" v-else-if="userInfo.isVerify==2">签约摄影师</div>
        </div>
      </div>
      <div class="user-right">
        <ul class="flexBox tongji">
          <li class="item">
            <p>{{userInfo.works || 0}}</p>
            <div class="flexBox flexAlign iconDiv" style="border-right: 1px solid #999;">
              <i class="homeWorks"></i>作品
            </div>
          </li>
          <li class="item">
            <p>{{userInfo.photo_count || 0}}</p>
            <div class="flexBox flexAlign iconDiv" style="border-right: 1px solid #999;">
              <i class="photoNumIcon"></i>图片
            </div>
          </li>
          <li class="item">
            <p>{{userInfo.clicks || 0}}</p>
            <div class="flexBox flexAlign iconDiv" style="border-right: 1px solid #999;">
              <i class="homeView"></i>访客
            </div>
          </li>
          <li class="item">
            <p>{{userInfo.collects || 0}}</p>
            <div class="flexBox flexAlign iconDiv" style="border-right: 1px solid #999;">
              <i class="homeCollect"></i>收藏
            </div>
          </li>
          <li class="item">
            <p>{{userInfo.downloads || 0}}</p>
            <div class="flexBox flexAlign iconDiv">
              <i class="homeDownload"></i>下载
            </div>
          </li>
        </ul>
        <!-- <ul class="flexBox name">
          <li class="flexBox flexAlign">
            <i class="homeWorks"></i>作品
          </li>
          <li class="flexBox flexAlign">
            <i class="homeView"></i>图片数
          </li>
          <li class="flexBox flexAlign">
            <i class="homeView"></i>访客
          </li>
            <li class="flexBox flexAlign">
            <i class="homeCollect"></i>收藏
          </li>
            <li class="flexBox flexAlign">
            <i class="homeDownload"></i>下载
          </li>
        </ul> -->
        <!-- <div class="bgChange">
          <i class="el-icon-notebook-1"></i>
          <span>背景</span>
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {}
  },
  props: ['userInfo', 'source'],
  methods: {
    goSigning () {
      // this.$router.push({path: '/sigingentry'})
      // if (this.userInfo.group_id !== 2) {
      //   this.$message({
      //     showClose: true,
      //     message: '非签约摄影师不能发布作品，签约后再来哦',
      //     type: 'warning'
      //   })
      //   return
      // }
      let routeData = this.$router.resolve({
        name: 'sigingentry'
      })
      window.open(routeData.href, '_blank')
    },
    goHome () {
      if (this.source === 'other') return
      // let routeData = this.$router.resolve({
      //   name: 'works'
      // })
      // window.open(routeData.href, '_blank')
      this.$router.push({path: '/works'})
    }
  },
  mounted () {
    // console.log(this.userInfo)
  }
}
</script>
<style lang='scss' scoped>
.content{
  width: 1200px;
  margin: 0 auto;
}
.homeWorks{
  margin-right: 5px;
  width: 16px;
  height: 16px;
  display: inline-block;
  background: url(../assets/image/userInfo/icon_num_works.png) no-repeat;
}
.homeCollect{
  margin-right: 5px;
  width: 16px;
  height: 16px;
  display: inline-block;
  background: url(../assets/image/userInfo/icon_num_collect.png) no-repeat;
}
.homeDownload{
  margin-right: 5px;
  width: 16px;
  height: 16px;
  display: inline-block;
  background: url(../assets/image/userInfo/icon_num_download.png) no-repeat;
}
.homeView{
  margin-right: 5px;
  width: 16px;
  height: 16px;
  display: inline-block;
  background: url(../assets/image/userInfo/icon_num_view.png) no-repeat;
}
.userInfo{
  padding: 40px 0;
  width: 100%;
  height: 200px;
  background: url(../assets/image/about.png) no-repeat;
  background-size: cover;
  color: #fff;
  .user-left{
    .user-avatar{
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 50%;
      background: #000;
      margin-right: 30px;
      img{
        width: 100%;
        max-height: 100%;
      }
      &:hover{
        cursor: pointer;
      }
    }
    .user-info{
      .username{
        margin: 20px 0;
        span{
          font-size: 24px;
        }
        i{
          width:20px;
          height:20px;
          color:rgba(255,113,120,1);
          border-radius: 50%;
        }
      }
      .userType{
        font-size:12px;
        font-family:PingFang-SC;
        font-weight:400;
        color:rgba(204,204,204,1);
        margin-top: 10px;
      }
    }
  }
  .user-right{
    position: relative;
    .tongji{
      // margin-right: 50px;
      margin-top: 30px;
      .item{
        // margin: 0 18px;
        // padding: 0 18px;
        text-align: center;
        p{
          font-size: 36px;
          // border: 1px dashed #ccc;
          min-width: 55px;
          // max-width: 110px;
          // text-align: center;
          margin-bottom: 15px;
          // padding-right: 18px;
        }
        .iconDiv{
          padding: 0 42px;
        }
        &:first-child{
          // margin-left: 0;
          // padding-left: 0;
        }
      }
    }
    .name{
      li{
        padding: 0 40px;
        border-left: 1px solid #999999;
        &:first-child{
          padding-left: 0;
          border: none;
        }
        &:last-child{
          padding-right: 0
        }
      }
    }
    .bgChange{
      position: absolute;
      top: 0;
      right: 0;
      width:72px;
      height:30px;
      border-radius:16px;
      border:1px solid rgba(255,255,255,0.4);
      font-size:12px;
      font-family:PingFang-SC;
      font-weight:500;
      color:rgba(255,255,255,0.4);
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
