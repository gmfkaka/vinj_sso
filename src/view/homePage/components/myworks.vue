<template>
  <div class='myWorks'>
    <ul class="flexBox flexWrap flexLeft" v-if="picList.total > 0" v-lazy-container="{ selector: 'img' }">
      <li class="imgBox flexAlign flexBox flexMiddle"
        v-for="(item2, index2) in picList.data"
        :key="index2">
        <!-- <img v-if='item2.index_pic' :src="item2.index_pic  + '?imageView/0/w/288'" alt="">
        <img v-else src='../../../assets/image/logo@2x.png' alt=""> -->
          <img :data-src="item2.index_pic+ '?imageView/0/w/288'" :data-loading="item2.index_pic.replace('vinj.cn/','vinj.cn/5x/')" :key="item2.index_pic" style="width:288px ;max-width:100%">
        <div class="coverBox" @click="goWebDeatil(item2.url)">
          <!-- <div class="cover-top flexBox flexRight">
            <div class="flexBox flexAlign" style="margin-right: 20px;"><i class="dwonoadIcon"></i> 89</div>
            <div class="flexBox flexAlign"><i class="collectionIcon"></i>收藏</div>
          </div> -->
          <div class="cover-title">{{item2.title}}</div>
          <div class="cover-bottom flexBox flexLeft">
            <div class="flexBox flexAlign" style="margin-right: 23px;" v-if="item2.click_num>=0"><i class="readersIcon"></i>{{item2.click_num}}</div>
            <div class="flexBox flexAlign" v-if="item2.praise_num>=0"><i class="praiseIcon"></i>{{item2.praise_num}}</div>
          </div>
        </div>
      </li>
    </ul>
    <ul class="flexBox flexWrap flexLeft flexCenter" v-else style="text-align: center">
      <div class="">
        <div class="nodata-img"></div>
        <p>暂无内容</p>
      </div>
    </ul>
    <el-pagination
      hide-on-single-page
      background
      layout="prev, pager, next"
      :total="picList.total"
      :page-size = 'count'
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {}
  },
  props: ['picList', 'count'],
  methods: {
    handleCurrentChange (value) {
      this.$emit('handlePageChange', {page: value, source: 'works'})
    },
    goWebDeatil (webUrl) {
      this.$emit('goWebDeatil', webUrl)
    }
  }
}
</script>
<style lang='scss' scoped>
.myWorks{
  margin-top: 30px;
  /deep/{
    .el-pagination{
      margin-top: 70px;
      margin-left: 440px;
      padding-bottom: 30px;
      font-size:14px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:20px;
      letter-spacing:1px;
      .el-pager li{
        background: unset;
        width: 40px;
        line-height: 40px;
        height: 40px;
        &:hover{
          color: rgba(226,49,61,1);;
        }
      }
      .btn-prev,.btn-next{
        width: 40px;
        height: 40px;
        line-height: 40px;
        background: unset;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active{
        background:rgba(226,49,61,1) !important;
      }
      .el-pager li.active{
        background:rgba(226,49,61,1);
        color: #fff;
      }
    }
  }
}
ul{
  min-height: 500px;
  .imgBox{
    position: relative;
    margin-bottom: 15px;
    width: 288px;
    height: 210px;
    overflow: hidden;
    background-color: #EEE;
    margin-right: 15px;
    &:nth-child(4n){
      margin-right: 0;
    }
    &:hover{
      cursor: pointer;
      .coverBox{
        display: block;
      }
    }
    img{
      max-width: 100%;
      max-height: 100%
    }
    .coverBox{
      display: none;
      padding: 15px;
      color: #fff;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background:rgba(0,0,0,0.5);
      .cover-title{
        position: absolute;
        font-size:16px;
        font-family:PingFangSC;
        font-weight:500;
        bottom: 47px;
        left: 15px;
      }
      .cover-bottom{
        bottom: 15px;
        left: 15px;
        position: absolute;
      }
    }
  }
}
</style>
