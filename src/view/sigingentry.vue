<template>
  <div class='sigingentry'>
   <header-view :userInfo = userInfo></header-view>
   <div class="sigingentryBox">
     <div class="content flexBox flexLeft">
       <div class="left">
        <p>“视觉南京”图片库是由中共南京市委宣传部主管，南京报业传媒集团主办，南京日报社视觉中心承办。这是2019年南京报业传媒集团深入贯彻中央和市委、市政府关于进一步推进媒体融合创新精神的举措，是集团媒体融合发展赋能的全新平台。</p>
        <p>“视觉南京”图片库旨在打造南京规模最大、资料最丰富、存量最宏大、检索最方便的现代化一流视觉产品数据库，构建一个开放式的全新图像采集传播体系，向市内外各类用户提供线上线下、桌面移动、手机端等多渠道多终端的视觉产品和延伸服务。</p>
        <p>“视觉南京”图片库每日实时发布市内各类新闻及非新闻类图片，并逐步推出自建国以来反映南京各项事业发展的珍贵历史档案图片。摄影师团队包括南京日报视觉中心摄影记者，市内媒体专业摄影记者、签约摄影师以及愿意分享交流的摄影爱好者。</p>
        <p>“视觉南京”图片库真诚为广大用户提供最优质的图像产品和服务。</p>
      </div>
      <div class="right">
        <div class="imgBox">
          <img src="../assets/image/signing/icon_qianyue_ camera.png" alt="">
        </div>
        <p>成为视觉南京</p>
        <p>签约摄影师</p>
        <el-button type="danger" style="background-color:#DD2F3C;margin-top: 40px" @click="goSigning()">立即注册签约</el-button>
        <div class="timeBox flexBox flexAlign">
         <i class="timeIcon"></i> 周一至周五 9:00–18:00
        </div>
        <div class="linkUrl flexBox flexAlign">
          <i class="linkIcon"></i><a href="http://www.vinj.cn/">www.vinj.cn</a>
        </div>
      </div>
     </div>
   </div>
   <footer-view></footer-view>
  </div>
</template>
<script>
import headerView from '../components/header'
import footerView from '../components/footer'
export default {
  name: '',
  components: {
    headerView,
    footerView
  },
  data () {
    return {
      userInfo: {}
    }
  },
  methods: {
    goSigning () {
      this.$router.push({
        name: 'signing',
        path: '/signing'
      })
    },
    // 获取用户信息
    getUserInfo () {
      let param = {
        access_token: this.$util.getCookie('accessToken')
      }
      this.$api.userInfo(param).then(res => {
        if (res.ErrorCode === 0) {
          this.userInfo = res.data
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
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style lang='scss' scoped>
.content{
  width: 1120px;
  margin: 0 auto;
}
.sigingentryBox{
  background: url(../assets/image/signing/bg_qianyue_index.png) no-repeat center center;
  height: 720px;
  padding: 150px 0px;
  .left{
    font-size:16px;
    font-family:PingFang-SC;
    font-weight:500;
    color:rgba(51,51,51,0.6);
    width: 600px;
    line-height:32px;
    p{
      margin-bottom: 50px;
    }
  }
  .right{
    margin-left: 120px;
    padding: 44px 121px 0 121px;
    width: 400px;
    height: 420px;
    background:rgba(255,255,255,1);
    text-align: center;
    p{
      font-size:20px;
      font-family:PingFang-SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      margin-top: 16px;
    }
    .timeBox{
      margin-top: 55px;
      margin-bottom: 16px;
    }
    .timeBox, .linkUrl{
      text-align: left;
      font-size:12px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(128,128,128,1);
    }
    .linkUrl{
      a{
        color: unset;
      }
    }
  }
}
</style>
