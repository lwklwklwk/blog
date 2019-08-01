<script>
import axios from "../myaxios.js";
export default {
  async getTest(params = {}) {
    console.log(this);
    return axios.get("test", params);
  }
}
</script>
