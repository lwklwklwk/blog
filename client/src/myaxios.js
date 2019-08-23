import app from './main.js'
import axios from 'axios'

const service = axios.create({
  baseURL: ' http://127.0.0.1:8081', // api的base_url
  timeout: 5000 // 请求超时时间
})
//请求发送拦截，把数据发送给后台之前做些什么......
service.interceptors.request.use((request) => {
  let md5User=localStorage.getItem('md5')
  if(md5User){
    request.headers.token = md5User
  }
  return request;

}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});
service.interceptors.response.use(
  response => { // 成功请求到数据
    // app.$loading().close()
    // 这里根据后端提供的数据进行对应的处理    
    if (response.data.status === -1) {
      throw response.data
    }
    return response.data
//  else {
    //   app.$message({
    //     showClose: true,
    //     message: response.data.info,
    //     type: 'error'
    //   })
    //   throw response.data.info
    // }
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
