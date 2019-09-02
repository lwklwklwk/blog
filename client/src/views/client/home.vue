<template>
  <div class="main">
     <loginButton :url="'/admin/home'"></loginButton>
    <div>可疑的团子的blog</div>
    <div class="main-head"> <p> 文章列表</p></div>
    <div></div>
  </div>
</template>
<script>
import api from "@/api/api";
import loginButton from "@/component/loginButton.vue";
export default {
  data() {
    return {
      docList:{}
    };
  },
  components:{
    loginButton
  },
  mounted(){
        api
      .getAllDoc()
      .then(e => {
        console.log(e);
        this.docList = e;
      })
      .catch(e => {
        console.log(e);
      });
  }
};
</script>
<style scoped>
.main{
  width:80%;
  margin:0 auto;
  text-align: center;
  font-size: 30px
}
.main-head{
    font-size: 20px;
    text-align: initial;
    position: relative;
}
.main-head:after {
    background: #9E9E9E;
    content: " ";
    height: 1px;
    top: 0;
    width: 100%;
    left: 0;
    display: table;
}
</style>