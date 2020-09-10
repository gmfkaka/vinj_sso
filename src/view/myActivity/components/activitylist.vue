<template>
  <div class="activitylist">
    <div class="content-introduce">
      <span>时至今日</span>
      <span>{{userInfo.nick_name}}</span>
      <span>共参与了</span>
      <span>{{activityList.total}}</span>
      <span>个活动</span>
      <div class="name-search flexBox flexAlign">
        <input type="text" name="" id="" placeholder="作品名称" v-model="inputText">
        <i class="searchIcon" @click="searchList()"></i>
      </div>
    </div>
    <div class="content-data" v-loading="loading">
        <div class="data-title flexBox flexBetween">
          <div style="width:55%">活动内容</div>
          <div style="width:15%">已投稿件数</div>
          <div style="width:20%">活动时间</div>
          <div style="width:10%">操作</div>
        </div>
        <ul v-if="activityList.total > 0" >
          <li class="flexBox flexBetween flexAlign"
          v-for="(item, index) in activityList.data"
          :key="index">
            <div style="width:55%" class="activities flexBox flexLeft">
              <div class="imgBox">
                <img :src="item.index_pic + '?imageView/0/h/54/w/72'" alt="" v-if="item.index_pic">
                <img src='../../../assets/image/logo@2x.png' alt="" v-else>
              </div>
              <div class="text">
                <div class="text-title"> &lt;{{item.title}}&gt; </div>
                <p>{{item.brief | hideText(30)}}</p>
              </div>
            </div>
            <div style="width:15%" class="already">{{item.atlas_total}}</div>
            <div style="width:20%" class="activityTime">
              <p>{{item.start_time}}</p>
              <p>至{{item.end_time}}</p>
            </div>
            <div style="width:10%" class="setting">
              <span class="detail"><a :href="'http://www.vinj.cn/folder81?id=' + item.id" target="_blank">详情</a></span>
              <span class="article" @click="goDetail(item.id, item.title)">活动稿件</span>
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
          :total="activityList.total"
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
      msg: '',
      inputText: '',
      access_token: this.$util.getCookie('accessToken'),
      activityList: {},
      count: 10,
      page: 1,
      loading: true
    }
  },
  props: ['index', 'userInfo'],
  methods: {
    goDetail (id, title) {
      this.$router.push({name: 'activitydetail', params: {id: id, title: title}})
    },
    handleCurrentChange (value) {
      this.page = value
      this.getActivityListData()
    },
    getActivityListData (value) {
      let param = {
        title: value,
        access_token: this.access_token,
        page: this.page,
        per_num: this.count
      }
      this.$api.activityList(param).then(res => {
        if (res.ErrorCode === 0) {
          this.activityList = res.data
          this.loading = false
        }
      })
    },
    searchList () {
      this.getActivityListData(this.inputText)
    }
  },
  mounted () {
    this.getActivityListData()
  }
}
</script>
<style lang='scss' scoped>
.content-introduce{
  padding: 24px 0 20px 0;
  color: #808080;
  font-size: 16px;
  .name-search{
    background:rgba(248,248,248,1);
    height: 30px;
    width: 130px;
    line-height: 30px;
    font-size: 13px;
    color: #666666;
    border-radius: 20px;
    border: 1px solid #B3B3B3;
    float: right;
    margin-top: -10px;
    margin-right: 20px;
    overflow: hidden;
    cursor: pointer;
    box-sizing: border-box;
    input{
      margin-left: 10px;
      border: none;
      outline: none;
      width: 90px;
      background:rgba(248,248,248,1);
      box-sizing: border-box;
    }
  }
}
.content-data{
  border:1px solid rgba(219,225,233,1);
  background-color: #fff;
  margin-bottom: 115px;
  min-height: 500px;
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
    min-height: 500px;
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
