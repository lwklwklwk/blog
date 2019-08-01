<template>
  <div>
    <router-view ></router-view>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import marked from "marked";
import api from "./api/api";
export default {
  components: {},
  data() {
    return {
      markdownText: "",
      isCollapse: true,
      title:'JS闭包心得'
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.markdownText);
    }
  },
  created() {
    // let that = this;
    // this.socket = io("127.0.0.1:3000");
    // this.socket.on("getTH", msg => {
    //   this.tableHead = msg.TH;
    //   this.tableData = msg.TD;
    //   console.log("收到TH");
    // });
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
  // watch: {
  //   tableHead: {
  //     handler(newval,oldval) {
  //       console.log(newval)
  //       console.log(oldval)
  //       //this.socket.emit('sentTH',newval);
  //     },
  //     deep: true
  //   },
  //   tableData: {
  //     handler(newval) {
  //       console.log(newval);
  //     },
  //     deep: true
  //   },
  // }
};
</script>
<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* flex-direction: column; */
  align-items: center;
}
</style>

