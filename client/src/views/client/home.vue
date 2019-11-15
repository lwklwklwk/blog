<template>
  <el-card class="main">
    <loginButton :url="'/admin/home'"></loginButton>
    <div style="color:#515151;text-align:center"><span style="color:#5fbeaa">可疑的团子</span>のblog</div>
    <div class="main-head need-bar">
      <p>文章列表</p>
    </div>
    <div>
      <div class="item-box need-bar" v-for="item in docList" :key="item.id">
        <div class="item-title" @click="toDoc(item)">{{item.title}}</div>
        <span class="item-time">最后更新时间：{{toTime(item.lastTime)}}</span>
      </div>
    </div>
  </el-card>
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
    },
    toTime(time){
      let date=time.split('T')[0]
      let smallTime=time.split('T')[1].split('.')[0]
      let timeArr = smallTime.split(':')
      timeArr[0]=(+timeArr[0]+8)%24+ ''
      console.log(timeArr)
      smallTime=timeArr.join(':')
      return date+' '+smallTime
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
  color: #636363;
  font-size:26px
}
.need-bar:after {
  background: #ededed;
  content: " ";
  height: 1px;
  top: 0;
  margin-bottom:20px;
  width: 100%;
  left: 0;
  display: table;
}
.item-box {
  margin-left: 30px;

  overflow: hidden;
}
.item-title {
  color: #21759b;
  cursor: pointer;
}
.item-time {
  color: #757575;
  font-size: 16px;
  float: right;
  margin-bottom: 10px;
}
</style>