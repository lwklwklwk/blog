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
    <i v-if="ifLogin" @click="toAdmin" class="el-icon-edit edit"></i>
    <i v-if="!ifLogin" @click="dialogVisible = true" class="el-icon-s-custom edit"></i>
    <el-dialog title="登陆" :visible.sync="dialogVisible" width="30%">
      <el-form :rules="rules" ref="form" :model="form">
        <el-form-item prop="user" label="账户">
          <el-input v-model="form.user" placeholder></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="form.password" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登陆</el-button>
        </el-form-item>
      </el-form>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>
<script>
/* eslint-disable */
import Vue from "vue";
import marked from "marked";
import api from "../api/api";
import md5 from "js-md5";
export default {
  name: "client",
  components: {},
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      markdownText: "",
      isCollapse: true,
      title: "JS闭包心得",
      dialogVisible: false,
      ifLogin: false,
      form: {
        user: "",
        password: ""
      },
      rules: {
        user: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.markdownText);
    }
  },
  created() {
    let md5User = localStorage.getItem("md5");
    if (md5User) {
      // api.login({md5:md5User}).then(res=>console.log(res)).catch(err=>console.log(err))
      this.ifLogin = true;
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    toAdmin() {
      this.$router.push({
        path: "/admin",
        query: {
          id:1 
        }
      });
    },
    onSubmit(e) {
      this.$refs["form"].validate(valid => {
        let md5User = md5(
          JSON.stringify({
            user: this.form.user,
            password: this.form.password
          })
        );
        if (valid) {
          api
            .login({
              md5: md5User
            })
            .then(res => {
              console.log(res);
              if (res.status === 0) {
                localStorage.setItem("md5", md5User);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
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

