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
          <p class="title">注册账号 <span>(一旦注册，昵称和登陆名将不能更改!)</span></p>
          <div class="itemBox">
            <el-form label-width="80px">
              <el-form-item label="昵称">
                <el-input v-model="nick_name"></el-input>
              </el-form-item>
              <el-form-item label="手机号">
                <el-input v-model="member_name" @blur="checkPhone()" v-on:input="change"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <div class="codeBox">
                  <el-input v-model="mobile_verifycode"></el-input>
                  <el-button class="getCode" @click="getCode()" type="text" :disabled = 'loginPwd'>
                    <span v-if="times">({{times}}s)</span>
                    获取验证码</el-button>
                </div>
              </el-form-item>
              <el-form-item label="密  码">
                <el-input v-model="password" type="password" show-password placeholder="请输入8位以上且同时包含数字、字母"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="danger" @click="goRegister()" class="loginBtn">注册</el-button>
            <div class="itemBottom">
              <p>已经注册 <router-link to="/login">现在去登录</router-link></p>
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
      activeName: 'first',
      nick_name: '',
      member_name: '',
      password: '',
      mobile_verifycode: '',
      loginPwd: false,
      times: ''
    }
  },
  methods: {
    change () {
      if (this.member_name === '') {
        this.loginPwd = false
      }
    },
    // 判断手机号 是否已绑定
    checkPhone () {
      if (this.member_name === '') {
        this.$message({
          showClose: true,
          message: '请输入手机号',
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
      let param = {
        mobile: this.member_name
      }
      this.$api.isBind(param).then(res => {
        if (res.ErrorCode === 0) {
          if (res.data[0].is_bind !== 0) {
            this.$message({
              showClose: true,
              message: '该手机号已绑定',
              type: 'warning'
            })
            this.loginPwd = true
          }
        }
      })
    },
    // 获取手机验证码之前 判断手机号是否绑定
    getCode () {
      setTimeout(() => {
        // console.log(this.loginPwd)
        if (this.loginPwd) {
          return
        }
        this.getCodeNum()
      }, 300)
    },
    // 获取手机验证码
    getCodeNum () {
      if (this.member_name === '') {
        this.$message({
          showClose: true,
          message: '请输入手机号',
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
      let param = {
        member_name: this.member_name,
        type: 'register'
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
    // 注册
    goRegister () {
      if (this.nick_name === '') {
        this.$message({
          showClose: true,
          message: '请输入昵称',
          type: 'warning'
        })
        return
      }
      if (this.member_name === '') {
        this.$message({
          showClose: true,
          message: '请输入手机号',
          type: 'warning'
        })
        return
      }
      if (this.mobile_verifycode === '') {
        this.$message({
          showClose: true,
          message: '请输入验证码',
          type: 'warning'
        })
        return
      }
      if (this.password) {
        var m = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,30}$/
        if (!this.password.match(m)) {
          this.$message({
            showClose: true,
            message: '请输入8位以上密码，密码中必须同时包含数字、字母',
            type: 'warning'
          })
          return
        }
      } else {
        this.$message({
          showClose: true,
          message: '请输入密码',
          type: 'warning'
        })
        return
      }
      const encryptionPassword = this.password
      const encrypted = secret.Encrypt(encryptionPassword)
      let param = {
        nick_name: this.nick_name,
        member_name: this.member_name,
        password: encrypted,
        mobile_verifycode: this.mobile_verifycode,
        type: 'mobile'
      }
      this.$api.userRegister(param).then(res => {
        if (res.ErrorCode === 0) {
          this.$message({
            showClose: true,
            message: '注册成功',
            type: 'success'
          })
          this.$router.push({
            name: 'login',
            path: '/login'
          })
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
        }
      })
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
    height: 696px;
    .login-left{
      width: 310px;
      height: 696px;
      overflow: hidden;
      background-color: #000;
      img{
        width: 100%;
        height: 100%;
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
      .title{
        padding: 50px 0px 14px 0px;
        border-bottom: 1px solid #E3E3E3;
        font-size:24px;
        font-family:PingFangSC;
        font-weight:600;
        color:rgba(74,74,74,1);
        span{
          color:rgba(221,47,60,1);
          font-size: 14px;
        }
      }
      .itemBox{
        margin-top: 21px;
        .itemBottom{
          margin: 30px;
          color: #4A4A4A;
          font-size: 14px;
          a{
            font-size:14px;
            font-family:PingFangSC;
            font-weight:400;
            color:#DD2F3C;
          }
        }
      }
      /deep/{
        .el-form-item__label{
          font-size:18px;
          font-family:PingFangSC;
          font-weight:400;
          color:rgba(74,74,74,1);
        }
        .el-form-item{
          margin-bottom: 20px;
        }
        .el-input{
          height:50px;
          input{
            background:rgba(234,234,234,0.41);
            border-radius:6px;
            border: none;
          }
        }
        .codeBox{
          position: relative;
          input{
            padding-right: 100px;
          }
          .getCode{
            position: absolute;
            right: 10px;
            top: 12px;
            height: 15px;
            line-height: 15px;
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
        .forget{
          color: #9B9B9B;
          font-size:14px;
          width: 100%;
          text-align: right;
          margin-bottom: 22px;
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
        }
      }
    }
  }
  .bottom{
    font-size:14px;
    font-family:PingFangSC;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    // margin-top: 144px;
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 99999;
  }
}
</style>
