<template>
  <div class='personal'>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="baseInfo leftIcon">
        <div class="title">
          <i class="icon"></i>基本信息
        </div>
        <div class="inputList">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="userInfo.nick_name" placeholder="请输入用户名" disabled></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
            <!-- <el-radio-group v-else v-model = "userInfo.extension.gender.value">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group> -->
          </el-form-item>
          <el-form-item label="所在地" prop="province">
            <div class="flexBox flexBewtween location">
              <el-select v-model="ruleForm.province" placeholder="请选择省">
                <el-option
                v-for="proItem in provinceList"
                :label="String(proItem.name)"
                :key="Number(proItem.id)"
                :value="String(proItem.name)"
                @click.native = 'getCity(proItem.id)'></el-option>
              </el-select>
              <el-select v-model="ruleForm.city" placeholder="请选择市" style="margin-left:10px;">
                <el-option
                v-for='cityItem in cityList'
                :key="Number(cityItem.id)"
                :label="String(cityItem.name)"
                :value="String(cityItem.name)"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <!-- <el-form-item label="职业" prop="worker">
            <el-select v-model="ruleForm.worker" placeholder="请选择职业">
              <el-option label="专业摄影师" value="shanghai"></el-option>
              <el-option label="摄影师" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="简介" prop="desc">
            <!-- <el-input v-if="userInfo.brief" v-model="userInfo.brief" type="textarea"></el-input> -->
            <el-input type="textarea" v-model="ruleForm.desc" placeholder="请输入内容"></el-input>
          </el-form-item>
        </div>
        <div class="userImg">
          <div class="imgBox flexBox flexMiddle">
            <img v-if="urlavatar" :src="urlavatar" alt="">
            <img v-else-if="userInfo.avatar" :src="userInfo.avatar" alt="">
            <img v-else src="../../assets/image/userInfo/avatar.png" alt="">
          </div>
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="false"
            :on-change="avatorUpload"
            :show-file-list = 'false'
            accept="image/jpeg,image/jpg,image/png">
            <el-button size="small" type="danger">换头像</el-button>
          </el-upload>
        </div>
      </div>
      <!-- <div class="education leftIcon">
        <div class="title">
            <i class="icon"></i>教育背景
        </div>
        <div class="inputList">
          <el-form-item label="学校" prop="schools">
            <el-input v-model="ruleForm.schools" placeholder="请输入学校"></el-input>
          </el-form-item>
        </div>
      </div> -->
      <div class="contactInfo leftIcon">
        <div class="title">
          <i class="icon"></i>联系方式
        </div>
        <div class="inputList">
          <el-form-item label="QQ" prop="qq">
           <div class="flexBox flexBewtween">
              <el-input v-model="ruleForm.qq" placeholder="请输入您的QQ"></el-input>
              <!-- <el-checkbox label="保密"></el-checkbox> -->
           </div>
          </el-form-item>
          <el-form-item label="微信" prop="wechat">
           <div class="flexBox flexBewtween">
              <el-input v-model="ruleForm.wechat" placeholder="请输入您的微信"></el-input>
              <!-- <el-checkbox label="保密"></el-checkbox> -->
           </div>
          </el-form-item>
          <!-- <el-form-item label="邮箱" prop="email">
           <div class="flexBox flexBewtween">
              <el-input v-model="ruleForm.schools" placeholder="请输入您的邮箱"></el-input>
              <el-checkbox label="保密"></el-checkbox>
           </div>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
           <div class="flexBox flexBewtween">
              <el-input v-model="ruleForm.schools" placeholder="请输入您的手机"></el-input>
              <el-checkbox label="保密"></el-checkbox>
           </div>
          </el-form-item> -->
          <el-form-item style='text-align: center'>
            <el-button type="danger" @click="submitForm()" style="width: 120px;height: 40px;background:rgba(221,47,60,1);">保存</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  data () {
    return {
      ruleForm: {
        name: '',
        worker: '',
        delivery: false,
        type: [],
        sex: '',
        province: '江苏',
        city: '南京',
        desc: '',
        location: '',
        schools: '',
        qq: '',
        wechat: '',
        urlavatar: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        worker: [
          { required: true, message: '请选择职业', trigger: 'change' }
        ],
        sex: [
          { required: false, message: '请选择性别', trigger: 'change' }
        ],
        desc: [
          { required: false, message: '请填写活动形式', trigger: 'blur' }
        ],
        province: [
          { required: false, message: '请选择所在省', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择所在市', trigger: 'change' }
        ],
        schools: [
          { required: false, message: '请选择学校', trigger: 'change' }
        ]
      },
      access_token: this.$util.getCookie('accessToken'),
      fileList: [],
      provinceList: [],
      cityList: [],
      urlavatar: '',
      userInfo: {}
    }
  },
  // props: ['userInfo'],
  methods: {
    avatorUpload (file, fileList) {
      let avatarData = new FormData()
      this.ruleForm.urlavatar = file.raw
      this.urlavatar = URL.createObjectURL(file.raw)
      avatarData.append('avatar', this.ruleForm.urlavatar)
      avatarData.append('access_token', this.access_token)
      this.$emit('avatorUpload', avatarData)
    },
    handleChange () {},
    // 获取所在地 获取省
    getLocation () {
      let param = {
        access_token: this.access_token,
        fid: 0
      }
      this.$api.location(param).then(res => {
        if (res.ErrorCode === 0) {
          this.provinceList = res.data
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
    // 获取城市
    getCity (id) {
      this.ruleForm.city = ''
      let param = {
        access_token: this.access_token,
        type: 'city',
        fid: id
      }
      this.$api.location(param).then(res => {
        if (res.ErrorCode === 0) {
          this.cityList = res.data
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
        }
      })
    },
    submitForm () {
      this.$emit('submitForm', this.ruleForm)
    },
    // 获取用户信息
    getUserInfo () {
      let param = {
        access_token: this.$util.getCookie('accessToken')
      }
      this.$api.userInfo(param).then(res => {
        if (res.ErrorCode === 0) {
          this.getLocation()
          this.userInfo = res.data
          // console.log(this.userInfo)
          this.ruleForm.sex = this.userInfo.extension.gender ? this.userInfo.extension.gender.value : 3
          this.ruleForm.province = this.userInfo.extension.prov.value
          this.ruleForm.city = this.userInfo.extension.city.value
          this.ruleForm.desc = this.userInfo.brief
          this.ruleForm.qq = this.userInfo.extension.qqnum.value
          this.ruleForm.wechat = this.userInfo.extension.wechat.value
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
    }
  },
  mounted () {
    this.getUserInfo()
    // console.log(222)
  }
}
</script>
<style lang='scss' scoped>
.personal{
  width: 960px;
  background-color: #fff;
  margin-bottom: 42px;
  .leftIcon{
    padding: 50px;
    padding-left: 35px;
    .icon{
      display: inline-block;
      width:5px;
      height:15px;
      background:rgba(221,47,60,1);
      margin-right: 10px;
    }
    font-size:16px;
    font-family:PingFangSC;
    font-weight:500;
    color:rgba(51,51,51,1);
    border-bottom: 1px solid #EEEEEE;
    &:last-child{
      border: none;
    }
  }
  .inputList{
    margin-top: 30px;
    padding-left: 50px;
    max-width: 490px;
    /deep/{
      input{
        background:rgba(248,248,248,1);
        height: 40px;
        width: 280px;
      }
      .el-textarea{
        .el-textarea__inner{
          background:rgba(248,248,248,1);
          width: 450px;
          height: 110px;
        }
      }
      .location{
        input{
          width: 135px;
        }
      }
      .el-checkbox{
        margin-left: 20px;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label{
        color: unset;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner{
        background:rgba(226,49,61,1);
        border-color: rgba(226,49,61,1);
      }
      .el-checkbox__inner:hover,.el-checkbox__input:hover{
        border-color: rgba(226,49,61,1);
      }
    }
  }
  .baseInfo{
    position: relative;
  }
  .userImg{
    position: absolute;
    right: 100px;
    top: 78px;
    text-align: center;
    .imgBox{
      width: 140px;
      height: 140px;
      border-radius: 50%;
      background: #000;
      overflow: hidden;
      margin-bottom: 15px;
      img{
        width: 100%;
        max-height: 100%
      }
    }
    /deep/{
      .upload-demo{
        margin-top: 20px;
        text-align: center;
        font-size:16px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:22px;
        .el-button--danger{
          background:rgba(221,47,60,1);
          border-color: rgba(221,47,60,1);
        }
      }
    }
  }
}
</style>
