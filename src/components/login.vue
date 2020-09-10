<template>
  <div class='login flexBox flexMiddle'>
    <div class="content">
      <div class="loginBox flexBox flexBetweent">
        <div class="login-left">
          <img src="../assets/image/login/scen.png" alt="">
        </div>
        <div class="login-right">
          <div class="logoBox">
            <img src="../assets/image/logo.png" alt="">
          </div>
          <ul class="flexBox flexBetween tabsBox">
            <li @click="changeTab('first')" :class="{active: activeName == 'first'}">验证码登录</li>
            <li @click="changeTab('second')" :class="{active: activeName == 'second'}">账号密码登录</li>
          </ul>
          <div class="itemBox" v-if="activeName == 'first'">
            <el-input v-model="member_name" placeholder="请输入手机号" prefix-icon = 'phoneIcon'></el-input>
            <div class="codeBox">
              <el-input v-model="mobile_verifycode" placeholder="请输入验证码" prefix-icon = 'codeIcon'></el-input>
              <el-button class="getCode" @click="getCode()" type="text" :disabled = 'loginPwd'>
                <span v-if="times">({{times}}s)</span>
                获取验证码</el-button>
              <!-- <div class="getCode" @click="getCode()">{{codeHtml}}</div> -->
            </div>
            <div>
              <el-button type="danger" @click="goLogin('code')" class="loginBtn">{{logining ? '正在登录...' : '登 录'}}</el-button>
            </div>
            <div class="itemBottom">
              <p>还没有账号? <router-link to="/register">立即注册</router-link></p>
            </div>
          </div>
          <div class="itemBox" v-if="activeName == 'second'">
            <el-input v-model="member_name" placeholder="请输入帐号" prefix-icon = 'usernameIcon'></el-input>
            <div style="position: relative;">
              <el-input :type="inputType" v-model="password" placeholder="请输入密码" prefix-icon = 'pwdIcon'></el-input>
              <div class="changeIcon" @click="changeIcon(inputType)">
                <div :class="inputType==='password'?'closeEye':'openEye'"></div>
              </div>
            </div>
            <el-button type="text" class="forget" @click="forgetPsw()">忘记密码？</el-button>
            <div>
              <el-button type="danger" @click="goLogin('password')" class="loginBtn">{{logining ? '正在登录...' : '登 录'}}</el-button>
            </div>
            <div class="itemBottom">
              <p>还没有账号? <router-link to="/register">立即注册</router-link></p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <p>(C) 2014-2015 南京报业传媒集团 版权所有&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主办：中共南京市委宣传部&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;承办：南京日报</p>
      </div>
    </div>
  </div>
</template>
<script>
import secret from '../utils/secret'
export default {
  name: '',
  data () {
    return {
      logining: false,
      activeName: 'first',
      nick_name: '',
      member_name: '',
      password: '',
      mobile_verifycode: '',
      times: '',
      loginPwd: false,
      inputType: 'password'
    }
  },
  methods: {
    changeTab (value) {
      this.activeName = value
    },
    // 登录
    goLogin (value) {
      if (this.member_name === '') {
        this.$message({
          showClose: true,
          message: '请输入账号或手机号',
          type: 'warning'
        })
        return
      } else {
        let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/
        if (!reg.test(this.member_name)) {
          this.$message({
            showClose: true,
            message: '请输入合法手机号',
            type: 'warning'
          })
          return
        }
      }
      if (value === 'code') {
        if (this.mobile_verifycode === '') {
          this.$message({
            showClose: true,
            message: '请输入验证码',
            type: 'warning'
          })
          return
        }
      } else {
        if (this.password === '') {
          this.$message({
            showClose: true,
            message: '请输入密码',
            type: 'warning'
          })
          return
        }
      }
      const encryptionPassword = this.password
      const encrypted = secret.Encrypt(encryptionPassword)
      let param = {
        member_name: this.member_name,
        password: encrypted,
        mobile_verifycode: this.mobile_verifycode
      }
      if (this.logining) return
      this.logining = true
      this.$api.userLogin(param).then((res) => {
        if (res.ErrorCode === 0) {
          this.$message({
            showClose: true,
            message: '登录成功',
            type: 'success'
          })
          this.$util.setCookie('accessToken', res.data.access_token, 1)
          this.$util.setCookie('author', res.data.nick_name)
          let getUserInfoParam = {
            access_token: res.data.access_token
          }
          this.$api.userInfo(getUserInfoParam).then(userRes => {
            if (userRes.ErrorCode === 0) {
              this.$util.setCookie('user_id', userRes.data.id)
            }
          })
          if (this.$util.getCookie('url') && this.$util.getCookie('url') != null) {
            window.open(this.$util.getCookie('url'), '_self')
          } else {
            this.$router.push({
              name: 'works',
              path: '/index'
            })
          }
          this.$util.setCookie('url', '')
          this.logining = false
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
          this.logining = false
        }
      })
    },
    // 获取手机验证码
    getCode () {
      let param = {
        member_name: this.member_name,
        type: 'login'
      }
      this.$api.sendCode(param).then(res => {
        let s = 60
        if (res.ErrorCode === 0) {
          this.loginPwd = true
          let timeId = setInterval(() => {
            if (s < 2) {
              clearInterval(timeId)
              this.loginPwd = false
            }
            s = s - 1
            this.times = s
          }, 1000)
          this.$message({
            showClose: true,
            message: '验证码发送成功',
            type: 'success'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
        }
      })
    },
    // 忘记密码
    forgetPsw () {
      this.$router.push({
        name: 'forget',
        path: '/forget'
      })
    },
    changeIcon (type) {
      if (type === 'password') {
        this.inputType = 'text'
      } else {
        this.inputType = 'password'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.content{
  width: 910px;
  // margin: 0 auto;
}
.login{
  width: 100%;
  height: 100%;
  background: url(../assets/image/login/bg2.png) no-repeat center center;
  background-color: #000;
  background-size: cover;
  .loginBox{
    height: 565px;
    .login-left{
      width: 310px;
      height: 565px;
      overflow: hidden;
      img{
        width: 100%;
        max-height: 100%;
      }
    }
    .login-right{
      width: 600px;
      padding: 50px 91px 50px 85px;
      background-color: #fff;
      text-align: center;
      .logoBox{
        display: inline-block;
        width: 187px;
        height: 60px;
        overflow: hidden;
        img{
          width: 100%;
          max-height: 100%;
        }
      }
      .tabsBox{
        padding: 50px 70px 0px 80px;
        border-bottom: 1px solid #E3E3E3;
        li{
          cursor: pointer;
          line-height:25px;
          font-size:18px;
          font-family:PingFangSC;
          font-weight:400;
          padding-bottom: 5px;
          color:rgba(155,155,155,1);
          &.active{
            color:rgba(74,74,74,1);
            border-bottom: 2px solid #DD2F3C;
          }
        }
      }
      .itemBox{
        margin-top: 21px;
        .itemBottom{
          margin: 30px;
          font-size:14px;
          p a{
            font-size:14px;
            font-family:PingFangSC;
            font-weight:400;
            color:#DD2F3C;
          }
        }
        .changeIcon{
          position: absolute;
          bottom: 14px;
          right: 15px;
        }
      }
      /deep/{
        .el-input{
          margin-top: 21px;
          input{
            height:50px;
            background:rgba(234,234,234,0.41);
            border-radius:6px;
            border: none;
          }
          .el-input__prefix,.el-input__suffix{
            line-height: 50px;
          }
        }
        .forget{
          color: #9B9B9B;
          font-size:14px;
          width: 100%;
          text-align: right;
          cursor: pointer;
        }
        .loginBtn{
          width: 100%;
          height:58px;
          background:#DD2F3C;
          font-size:22px;
          font-family:PingFangSC;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:33px;
          letter-spacing:1px;
          margin-top: 22px;
        }
        .codeBox{
          position: relative;
          input{
            padding-right: 100px;
          }
          .getCode{
            position: absolute;
            right: 10px;
            top: 40px;
            padding-left: 15px;
            font-size: 14px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(221,47,60,1);
            border-left: 1px solid rgba(221,47,60,1);
            cursor: pointer;
            border-radius: 0;
            padding: 0;
            padding-left: 10px;
            &.is-disabled{
              color: #ccc;
              border-left: 1px solid  #ccc;
            }
          }
        }
      }
    }
  }
  .bottom{
    position: absolute;
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    // margin-top: 144px;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
