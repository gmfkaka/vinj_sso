<template>
  <div class="activity">
    <ul class="activityTab flexBox flexLeft">
      <li v-for="(item, index) in tabList"
      :key="index"
      :class="{active: index == currentIndex}" @click="changetab(index, item.path)">{{item.name}} <span>{{item.num}}</span></li>
    </ul>
    <div class="activity-content">
      <router-view :index = currentIndex :userInfo = userInfo />
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      tabList: [
        {name: '参与活动', path: 'activitylist', num: ''},
        {name: '评分活动', path: 'scorelist', num: ''}
      ],
      currentIndex: 0
    }
  },
  props: ['userInfo'],
  methods: {
    changetab (index, path) {
      this.currentIndex = index
      this.$router.push({'path': path})
    }
  },
  mounted () {
    // this.getActivityListData()
    if (this.$route.name === 'scorelist') {
      this.currentIndex = 1
    }
  }
}
</script>
<style lang='scss' scoped>
.activity{
  width: 960px;
  .activityTab{
    box-sizing: border-box;
    height:57px;
    background:rgba(255,255,255,1);
    border:1px solid rgba(240,240,240,1);
    padding: 20px 15px;
    li{
      font-size:16px;
      font-family:PingFang-SC;
      font-weight:400;
      color:rgba(51,51,51,1);
      cursor: pointer;
      &:first-child{
        margin-right: 40px;
      }
      &.active{
        position: relative;
        color:rgba(51,51,51,1);
        &::before{
          position: absolute;
          content: '';
          display: inline-block;
          width:28px;
          height:2px;
          background:rgba(221,47,60,1);
          bottom: -20px;
          left: 50%;
          transform: translate(-50%);
        }
      }
    }
  }
  .activity-content{
    .content-introduce{
      padding: 24px 0 20px 0;
      color: #808080;
      font-size: 16px;
      .name-search{
        height: 30px;
        line-height: 30px;
        font-size: 13px;
        color: #666666;
        padding-left: 34px;
        border-radius: 20px;
        border: 1px solid #B3B3B3;
        float: right;
        margin-top: -10px;
        margin-right: 20px;
        cursor: pointer;
      }
      /* border-radius: 20px !important; */
    }
    .content-data{
      background-color: #fff;
      // min-height: 950px;
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
  }
}
</style>
