import { stringify } from 'qs'
import http from '../utils/http'
// 登录
export const userLogin = param => http.post(`/member/login?`, param)

// 注册
export const userRegister = param => http.post(`/member/register?`, param)

// 获取未读消息
export const getMsgUnread = param => http.get(`/member/message/unread?`, param)
// http://sso.vinj.cn/api/member/message/unread?access_token=a3b128ed05a36ed4b812f36538f89d8b

// 获取验证码 /member/sendCode
export const sendCode = param => http.get(`/member/sendCode?${stringify(param)}`)

// 获取自己的用户信息 /member/info
export const userInfo = param => http.get(`/member/info?${stringify(param)}`)

// 忘记密码/member/forgotPwd
export const forgotPwd = param => http.get(`/member/forgotPwd?${stringify(param)}`)

// 重置密码 /member/resetPwd
export const resetPwd = param => http.post(`/member/resetPwd?`, param)

// 签约 /member/sign
export const signing = param => http.post(`/member/sign?`, param)

// 获取他人用户信息 /member/getOthersInfo
export const getOthersInfo = param => http.get(`/member/getOthersInfo?${stringify(param)}`)

// 判断是否绑定 /member/isBind
export const isBind = param => http.get(`/member/isBind?${stringify(param)}`)

// 完善用户信息 /member/updateInfo
export const updateInfo = param => http.post(`/member/updateInfo?`, param)

// 更新用户头像 /member/updateAvatar
export const updateAvatar = param => http.post(`/member/updateAvatar?`, param)

// 我的收藏 /member/collection
export const collection = param => http.get(`/member/collect/my?${stringify(param)}`)

// 获取地理位置 /member/location
export const location = param => http.get(`/member/location?${stringify(param)}`)

// 图片上传 /gallery/upload
export const uploadImg = param => http.post(`/gallery/upload?`, param)

// 设为封面 /gallery/cover/upload
export const coverImg = param => http.post(`/gallery/cover/upload?`, param)

// 图集创建 /gallery/create
export const createGallery = param => http.post(`/gallery/create?`, param)

// 视频更新 /video/update
export const updateVideo = param => http.put(`/video/update?`, param)

// 参加活动列表 /activity/list
export const activityList = (param) => http.get(`/activity/list?${stringify(param)}`)

// 参与的评分列表 /api/activity/committeeList
export const joinActivityList = (param) => http.get(`/activity/committeeList?${stringify(param)}`)

// 活动下的稿件 /api/activity
export const activityArticleList = (param) => http.get(`/activity/detail?${stringify(param)}`)

// 我的作品 --图片/gallery/personal/publish
export const publishList = (param) => http.get(`/gallery/personal/publish?${stringify(param)}`)

// 我的作品-- 视频 /video/personal/list
export const videoPublishList = (param) => http.get(`/video/personal/list?${stringify(param)}`)

// 我的作品-图片审核 /gallery/audit
export const auditPicWorks = (param) => http.put(`/gallery/audit?${stringify(param)}`)

// 我的作品-图片编辑 gallery/photo/update
export const editPicWorks = (param) => http.put(`/gallery/photo/update?${stringify(param)}`)

// 我的作品-图片详情 /gallery/photo/detail
export const detailPicWorks = (param) => http.get(`/gallery/photo/detail?${stringify(param)}`)

// 我的作品-图片删除 /gallery/delete
export const deletePicWorks = (param) => http.delete(`/gallery/delete?${stringify(param)}`)

// 我的作品-图片下载 /gallery/center/download
export const downloadPicWorks = (param) => http.get(`/gallery/center/download?${stringify(param)}`)

// 我的作品-视频审核 /video/audit
export const auditVideoWorks = (param) => http.put(`/video/audit?${stringify(param)}`)

// 我的作品-视频编辑 /video/update
export const editVideoWorks = (param) => http.put(`/video/personal/update?${stringify(param)}`)

// 我的作品-视频详情 /video/detail
export const detailVideoWorks = (id) => http.get(`/video/detail/${id}`)

// 我的作品-视频删除 /video/delete
export const deleteVideoWorks = (param) => http.delete(`/video/delete?${stringify(param)}`)

// 我的作品-视频下载 /video/download
export const downloadVideoWorks = (param) => http.get(`/video/download?${stringify(param)}`)

// 他人用户信息 /member/getOthersInfo
export const othersInfo = (param) => http.get(`/member/getOthersInfo?${stringify(param)}`)

// 他人收藏 /member/collect/others
export const otherCollect = (param) => http.get(`/member/collect/others?${stringify(param)}`)

// 他人的图片 /gallery/others/photos
export const otherPhotos = (param) => http.get(`/gallery/others/photos?${stringify(param)}`)

// 当前用户数据统计量 /member/works/data
export const worksDatas = (param) => http.get(`/member/works/data?${stringify(param)}`)

// 获取栏目 数据 http://m2o-api.plus.vinj.cn/api/publish/column?father_id=0&site_id=1
export const columnList = (param) => http.get(`/publish/column_list?site_id=0&type=sso`)

// 我的下载 /gallery/photo/download
export const download = (param) => http.get(`/gallery/photo/download?${stringify(param)}`)

// 获取图集 图片列表 photos/{gallery_id}
export const photosList = (id) => http.get(`/gallery/photos/${id}?force=1`)

// 获取活动详情 /api/activity/details
export const activityDetails = (param) => http.get(`/activity/details?${stringify(param)}`)
