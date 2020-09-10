<template>
  <div class="activitydetail">
    <div class="resource">
      <router-link to="activitylist">参与活动列表 > </router-link>{{this.$route.params.title}}
    </div>
    <div class="content-data">
        <div class="data-title flexBox flexBetween">
          <div style="width:55%">活动内容</div>
          <div style="width:15%">状态</div>
          <div style="width:20%">提交时间</div>
          <div style="width:10%">操作</div>
        </div>
        <ul v-if="articlList.total > 0">
          <li class="flexBox flexBetween flexAlign" v-for="(item, index) in articlList.data" :key="index">
            <div style="width:55%" class="activities flexBox flexLeft">
              <div class="imgBox flexBox flexMiddle">
                <img :src="item.index_pic + '?imageView/0/h/54/w/72'" alt="">
              </div>
              <div class="text">
                <div class="text-title"> &lt;{{item.title}}&gt; </div>
                <p>{{item.brief}}</p>
              </div>
            </div>
            <div style="width:15%;color: #9B9B9B" class="already" v-if="item.status == 20">
              已评分
            </div>
            <div style="width:15%;color: green" class="already" v-else-if="item.status == 3">
              已上网
            </div>
            <div style="width:15%;color: #D0021B" class="already" v-else-if="item.status == 23">
              已下网
            </div>
            <div style="width:15%;color: #ccc" class="already" v-else-if="item.status == 22">
              不合规
            </div>
            <div style="width:15%;color: red" class="already" v-else-if="item.status == 4">
              已打回
            </div>
            <div style="width:15%;color: #4F4F4F" class="already" v-else-if="item.status == 2">
              已审核
            </div>
            <div style="width:15%;color: #41A856" class="already" v-else-if="item.status == 21">
              评分中
            </div>
            <div style="width:15%;color: #F5A623" class="already" v-else-if="item.status == 1">
              待提审
            </div>
            <div style="width:15%;color: #F5A623" class="already" v-else-if="item.status == 5">
              审核中
            </div>
            <div style="width:20%" class="activityTime">
              <p>{{item.created_at}}</p>
            </div>
            <div style="width:10%" class="setting">
              <span class="detail" v-if ='item.status == 3'><a :href="'http://www.vinj.cn/folder77?id=' + item.id" target="_blank">详情</a></span>
            </div>
          </li>
        </ul>
        <ul class="hoge-error" v-else style="margin-top: 20px">
          <div>
            <div class="nodata-img"></div>
            <p>暂无内容</p>
          </div>
        </ul>
        <el-pagination
          hide-on-single-page
          background
          layout="prev, pager, next"
          :total="articlList.total"
          :page-size = count
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      access_token: this.$util.getCookie('accessToken'),
      count: 10,
      page: 1,
      articlList: {}
    }
  },
  props: ['index'],
  methods: {
    getArticleList () {
      let param = {
        activity_id: this.activeId,
        page: this.page,
        per_num: this.count,
        access_token: this.access_token
      }
      this.$api.activityArticleList(param).then(res => {
        if (res.ErrorCode === 0) {
          this.articlList = res.data
          console.log(this.articlList.data)
        }
      })
    },
    handleCurrentChange (value) {
      this.page = value
      this.getArticleList()
    }
  },
  mounted () {
    // 列表的数据 this.$route.params.id
    this.activeId = this.$route.params.id
    this.getArticleList()
  }
}
</script>
<style lang='scss' scoped>
.resource{
  a{
    color:rgba(153,153,153,1);
  }
  font-size:16px;
  font-family:PingFang-SC;
  font-weight:400;
  color:rgba(153,153,153,1);
  padding: 20px 0;
}
.content-data{
  border:1px solid rgba(219,225,233,1);
  background-color: #fff;
  min-height: 500px;
  margin-bottom: 115px;
  .data-title{
    padding: 0 40px;
    border-bottom: 2px solid #EEF1F5;
    height:54px;
    font-size:14px;
    font-family:PingFangSC;
    font-weight:500;
    color:rgba(79,79,79,1);
    line-height:54px;
  }
  ul{
    li{
      padding: 0 40px;
      border-bottom: 2px solid #EEF1F5;
      min-height: 75px;
      &:hover{
        cursor:pointer;
      }
      .activities{
        .imgBox{
          width: 72px;
          height: 54px;
          background: #000;
          overflow: hidden;
          margin-right: 10px;
          img{
            width: 100%;
            max-height: 100%;
          }
        }
        .text{
          font-family:PingFang-SC;
          .text-title{
            color:rgba(78,83,87,1);
            font-size:14px;
            font-weight:500;
            line-height: 20px;
          }
          p{
            font-size: 12px;
            font-weight:500;
            color:rgba(153,153,153,1);
            line-height: 18px;
          }
        }
      }
      .already,.activityTime, .setting{
        font-size:12px;
        font-family:PingFang-SC;
        font-weight:500;
        color:rgba(148,157,164,1);
        line-height:17px;
      }
      .setting{
        .detail{
          margin-right: 10px;
          a{
            color: unset;
          }
        }
        .detail:hover{
          color: #4D96FF;
          cursor:pointer;
        }
        .article:hover{
          color: #4D96FF;
          cursor:pointer;
        }
      }
      .already{
        &.purpose{
          color: #F5A623;
        }
        &.repulse{
          color:rgba(208,2,27,1);
        }
        &.scoring{
          color: #41A856;
        }
      }
    }
  }
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
      .el-pager li.active{
        background:rgba(226,49,61,1);
        color: #fff;
      }
    }
  }
}
</style>
