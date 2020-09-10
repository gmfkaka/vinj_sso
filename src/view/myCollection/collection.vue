<template>
  <div class="content-box">
    <div class="content-header-box">
      <div class="tab-box">
        <div class="tab" v-for="(tabItem,tabIndex) in tabList" :key="tabIndex" @click="toggleTab(tabIndex)">
          <span>{{tabItem.tabName}}</span>
          <!-- <span>{{tabItem.num}}</span> -->
          <span class="line" v-if="currentTab == tabIndex"></span>
        </div>
        <div class="contribute-btn" @click="goPost()">我要投稿</div>
      </div>
    </div>
    <div class="content-data" v-loading = 'loading'>
      <div class="content-introduce">
        <span>时至今日,</span>
        <span>{{userInfo.nick_name}}</span>
        <span>共收藏了</span>
        <span>{{pageTotal}}</span>
        <span v-if="bucket_name == 'two_cang'">个图片作品</span>
        <span v-else-if="bucket_name == 'video_cang'">个视频作品</span>
        <span v-else>个作品</span>
        <div class="name-search flexBox flexAlign">
          <input type="text" name="" id="" placeholder="作品名称" v-model="inputText">
          <i class="searchIcon" @click="searchList()"></i>
        </div>
      </div>
      <div class="pic-list-box">
        <!-- <div class="date-pic-box">
          <div class="date-month">{{picItem.dateMonth}}</div>
          <div class="date-year">{{picItem.dateYear}}</div>
        </div> -->
        <div class="pic-info-box" v-if="pageTotal > 0">
          <div class="pic" v-for="(picItem, index) in picList" :key="index">
              <div class="imgBox flexBox flexMiddle">
                <!-- <img v-if="bucket_name == 'two_cang'" :src="picItem.extends.cover_url + '?imageView/0/h/255/w/166'" alt=""> -->
                <!-- <img v-if="bucket_name == 'video_cang'" :src="picItem.extends.poster + '?imageView/0/h/255/w/166'" alt=""> -->
                 <img :src="picItem.index_pic + '?imageView/0/w/225'" alt="">
              </div>
              <!-- <span class="state">审核中</span> -->
              <span class="type-title">{{picItem.title}}</span>
              <!-- <span class="time-length" v-if="bucket_name == 'video_cang'">06:22</span> -->
              <span class="video-icon" v-if="bucket_name == 'video_cang'">
                <i class="el-icon-caret-right"></i>
              </span>
              <!-- <div class="cover-box">
                <div class="download flexBox flexAlign">
                  <i class="dwonoadIcon"></i>
                  下载
                </div>
                <div class="collection flexBox flexAlign">
                  <i class="collectionIcon"></i>
                  收藏
                </div>
                <span class="title">{{picItem.extends.title}}</span>
                <div class="views flexBox flexAlign">
                  <i class="readersIcon"></i>
                  12
                </div>
                <div class="thumb flexBox flexAlign">
                  <i class="praiseIcon"></i>
                  34
                </div>
                <div class="collection flexBox flexAlign">
                  <i class="collectionIcon"></i>
                  56
                </div>
              </div> -->
          </div>
        </div>
        <div class="pic-info-box flexBox flexMiddle" v-else style="text-align: center;width: 100%">
          <div class="">
            <div class="nodata-img"></div>
            <p>暂无内容</p>
          </div>
        </div>
      </div>
    </div>
    <el-pagination
      hide-on-single-page
      background
      layout="prev, pager, next"
      :total="pageTotal"
      :page-size = count
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>
<script>
export default{
  data () {
    return {
      currentTab: 0,
      inputText: '',
      tabList: [
        {
          tabName: '图片',
          num: 36,
          type: 'pic'
        },
        {
          tabName: '视频',
          num: 36,
          type: 'video'
        }],
      minTabList: [{
        minTabName: '签约投稿',
        type: 'signing'
      },
      {
        minTabName: '活动投稿',
        type: 'activityContribute'
      }],
      picList: [],
      bucket_name: 'two_cang',
      pageTotal: 0,
      page: 1,
      count: 12,
      access_token: this.$util.getCookie('accessToken'),
      loading: true
    }
  },
  props: ['userInfo'],
  methods: {
    toggleTab (tabIndex) {
      this.loading = true
      if (tabIndex === 0) {
        this.bucket_name = 'two_cang'
      } else if (tabIndex === 1) {
        this.bucket_name = 'video_cang'
      } else {
        this.bucket_name = ''
      }
      this.picList = ''
      this.currentTab = tabIndex
      this.getData()
    },
    handleCurrentChange (value) {
      this.loading = true
      this.page = value
      this.getData()
    },
    goPost () {
      this.$router.push({
        name: 'post'
      })
    },
    searchList () {
      this.loading = true
      this.getData(this.inputText)
    },
    getData (title) {
      let param = {
        title: title,
        bucket_name: this.bucket_name,
        // member_id: 90,
        access_token: this.access_token,
        offset: (this.page - 1) * this.count,
        count: this.count
      }
      this.$api.collection(param).then(res => {
        if (res.ErrorCode === 0) {
          this.picList = res.data.data
          this.pageTotal = res.data.total
          this.loading = false
        }
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style lang="scss" scoped>
.content-box{
  width: 960px;
  .content-header-box{
    // height: 116px;
    width: 100%;
    background: #fff;
    .tab-box{
      display: flex;
      padding: 20px 0 14px 26px;
      font-size: 16px;
      color: #333;
      border-bottom: 1px solid #EEEEEE;
      position: relative;
      .tab{
        margin-right: 50px;
        position: relative;
        height: 22px;
        line-height: 22px;
        cursor: pointer;
        .line{
          position: absolute;
          bottom: -15px;
          left: 0px;
          width: 28px;
          display: inline-block;
          border: 1px solid #DD2F3C;
        }
      }
      .contribute-btn{
        position: absolute;
        right: 20px;
        top: 20px;
        color: #DD2F3C;
        border: 1px solid #DD2F3C;
        width: 90px;
        height: 28px;
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        font-size: 13px;
        border-radius: 2px;
      }
    }
    .tab-content-box{
      height: 59px;
      display: flex;
      .min-tab{
        padding: 20px;
        font-size: 14px;
        color: #333333;
        line-height: 19px;
        cursor: pointer;
      }
      .isMinActive{
        color: #DD2F3C;
      }
    }
  }
  .content-data{
    min-height: 500px;
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
      /* border-radius: 20px !important; */
    }
    .pic-list-box{
      padding-bottom: 14px;
      margin-top: 30px;
      // border-bottom: 1px solid #E6E6E6;
      display: flex;
      &:last-child{
        border: none;
      }
      .date-pic-box{
        width: 120px;
        height: 120px;
        background: #DCDCDC;
        margin-right: 26px;
        padding: 14px 0;
        .date-month{
          width: 100%;
          text-align: center;
          font-size: 40px;
          color: #FFFFFF;
          height: 60px;
        }
        .date-year{
          width: 100%;
          text-align: center;
          font-size: 20px;
          color: #FFFFFF;
        }
      }
      .pic-info-box{
        display: flex;
        flex-wrap: wrap;
        .imgBox{
          position: absolute;
          width: 225px;
          height: 166px;
          overflow: hidden;
          background-color: #000;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
        .pic{
          width: 225px;
          height: 166px;
          // background: #999;
          margin-right: 20px;
          margin-bottom: 16px;
          position: relative;
          cursor: pointer;
          .state{
            display: inline-block;
            width: 64px;
            height: 24px;
            background: #F5A623;
            line-height: 24px;
            border-radius: 16px;
            text-align: center;
            right: 10px;
            top: 10px;
            position: absolute;
            color: #fff;
            font-size: 13px;
          }
          .type-title{
            position: absolute;
            // left: 14px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            padding: 0 10px;
            height: 35px;
            bottom: 0;
            background: rgba(0, 0, 0, 0.2);
            line-height: 35px;
            color: #fff;
            font-size: 16px;
            width: 225px;
            box-sizing: border-box;
          }
          .time-length{
            position: absolute;
            right: 14px;
            bottom: 16px;
            color: #fff;
            font-size: 14px;
          }
          .video-icon{
            display: inline-block;
            width: 44px;
            height: 44px;
            color: #fff;
            font-size: 40px;
            text-align: center;
            background: #060606;
            border-radius: 50%;
            opacity: 0.4;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%)
          }
          .cover-box{
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: absolute;
            z-index: 10;
            display: none;
            .download,.collection,.title,.views,.thumb{
              position: absolute;
              color: #FFFFFF;
              font-size: 16px;
            }
            .download,.collection,.views,.thumb{
              cursor: pointer;
            }
            .download{
              right: 83px;
              top: 10px;
            }
            .collection{
              bottom: 14px;
              right: 15px;
            }
            .title{
              left: 14px;
              bottom: 47px;
              overflow: hidden;
              text-overflow:ellipsis;
              white-space: nowrap;
              padding: 0 10px;
              // bottom: 16px;
              color: #fff;
              font-size: 16px;
              width: 225px;
              box-sizing: border-box;
            }
            .views{
              left: 14px;
              bottom: 14px;
            }
            .thumb{
              left: 94px;
              bottom: 14px;
            }
          }
          // &:hover{
          //   .state,.type-title,.time-length,.video-icon{
          //     display: none;
          //   }
          //   .cover-box{
          //     display: block;
          //   }
          // }
        }
        .pic:nth-child(4n){
          margin-right: 0;
        }
      }
    }
    .pic-list-box:first-child{
      margin-top: 0;
    }
  }
  /deep/{
    .el-pagination{
      margin-top: 70px;
      margin-left: 440px;
      margin-bottom: 122px;
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
        background: unset;
        width: 40px;
        height: 40px;
        line-height: 40px;
      }
      .el-pager li.active{
        background:rgba(226,49,61,1);
        color: #fff;
      }
    }
  }
}
</style>
