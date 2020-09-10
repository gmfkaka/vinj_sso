<template>
  <div class="content-box">
    <div class="content-header-box">
      <div class="tab-box">
        <div class="tab" @click="toggleTab('0')">
          <span>图片</span>
          <!-- <span>{{picData.total}}</span> -->
          <span class="line" v-if="currentTab == 0"></span>
        </div>
        <div class="tab" @click="toggleTab('1')">
          <span>视频</span>
          <span class="line" v-if="currentTab == 1"></span>
        </div>
        <!-- <div class="contribute-btn" @click="goPost()">我要投稿</div> -->
        <el-dropdown class="contribute-btn">
          <span class="el-dropdown-link">
            我要投稿<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="goPost(0)">发图片</el-dropdown-item>
            <el-dropdown-item @click.native="goPost(1)">发视频</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="tab-content-box" v-if="currentTab == 0">
        <div class="min-tab" :class="{isMinActive: isMinActive == minIndex}" v-for="(minTab,minIndex) in minTabList" :key="minIndex" @click="toggleMinTab(minIndex, minTab.actId)">
          <span>{{minTab.minTabName}}</span>
        </div>
      </div>
    </div>
    <div class="content-data">
      <div class="content-introduce">
        <span>时至今日</span>
        <span>{{userInfo.nick_name}}</span>
        <span>共发布了</span>
        <span v-if="currentTab == 0">{{picData.total ? picData.total : 0}}</span>
        <span v-if="currentTab == 1">{{videoData.total ? videoData.total : 0}}</span>
        <!-- <span v-else>0</span> -->
        <span v-if="currentTab == 0">个图片作品</span>
        <span v-if="currentTab == 1">个视频作品</span>
        <div class="name-search flexBox flexAlign">
          <input type="text" name="" id="" placeholder="作品名称" v-model="inputText" @keyup.enter="searchList()">
          <i class="searchIcon" @click="searchList()"></i>
        </div>
        <div class="pic-search-box">
          <template>
            <el-select v-model="picStateValue" size="small" clearable placeholder="请选择状态" style="width: 120px;" @change="picStateChange">
              <el-option
                v-for="item in picStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
          <div class="region-search">
            <span class="label-name">地区:</span>
            <el-select v-model="picRegion.province" placeholder="请选择省" size="small" style="width: 100px;">
              <el-option
              v-for="proItem in provinceList"
              :label="String(proItem.name)"
              :key="Number(proItem.id)"
              :value="String(proItem.name)"
              @click.native = 'getCity(proItem.id)'></el-option>
            </el-select>
            <el-select v-model="picRegion.city" placeholder="请选择市" size="small" style=" width: 100px">
              <el-option
              v-for='cityItem in cityList'
              :key="Number(cityItem.id)"
              :label="String(cityItem.name)"
              :value="String(cityItem.name)"
              @click.native = 'getArea(cityItem.id)'></el-option>
            </el-select>
            <el-select v-model="picRegion.area" placeholder="请选择区" size="small" style=" width: 100px;">
              <el-option
              v-for='areaItem in areaList'
              :key="Number(areaItem.id)"
              :label="String(areaItem.name)"
              :value="String(areaItem.name)"
              @click.native = 'getAreaId(areaItem.id)'></el-option>
            </el-select>
          </div>
          <el-date-picker
            v-model="picDateValue"
            value-format = 'yyyy-MM-dd'
            type="daterange"
            style="width: 220px;margin-left: 10px;"
            size="small"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="getPicDate"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
      <!-- 图片列表 -->
      <div class="pic-list-box" v-if="currentTab == 0" v-loading = 'loading'>
        <div class="pic-info-box" v-if='picData.total > 0'>
          <!-- <template>
              <el-select v-model="picStateValue" size="small" clearable placeholder="请选择状态" style="width: 120px;" @change="picStateChange">
                <el-option
                  v-for="item in picStateOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </template>
            <div>
              <span>地区</span>
              <el-select v-model="picRegion.province" placeholder="请选择省" size="small" style="width: 125px;">
                <el-option
                v-for="proItem in provinceList"
                :label="String(proItem.name)"
                :key="Number(proItem.id)"
                :value="String(proItem.name)"
                @click.native = 'getCity(proItem.id)'></el-option>
              </el-select>
              <el-select v-model="picRegion.city" placeholder="请选择市" size="small" style=" width: 125px">
                <el-option
                v-for='cityItem in cityList'
                :key="Number(cityItem.id)"
                :label="String(cityItem.name)"
                :value="String(cityItem.name)"
                @click.native = 'getArea(cityItem.id)'></el-option>
              </el-select>
              <el-select v-model="picRegion.area" placeholder="请选择区" size="small" style=" width: 125px;">
                <el-option
                v-for='areaItem in areaList'
                :key="Number(areaItem.id)"
                :label="String(areaItem.name)"
                :value="String(areaItem.name)"
                @click.native = 'getAreaId(areaItem.id)'></el-option>
              </el-select>
            </div>
            <el-date-picker
              v-model="picDateValue"
              value-format = 'yyyy-MM-dd'
              type="daterange"
              style="width: 220px;margin-left: 10px;"
              size="small"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="getPicDate"
              :picker-options="pickerOptions">
            </el-date-picker>
          </div> -->
          <div class="pic" v-for="(picItem, index) in picData.data" :key="index">
            <div class="imgBox flexBox flexMiddle" @click = "getGalleryList(picItem.origin_id, picItem.title)">
              <img :src="picItem.index_pic + '?imageView/0/w/225'" alt="" v-if="picItem.index_pic">
              <img src='../../assets/image/logo@2x.png' alt="" v-else>
            </div>
            <span class="state" v-if="picItem.status==5 || picItem.status==1">审核中</span>
            <span class="state" v-else-if="picItem.status==3" style="background:rgba(54,136,255,1);">已上网</span>
            <span class="state" v-else-if="picItem.status==4 || picItem.status==22" style="background:rgba(208,2,27,1);">已打回</span>
            <span class="state" v-else-if="picItem.status==-5" style="background:rgba(153,153,153,1);">待提审</span>
            <span class="state" v-else style="background:rgba(65,168,86,1);">已审核</span>
            <span class="type-title">{{picItem.title}}</span>
            <span class="time-length" v-if="currentTab == 1">06:22</span>
            <span class="video-icon" v-if="currentTab == 1">
              <i class="el-icon-caret-right"></i>
            </span>
            <el-dialog title="选择下载尺寸" width="30%"
            style="text-align: center;padding: 20px;height: 100%" :visible.sync="dialogSizeChooseVisible">
              <el-radio v-model="radio" label="1">原图</el-radio>
              <el-radio v-model="radio" label="2">低分辨率</el-radio>
              <el-radio v-model="radio" label="3">高分辨率</el-radio>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogSizeChooseVisible = false">取消</el-button>
                <el-button type="primary" @click="downloadPic()">确定</el-button>
              </div>
          </el-dialog>
            <!-- <div class="cover-box" style="pointer-events: none"> -->
              <div class="cover-box">
                <span class="detail" v-if="picItem.status==3"><a :href="'http://www.vinj.cn/folder77?id=' + picItem.origin_id" target="_blank"></a></span>
              <!-- <span class="download">预览</span> -->
              <span class="title">{{picItem.title}}</span>
              <div class="views flexBox flexAlign">
                <i class="readersIcon"></i>
                {{picItem.click_num}}
              </div>
              <div class="thumb flexBox flexAlign">
                <i class="praiseIcon"></i>
                {{picItem.praise_num}}
              </div>
              <div class="download flexBox flexAlign" @click="openDialog(picItem.origin_id)">
                <i class="dwonoadIcon"></i>
              </div>
              <div class="more flexBox flexAlign" v-if="picItem.status == -5 || picItem.status == 4 || picItem.status == 22">
                <span class="tiShen" @click="goAudit(picItem)">提审</span>
                <span @click="goEdit(picItem)">编辑</span>
                <span @click="goDelete(picItem)">删除</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pic-info-box flexBox flexMiddle flexCenter" v-else style="text-align: center;width: 100%">
          <div class="">
            <div class="nodata-img"></div>
            <p>暂无内容</p>
          </div>
        </div>
      </div>
      <!-- 视频列表 -->
      <div class="pic-list-box" v-if="currentTab == 1" v-loading = 'loading'>
        <div class="pic-info-box" v-if='videoData.total > 0'>
          <div class="pic" v-for="(videoItem, index) in videoData.data" :key="index">
            <div class="imgBox flexBox flexMiddle">
              <img :src="videoItem.index_pic + '?imageView/0/w/225'" alt="" v-if="videoItem.index_pic">
              <img src='../../assets/image/logo@2x.png' alt="" v-else>
            </div>
            <span class="state" v-if="videoItem.status==5 || videoItem.status==1">审核中</span>
            <span class="state" v-else-if="videoItem.status==3" style="background:rgba(54,136,255,1);">已上网</span>
            <span class="state" v-else-if="videoItem.status==4 || videoItem.status==22" style="background:rgba(208,2,27,1);">已打回</span>
            <span class="state" v-else-if="videoItem.status==-5" style="background:rgba(153,153,153,1);">待提审</span>
            <span class="state" v-else style="background:rgba(65,168,86,1);">已审核</span>
            <span class="type-title">{{videoItem.title}}</span>
            <span class="time-length" v-if="currentTab == 1">{{videoItem.duration}}</span>
            <span class="video-icon" v-if="currentTab == 1">
              <i class="el-icon-caret-right"></i>
            </span>
            <!-- <div class="cover-box" style="pointer-events: none"> -->
            <div class="cover-box">
              <span class="detail" v-if="videoItem.status==3"><a :href="'http://www.vinj.cn/folder102?origin_id=' + videoItem.id" target="_blank"></a></span>
              <!-- <span class="download">预览</span> -->
              <span class="title">{{videoItem.title}}</span>
              <div class="views flexBox flexAlign">
                <i class="readersIcon"></i>
                {{videoItem.clicks}}
              </div>
              <div class="thumb flexBox flexAlign">
                <i class="praiseIcon"></i>
                {{videoItem.praises}}
              </div>
              <div class="download flexBox flexAlign" @click="downloadVideo(videoItem)">
                <i class="dwonoadIcon"></i>
              </div>
              <div class="more flexBox flexAlign" v-if="videoItem.status == -5 || videoItem.status == 4 || videoItem.status == 22">
                <span class="tiShen" @click="goVideoAudit(videoItem)">提审</span>
                <span @click="goVideoEdit(videoItem)">编辑</span>
                <span @click="goVideoDelete(videoItem)">删除</span>
              </div>
            </div>
          </div>
        </div>
        <div class="pic-info-box flexBox flexMiddle flexCenter" v-if='videoData.total == 0' style="text-align: center;width: 100%">
          <div class="">
            <div class="nodata-img"></div>
            <p>暂无视频</p>
          </div>
        </div>
      </div>

    </div>
    <!-- 图片的分页 -->
    <div v-if="currentTab == 0">
      <el-pagination
      hide-on-single-page
      background
      layout="prev, pager, next"
      :total="picData.total"
      :page-size = count
      :current-page= "currentPage"
      @current-change="handleCurrentChange">
    </el-pagination>
    </div>
    <!-- 视频的分页 -->
    <div v-if="currentTab == 1">
      <el-pagination
      hide-on-single-page
      background
      v-if="videoData.total"
      layout="prev, pager, next"
      :total="videoData.total"
      :page-size = count
      :current-page= "currentPage"
      @current-change="handleVideoCurrentChange">
    </el-pagination>
    </div>
    <el-dialog
      :title="galleryTitle"
      :visible.sync="galleryFlag"
      center
      style="height: 100%; margin-top: 0"
      @close = closeDialog>
      <el-carousel indicator-position="outside" style="width: 100%;height: 100%; margin-top: 0">
        <el-carousel-item v-for="(item, index) in galleryList" :key="index" :setActiveItem = "0">
          <div class="imgBox flexBox flexCenter flexAlign">
            <img :src="item.photo_url" alt="">
          </div>
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>
<script>
export default{
  data () {
    return {
      isActive: 0,
      currentTab: 0,
      isMinActive: 0,
      inputText: '',
      access_token: this.$util.getCookie('accessToken'),
      minTabList: [{
        minTabName: '签约投稿',
        type: 'signing',
        actId: 1
      },
      {
        minTabName: '活动投稿',
        type: 'activityContribute',
        actId: 2
      }],
      picData: {},
      videoData: {},
      actId: 1,
      page: 1,
      currentPage: 1,
      count: 12,
      loading: true,
      galleryFlag: false,
      galleryList: [],
      galleryTitle: '',
      picStateOptions: [{
        value: '1',
        label: '审核中'
      }, {
        value: '2',
        label: '已审核'
      }, {
        value: '4',
        label: '已打回'
      }, {
        value: '3',
        label: '已上网'
      }, {
        value: '-5',
        label: '待提审'
      }],
      picStateValue: '',
      picRegion: {
        province: '',
        pro_id: '',
        city: '',
        city_id: '',
        area: '',
        area_id: ''
      },
      provinceList: {},
      cityList: {},
      areaList: {},
      pickerOptions: {
        shortcuts: [{
          text: '最近7天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近30天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近90天',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      picDateValue: '',
      location_id: '',
      status: '',
      start_time: '',
      end_time: '',
      dialogSizeChooseVisible: false,
      radio: '1',
      currentPicId: ''
    }
  },
  props: ['userInfo'],
  methods: {
    // 状态筛选
    picStateChange (value) {
      this.status = value
      if (this.currentTab === 0) {
        this.getPublishData()
      } else {
        this.getVideoPublishData()
      }
    },
    // 时间筛选
    getPicDate () {
      if (this.picDateValue) {
        this.start_time = this.picDateValue[0]
        this.end_time = this.picDateValue[1]
        if (this.currentTab === 0) {
          this.getPublishData()
        } else {
          this.getVideoPublishData()
        }
      }
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
          // this.$router.push({
          //   name: 'login',
          //   path: '/login'
          // })
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
      // 省id
      this.location_id = id
      if (this.currentTab === 0) {
        this.getPublishData()
      } else {
        this.getVideoPublishData()
      }
      this.picRegion.city = ''
      this.picRegion.area = ''
      this.picRegion.pro_id = id
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
      // 市id
      this.location_id = id
      if (this.currentTab === 0) {
        this.getPublishData()
      } else {
        this.getVideoPublishData()
      }
      this.picRegion.area = ''
      this.picRegion.city_id = id
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
      // 区id
      this.location_id = id
      if (this.currentTab === 0) {
        this.getPublishData()
      } else {
        this.getVideoPublishData()
      }
      this.picRegion.area_id = id
    },
    toggleNav (currentIndex) {
      this.isActive = currentIndex
    },
    toggleTab (tabIndex) {
      // 切换的时候筛选条件置空
      this.inputText = ''
      this.picDateValue = ''
      this.picStateValue = ''
      this.picRegion.province = ''
      this.picRegion.pro_id = ''
      this.picRegion.city = ''
      this.picRegion.city_id = ''
      this.picRegion.area = ''
      this.picRegion.area_id = ''
      this.page = 1
      this.currentPage = 1
      this.actId = 1
      this.location_id = ''
      this.status = ''
      this.start_time = ''
      this.end_time = ''
      this.currentTab = tabIndex
      if (Number(tabIndex) === 1) {
        this.getVideoPublishData()
      } else {
        this.loading = true
        this.getPublishData('', this.actId)
      }
    },
    toggleMinTab (minIndex, actId) {
      // 切换的时候筛选条件置空
      this.picDateValue = ''
      this.picStateValue = ''
      this.picRegion.province = ''
      this.picRegion.pro_id = ''
      this.picRegion.city = ''
      this.picRegion.city_id = ''
      this.picRegion.area = ''
      this.picRegion.area_id = ''
      this.loading = true
      this.actId = actId
      this.isMinActive = minIndex
      this.getPublishData('', actId)
    },
    goPost (flag) {
      if (this.userInfo.group_id !== 2) {
        this.$message({
          showClose: true,
          message: '非签约摄影师不能发布作品，签约后再来哦',
          type: 'warning'
        })
        return
      }
      if (flag === 0) {
        this.$router.push({
          name: 'post',
          path: '/post'
        })
        // let routeData = this.$router.resolve({
        //   name: 'post'
        // })
        // window.open(routeData.href, '_blank')
      }
      if (flag === 1) {
        this.$router.push({
          name: 'postVideo',
          path: '/postVideo'
        })
        // let routeData = this.$router.resolve({
        //   name: 'postVideo'
        // })
        // window.open(routeData.href, '_blank')
      }
    },
    handleCurrentChange (value) {
      this.loading = true
      this.page = value
      this.currentPage = value
      this.getPublishData()
    },
    handleVideoCurrentChange (value) {
      this.loading = true
      this.page = value
      this.currentPage = value
      this.getVideoPublishData()
    },
    getPublishData () {
      let param = {
        title: this.inputText,
        page: this.page,
        per_num: this.count,
        act_id: this.actId,
        location_id: this.location_id,
        status: this.status,
        start_time: this.start_time,
        end_time: this.end_time,
        access_token: this.access_token
      }
      this.$api.publishList(param).then(res => {
        if (res.ErrorCode === 0) {
          this.picData = res.data
        }
        // this.picData.total = 35
        this.loading = false
      })
    },
    getVideoPublishData () {
      let param = {
        title: this.inputText,
        page: this.page,
        per_num: this.count,
        user_id: this.userInfo.id,
        location_id: this.location_id,
        status: this.status,
        start_time: this.start_time,
        end_time: this.end_time,
        access_token: this.access_token
      }
      this.$api.videoPublishList(param).then(res => {
        if (res.error_code === 0) {
          this.videoData = res.data
        }
        this.loading = false
      })
    },
    // videoPublishList
    searchList () {
      this.loading = true
      this.getPublishData(this.inputText)
      this.getVideoPublishData(this.inputText)
    },
    getGalleryList (id, title) {
      this.$api.photosList(id).then(res => {
        // console.log(res)
        if (!res.ErrorCode) {
          this.galleryList = res.data.data.reverse()
          this.galleryTitle = title
          this.galleryFlag = true
        } else {
          this.$message({
            showClose: true,
            message: res.ErrorText,
            type: 'error'
          })
        }
      })
    },
    closeDialog () {
      this.galleryList = []
      this.galleryTitle = ''
    },
    goAudit (item) {
      let param = {
        id: item.origin_id,
        access_token: this.access_token
      }
      this.$api.auditPicWorks(param).then(res => {
        if (res.ErrorCode === 0) {
          this.$message({
            showClose: true,
            message: '提审成功',
            type: 'success'
          })
          this.getPublishData()
        }
        // this.loading = false
      })
    },
    goEdit (item) {
      this.$router.push({
        // name: 'post',
        path: '/post',
        query: {worksId: item.origin_id}
      })
      // let routeData = this.$router.resolve({
      //   name: 'post',
      //   query: {worksId: item.origin_id}
      // })
      // window.open(routeData.href, '_blank')
    },
    goDelete (item) {
      let param = {
        id: item.origin_id,
        access_token: this.access_token
      }
      this.$api.deletePicWorks(param).then(res => {
        if (res.ErrorCode === 0) {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getPublishData()
        }
        // this.loading = false
      })
    },
    goVideoAudit (item) {
      // auditVideoWorks
      let param = {
        id: item.id,
        access_token: this.access_token
      }
      this.$api.auditVideoWorks(param).then(res => {
        if (res.ErrorCode === 0) {
          this.$message({
            showClose: true,
            message: '提审成功',
            type: 'success'
          })
          this.getVideoPublishData()
        }
        // this.loading = false
      })
    },
    goVideoEdit (item) {
      this.$router.push({
        // name: 'postVideo',
        path: '/postVideo',
        query: {videoId: item.id}
      })
      // let routeData = this.$router.resolve({
      //   name: 'postVideo',
      //   query: {videoId: item.id}
      // })
      // window.open(routeData.href, '_blank')
    },
    goVideoDelete (item) {
      // deleteVideoWorks
      let param = {
        id: item.id,
        access_token: this.access_token
      }
      this.$api.deleteVideoWorks(param).then(res => {
        if (res.ErrorCode === 0) {
          this.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
          this.getVideoPublishData()
        }
        // this.loading = false
      })
    },
    openDialog (id) {
      this.currentPicId = id
      this.dialogSizeChooseVisible = true
    },
    // 下载
    downloadPic () {
      if (this.radio === '1') {
        let picDownUrl = 'http://sso.vinj.cn/api/gallery/center/download?' + `access_token=${this.access_token}&atlas_id=${this.currentPicId}&user_id=${this.userInfo.id}`
        window.location.href = picDownUrl
        this.dialogSizeChooseVisible = false
      } else {
        let picDownUrl = 'http://sso.vinj.cn/api/gallery/center/download?' + `access_token=${this.access_token}&atlas_id=${this.currentPicId}&user_id=${this.userInfo.id}&photo_type=${this.radio}`
        window.location.href = picDownUrl
        this.dialogSizeChooseVisible = false
      }
    },
    downloadVideo (videoItem) {
      let param = {
        id: videoItem.id,
        access_token: this.access_token
      }
      this.$api.downloadVideoWorks(param).then((res) => {
        if (res.error_code === 0) {
          window.location.href = res.data
          this.dialogSizeChooseVisible = false
        }
      })
    }
  },
  mounted () {
    this.getPublishData()
    this.getLocation()
  }
}
</script>
<style lang="scss" scoped>
.content-box{
  width: 960px;
  .content-header-box{
    /* height: 116px; */
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
      .pic-search-box{
          width: 960px;
          display: flex;
          margin-top: 20px;
          justify-content: flex-end;
          .region-search{
            margin-left: 10px;
            .label-name{
              font-size: 12px;
            }
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
            width: 225px;
            height: 166px;
            overflow: hidden;
            // background-color: #000;
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
            .detail{
              display: inline-block;
              width: 100%;
              height: 130px;
              a{
                width: 100%;
                height: 100%;
                display: block;
              }
            }
            .download,.collection,.title,.views,.thumb,.more{
              position: absolute;
              color: #FFFFFF;
              font-size: 16px;
            }
            .download,.collection,.views,.thumb,.more{
              cursor: pointer;
            }
            .download{
              left: 95px;
              bottom: 14px;
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
              left: 50px;
              bottom: 14px;
            }
            .more{
              right: 8px;
              bottom: 14px;
              font-size: 12px;
              span{
                display: inline-block;
                width: 30px;
                text-align: center;
                cursor: pointer;
              }
              .tiShen{
                  background-color: #3598DC;
                  width: 36px;
                  height: 18px;
                  line-height: 18px;
                  margin-right: 2px;
                  border-radius: 2px;
              }
            }
          }
          &:hover{
            .state,.type-title,.time-length,.video-icon{
              display: none;
            }
            .cover-box{
              display: block;
            }
          }
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
    .el-dialog__wrapper{
      // height: 100%;
      z-index: 99999;
      box-sizing: border-box;
    }
    .el-dialog.el-dialog--center{
      margin-top: 25px !important;
      // height: 100%;
      // width: 100%;
      .el-dialog__header{
        // height: 5%;
      }
      .el-dialog__body{
        height: 800px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.7);
        padding: 20px 50px;
      }
    }
    .el-carousel__container{
      height: 90%;
      .el-carousel__item{
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .imgBox{
          display: flex;
          justify-content: center;
          align-items: center;
          width: 765px;
          height: 498px;
          // background: #000;
          overflow: hidden;
          img{
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }
}
/deep/{
  .el-dropdown-menu__item:not(.is-disabled):hover{
    color: #DD2F3C;
    background: #fff;
  }
}
</style>
