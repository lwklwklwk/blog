import app from './main.js'
import axios from 'axios'

const service = axios.create({
  baseURL: ' https://www.easy-mock.com/mock/5cbd7028e17df21e0db6c4dd/example', // api的base_url
  timeout: 5000 // 请求超时时间
})

service.interceptors.response.use(
  response => { // 成功请求到数据
    // app.$loading().close()
    // 这里根据后端提供的数据进行对应的处理
    if (response.data.status === 0) {
      return response.data
    } else {
      app.$message({
        showClose: true,
        message: response.data.info,
        type: 'error'
      })
      throw response.data.info
    }
  },
  error => { // 网络响应错误处理
    // eslint-disable-next-line
        app.$message({
      showClose: true,
      message: `网络出现问题(http请求出问题)`,
      type: 'error'
    })

    return Promise.reject(error)
  }
)
export default service
