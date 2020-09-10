<template>
  <div>
    <header-view :userInfo="userInfo"></header-view>
    <div class="signing">
      <div class="gary"></div>
      <div class="signingBox content">
        <el-steps :active="stepTip" align-center>
          <el-step title="阅读条约"></el-step>
          <el-step title="提交申请"></el-step>
          <el-step title="等待审核"></el-step>
          <!-- <el-step title="完善信息"></el-step> -->
        </el-steps>
       <div v-if="showFlag">
          <!-- 阅读条款 -->
        <div class="readSign" v-if="stepTip == 0">
          <div class="contentBox">
            <h3>
              南京日报社视觉中心
              <br>暨“视觉南京”签约摄影师协议
            </h3>
            <p>甲方：南京日报社视觉中心</p>
            <p>乙方(签约摄影师)：</p>
            <p>
              甲方系南京日报社直属部门，是南京日报社深入贯彻落实中央、省委精神，加快推进媒体融合发展而采取的一个重大举措，也是南京报业传媒集团全力打造的新媒体平台。负责图片采集、编辑、推广使用，负责向南京日报、金陵晚报、东方卫报等集团所属各媒体提供图像，下设“视觉南京”网站(www.vinj.cn)，通过互联网向社会各界包括新闻、出版、广告公司等机构和个人提供图片资料销售服务。该中心双方经协商，乙方成为甲方签约摄影师，现就双方权利义务达成如下协议：
            </p>
            <p class="first">一、合作概要</p>
            <p>乙方负责向甲方提供其拥有著作权的摄影作品(含相关文字)，并授权甲方在本协议规定的范围内进行上述图片的使用和销售，甲方向乙方提供包括图片编辑、上网服务、信息整合、销售推广等综合性新闻业务及商业代理服务，为乙方提供业务培训、技术交流等平台。</p>
            <p class="first">二、甲方义务</p>
            <p>1、尽力推广乙方的授权图片;</p>
            <p>2、尽力使乙方作品得到使用同时进行合理定价及收费;</p>
            <p>3、按协议约定支付乙方的作品权利许可所得。</p>
            <p class="first">三、乙方义务</p>
            <p>1、保证授权的图片及相关文字信息为其专有著作权，如果授权图片为与他人共享著作权的，必须明确提示，并保证共享著作权人不再向甲方提出任何权利主张;</p>
            <p>2、保证授权的图片和文字不违背中华人民共和国的相关法律、法规，不涉及任何侵权事宜，不对任何民事主体造成诽谤、侵害隐私权，不触犯任何第三方的版权、商标权、肖像权;</p>
            <p>3、乙方因著作权不合法引起的所有法律责任与甲方无关。</p>
            <p class="first">四、乙方委托代理权限许可的范围</p>
            <p>1、授予甲方筛选和编辑权。甲方有权对作品进行筛选、组合，并选择其认为适合的图片进行编辑，并将其录入图片库;</p>
            <p>2、甲方可对作品的尺寸、构图、文字或结构进行调整，并在作品上增加“视觉南京”(www.vinj. cn)的水印或其他不破坏作品主题的内容;</p>
            <p>3、授予作品定价权。授权甲方对作品按照市场需求进行定价;</p>
            <p>4、乙方授权甲方在宣传、社会公益活动时无偿使用的权利;</p>
            <p>5、授予不一定署名的权利。乙方同意提供给甲方的图片，在网页展示、报刊采用、客户使用时不一定有署名。</p>
            <p class="first">五、乙方的收益权利</p>
            <p>1、乙方授权的图片，在甲方所属媒体上使用，由相关媒体按各自标准直接向乙方支付稿费。甲方不收取中间费用;</p>
            <p>2、非甲方所属媒体从“视觉南京”(www.vinj.cn)下载使用乙方图片的，乙方获得每次销售税后金额的60%，另外40%属于甲方所有;</p>
            <p>3、结算方式：图片用户回款后两个月内结算，并向乙方提供详细账单。</p>
            <p class="first">六、合作双方的保密义务</p>
            <p>乙方登录“视觉南京”(www.vinj.cn)注册个人用户名并设立密码，用户名为甲方和乙方所共知，但密码为乙方个人保密拥有，因此乙方须保管好自己的用户名和密码，如因乙方自己的原因造成用户名和密码泄漏，对因此造成的相关损失应由签约摄影师自己负责。乙方如果发现自己的用户名和密码泄漏或者发现任何非法使用其用户名和密码的情况，有义务及时通知甲方，甲方在接到通知后应当及时采取补救措施。</p>
            <p class="first">七、乙方数字图片的网络储存期限</p>
            <p>乙方的图片数据将长期储存于“视觉南京”网站的网络服务器，乙方可以通过网络浏览自己的图片。乙方图片数据的网络储存期限由甲方决定。部分图片经甲方判断已经不具备销售的可能性，甲方将在网络服务器上进行删除，无需告知乙方。</p>
            <p class="first">八、其他事项</p>
            <p>1、本协议自签署之日起生效，有效期5年。除非双方提前终止本协议，期满之后，若双方没有异议，本协议将自然延续5年;</p>
            <p>2、若双方协商同意，可以提前终止本协议;</p>
            <p>3、本协议的双方当事人如因执行本协议发生争执，均可协商解决，如协商无法解决，任何一方有权向南京市有管辖权的人民法院提起诉讼;</p>
            <p>4、 本协议一式两份，由甲、乙双方各持一份。</p>
          </div>
          <el-button type="danger" style="margin: 40px 0;" @click="stepTip=1">申请签约</el-button>
        </div>
        <!-- 提交申请 -->
        <div class="infoForm" v-if="stepTip == 1">
          <div class="infoBox">
            <p class="title">签约摄影师申请</p>
            <p class="tips">填写一下表单，工作人员审核通过后，即可成为视觉南京签约摄影师。</p>
            <el-form
              label-position="top"
              label-width="80px"
              :model="formLabelAlign"
              :rules="rules"
              ref="ruleForm"
            >
              <el-form-item label="真实姓名：" prop="userName">
                <el-input v-model="formLabelAlign.userName"></el-input>
              </el-form-item>
              <el-form-item label="身份证号：" prop="idCard">
                <el-input v-model="formLabelAlign.idCard"></el-input>
              </el-form-item>
              <el-form-item label="工作单位：" prop="location">
                <el-input v-model="formLabelAlign.location"></el-input>
              </el-form-item>
              <el-form-item label="证件照片：" required>
                <!-- <el-radio-group v-model="formLabelAlign.type">
                  <el-radio label="二代身份证"></el-radio>
                  <el-radio label="临时身份证"></el-radio>
                </el-radio-group>-->
                <div class="idCard flexBox flexLeft">
                  <el-upload
                    prop="urlRenxiang"
                    class="avatar-uploader"
                    action="#"
                    :auto-upload="false"
                    :on-change="urlRenxiangUpload"
                    :show-file-list="false"
                    accept="image/jpeg, image/jpg, image/png"
                  >
                    <img
                      v-if="formLabelAlign.urlRenxiang"
                      :src="formLabelAlign.urlRenxiang"
                      class="avatar"
                    >
                    <div v-else class="idCardBox">
                      <i class="idCardRenxiang"></i>
                      <p>请上传身份证人像面</p>
                    </div>
                  </el-upload>
                  <el-upload
                    prop="urlGuohuiUpload"
                    class="avatar-uploader guohui"
                    action="#"
                    :auto-upload="false"
                    :on-change="urlGuohuiUpload"
                    :show-file-list="false"
                    accept="image/jpeg, image/jpg, image/png"
                  >
                    <img
                      v-if="formLabelAlign.urlGuohui"
                      :src="formLabelAlign.urlGuohui"
                      class="avatar"
                    >
                    <div class="idCardBox">
                      <i class="idCardGuohui"></i>
                      <p>请上传身份证人像面</p>
                    </div>
                  </el-upload>
                </div>
                <p class="idCardTips">请上传本人身份证件，确保图片清晰，四角完整</p>
              </el-form-item>
              <el-form-item label="代表作品：" required>
                <el-upload
                  prop="masterWork"
                  action="#"
                  class="avatar-uploader"
                  list-type="picture-card"
                  :on-change="masterWorkUpload"
                  :auto-upload="false"
                  multiple
                  :limit="10"
                  :on-remove="handleRemove"
                  :on-exceed="handleExceed"
                  :on-preview="handlePictureCardPreview"
                  :file-list="formLabelAlign.masterWork"
                >
                  <div class="idCardBox">
                    <i class="signingProduct"></i>
                    <p>添加代表作品，最多10张</p>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt>
                </el-dialog>
              </el-form-item>
            </el-form>
          </div>
          <el-button type="danger" style="margin: 40px 0;" @click="post('ruleForm')">提交</el-button>
        </div>
        <!-- 等待审核 -->
        <div class="waitCheck flexBox flexMiddel" v-if="stepTip == 3">
          <div class="checkBox">
            <div class="imgBox">
              <img src="../assets/image/signing/icon_qianyue_auditing.png" alt>
            </div>
            <p :class="{'checking': 1,'color-red': isVerify === 3 }">{{checkingText}}</p>
            <p :class="{'waiting': 1,'color-red': isVerify === 3}">{{waitingText}}</p>
          </div>
        </div>
       </div>
      </div>
      <div class="gary" style="height: 40px"></div>
    </div>
    <footer-view></footer-view>
  </div>
</template>
<script>
import headerView from '../components/header'
import footerView from '../components/footer'
export default {
  name: '',
  components: {
    headerView,
    footerView
  },
  data () {
    return {
      formLabelAlign: {
        userName: '',
        idCard: '',
        location: '',
        urlRenxiang: '',
        urlGuohui: '',
        masterWork: []
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      rules: {
        userName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          {
            pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            message: '请输入合法的身份证号',
            trigger: 'blur'
          }
        ],
        urlRenxiang: [
          { required: true, message: '请上传证件', trigger: 'change' }
        ],
        urlGuohuiUpload: [
          { required: true, message: '请上传证件', trigger: 'change' }
        ],
        location: [{ required: false, message: '请工作单位', trigger: 'blur' }],
        masterWork: [
          { required: true, message: '请上传代表作品', trigger: 'blur' }
        ]
      },
      stepTip: 0,
      urlRenxiang: {},
      urlGuohui: {},
      userInfo: {},
      checkingText: '正在审核',
      waitingText: '审核可能需要1-2天时间，请耐心等待',
      showFlag: false,
      setpFlag: 1,
      isVerify: ''
    }
  },
  methods: {
    // 获取用户信息
    getUserInfo () {
      let param = {
        access_token: this.$util.getCookie('accessToken')
      }
      this.$api.userInfo(param).then(res => {
        if (res.ErrorCode === 0) {
          this.userInfo = res.data
          this.isVerify = this.userInfo.is_verify
          //  签约状态 is_verify 0:未认证；1：已申请待审核；2：已审核；3：已打回；-1：删除
          if (this.isVerify === 1) {
            this.stepTip = 3
            this.checkingText = '正在审核'
            this.waitingText = '审核可能需要1-2天时间，请耐心等待'
          } else if (this.isVerify === 3 && this.setpFlag === 1) {
            this.stepTip = 3
            this.checkingText = '审核已打回'
            this.waitingText = '审核失败，3秒后重新签约'
            setTimeout(() => {
              this.stepTip = 0
              this.setpFlag = 0
            }, 3000)
          }
          this.showFlag = true
        } else if (res.ErrorCode === 1005) {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
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
    },
    urlRenxiangUpload (file, fileList) {
      this.urlRenxiang = file.raw
      this.formLabelAlign.urlRenxiang = URL.createObjectURL(file.raw)
    },
    urlGuohuiUpload (file, fileList) {
      this.urlGuohui = file.raw
      this.formLabelAlign.urlGuohui = URL.createObjectURL(file.raw)
    },
    masterWorkUpload (file, fileList) {
      fileList.forEach((item, index) => {
        this.formLabelAlign.masterWork[index] = item.raw
      })
    },
    // 超出10张图片 显示提示
    handleExceed (files, fileList) {
      this.$message.warning(
        `当前限制选择 10 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    // 预览图片
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 移除照片
    handleRemove (file, fileList) {
      console.log(file)
      fileList.forEach((item, index) => {
        this.formLabelAlign.masterWork[index] = item.raw
      })
    },
    post (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const param = new FormData()
          param.append('access_token', this.$util.getCookie('accessToken'))
          param.append('name', this.formLabelAlign.userName)
          param.append('workplace', this.formLabelAlign.location)
          param.append('ID', this.formLabelAlign.idCard)
          param.append('ID_back', this.urlGuohui)
          param.append('ID_front', this.urlRenxiang)
          this.formLabelAlign.masterWork.forEach((item, index) => {
            param.append(`master_work[${index}]`, item)
          })
          this.$api.signing(param).then(res => {
            if (res.ErrorCode === 0) {
              this.$message({
                showClose: true,
                message: '提交成功',
                type: 'success'
              })
              this.stepTip = 3
              this.isVerify = res.data.is_verify
              this.checkingText = '正在审核'
              this.waitingText = '审核可能需要1-2天时间，请耐心等待'
            } else {
              this.$message({
                showClose: true,
                message: res.ErrorText,
                type: 'error'
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted () {
    this.getUserInfo()
  }
}
</script>
<style lang='scss' scoped>
.content {
  width: 1200px;
  margin: 0 auto;
}
.signing {
  .gary {
    background: rgba(248, 248, 248, 1);
    height: 20px;
  }
  .color-red{
    color: #F56C6C !important;
  }
  background: rgba(248, 248, 248, 1);
  .signingBox {
    background-color: #fff;
    padding: 30px 50px;
    /deep/ {
      .el-step.is-horizontal .el-step__line {
        top: 25px;
      }
      .el-step__head {
        font-size: 18px;
        .el-step__icon.is-text {
          width: 48px;
          height: 48px;
        }
        &.is-finish {
          color: #dd2f3c;
          border-color: #dd2f3c;
          color: #fff;
          .el-step__icon.is-text {
            border-color: unset;
            font-size: 0;
            background: url(../assets/image/signing/icon_qianyue_finish.png)
              no-repeat center center;
          }
        }
        &.is-process {
          color: #dd2f3c;
          border-color: #dd2f3c;
          color: #fff;
          .el-step__icon.is-text {
            background: #dd2f3c;
          }
        }
        color: #808080;
        border-color: #808080;
        .el-step__icon.is-text {
          background: #fff;
        }
      }
      .el-step__main {
        color: #808080;
        .el-step__title {
          &.is-finish {
            color: #333;
          }
          &.is-process {
            color: #808080;
            font-weight: 400;
          }
        }
      }
    }
    .readSign {
      text-align: center;
      margin-top: 30px;
      background: rgba(255, 255, 255, 1);
      p {
        text-indent: 2em;
        text-align: left;
      }
      // step 1
      h3 {
        font-size: 20px;
        font-family: PingFang-SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
        letter-spacing: 1px;
        text-align: center;
        margin-bottom: 40px;
      }
      .contentBox {
        border: 1px solid rgba(151, 151, 151, 1);
        height: 920px;
        overflow: auto;
        padding: 40px;
        font-size: 16px;
        font-family: PingFang-SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 28px;
        letter-spacing: 1px;
        .first {
          margin: 25px 0 5px 0;
          font-weight: 500;
        }
      }
    }
    .infoForm {
      margin-top: 30px;
      text-align: center;
      .infoBox {
        text-align: left;
        height: 920px;
        background: rgba(255, 255, 255, 1);
        border: 1px solid rgba(151, 151, 151, 1);
        padding: 40px;
      }
      // overflow: auto;
      .title {
        font-size: 18px;
        font-family: PingFang-SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .tips {
        font-size: 14px;
        font-family: PingFang-SC;
        font-weight: 400;
        color: rgba(128, 128, 128, 1);
        margin-top: 10px;
      }
      /deep/ {
        .el-form {
          input {
            width: 288px;
            height: 40px;
          }
        }
        .el-form--label-top .el-form-item__label {
          padding: 0;
        }
        .idCardTips {
          font-size: 14px;
          font-family: PingFangSC;
          font-weight: 400;
          color: rgba(221, 47, 60, 1);
          line-height: 40px;
        }
        .el-upload-list__item {
          height: 120px;
        }
      }
    }
    .waitCheck {
      margin-top: 30px;
      height: 920px;
      position: relative;
      .checkBox {
        width: 100%;
        height: 300px;
        text-align: center;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        .imgBox {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -58px;
          width: 48px;
          height: 48px;
          overflow: hidden;
          img {
            width: 100%;
            max-height: 100%;
          }
        }
        .checking {
          font-size: 20px;
          font-family: PingFang-SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          padding: 20px 0 10px 0;
        }
        .waiting {
          font-size: 14px;
          font-family: PingFang-SC;
          font-weight: 400;
          color: rgba(128, 128, 128, 1);
        }
      }
    }
  }
}
/deep/ {
  .el-loading-mask {
    width: 16px;
    height: 120px;
  }
  .el-form-item__content {
    line-height: 0;
  }
  .avatar-uploader {
    &.guohui{
      flex: 1
    }
    .el-upload {
    border: 1px dashed #d9d9d9;
    margin-right: 10px;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 160px;
    height: 120px;
    line-height: unset;
    .idCardBox {
      margin-top: 30px;
      line-height: 20px;
      p {
        font-size: 12px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
      }
    }
    .avatar {
      width: 160px;
      height: 120px;
      display: block;
    }
    }
  }
}
</style>
