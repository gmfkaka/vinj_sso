<template>
  <div class="worksDetail">
    <div class="content">
      <div class="resource">首页 > 专题图片 > 简约唯美 > 冬日暖阳</div>
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
.content{
  width: 1200px;
  margin: 0 auto;
}
.worksDetail {
  margin-top: 3px;
  background:rgba(248,248,248,1);
  font-family:PingFangSC;
  .resource{
    padding: 20px 0;
    font-size:14px;
    font-weight:400;
    color:rgba(79,79,79,1);
    line-height:20px;
    letter-spacing:1px;
  }
}
</style>
