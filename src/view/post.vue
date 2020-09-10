<template>
  <div>
    <header-view :userInfo = userInfo></header-view>
    <div v-if="activeId" class="activeBox">
      <el-carousel height="550px">
        <el-carousel-item v-for="(item, index) in activityDetails.publicity_pictures_url" :key="index">
          <!-- <h3 class="small">{{ item }}</h3> -->
          <div class="imgBox flexBox flexMiddle">
            <img :src="item" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="activeBottom">
        <div class="activeBrief flexBox flexLeft flexMiddle">
          <div class="leftline"></div>
          <div class="title">活动投稿</div>
          <div class="leftline"></div>
        </div>
        <div class="brief content">{{activityDetails.title}}</div>
      </div>
    </div>
    <user-info :userInfo = userInfo v-else></user-info>
    <div class="post">
    <!-- 图集信息 -->
    <div class="photosInfo content">
      <p class="title">图集信息</p>
      <div class="photosBox flexBox flexLeft">
        <div class="left">
          <!-- v-loading="coverLoading" -->
          <div class="imgBox flexBox flexMiddle"
            v-if="coverImg"
            :src='coverImg'
            element-loading-spinner="el-icon-loading"
            element-loading-text="图片上传中..."
            element-loading-background="rgba(0, 0, 0, 0.6)">
            <img :src='coverImg' alt="">
            <el-progress class="flexBox flexAlign" :percentage="percentage" v-if="coverLoading"></el-progress>
          </div>
          <div class="imgBox flexBox flexMiddle" v-else>
            <img src='../assets/image/logo@3x.png' alt="">
          </div>
          <el-upload
            class="avatar-uploader"
            action="#"
            :auto-upload="false"
            :show-file-list="false"
            :on-change="uploadCoverImg"
            accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PBG,.GIF">
            <p>+ 上传封面图</p>
          </el-upload>
          <!-- <el-upload
            class="avatar-uploader"
            action="http://sso.vinj.cn/api/gallery/upload"
            list-type="picture-card">
            <p>+ 上传封面图</p>
          </el-upload> -->
        </div>
        <div class="formBox">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="brief">
              <el-input type="textarea" v-model="ruleForm.brief" :rows="4" style="width: 400px"></el-input>
            </el-form-item>
            <el-collapse-transition>
              <div v-show="show3">
                <el-form-item label="地区" prop="province">
                  <el-radio-group v-model="ruleForm.radio">
                    <el-radio :label="1">国内</el-radio>
                    <el-radio :label="2">国外</el-radio>
                  </el-radio-group>
                  <!-- 如果选择国内 则显示 地区选择 -->
                  <div class="flexBox flexBewtween location" v-if="ruleForm.radio == 1">
                    <el-select v-model="ruleForm.province" placeholder="请选择省" style="width: 125px;">
                      <el-option
                      v-for="proItem in provinceList"
                      :label="String(proItem.name)"
                      :key="Number(proItem.id)"
                      :value="String(proItem.name)"
                      @click.native = 'getCity(proItem.id)'></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.city" placeholder="请选择市" style=" width: 125px;margin-left:10px;">
                      <el-option
                      v-for='cityItem in cityList'
                      :key="Number(cityItem.id)"
                      :label="String(cityItem.name)"
                      :value="String(cityItem.name)"
                      @click.native = 'getArea(cityItem.id)'></el-option>
                    </el-select>
                    <el-select v-model="ruleForm.area" placeholder="请选择区" style=" width: 125px;margin-left:10px;">
                      <el-option
                      v-for='areaItem in areaList'
                      :key="Number(areaItem.id)"
                      :label="String(areaItem.name)"
                      :value="String(areaItem.name)"
                      @click.native = 'getAreaId(areaItem.id)'></el-option>
                    </el-select>
                  </div>
                </el-form-item>
                <el-form-item label="标签" prop="label">
                  <!-- <el-input v-model="ruleForm.label" placeholder="空格或回车添加标签"></el-input> -->
                  <!-- <div class="labelBox" v-if="showLabel">
                    <div class="nodata"><i class="el-icon-warning"></i> 抱歉！暂无可推荐标签</div>
                    <div class="labelList flexBox flexLeft"
                      v-loading="loading"
                      element-loading-text="智能识别标签..."
                      element-loading-spinner="el-icon-loading"
                      :data="tableData">
                      <li v-for="(item, index) in tableData" :key="index">{{item.name}}</li>
                    </div>
                  </div> -->
                  <!-- <el-button type="text" style="color:#A6A6A6;margin-left: 180px" @click="showLabel = false" v-if="showLabel== true">收起标签</el-button>
                  <el-button type="text" style="color:#A6A6A6;margin-left: 18px" @click="showLabel = true" v-if="showLabel== false">展开标签</el-button> -->
                  <div class="groupList flexBox flexLeft flexWrap" style="width: 400px">
                    <!-- <ul class="flexBox flexLeft flexWrap"> -->
                      <li v-for="(item, index) in labelList" :key="index">
                        <span>{{item}}</span>
                        <i class="el-icon-error deletLabel" @click="deletLabel(index)"></i>
                      </li>
                    <!-- </ul> -->
                    <input type="text" class="labelInput" ref="labelInput" v-if="addFlag" @keyup.enter="loseFocus(labelValue)" @blur = "loseFocus(labelValue)" v-model="labelValue">
                    <div class="add" @click="addLabel" v-if="!addFlag"> + </div>
                  </div>
                </el-form-item>
                <el-form-item label="拍摄时间" prop="datetime">
                  <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.datetime" value-format = 'yyyy-MM-dd HH:mm:ss' style="width: 400px;"></el-date-picker>
                </el-form-item>
                  </div>
                </el-collapse-transition>
                <el-form-item>
                  <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button> -->
                  <el-button type="text" style="color:rgba(132,132,132,1);margin-left: 180px;font-size: 12px" v-if="show3" @click="show3 = false">收起 <i class="el-icon-arrow-up"></i> </el-button>
                  <el-button type="text" style="color:rgba(132,132,132,1);margin-left: 180px;font-size: 12px" v-else @click="show3 = true">更多设置 <i class="el-icon-arrow-down"></i> </el-button>
                </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="gray"></div>
    <!-- 图片信息 -->
    <div class="photosInfo content">
      <p class="title">图片信息 <span style="color:rgba(166,166,166,1);font-size:14px;font-weight: 400">拖动可排序</span></p>
      <draggable tag="div" class="container" v-if="fileList" v-model="fileList"  :options="{handle:'.drag-icon'}">
        <div class="photosBox photo flexBox flexLeft" v-for="(item, index) in fileList" :key="item.url">
          <div class="left drag-icon">
            <div class="imgBox flexBox flexMiddle"
              element-loading-spinner="el-icon-loading"
              element-loading-text="图片上传中..."
              element-loading-background="rgba(0, 0, 0, 0.6)">
              <img :src= 'item.url' alt="">
              <p @click="setCover(index)">设为封面</p>
              <i class="el-icon-error delete" @click="deletImg(index)"></i>
              <el-progress class="flexBox flexAlign" :percentage="item.percentage" v-if="item.isLoading"></el-progress>
            </div>
          </div>
          <div class="formBox">
            <el-form label-width="100px" class="demo-ruleForm">
              <el-form-item label="描述" >
                <el-input type="textarea" v-model="item.brief" :rows="5" style=" width:600px"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </draggable>
      <!-- 发稿 图标 -->
      <div class="photosBox photo flexBox flexLeft" style="border: none;">
        <div class="left">
          <div class="imgBox flexBox flexMiddle">
              <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
              <div class="avatar flexBox flexMiddle">
                <i class="addIcon" @click="selectImg"></i>
                <input type="file" class="uploaderImgs" ref="uploaderImgs" multiple style="display: none" @change="uploadImgs" accept=".jpg,.jpeg,.png,.gif,.JPG,.JPEG,.PBG,.GIF">
              </div>
            <!-- <input type="file" class="uploaderImgs" @change="uploadImgs" ref="uploaderImgs" multiple style="opcity: 0"> -->
          </div>
        </div>
      </div>
      <div class="bottom flexBox flexCenter">
        <!-- <el-button size='small' style="color:#DD2F3C;border-color: #DD2F3C">取消</el-button> -->
        <!-- <el-button size='small' style="background:#DD2F3C;color: #fff;margin-left:20px">提审</el-button> -->
        <el-button size='middle' style="background:#fff;color: #DD2F3C;width:200px" @click="cancel">取消</el-button>
        <el-button size='middle' style="background:#DD2F3C;color: #fff;width:200px" @click="postPhoto('-5')" v-if="submitBtn">保存</el-button>
        <el-button size='middle' style="background:#e0777f;color: #fff;width:200px" v-else>保存</el-button>
        <el-button size='middle' style="background:#fff;color: #DD2F3C;width:200px" @click="postPhoto('1')">保存并提审</el-button>
      </div>
    </div>
    </div>
    <footer-view></footer-view>
  </div>
</template>
<script>
import headerView from '../components/header'
import footerView from '../components/footer'
import userInfo from '../components/userInfo'
import draggable from 'vuedraggable'
import axios from 'axios'
export default {
  name: '',
  components: {
    headerView,
    footerView,
    userInfo,
    draggable
  },
  data () {
    return {
      submitBtn: true,
      coverLoading: false,
      fileList: [],
      dragging: null,
      showLabel: true,
      loading: false,
      show3: true,
      imageUrl: '',
      ruleForm: {
        title: '',
        brief: '',
        datetime: '',
        province: '',
        pro_id: '',
        city: '',
        city_id: '',
        area: '',
        area_id: '',
        coverImg: [],
        photoList: [],
        radio: 1,
        labelString: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        brief: [
          { required: true, message: '请输入描述', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      },
      focusState: false,
      addFlag: false,
      labelValue: '',
      labelList: [],
      access_token: this.$util.getCookie('accessToken'),
      userInfo: {},
      picDetailInfo: {},
      deleteIdsArr: [],
      activeId: this.GetQueryString('id'),
      coverImg: '',
      provinceList: {},
      cityList: {},
      areaList: {},
      activityDetails: {},
      percentage: 0,
      isCover: false
    }
  },
  methods: {
    genUniqHash () {
      return Math.floor(Date.now() / 1000) + Math.random().toString().slice(2, 8)
    },
    getPicDetail () {
      let param = {
        id: this.$route.query.worksId,
        access_token: this.access_token
      }
      this.$api.detailPicWorks(param).then(res => {
        this.picDetailInfo = res.data
        this.ruleForm.title = this.picDetailInfo.cover.title
        this.ruleForm.brief = this.picDetailInfo.cover.brief
        this.ruleForm.datetime = this.picDetailInfo.cover.shoot_time
        this.ruleForm.radio = this.picDetailInfo.cover.china
        this.labelList = this.picDetailInfo.cover.keywords
        if (res.data.cover.area) {
          this.picDetailInfo.cover.area = JSON.parse(res.data.cover.area)
        }
        this.ruleForm.province = this.picDetailInfo.cover.area.pro_name
        this.ruleForm.pro_id = this.picDetailInfo.cover.area.pro_id
        this.ruleForm.city = this.picDetailInfo.cover.area.city_name
        this.ruleForm.city_id = this.picDetailInfo.cover.area.city_id
        this.ruleForm.area = this.picDetailInfo.cover.area.area_name
        this.ruleForm.area_id = this.picDetailInfo.cover.area.area_id
        // 封面
        this.coverImg = this.picDetailInfo.cover.cover_keys[0].origin_url
        const urlData = {
          origin_url: this.picDetailInfo.cover.cover_keys[0].origin_url,
          cut_url: this.picDetailInfo.cover.cover_keys[0].cut_url,
          origin_cover: this.picDetailInfo.cover.cover_keys[0].origin_cover,
          cut_cover: this.picDetailInfo.cover.cover_keys[0].cut_cover,
          chosed: true
        }
        this.ruleForm.coverImg[0] = urlData
        // photo
        // this.ruleForm.photoList = this.picDetailInfo.photo
        if (this.picDetailInfo.photo && this.picDetailInfo.photo.length) {
          this.picDetailInfo.photo.forEach((v) => {
            this.ruleForm.photoList.push({
              photo_url: v.photo_url,
              photo_key: v.photo_key,
              material_id: v.material_id,
              photo_name: v.photo_name,
              id: v.id,
              order_id: v.order_id,
              brief: v.brief
            })
            this.fileList.push({
              url: v.photo_url,
              // isLoading: true,
              brief: v.brief,
              // progress: 100,
              signUnique: this.genUniqHash()
            })
          })
        }
      })
    },
    // 获取用户信息
    getUserInfo () {
      let param = {
        access_token: this.access_token
      }
      this.$api.userInfo(param).then(res => {
        if (res.ErrorCode === 0) {
          this.userInfo = res.data
          this.getWorkData()
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
    // 获取用户信息的统计数
    getWorkData () {
      let param = {
        access_token: this.access_token
      }
      this.$api.worksDatas(param).then(res => {
        if (res.ErrorCode === 0) {
          this.$set(this.userInfo, 'clicks', res.data.clicks)
          this.$set(this.userInfo, 'collects', res.data.collects)
          this.$set(this.userInfo, 'downloads', res.data.downloads)
          this.$set(this.userInfo, 'works', res.data.works)
        }
      })
    },
    selectImg () {
      this.$refs.uploaderImgs.click()
    },
    // 添加标签
    addLabel () {
      this.addFlag = true
      this.$nextTick(() => {
        this.$refs.labelInput.focus()
      })
    },
    // 标签失去焦点
    loseFocus (value) {
      console.log(value)
      if (value.length > 10) {
        this.$message({
          showClose: true,
          message: '标签不能超过10个字',
          type: 'warning'
        })
        return
      }
      this.addFlag = false
      if (value !== '') {
        this.labelList.push(value)
      }
      // this.ruleForm.labelString = this.labelList.join(',')
      // console.log(this.labelList.join(','))
      this.labelValue = ''
    },
    // 删除标签
    deletLabel (index) {
      this.labelList.splice(index, 1)
    },
    // 获取urlname
    GetQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let r = window.location.search.substr(1).match(reg)
      if (r != null) return unescape(r[2])
      return null
    },
    // 上传图集
    uploadImgs () {
      let imgList = this.$refs.uploaderImgs.files
      let fileListLength = this.fileList.length
      for (let i = 0; i < imgList.length; i++) {
        this.fileList.push({
          file: imgList[i],
          url: URL.createObjectURL(imgList[i]),
          isLoading: true,
          brief: '',
          progress: 0,
          signUnique: this.genUniqHash()
        })
        const param = new FormData()
        param.append('access_token', this.access_token)
        param.append('file', imgList[i])
        param.append('signUnique', this.fileList[fileListLength + i].signUnique)
        // 使用v-loading --------isLoading
        // this.$api.uploadImg(param).then(res => {
        //   if (res.ErrorCode === 0) {
        //     this.$set(this.fileList[fileListLength + i], 'isLoading', false)
        //     this.ruleForm.photoList.push(res.data)
        //   }
        // })
        // 为了实现进度条 单独使用axios
        axios.post('http://sso.vinj.cn/api/gallery/upload?', param, {
          headers: {'Content-Type': 'multipart/form-data'},
          withCredentials: true,
          onUploadProgress: progressEvent => {
            var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
            // this.percentage = complete - 1
            this.$set(this.fileList[fileListLength + i], 'percentage', complete - 1)
          }
        }).then(res => {
          if (res.data.ErrorCode === 0) {
            for (let j = 0; j < this.fileList.length; j++) {
              if (this.fileList[j]['signUnique'] === res.data.data['signUnique']) {
                this.ruleForm.photoList[j] = res.data.data
                this.$set(this.fileList[j], 'isLoading', false)
                this.$set(this.fileList[j], 'percentage', 100)
                // this.$set(this.fileList[j], 'imgUrl', res.data.data.photo_url)
              }
            }
            // this.ruleForm.photoList.push(res.data.data)
          }
        })
      }
      // console.log(this.ruleForm.photoList)
      // 如果没有上传封面图 则把图集第一张给封面
      if (!this.isCover && !this.coverImg) {
        this.coverImg = this.fileList[0].url
      }
      this.$refs.uploaderImgs.value = null
    },
    // 上传封面图
    uploadCoverImg (file, fileList) {
      this.isCover = true
      // this.urlRenxiang = file.raw
      this.coverLoading = true
      this.coverImg = URL.createObjectURL(file.raw)
      const param = new FormData()
      param.append('access_token', this.access_token)
      param.append('file', file.raw)
      // this.$api.uploadImg(param).then(res => {
      // if (res.ErrorCode === 0) {
      //   this.coverLoading = false
      //   const urlData = {
      //     origin_url: res.data.photo_url,
      //     cut_url: res.data.photo_url,
      //     origin_cover: res.data.photo_key,
      //     cut_cover: res.data.photo_key,
      //     chosed: true
      //   }
      //   this.ruleForm.coverImg[0] = urlData
      // })
      // 实现进度条
      axios.post('http://sso.vinj.cn/api/gallery/upload?', param, {
        headers: {'Content-Type': 'multipart/form-data'},
        withCredentials: true,
        onUploadProgress: progressEvent => {
          var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
          this.percentage = complete - 1
        }
      }).then(res => {
        if (res.data.ErrorCode === 0) {
          this.coverLoading = false
          const urlData = {
            origin_url: res.data.data.photo_url,
            cut_url: res.data.data.photo_url,
            origin_cover: res.data.data.photo_key,
            cut_cover: res.data.data.photo_key,
            chosed: true
          }
          this.ruleForm.coverImg[0] = urlData
          this.percentage = 100
        }
        this.percentage = 0
      })
    },
    // 设置封面图
    setCover (index) {
      this.coverImg = this.fileList[index].url
      this.isCover = true
      this.coverLoading = false
      this.ruleForm.coverImg = this.ruleForm.photoList[index]
      const urlData = {
        origin_url: this.ruleForm.photoList[index].photo_url,
        cut_url: this.ruleForm.photoList[index].photo_url,
        origin_cover: this.ruleForm.photoList[index].photo_key,
        cut_cover: this.ruleForm.photoList[index].photo_key,
        chosed: true
      }
      this.ruleForm.coverImg[0] = urlData
      this.$message({
        showClose: true,
        message: '设置成功',
        type: 'success'
      })
    },
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
      this.ruleForm.pro_id = id
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
    // 获取区域 getArea
    getArea (id) {
      this.ruleForm.area = ''
      this.ruleForm.city_id = id
      let param = {
        access_token: this.access_token,
        type: 'area',
        fid: id
      }
      this.$api.location(param).then(res => {
        if (res.ErrorCode === 0) {
          this.areaList = res.data
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
        }
      })
    },
    // 获取areaId
    getAreaId (id) {
      this.ruleForm.area_id = id
    },
    // 删除图片
    deletImg (index) {
      this.deleteIdsArr.push(this.ruleForm.photoList[index].id)
      this.ruleForm.photoList.forEach((item, i) => {
        if (Number(this.fileList[index].signUnique) === Number(item.signUnique)) {
          this.ruleForm.photoList.splice(i, 1)
        }
      })
      this.fileList.splice(index, 1)
      // 如果图集都删完了  封面图为空
      if (!this.isCover && this.fileList.length === 0) {
        this.coverImg = ''
      }
    },
    cancel () {
      this.$router.push({
        path: '/',
        name: 'works'
      })
    },
    postPhoto (statusVal) {
      if (this.ruleForm.title === '') {
        this.$message({
          showClose: true,
          message: '请输入标题',
          type: 'warning'
        })
        return false
      }
      if (this.ruleForm.brief === '') {
        this.$message({
          showClose: true,
          message: '请输入描述',
          type: 'warning'
        })
        return
      }
      if (this.fileList.length === 0) {
        this.$message({
          showClose: true,
          message: '请上传图片',
          type: 'warning'
        })
        return
      }
      if ((this.isCover && this.coverLoading) || this.fileList.length > this.ruleForm.photoList.length) {
        this.$message({
          showClose: true,
          message: '图片上传中，请稍后',
          type: 'warning'
        })
        return
      }
      for (let i = 0; i < this.fileList.length; i++) {
        this.$set(this.ruleForm.photoList[i], 'brief', this.fileList[i].brief || '')
        if (!this.ruleForm.photoList[i].shoot_time) {
          this.ruleForm.photoList[i].shoot_time = this.ruleForm.datetime
        }
      }
      // 如果没有上传封面图 则把图集第一张给封面
      if (!this.isCover) {
        this.ruleForm.photoList.forEach(item => {
          if (Number(this.fileList[0].signUnique) === Number(item.signUnique)) {
            const urlData = {
              origin_url: item.photo_url,
              cut_url: item.photo_url,
              origin_cover: item.photo_key,
              cut_cover: item.photo_key,
              chosed: true
            }
            this.ruleForm.coverImg[0] = urlData
          }
        })
      }
      let orderIdList = []
      this.ruleForm.photoList.forEach((item, index) => {
        orderIdList.push(item.order_id)
      })
      orderIdList.sort().reverse()
      this.ruleForm.photoList.forEach((item, index) => {
        item.order_id = orderIdList[index]
      })
      this.submitBtn = false
      let param = {
        access_token: this.access_token,
        photos: JSON.stringify(this.ruleForm.photoList),
        title: this.ruleForm.title,
        brief: this.ruleForm.brief,
        act_id: this.activeId,
        china: this.ruleForm.radio,
        area: JSON.stringify({
          pro_id: this.ruleForm.pro_id,
          pro_name: this.ruleForm.province,
          city_id: this.ruleForm.city_id,
          city_name: this.ruleForm.city,
          area_id: this.ruleForm.area_id,
          area_name: this.ruleForm.area
        }),
        keywords: this.labelList.join(','),
        shoot_time: this.ruleForm.datetime,
        cover_type: 1,
        cover_keys: JSON.stringify(this.ruleForm.coverImg),
        status: statusVal
      }
      if (this.$route.query.worksId) {
        param.atlas_id = this.$route.query.worksId
        param.delete_ids = this.deleteIdsArr.join(',')
        this.$api.editPicWorks(param).then(res => {
          let msg = ''
          if (param.status == -5) { //eslint-disable-line
            msg = '编辑成功！请在个人中心，点击提审'
          } else if (param.status == 1) { //eslint-disable-line
            msg = '提审成功！请耐心等待'
          }
          if (res.ErrorCode === 0) {
            this.$message({
              showClose: true,
              message: msg,
              type: 'success'
            })
            this.submitBtn = true
            this.ruleForm = {}
            this.coverImg = ''
            this.fileList = []
            setTimeout(() => {
              // window.history.go(0)
              this.$router.push({
                path: '/',
                name: 'works'
              })
            }, 4000)
          } else {
            this.$message({
              showClose: true,
              message: res.ErrorText,
              type: 'error'
            })
          }
        })
      } else {
        this.$api.createGallery(param).then(res => {
          let msg = ''
          if (param.status == -5) { //eslint-disable-line
            msg = '编辑成功！请在个人中心，点击提审'
          } else if (param.status == 1) { //eslint-disable-line
            msg = '提审成功！请耐心等待'
          }
          if (res.ErrorCode === 0) {
            this.$message({
              showClose: true,
              message: msg,
              type: 'success'
            })
            this.submitBtn = true
            this.ruleForm = {}
            this.coverImg = ''
            this.fileList = []
            setTimeout(() => {
              // window.history.go(0)
              this.$router.push({
                path: '/',
                name: 'works'
              })
            }, 4000)
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
    getActivityDetails (id) {
      let param = {
        activity_id: id,
        access_token: this.access_token
      }
      this.$api.activityDetails(param).then(res => {
        console.log(res)
        if (!res.ErrorCode) {
          this.activityDetails = res.data
        }
      })
    }
  },
  created () {
    this.getUserInfo()
    this.getLocation()
    if (this.$route.query.worksId) {
      this.getPicDetail()
    }
    if (this.activeId) {
      this.getActivityDetails(this.activeId)
    }
  }
}
</script>
<style lang='scss' scoped>
.content{
  width: 1200px;
  margin: 0 auto;
}
.post{
  background:rgba(248,248,248,1);
  padding-top: 20px;
  .photosInfo{
    padding: 24px;
    background:rgba(255,255,255,1);
    // height: 776px;
    .title{
      font-size:16px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .photosBox{
      margin-top: 30px;
      .left{
        .imgBox{
          position: relative;
          width:238px;
          height:160px;
          background:rgba(246,246,246,1);
          img{
            width: 100%;
            max-height: 100%;
          }
          /deep/{
            .el-loading-mask{
              z-index: 999
            }
            .el-loading-spinner{
              .el-icon-loading{
                color: #fff;
                font-size: 20px;
              }
              .el-loading-text{
                color: #fff;
              }
            }
          }
        }
        p{
          color:rgba(221,47,60,1);
          width: 238px;
          font-size:14px;
          font-family:PingFangSC;
          font-weight:400;
          text-align: center;
          margin-top: 10px;
          position: absolute;
          cursor: pointer;
        }
        /deep/{
          .uploaderImgs{
            width: 100%;
            height: 100%;
            .el-upload,.avatar{
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .formBox{
        flex: 1;
        margin-left: 20px;
        .el-input{
          width: 400px;
        }
        .labelBox{
          width: 400px;
          height: 116px;
          border: 1px dashed #eee;
          margin-top: 10px;
          position: relative;
          z-index: 1;
          .nodata{
            i{
              color: rgba(255,187,30,1);
            }
            font-size:14px;
            font-family:PingFangSC;
            font-weight:400;
            color:rgba(166,166,166,1);
            line-height: 116px;
            text-align: center;
          }
          .labelList{
            padding: 12px;
            /deep/{
              .el-loading-mask{
                width: 100%;
                position: relative;
                margin-top: 30px;
                .el-loading-spinner{
                  width: 100%;
                  margin-top: unset;
                  position: absolute;
                  height: 40px;
                  color:rgba(102,102,102,1);
                  .el-icon-loading{
                    position: absolute;
                    left: 130px;
                    font-size: 18px;
                    color: #666666;
                    top: 15px;
                    font-size: 18px;
                    color:rgba(102,102,102,1);
                  }
                  .el-loading-text{
                    position: absolute;
                    font-size:14px;
                    font-family:PingFangSC;
                    font-weight:400;
                    color:rgba(102,102,102,1);
                    left: 50%;
                    transform: translate(-50%);
                  }
                }
              }
            }
            li{
              height:26px;
              background:rgba(238,238,238,1);
              border-radius:2px;
              line-height: 26px;
              margin: 0 5px;
              padding: 0 5px;
            }
          }
        }
        .groupList{
          li{
            margin-top: 5px;
            background: #f2f6f9;
            word-break: break-all;
            display: inline-block;
            border-radius: 30px;
            padding: 0px 10px;
            min-width: 48px;
            text-align: center;
            font-size: 12px;
            color: #333;
            margin-right: 10px;
            margin-bottom: 10px;
            height: 30px;
            line-height: 30px;
            position: relative;
            .deletLabel{
              color: red;
              font-size: 16px;
              position: absolute;
              right: -5px;
              top: -5px;
              cursor: pointer;
              display: none;
            }
            &:hover{
              .deletLabel{
                display: block;
              }
            }
          }
          .labelInput{
            background: #f2f6f9;
            word-break: break-all;
            display: inline-block;
            border-radius: 30px;
            padding: 0px 15px;
            min-width: 28px;
            font-size: 12px;
            color: #333;
            margin-right: 10px;
            outline: none;
            border: none;
            box-sizing: border-box;
            height: 30px;
            line-height: 30px;
            margin-top: 5px;
          }
          .add{
            background: #f2f6f9;
            word-break: break-all;
            display: inline-block;
            border-radius: 30px;
            padding: 0px 15px;
            min-width: 30px;
            font-size: 24px;
            color: #666;
            height: 30px;
            line-height: 30px;
            margin-top: 5px;
            cursor: pointer;
          }
        }
      }
      &.photo{
        border-bottom: 1px dashed #eee;
        padding-bottom: 25px;
        p{
          width: 100%;
          font-size:14px;
          font-family:PingFangSC;
          font-weight:400;
          line-height: 36px;
          color:rgba(255,255,255,1);
          text-align: center;
          margin-top: 10px;
          position: absolute;
          height:36px;
          background:rgba(0,0,0,0.35);
          bottom: 0;
          left: 0;
        }
        .delete{
          position: absolute;
          right: 0;
          top: 0;
          color: #F95040;
          font-size: 20px;
          background: #fff;
          border-radius: 50%;
          right: -10px;
          top: -10px;
          z-index: 1000;
          cursor: pointer;
        }
      }
      // &:last-child{
      //   border: none;
      // }
    }
    .bottom{
      margin-top: 40px;
      width: 100%;
      text-align: center;
    }
  }
  .gray{
    width: 100%;
    height: 20px;
    background: rgba(248,248,248,1);
  }
}
.activeBottom{
  background: #f8f8f8;
}
.activeBox{
  /deep/{
    .el-carousel__container{
      width: 100%;
      height: 100%;
      background-color: #000;
      .imgBox{
        // width: 100%;
        height: 550px;
        overflow: hidden;
        img{
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
  .activeBrief{
    // background: #f8f8f8;
    height: 60px;
    .leftline{
      width: 250px;
      height: 1px;
      background-color: rgba(221,221,221,1);
    }
    .title{
      font-size:16px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(102,102,102,1);
      padding: 0 10px;
    }
  }
  .brief{
    text-align: center;
    font-size:36px;
    font-family:PingFangSC;
    font-weight:500;
    // color:rgba(255,255,255,1);
    color: #666;
    // line-height:100px;
    letter-spacing:2px;
    text-shadow:0px 3px 6px rgba(0,0,0,0.06);
    line-height: 44px;
  }
}
/deep/{
  .el-progress{
    width: 100%;
    height: 100%;
    position: absolute;
    text-align: center;
    left: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,0.5);
    .el-progress-bar__outer{
      margin-left: 20px;
    }
    .el-progress__text{
      color: #fff;
    }
  }
}
</style>
