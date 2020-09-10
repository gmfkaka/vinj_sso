<template>
  <div class="activitydetail">
    <div class="resource">
      <router-link to="scorelist">评分活动列表 > </router-link>{{this.$route.params.title}}
    </div>
    <div class="content-data">
      <!-- <ul class="scoreTab flexBox flexLeft flexAlign">
        <li class="active">全部</li>
        <li>已评分</li>
        <li>待评分</li>
      </ul> -->
      <div class="data-title flexBox flexBetween" v-loading='loading'>
        <div style="width:55%">活动内容</div>
        <div style="width:15%">状态</div>
        <div style="width:20%">提交时间</div>
        <div style="width:10%">操作</div>
      </div>
      <ul class="scorelist" v-if="articlList.total>0">
        <li class="flexBox flexBetween flexAlign" v-for="(item, index) in articlList.data" :key="index">
          <div style="width:55%" class="activities flexBox flexLeft">
            <div class="imgBox">
              <img :src="item.index_pic + '?imageView/0/h/72/w/54'" alt="" v-if="item.index_pic">
              <img src='../../../assets/image/logo@2x.png' alt="" v-else>
            </div>
            <div class="text">
              <div class="text-title"> &lt;{{item.title}}&gt; </div>
              <p>{{item.brief}}</p>
            </div>
          </div>
          <div style="width:15%" class="already scoring" v-if="item.is_score">
            已评分
          </div>
          <div style="width:15%" class="already" v-else>
            待评分
          </div>
          <div style="width:20%" class="activityTime">
            <p>{{item.created_at}}</p>
          </div>
          <div style="width:10%" class="setting">
            <span class="detail"><a :href="item.preview_url.data" target="_blank">详情</a></span>
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
      articlList: {},
      loading: true
    }
  },
  props: ['index'],
  methods: {
    getArticleList () {
      let param = {
        activity_id: this.$route.params.id,
        page: this.page,
        per_num: this.count,
        access_token: this.access_token
      }
      this.$api.activityArticleList(param).then(res => {
        if (res.ErrorCode === 0) {
          this.articlList = res.data
          this.loading = false
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
  .scoreTab{
    height: 54px;
    padding: 0 40px;
    font-size:14px;
    font-family:PingFang-SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:20px;
    li{
      margin-right: 40px;
      &.active{
        color:rgba(221,47,60,1);
      }
    }
  }
  .data-title{
    padding: 0 40px;
    border-bottom: 2px solid #EEF1F5;
    height:54px;
    font-size:14px;
    font-family:PingFangSC;
    font-weight:500;
    color:rgba(79,79,79,1);
    line-height:54px;
    background:rgba(250,250,250,1);
  }
  .scorelist{
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
