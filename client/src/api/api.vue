<script>
import axios from "../myaxios.js";
export default {
  async getTest(params = {}) {
    console.log(this);
    return axios.get("test", params);
  },
  async login(MD5params) {
    // console.log(MD5params)
    return axios({
      url: `login`,
      method: "post",
      type: "json",
      data: MD5params
    });
  },
  async findDoc(id) {
    return axios({
      url: `document/${id}`,
      method: "get"
    });
  },
  async getAllDoc() {
    return axios({
      url: `document`,
      method: "get"
    }).then(e=>{
              e.sort((a,b)=>{
          return Date.parse(b.lastTime)- Date.parse(a.lastTime)
        })
        return e
    })
  },
    async createDoc(data) {
    return axios({
      url: `document`,
      method: "post",
      data: data
    });
  },
  async updateDoc(id, data) {
    return axios({
      url: `document/${id}`,
      method: "put",
      data: data
    });
  },
    async deleteDoc(id) {
    return axios({
      url: `document/${id}`,
      method: "delete"
    });
  },
  async uploadFile(file) {
    console.log(file)
    let fd= new FormData()
    fd.append('file',file)
    return axios({
      url: `upload`,
      method: "post",
      data: fd,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
  },
  async getFileList(){
    return axios({
      url:`getFileList`,
      method:'get'
    })
  },
  download(name){
    window.open(process.env.VUE_APP_url+'/download?name='+name)
  },
  deleteFile(name) {
    return axios({
      url:`deleteFile?name=`+name,
      method:'get'
    })
  }
};
</script>
