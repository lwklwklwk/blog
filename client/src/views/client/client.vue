<template>
  <div>
    <div class="head-bar">
      <div @click="toClientHome" class="backhome">
        <i class="el-icon-s-home"></i>返回首页
      </div>
      <div>
        <el-button @click="showDrawer=!showDrawer" class="drawer-button">
          <i :class="showDrawer?'el-icon-caret-right':'el-icon-caret-left'"></i>目录
        </el-button>
      </div>
    </div>
    <el-drawer :visible.sync="showDrawer" direction="ltr" size="30%">
      <div slot="title" class="drawer-title">目录</div>
        <div
          @click="changeDoc(item)"
          style="margin-left:30px;cursor:pointer;"
          v-for="item in docList"
          :key="item.id"
        >
          <div class="drawer-item">
            <i class="el-icon-menu"></i>
            <span slot="title">{{item.title}}</span>
          </div>
        </div>
    </el-drawer>
    <div style="min-width:350px;margin:0 10%" :span="16">
      <el-card>
        <div slot="header">
          <h1>{{nowDoc.title}}</h1>
        </div>
        <!-- <div id="editor">
          <textarea v-model="nowDoc.content">input</textarea>
        </div>-->
        <div id="preview">
          <mavon-editor
            ref="md"
            :subfield="false"
            :boxShadow="false"
            defaultOpen="preview"
            :toolbarsFlag="false"
            v-model=" nowDoc.content "
          />
        </div>
      </el-card>
    </div>
    <!-- <i v-if="ifLogin" @click="toAdmin" class="el-icon-edit edit"></i>
    <i  v-if="!ifLogin" @click="dialogVisible = true" class="el-icon-edit edit"></i>
    <el-dialog title="登陆" :visible.sync="dialogVisible" width="30%">
      <el-form v-if="!ifLogin" :rules="rules" ref="form" :model="form">
        <el-form-item prop="user" label="账户">
          <el-input v-model="form.user" placeholder></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登陆</el-button>
        </el-form-item>
    </el-form>-->
    <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>-->
    <!-- </el-dialog> -->
    <loginButton :query="{id:nowDoc.id}" :url="'/admin/doc'"></loginButton>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import marked from "marked";
import api from "../../api/api";
import loginButton from "@/component/loginButton.vue";
export default {
  name: "client",
  components: {
    loginButton
  },
  data() {
    return {
      markdownText: "",
      showDrawer: false,
      title: "JS闭包心得",
      docList: [],
      nowDoc: {}
    };
  },
  // computed: {
  //   compiledMarkdown: function() {
  //     return marked(this.nowDoc.content || "");
  //   }
  // },
  created() {
    api
      .getAllDoc()
      .then(e => {
        console.log(e);
        this.docList = e;
      })
      .catch(e => {
        console.log(e);
      });
    if (this.$route.query.id != undefined) {
      api.findDoc(this.$route.query.id).then(res => {
        this.nowDoc = res;
      });
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    changeDoc(doc) {
      this.nowDoc = doc;
      this.showDrawer = false;
    },
    toClientHome() {
      this.$router.push({
        path: "/"
      });
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
.head-bar {
  height: 50px;
}
.backhome {
  float: left;
  margin-left: 2%;
  color: #8ea3ad;
  cursor: pointer;
}
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* flex-direction: column; */
  align-items: center;
}
.drawer-button {
  position: fixed;
  top: 40%;
  left: 0;
  color: #607d8b;
}
.drawer-title {
  font-size: 24px;
  z-index: 2000;
}
.drawer-item {
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
<style>
.el-drawer__body{
  overflow: scroll
}
</style>

