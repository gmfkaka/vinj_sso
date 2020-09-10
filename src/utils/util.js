import Vue from 'vue'
import axios from 'axios'
// import msgbox from '../components/MessagePopup';

/**
 * 在 Vue 的原型上挂载方法
 */
export const defVueProto = (obj) => {
  const propObj = {}
  Object.keys(obj).forEach((key) => {
    propObj[`$${key}`] = {
      get () {
        return obj[key]
      }
    }
  })
  Object.defineProperties(Vue.prototype, propObj)
}

export const getRequestAnimationFrame = () => {
  if (window.requestAnimationFrame) {
    return window.requestAnimationFrame.bind(window)
  }

  const prefix = ['moz', 'ms', 'webkit'].find(key => `${key}$RequestAnimationFrame` in window)

  return prefix
    ? window[`${prefix}RequestAnimationFrame`].bind(window)
    : (function requestAnimationFramePolyfill () {
      let lastTime = 0
      return function (callbackFn) {
        const currTime = new Date().getTime()
        const timeToCall = Math.max(0, 16 - (currTime - lastTime))
        const id = window.setTimeout(() => callbackFn(currTime + timeToCall), timeToCall)
        lastTime = currTime + timeToCall
        return id
      }
    })()
}

export const cancelRequestAnimationFrame = (id) => {
  if (typeof window === 'undefined') {
    return null
  }
  if (window.cancelAnimationFrame) {
    return window.cancelAnimationFrame(id)
  }
  const prefix = ['', 'moz', 'ms', 'webkit'].find(key =>
    `${key}CancelAnimationFrame` in window || `${key}CancelRequestAnimationFrame` in window
  )

  return prefix
    ? (window[`${prefix}CancelAnimationFrame`] || window[`${prefix}CancelRequestAnimationFrame`]).call(this, id)
    : clearTimeout(id)
}

export const reqAnimFrame = getRequestAnimationFrame()

export const throttleByAnimationFrame = (fn) => {
  let requestId

  const later = (args) => () => {
    requestId = null
    fn(...args)
  }

  const throttled = (...args) => {
    if (requestId == null) {
      requestId = reqAnimFrame(later(args))
    }
  }

  throttled.cancel = () => cancelRequestAnimationFrame(requestId)

  return throttled
}

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => resolve(position.coords), err => reject(err))
    } else {
      reject(new Error('Geolocation is not supported'))
    }
  })
}

// 包裹 api，再调用时取消上次的请求
export const canCancelApiWrapper = (fn) => {
  let source = fn._source
  if (source) source.cancel()
  source = axios.CancelToken.source()
  fn._source = source
  return (...args) => fn(...args, source)
}

// 高阶函数写法
export const canCancelApiHOF = (fn, ...args1) => {
  let source
  return (...args2) => {
    if (source) source.cancel()
    source = axios.CancelToken.source()
    fn(...args1, ...args2, source)
  }
}

export const isVNode = (node) => {
  return typeof node === 'object' && node.hasOwnProperty('componentOptions')
}
/**
 * 互动消息弹窗
 * @param {VNode} content
 */
// const MsgBoxConstructor = Vue.extend(msgbox);
// let instance = null;

// export const popupMsg = (content) => {
//   if (!isVNode(content)) throw new Error('需传入 VNode');
//   if (!instance) {
//     instance = new MsgBoxConstructor({
//       el: document.createElement('div')
//     });
//   }
//   instance.$slots.default = [content];
//   let dom = document.getElementById('interact-info-body') || document.body;
//   dom.appendChild(instance.$el);
//   Vue.nextTick(() => {
//     instance.visible = true;
//   });
// };
// 获取cookie、
export function getCookie (name) {
  let arr
  let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
  arr = document.cookie.match(reg)
  if (arr) {
    return unescape(arr[2])
  } else {
    return null
  }
}
// 设置cookie,增加到vue实例方便全局调用
export function setCookie (cName, value, expiredays) {
  let exdate = new Date()
  let cookiePath = '/'
  let cookieDomain = '.vinj.cn'
  // let cookieDomain = '.sso.plus.vinj.cn'
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = cName + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString()) + ((cookiePath) ? ';path=' + cookiePath : '') + ((cookieDomain) ? ';domain=' + cookieDomain : '')
}

// 删除cookie
export function delCookie (name) {
  let exp = new Date()
  exp.setTime(exp.getTime() - 1)
  let cval = getCookie(name)
  if (cval != null) {
    document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString()
  }
}
