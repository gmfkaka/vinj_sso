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
          <p class="title">忘记密码</p>
          <div class="itemBox">
            <el-form label-width="90px">
              <el-form-item label="手机号">
                <el-input v-model="member_name" @change="forgetPsw()" status-icon></el-input>
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
                <el-input v-model="password" type="password" show-password></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="checkPassword" type="password" show-password></el-input>
              </el-form-item>
            </el-form>
            <el-button type="danger" @click="resetPassword()" class="loginBtn">确认</el-button>
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
      checkPassword: '',
      mobile_verifycode: '',
      member_id: '',
      times: '',
      loginPwd: false
    }
  },
  methods: {
    // 获取手机验证码
    getCode () {
      let param = {
        member_name: this.member_name,
        type: 'forget'
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
        member_name: this.member_name
      }
      this.$api.forgotPwd(param).then(res => {
        if (res.ErrorCode === 0) {
          this.member_id = res.data[0].member_id
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
        }
      })
    },
    // 重置密码
    resetPassword () {
      // 判断手机号是否存在且合法
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
      // 判断验证码是否存在
      if (this.mobile_verifycode === '') {
        this.$message({
          showClose: true,
          message: '请输入验证码',
          type: 'warning'
        })
        return
      }
      // 判断两次密码是否一致
      if (this.password !== this.checkPassword) {
        this.$message({
          showClose: true,
          message: '两次输入密码不一致',
          type: 'warning'
        })
        return
      }
      const encryptionPassword = this.password
      const encrypted = secret.Encrypt(encryptionPassword)
      let param = {
        member_name: this.member_name,
        member_id: this.member_id,
        password: encrypted,
        verifycode: this.mobile_verifycode
      }
      this.$api.resetPwd(param).then(res => {
        if (res.ErrorCode === 0) {
          this.$message({
            showClose: true,
            message: '密码重置成功',
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
  margin: 0 auto;
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
    margin-top: 144px;
  }
}
</style>
