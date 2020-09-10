<template>
  <div class="share">
    <div class="share_mid container">
      <div class="con_box">
        <h2>关注我们:</h2>
        <span class="thirdparty">
          <img src="../assets/image/blog.png" alt>
          <img src="../assets/image/wechat.png" alt>
          <img src="../assets/image/guan.png" alt>
        </span>
        <div class="about">
          <a href="http://www.vinj.cn/folder99">关于我们</a>-
          <a href="http://www.vinj.cn/folder100">联系方式</a>-
          <a href="http://www.vinj.cn/folder101">版权声明</a>
        </div>
        <div class="about" style="margin-top: 10px">苏ICP备11047051号-2</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      msg: ''
    }
  }
}
</script>
<style lang='scss' scoped>
.share {
  width: 100%;
  height: 270px;
  background: url("../assets/image/about.png") no-repeat;
  color: #fff;
  background-size: cover;
}

.share_mid.container {
  height: 270px;
}

.con_box {
  padding: 50px 0;
  text-align: center;
}

.con_box h2 {
  font-size:20px;
  font-family:PingFang-SC;
  font-weight:500;
  color:rgba(255,255,255,1);
  opacity: 0.8;
}

.con_box .thirdparty {
  display: block;
  margin-top: 48px;
  margin-bottom: 24px;
}

.thirdparty img {
  margin-right: 40px;
}

.thirdparty img:last-child {
  margin-right: 0;
}

.thirdparty img:hover {
  opacity: 0.6;
}

.con_box .about {
  font-size: 16px;
  opacity: 0.6;
}
.con_box .about a {
  color: #fff;
}
.con_box .about a:hover {
  color: #dd2f3c;
}
// 分页

.meneame {
  height: 30px;
  padding: 40px;
}
.meneame span,
.meneame a {
  float: left;
  padding: 0 10px;
  line-height: 22px;
  border: 1px solid #dfdfdf;
  color: #000;
  margin-right: 6px;
  font-size: 12px;
  text-decoration: none;
}
.meneame .current {
  background: #e83131;
  border-color: #e83131;
  color: #fff;
}
</style>
