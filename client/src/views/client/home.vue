<template>
  <div class="main">
    <loginButton :url="'/admin/home'"></loginButton>
    <div style="text-align: center;">可疑的团子的blog</div>
    <div class="main-head">
      <p>文章列表</p>
    </div>
    <div>
      <div
        @click="toDoc(item)"
        style="margin-left:30px;cursor:pointer"
        v-for="item in docList"
        :key="item.id"
      >
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.title}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import api from "@/api/api";
import loginButton from "@/component/loginButton.vue";
export default {
  data() {
    return {
      docList: {}
    };
  },
  components: {
    loginButton
  },
  mounted() {
    api
      .getAllDoc()
      .then(e => {
        console.log(e);
        this.docList = e;
      })
      .catch(e => {
        console.log(e);
      });
  },
  methods: {
    toDoc(item) {
      this.$router.push({
        path: `/client?id=${item.id}`
      });
    }
  }
};
</script>
<style scoped>
.main {
  width: 80%;
  margin: 0 auto;
  font-size: 30px;
}
.main-head {
  font-size: 20px;
  text-align: initial;
  position: relative;
}
.main-head:after {
  background: #9e9e9e;
  content: " ";
  height: 1px;
  top: 0;
  width: 100%;
  left: 0;
  display: table;
}
</style>