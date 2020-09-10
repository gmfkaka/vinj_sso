<template>
  <div class="content-box">
    <div class="content-header-box">
      <div class="tab-box">
        <div class="tab" @click="toggleTab('0')">
          <span>图片</span>
          <span class="line" v-if="currentTab == 0"></span>
        </div>
        <div class="tab" @click="toggleTab('1')">
          <span>视频</span>
          <span class="line" v-if="currentTab == 1"></span>
        </div>
      </div>
    </div>
    <div class="content-data">
      <div class="content-introduce">
        <span>时至今日</span>
        <span>{{userInfo.nick_name}}</span>
        <span>共下载了</span>
        <span v-if="picData.total > 0">{{picData.total}}</span>
        <span v-else>0</span>
        <span v-if="currentTab == 0">个图片作品</span>
        <span v-if="currentTab == 1">个视频作品</span>
        <!-- <div class="name-search flexBox flexAlign">
          <input type="text" name="" id="" placeholder="作品名称" v-model="inputText">
          <i class="searchIcon" @click="searchList()"></i>
        </div> -->
      </div>
      <div class="pic-list-box" v-loading = 'loading'>
        <div class="pic-info-box" v-if='picData.total > 0'>
          <div class="pic" v-for="(picItem, index) in picData.data" :key="index">
            <div class="imgBox flexBox flexMiddle" @click="showBigimg(picItem.index_pic)">
              <img :src="picItem.index_pic + '?imageView/0/w/225'" alt="" v-if="picItem.index_pic">
              <img src='../../assets/image/logo@2x.png' alt="" v-else>
            </div>
              <!-- <span class="time-length" v-if="currentTab == 1">06:22</span>
              <span class="video-icon" v-if="currentTab == 1">
                <i class="el-icon-caret-right"></i>
              </span> -->
              <!-- <div class="cover-box">
                <div class="download flexBox flexAlign">
                  <i class="dwonoadIcon"></i>
                  下载
                </div>
                <div class="collection flexBox flexAlign">
                  <i class="collectionIcon"></i>
                  收藏
                </div>
                <span class="title">{{picItem.title}}</span>
                <div class="views flexBox flexAlign">
                  <i class="readersIcon"></i>
                  浏览量
                </div>
                <div class="thumb flexBox flexAlign">
                  <i class="praiseIcon"></i>
                  点赞数
                </div>
                 <span class="title">{{picItem.title}}</span>
                <div class="views flexBox flexAlign">
                  <i class="readersIcon"></i>
                  {{picItem.click_num}}
                </div>
                <div class="thumb flexBox flexAlign">
                  <i class="praiseIcon"></i>
                  {{picItem.praise_num}}
                </div>
                <div class="collection flexBox flexAlign">
                  <i class="collectionIcon"></i>
                  56
                </div>
              </div> -->
          </div>
        </div>
        <div class="pic-info-box flexBox flexMiddle flexCenter" v-else style="text-align: center;width: 100%">
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
      :total="picData.total"
      :page-size = count
      @current-change="handleCurrentChange">
    </el-pagination>
    <el-dialog
      :visible.sync="showImg"
      width="100%"
      style="text-align: center;padding: 20px;height: 100%">
      <img :src="bigUrl" alt="" style="max-width:50%">
    </el-dialog>
  </div>
</template>
<script>
export default{
  data () {
    return {
      showImg: false,
      bigUrl: '',
      isActive: 0,
      currentTab: 0,
      isMinActive: 0,
      inputText: '',
      access_token: this.$util.getCookie('accessToken'),
      picData: {},
      page: 1,
      count: 12,
      loading: true
    }
  },
  props: ['userInfo'],
  methods: {
    toggleNav (currentIndex) {
      this.isActive = currentIndex
    },
    toggleTab (tabIndex) {
      this.currentTab = tabIndex
      if (Number(tabIndex) === 1) {
        this.picData = {}
      } else {
        this.loading = true
        this.getPublishData()
      }
    },
    goPost () {
      if (this.userInfo.group_id !== 2) {
        this.$message({
          showClose: true,
          message: '非签约摄影师不能发布作品，签约后再来哦',
          type: 'warning'
        })
        return
      }
      let routeData = this.$router.resolve({
        name: 'post'
      })
      window.open(routeData.href, '_blank')
    },
    handleCurrentChange (value) {
      this.loading = true
      this.page = value
      this.getPublishData()
    },
    getPublishData (title) {
      let param = {
        title: title,
        page: this.page,
        per_num: this.count,
        access_token: this.access_token
        // access_token: '4c5e8d5bc8acddf321dcbd41fca54f90'
      }
      this.$api.download(param).then(res => {
        if (res.ErrorCode === 0) {
          this.picData = res.data
          this.loading = false
        }
      })
    },
    searchList () {
      this.loading = true
      this.getPublishData(this.inputText)
    },
    showBigimg (url) {
      this.bigUrl = url
      this.showImg = true
      // console.log(url)
    }
  },
  mounted () {
    this.getPublishData()
    console.log(this.userInfo)
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
      border-bottom: 1px solid #E6E6E6;
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
        // width: 840px;
        display: flex;
        flex-wrap: wrap;
        .pic{
          width: 225px;
          height: 166px;
          background: #999;
          margin-right: 20px;
          margin-bottom: 16px;
          position: relative;
          cursor: pointer;
          .imgBox{
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
            background-color: #000;
            img{
              max-width: 100%;
              max-height: 100%;
            }
          }
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
            width: 100%;
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
            margin: 78px auto;
            background: #060606;
            border-radius: 50%;
            opacity: 0.4;
            position: absolute;
            left: 100px;
          }
          .cover-box{
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            position: absolute;
            z-index: 10;
            display: none;
            // .download,.collection,.title,.views,.thumb{
            //   position: absolute;
            //   color: #FFFFFF;
            //   font-size: 16px;
            // }
            // .download,.collection,.views,.thumb{
            //   cursor: pointer;
            // }
            // .download{
            //   right: 83px;
            //   top: 10px;
            // }
            // .collection{
            //   top: 10px;
            //   right: 10px;
            // }
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
