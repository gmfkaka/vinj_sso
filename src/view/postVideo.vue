<template>
  <div>
    <header-view :userInfo = userInfo></header-view>
    <user-info :userInfo = userInfo></user-info>
    <div class="post" v-if="!chosedVideo">
         <div class="photosInfo content videoInfo">
             <img class="add-video" src="../assets/image/add_video.png" alt="">
             <p class="video-title">我要发视频</p>
             <el-upload
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="chooseVideo"
                accept="video/*">
                <p class="video-button">选择视频</p>
            </el-upload>
            <!-- <p class="video-info">视频文件大小最好不超过100MB</p> -->
         </div>
    </div>
    <div class="post" v-else>
        <!-- 图集信息 -->
        <div class="photosInfo content">
        <p class="title">发视频</p>
        <div v-if="!isEdit" class="upload-info flexBox flexAlign flexBetween">
            <video class="video" :src="videoSrc"></video>
            <div class="info-box">
                <p class="file-name">{{videoName}}</p>
                <p class="file-info" v-if="ifVideoComplete">
                    <span>00:14&nbsp;&nbsp;</span>
                    <span>大小：{{getfilesize(videoRawSize)}}</span>
                </p>
                <div v-else>
                  <p class="file-info">
                      <span>正在上传 {{videoProgress}}% </span>
                      <span>{{getfilesize(videoRawSize*(videoProgress/100))}}/{{getfilesize(videoRawSize)}}</span>
                  </p>
                  <el-progress :percentage="videoProgress" :color="'#6FAAEB'" :show-text="false"></el-progress>
                </div>
            </div>
            <el-upload
                v-if="ifVideoComplete || ifCancel"
                action="#"
                :auto-upload="false"
                :show-file-list="false"
                :on-change="chooseVideo"
                accept="video/*">
                <p class="button" @click="chooseVideo">重新上传</p>
            </el-upload>
            <p class="button" v-else @click="cancelData">取消上传</p>
        </div>
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
                <p>+ 上传视频封面</p>
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
                    <el-form-item label="拍摄地点" prop="province">
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
                    <el-form-item label="拍摄时间" prop="datetime">
                      <el-date-picker type="datetime" placeholder="选择日期" v-model="ruleForm.datetime" value-format = 'yyyy-MM-dd HH:mm:ss' style="width: 400px;"></el-date-picker>
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
                    </div>
                    </el-collapse-transition>
                    <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                    <el-button type="text" style="color:rgba(132,132,132,1);margin-left: 180px;font-size: 12px" v-if="show3" @click="show3 = false">收起 <i class="el-icon-arrow-up"></i> </el-button>
                    <el-button type="text" style="color:rgba(132,132,132,1);margin-left: 180px;font-size: 12px" v-else @click="show3 = true">更多设置 <i class="el-icon-arrow-down"></i> </el-button>
                    </el-form-item> -->
            </el-form>
            </div>
        </div>
        <div class="buttonBox flexBox flexCenter">
          <div class="buttonItem cancel" @click="cancelSave">取消</div>
          <div class="buttonItem upload" @click="postVideo('-5')">保存</div>
          <div class="buttonItem audit" @click="postVideo('1')">保存并提审</div>
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
      submitable: true,
      chosedVideo: false,
      isEdit: false,
      videoName: '',
      videoRawSize: 0,
      videoSrc: '',
      videoDuration: 0,
      videoProgress: 0,
      videoId: null,
      videoInfo: {},
      ifVideoComplete: false,
      ifCancel: false,
      submitBtn: true,
      coverLoading: false,
      fileList: [],
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
      author: this.$util.getCookie('author'),
      userInfo: {},
      videoDetailInfo: {},
      coverImg: '',
      provinceList: {},
      cityList: {},
      areaList: {},
      activityDetails: {},
      percentage: 0,
      isCover: false,
      cancel: null,
      onLine: navigator.onLine
    }
  },
  methods: {
    // 取消上传视频
    cancelData () {
      this.ifCancel = true
      this.cancel()
      this.$message({
        showClose: true,
        message: '已取消上传',
        type: 'success'
      })
    },
    // 选择视频
    chooseVideo (file, fileList) {
      const CancelToken = axios.CancelToken
      const _this = this
      if (file.raw) {
        _this.videoRawSize = file.size
        if (_this.videoRawSize >= 2000000000) {
          _this.$message({
            showClose: true,
            message: '上传的视频不能大于2G，请重新上传',
            type: 'error'
          })
          return
        }
        _this.videoProgress = 0
        _this.ifVideoComplete = false
        _this.videoName = file.name
        // 获取视频时长
        _this.videoSrc = URL.createObjectURL(file.raw)
        let audioElement = new Audio(_this.videoSrc)
        audioElement.addEventListener('loadedmetadata', function (_event) {
          _this.videoDuration = _this.intervalTime(parseInt(audioElement.duration))
        })
        _this.chosedVideo = true // 填写信息
        // 上传视频
        let formData = new FormData()
        formData.append('file', file.raw)
        formData.append('access_token', this.access_token)
        formData.append('setting_ids', 1)
        formData.append('is_transcode', 1)
        // 为了实现进度条 单独使用axios
        axios.post('http://sso.vinj.cn/api/video/upload', formData, {
          headers: {'Content-Type': 'multipart/form-data'},
          onUploadProgress: progressEvent => {
            _this.videoProgress = (progressEvent.loaded / progressEvent.total * 100 | 0)
          },
          // 取消请求
          cancelToken: new CancelToken(function executor (fn) {
            _this.cancel = fn
          })
        }).then(res => {
          if (res.data.hash_id) {
            _this.ifVideoComplete = true
            _this.videoInfo = res.data
            _this.coverImg = _this.videoInfo.index_pic_url
          }
        })
      }
    },
    genUniqHash () {
      return Math.floor(Date.now() / 1000) + Math.random().toString().slice(2, 8)
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
    // 获取视频详情
    getVideoDetail (id) {
      this.$api.detailVideoWorks(id).then(res => {
        this.videoDetailInfo = res.data
        this.ruleForm.title = this.videoDetailInfo.title
        this.ruleForm.brief = this.videoDetailInfo.brief
        this.ruleForm.datetime = this.videoDetailInfo.shoot_time
        // 标签
        if (this.videoDetailInfo.keywords) {
          this.labelList = this.videoDetailInfo.keywords.split(',')
        }
        // 地区
        this.videoDetailInfo.area = JSON.parse(res.data.area)
        if (res.data.area.pro_id) {
          this.ruleForm.radio = 1
        } else {
          this.ruleForm.radio = 2
        }
        this.ruleForm.province = this.videoDetailInfo.area.pro_name
        this.ruleForm.pro_id = this.videoDetailInfo.area.pro_id
        this.ruleForm.city = this.videoDetailInfo.area.city_name
        this.ruleForm.city_id = this.videoDetailInfo.area.city_id
        this.ruleForm.area = this.videoDetailInfo.area.area_name
        this.ruleForm.area_id = this.videoDetailInfo.area.area_id
        // 封面
        if (this.videoDetailInfo.cover_keys.length) {
          this.coverImg = this.videoDetailInfo.cover_keys[0].origin_url
        }
        const urlData = {
          origin_url: this.videoDetailInfo.cover_keys[0].origin_url,
          cut_url: this.videoDetailInfo.cover_keys[0].cut_url,
          origin_cover: this.videoDetailInfo.cover_keys[0].origin_cover,
          cut_cover: this.videoDetailInfo.cover_keys[0].cut_cover,
          chosed: true
        }
        this.ruleForm.coverImg[0] = urlData
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
      this.labelValue = ''
    },
    // 删除标签
    deletLabel (index) {
      this.labelList.splice(index, 1)
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
      // 实现进度条
      axios.post('http://sso.vinj.cn/api/gallery/upload?', param, {
        headers: {'Content-Type': 'multipart/form-data'},
        // withCredentials: true,
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
    // 发布视频
    postVideo (statusVal) {
      if (!this.submitable) return
      // 新建的时候才判断 编辑的时候不编辑视频
      if (!this.videoInfo.hash_id && !this.isEdit) {
        this.$message({
          showClose: true,
          message: '视频还未上传完成',
          type: 'warning'
        })
        return false
      }
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
      let formData = new FormData()
      formData.append('access_token', this.access_token)
      formData.append('author', this.author)
      formData.append('title', this.ruleForm.title)
      formData.append('brief', this.ruleForm.brief)
      // formData.append('info', JSON.stringify(this.videoInfo))
      formData.append('china', this.ruleForm.radio)
      formData.append('area', JSON.stringify({
        pro_id: this.ruleForm.pro_id,
        pro_name: this.ruleForm.province,
        city_id: this.ruleForm.city_id,
        city_name: this.ruleForm.city,
        area_id: this.ruleForm.area_id,
        area_name: this.ruleForm.area
      }))
      formData.append('status', statusVal)
      // 拍摄时间
      if (this.ruleForm.datetime) {
        formData.append('shoot_time', this.ruleForm.datetime)
      }
      // 手动上传封面
      if (this.ruleForm.coverImg.length) {
        formData.append('cover_type', 1)
        formData.append('cover_keys', JSON.stringify(this.ruleForm.coverImg))
      }
      // 关键词
      if (this.labelList.length) {
        formData.append('keywords', this.labelList.join(','))
      }
      this.submitable = false
      if (this.isEdit) {
        let editParam = {
          id: this.$route.query.videoId,
          title: this.ruleForm.title,
          brief: this.ruleForm.brief,
          cover_keys: JSON.stringify(this.ruleForm.coverImg),
          area: JSON.stringify({
            pro_id: this.ruleForm.radio === 1 ? this.ruleForm.pro_id : '',
            pro_name: this.ruleForm.radio === 1 ? this.ruleForm.province : '',
            city_id: this.ruleForm.radio === 1 ? this.ruleForm.city_id : '',
            city_name: this.ruleForm.radio === 1 ? this.ruleForm.city : '',
            area_id: this.ruleForm.radio === 1 ? this.ruleForm.area_id : '',
            area_name: this.ruleForm.radio === 1 ? this.ruleForm.area : ''
          }),
          access_token: this.$util.getCookie('accessToken'),
          shoot_time: this.ruleForm.datetime,
          status: statusVal,
          keywords: this.labelList.length ? this.labelList.join(',') : ''
        }
        this.$api.editVideoWorks(editParam).then(res => {
          let msg = ''
          if (editParam.status == -5) { //eslint-disable-line
            msg = '编辑成功！请在个人中心，点击提审'
          } else if (editParam.status == 1) { //eslint-disable-line
            msg = '提审成功！请耐心等待'
          }
          if (res.ErrorText) {
            this.$message({
              showClose: true,
              message: res.ErrorText,
              type: 'error'
            })
            this.submitable = true
          }
          if (res.data === 'success') {
            this.$message({
              showClose: true,
              message: msg,
              type: 'success'
            })
            setTimeout(() => {
              // window.history.go(0)
              // this.$router.push({
              //   path: '/postVideo'
              // })
              this.$router.push({
                path: '/',
                name: 'works'
              })
            }, 4000)
          }
        })
      } else {
        formData.append('info', JSON.stringify(this.videoInfo))
        let editParam = {
          status: statusVal
        }
        axios.post('http://sso.vinj.cn/api/video/video_create', formData).then(res => {
          let msg = ''
          if (editParam.status == -5) { //eslint-disable-line
            msg = '编辑成功！请在个人中心，点击提审'
          } else if (editParam.status == 1) { //eslint-disable-line
            msg = '提审成功！请耐心等待'
          }
          if (res.data.ErrorText) {
            this.$message({
              showClose: true,
              message: res.data.ErrorText,
              type: 'error'
            })
            this.submitable = true
          }
          if (res.data.data === 'success') {
            this.$message({
              showClose: true,
              message: msg,
              type: 'success'
            })
            setTimeout(() => {
              // window.history.go(0)
              this.$router.push({
                path: '/',
                name: 'works'
              })
            }, 4000)
          }
        })
      }
      // axios.post('http://sso.vinj.cn/api/video/video_create', formData).then(res => {
      //   if (res.data.ErrorText) {
      //     this.$message({
      //       showClose: true,
      //       message: res.data.ErrorText,
      //       type: 'error'
      //     })
      //     this.submitable = true
      //   }
      //   if (res.data.data === 'success') {
      //     this.$message({
      //       showClose: true,
      //       message: '提交成功',
      //       type: 'success'
      //     })
      //     setTimeout(() => {
      //       window.history.go(0)
      //     }, 2000)
      //   }
      // })
    },
    // 转换视频时间为时分秒
    intervalTime  (interval, format) {
      format = format || 'min:sec'
      return format
        .replace('min', this.operateTime(Math.floor(interval / 60)))
        .replace('sec', this.operateTime(Math.floor(interval % 60)))
    },
    operateTime (time) {
      return time < 10 ? '0' + time : time
    },
    // 转换文件大小
    getfilesize (size) {
      if (!size) { return '' }
      var num = 1024.00 // byte
      if (size < num) { return size + 'B' }
      if (size < Math.pow(num, 2)) { return (size / num).toFixed(1) + 'K' } // kb
      if (size < Math.pow(num, 3)) { return (size / Math.pow(num, 2)).toFixed(1) + 'M' } // M
      if (size < Math.pow(num, 4)) { return (size / Math.pow(num, 3)).toFixed(1) + 'G' } // G
      return (size / Math.pow(num, 4)).toFixed(1) + 'T' // T
    },
    cancelSave () {
      this.$confirm('是否放弃当前更改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push({
          path: '/',
          name: 'works'
        })
      }).catch(() => {})
    },
    // 上传过程中断网提示
    offlineTip () {
      if (this.chosedVideo && !this.ifVideoComplete) {
        this.$message({
          showClose: true,
          message: '网络超时',
          type: 'error'
        })
      }
    }
  },
  mounted () {
    window.addEventListener('offline', this.offlineTip) // 检测断网
  },
  created () {
    this.getUserInfo()
    this.getLocation()
    if (this.$route.query.videoId) {
      this.getVideoDetail(this.$route.query.videoId)
      this.chosedVideo = true
      this.isEdit = true
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
  padding-bottom: 50px;
  .photosInfo{
    padding: 24px;
    background:rgba(255,255,255,1);
    // height: 776px;
    &.videoInfo{
        height:828px;
        display:flex;
        flex-direction:column;
        align-items:center;
    }
    .add-video{
        width: 251px;
        height: 214px;
        margin-top: 145px;
    }
    .video-title{
        font-size: 24px;
        font-weight:500;
        color:rgba(51,51,51,1);
        padding-top: 38px;
        padding-bottom: 20px;
    }
    .video-button{
        width:120px;
        height:38px;
        line-height: 38px;
        background:rgba(221,47,60,1);
        border-radius:2px;
        font-size: 16px;
        text-align: center;
        color: #fff;
        &:hover{
            cursor: pointer;
        }
    }
    .video-info{
        font-size: 14px;
        color:rgba(102,102,102,1);
        padding-top: 20px;
    }
    .upload-info{
        margin-top: 35px;
        padding-right: 30px;
        .video{
            width: 104px;
            height: 70px;
            object-fit: fill;
            margin-right: 15px;
        }
        .info-box{
            flex: 1;
            p.file-name{
                color: #333333;
                font-size: 18px;
                margin-bottom: 16px;
            }
            .file-info {
                margin-bottom: 10px;
                span{
                    color: #999;
                    font-size: 14px;
                }
            }
        }
        p.button{
            font-size: 14px;
            color: #666666;
            padding-left: 40px;
            &:hover{
              cursor: pointer;
            }
        }
    }
    .title{
      font-size:16px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(51,51,51,1);
    }
    .photosBox{
      padding-top: 30px;
      margin-top: 27px;
      border-top: 1px dashed #EDEDED;
      .left{
        .imgBox{
          position: relative;
          width:238px;
          height:160px;
          background:rgba(246,246,246,1);
          img{
            max-width: 100%;
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
          z-index: 99999;
        }
      }
      // &:last-child{
      //   border: none;
      // }
    }
    .buttonBox{
      margin-top: 20px;
      .buttonItem{
        width: 80px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        font-size: 16px;
        border-radius: 2px;
        &.cancel{
          color: #DD2F3C;
          border:1px solid rgba(221,47,60,1);
          margin-right: 20px;
        }
        &.upload{
          background:rgba(221,47,60,1);
          color: #fff;
        }
        &.audit{
          width: 160px;
          margin-left: 20px;
          background:rgba(221,47,60,1);
          color: #fff;
        }
        &:hover{
          cursor: pointer;
        }
      }
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
/deep/{
    .upload-info{
        .el-progress-bar__outer{
            height: 2px !important;
        }
    }
    .imgBox{
        .el-progress{
          width: 100%;
          height: 100%;
          position: absolute;
          text-align: center;
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
}
</style>
