const getTimeData = (dataTime) => {
  dataTime = new Date(dataTime.replace(/-/g, '/')).getTime()
  let currentTime = new Date().getTime()
  let forwardTime
  let seconds = parseInt((currentTime - dataTime) / 60000)
  if (seconds < 1) {
    forwardTime = '1分钟前'
  } else if (seconds < 60 && seconds > 1) {
    forwardTime = seconds + '分钟前'
  } else if (seconds > 60 && seconds < 1440) {
    forwardTime = parseInt(seconds / 60) + '小时前'
  } else if (seconds > 1440) {
    forwardTime = parseInt(seconds / 1440) + '天以前'
  }
  return forwardTime
}
const hideText = (spanText, num) => {
  let str = spanText
  str = str.replace(/-/g, '/')
  let len = str.length
  let str2 = ''
  if (len > num) {
    str2 = str.substring(0, num) + '...'
  } else {
    str2 = str
  }
  return str2
}
// 获取url上的参数
const GetQueryString = (name) => {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2])
  return null
}
export default {
  getTimeData,
  hideText,
  GetQueryString
}
