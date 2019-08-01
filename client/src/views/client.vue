<template>
  <div>
    <el-col :span="isCollapse?2:6">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#e6e6e6"
        text-color="#9E9E9E"
        active-text-color="#607D8B"
        :collapse="isCollapse"
      >
        <i
          style="position: relative;font-size: 54px;color: #607D8B;"
          @click="isCollapse=!isCollapse"
          :class="isCollapse?'el-icon-caret-right':'el-icon-caret-left'"
        ></i>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :offset="1" :span="16">
      <el-card>
        <div slot="header">
          <h1>{{title}}</h1>
        </div>
        <div id="editor">
          <textarea v-model="markdownText">input</textarea>
        </div>
        <div id="preview">
          <div v-html="compiledMarkdown"></div>
        </div>
      </el-card>
    </el-col>
    <i @click="toAdmin" class="el-icon-edit edit"></i>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import marked from "marked";
import api from "../api/api";
export default {
  name: "client",
  components: {},
  data() {
    return {
      markdownText: "",
      isCollapse: true,
      title: "JS闭包心得"
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
    },
    toAdmin(){
      this.$router.push('/admin')
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
.edit {
  border: 1px solid rgb(96, 125, 139);
  color: rgb(96, 125, 139);
  position: absolute;
  right: 30px;
  top: 50%;
  font-size: 50px;
  cursor: pointer;
}
</style>

