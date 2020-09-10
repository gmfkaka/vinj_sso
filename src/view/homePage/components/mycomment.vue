<template>
  <div class="myComment">
    <ul>
      <li class="flexBox flexLeft">
        <div class="leftImg">
          <img src='../../../assets/logo.png' alt="">
        </div>
        <div class="rightText">
          <div class="rightText-top flexBox flexBetween">
            <p>
              <span class="username">你是不是傻</span>
              评论了原创摄影作品
              <span class="title">《年为永远是家里最好的》</span>
            </p>
            <div class="commentIcon"><i></i></div>
          </div>
          <p class="datetime">2012-10-12 12：12</p>
          <div class="comment">多谢，有时间会整理一下近期的作品，下次会多发布</div>
        </div>
      </li>
      <li class="flexBox flexLeft">
        <div class="leftImg">
          <img src='../../../assets/logo.png' alt="">
        </div>
        <div class="rightText">
          <div class="rightText-top flexBox flexBetween">
            <p>
              <span class="username">你是不是傻</span>
              评论了原创摄影作品
              <span class="title">《年为永远是家里最好的》</span>
            </p>
            <div class="commentIcon"><i></i></div>
          </div>
          <p class="datetime">2012-10-12 12：12</p>
          <div class="comment">这是2004年11月17日在南京街头拍摄的被霜染红的叶子。近日，随着早晚温差拉大，尤其是每天清晨最低气温只有4℃，南京出现了霜，街头的树叶和一些植物的叶子在霜的作用下，纷纷披上了“红袍”，煞是好看。</div>
        </div>
      </li>
      <li class="flexBox flexLeft">
        <div class="leftImg">
          <img src='../../../assets/logo.png' alt="">
        </div>
        <div class="rightText">
          <div class="rightText-top flexBox flexBetween">
            <p>
              <span class="username">你是不是傻</span>
              评论了原创摄影作品
              <span class="title">《年为永远是家里最好的》</span>
            </p>
            <div class="commentIcon"><i></i></div>
          </div>
          <p class="datetime">2012-10-12 12：12</p>
          <div class="comment">多谢，有时间会整理一下近期的作品，下次会多发布</div>
        </div>
      </li>
    </ul>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="200">
    </el-pagination>
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
.myComment{
  width: 100%;
  height: 100%;
  margin-bottom: 58px;
  ul{
    background: #fff;
    width: 100%;
    li{
      padding: 30px;
      border-bottom: 1px solid rgba(240,240,240,1);
      &:last-child{
        border: none;
      }
      .leftImg{
        width: 48px;
        height: 48px;
        overflow: hidden;
        border-radius: 50%;
        background: #000;
        margin-right: 22px;
        img{
          width: 100%;
          max-height: 100%;
        }
      }
      .rightText{
        width: 100%;
        p{
          font-weight:500;
          color:rgba(187,187,187,1);
          line-height: 20px;
          .username{
            font-weight:500;
            color:rgba(51,51,51,1);
            font-size: 14px;
            margin-right: 27px;
          }
          .title{
            color: #DD2F3C;
          }
        }
        .comment{
          margin-top: 15px;
          width: 100%;
          background:rgba(250,250,250,1);
          border-radius:4px;
          padding: 20px;
          line-height: 20px;
        }
      }
    }
  }
  /deep/{
    .el-pagination{
      margin-top: 70px;
      margin-left: 330px;
      padding-bottom: 50px;
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
        border:1px solid rgba(204,204,204,1);
        &:hover{
          color: rgba(226,49,61,1);;
        }
      }
      .btn-prev,.btn-next{
        width: 40px;
        height: 40px;
        line-height: 40px;
        background: unset;
        border:1px solid rgba(204,204,204,1);
      }
      .el-pager li.active{
        background:rgba(226,49,61,1);
        color: #fff;
      }
    }
  }
}
</style>
