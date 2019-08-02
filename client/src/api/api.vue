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
      data:MD5params
    })
  },
  async findDoc(id) {
        return axios({
      url: `document/${id}`,
      method: "get"
    })
  }
};
</script>
