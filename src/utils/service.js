import axios from 'axios'
import { Message } from 'element-ui'
// import router from '../router';

const http = axios.create()

const storage = JSON.parse(localStorage.getItem('Authorization'))
if (storage) {
  http.defaults.headers['Authorization'] = JSON.parse(localStorage.getItem('Authorization')).token
}

http.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.headers['content-type'] = 'application/json'
  }
  return config
})

http.interceptors.response.use((response) => {
  const { code, msg: message } = response.data
  if (code !== 200 && code !== 10001 && code !== 10003) {
    Message.error(message)
    const err = new Error(message)
    err.code = code
    return Promise.reject(err)
  }
  return response.data
}, (err) => {
  if (status === 401 || status === 403) {
    // 跳转登录页
  }
  return Promise.reject(err)
})

export default http
