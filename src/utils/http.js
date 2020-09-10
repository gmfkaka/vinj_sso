import axios from 'axios'
import router from '../router'
// Vue.use(router)
// const CancelToken = axios.CancelToken
// var cancel
let service = axios.create({
  // baseURL: 'http://plus-middle-end.dev.hoge.cn/api',
  baseURL: 'http://sso.vinj.cn/api',
  // timeout: 5000,
  headers: {
    'content-type': 'application/json'
    // 'token': localStorage.getItem('token')
  }
})
export default {
  // get请求
  get (url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'get',
        url,
        params: param
      })
        .then(res => {
          let resCode = res.status.toString()
          // 200
          if (resCode.charAt(0) === '2') {
            resolve(res.data)
          } else {
            router.replace({
              path: '/noData'
            })
          }
        })
        // .catch(err => {
        //   if (!err.response) {
        //     router.push({
        //       path: '/error'
        //     })
        //   } else {
        //     reject(err.response)
        //     router.push({
        //       path: '/error'
        //     })
        //   }
        // })
      // .then(res => {
      //   let resCode = res.status.toString()
      //   // 200
      //   if (resCode.charAt(0) === '2') {
      //     resolve(res)
      //   } else {
      //     router.replace({
      //       path: '/noData'
      //     })
      //   }
      // })
      // .catch(err => {
      //   if (!err.response) {
      //     router.push({
      //       path: '/error'
      //     })
      //   } else {
      //     reject(err.response)
      //     router.push({
      //       path: '/error'
      //     })
      //   }
      // })
    })
  },
  // post请求
  post (url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'post',
        url,
        data: param
        // cancelToken: new CancelToken(c => {
        //   cancel = c
        // })
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        console.log(err, '异常')
      })
    })
  },
  // put请求
  put (url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'put',
        url,
        data: param
        // cancelToken: new CancelToken(c => {
        //   cancel = c
        // })
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        console.log(err, '异常')
      })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          console.log(err, '异常')
        })
    })
  },
  // delete请求
  delete (url, param) {
    return new Promise((resolve, reject) => {
      service({
        method: 'delete',
        url,
        data: param
        // cancelToken: new CancelToken(c => {
        //   cancel = c
        // })
      }).then(res => {
        resolve(res.data)
      }).catch(err => {
        console.log(err, '异常')
      })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log(err, '异常')
        })
    })
  }
}
