<template>
  <div class="footer">
    <share-view></share-view>
    <div class="footer_mid content flexBox flexBetween">
      <div class="mid_l">
          <div><img src="../assets/image/logo.png" alt="" style="width:112px;height:36px" oncontextmenu="return false;" ondragstart="return false;"></div>
          <div class="copyright">(C) 2018-2019 南京报业传媒集团 版权所有</div>
          <div class="host_box">
              <div style="margin-bottom:18px">主管： 中共南京市委宣传部</div>
              <div style="margin-bottom:18px">主办： 南京报业传媒集团</div>
              <div>承办： 南京日报视觉中心</div>

          </div>
      </div>
      <div class="mid_r">
        <h2 class="link_title">友情链接</h2>
        <div class="link clearfix">
            <ul>
                <li>
                    <a href="http://www.xinhuanet.com/" target="_blank">新华网</a>
                </li>
                <li>
                    <a href="http://www.people.com.cn/" target="_blank">人民网</a>
                </li>
                <li>
                    <a href="https://www.chinanews.com/" target="_blank">中国新闻网</a>
                </li>
                <li>
                    <a href="http://www.cnsphoto.com/" target="_blank">中国新闻图片网</a>
                </li>
                <li>
                    <a href="http://www.cpanet.org.cn/" target="_blank">中国摄影家协会</a>
                </li>
                <li>
                    <a href="http://www.dili360.com/" target="_blank">中国国家地理网</a>
                </li>
                <li>
                    <a href="http://www.cppfoto.com/" target="_blank">中国摄影报诠摄汇</a>
                </li>
                <li>
                    <a href="http://www.51peoplephoto.com/" target="_blank">人民摄影</a>
                </li>
                <li>
                    <a href="https://www.vcg.com/" target="_blank">视觉中国</a>
                </li>
                <li>
                    <a href="http://ww.xitek.com/" target="_blank">色影无忌</a>
                </li>
                <!-- <li>
                    <a href="http://www.nphoto.net/" target="_blank">新摄影</a>
                </li>
                <li>
                    <a href="http://www.photoworld.com.cn/" target="_blank">摄影世界</a>
                </li>-->
                <li>
                    <a href="http://www.vijs.net/" target="_blank">视觉江苏</a>
                </li>
                <li>
                    <a href="http://www.longhoo.net/" target="_blank">龙虎网</a>
                </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import shareView from './share'
export default {
  name: '',
  components: {
    shareView
  },
  data () {
    return {
      msg: ''
    }
  }
}
</script>
<style lang='scss' scoped>
.content{
  width: 1200px;
  margin: 0 auto;
}
.footer {
  width: 100%;
  height: 300px;
  font-size: 16px;
  height: 316px;
  font-size:16px;
  font-family:PingFangSC;
  font-weight:400;
  color:rgba(51,51,51,1);
}
.mid_l {
    margin: 45px 0 65px 0;
    width: 50%;
}

.mid_l .copyright {
    margin-top: 25px;
    margin-bottom: 22px;
}

.mid_l .host_box {
    line-height: 26px;
}

.mid_r {
    margin-top: 42px;
    margin-bottom: 57px;
    width: 50%;
}

.mid_r .link_title {
    font: 18px PingFangSC-Medium;
    color: #090A0B;
    margin-bottom: 32px;
}

.mid_r .link ul {
    width: 700px;
    height: 160px;
}
.mid_r .link a{
  color:#333;
}
.mid_r .link a:hover{
  color:#e2313d;
}
.mid_r .link ul>li {
    width: 233px;
    float: left;
    margin-bottom: 24px;
}
</style>
