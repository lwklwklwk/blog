<template>
  <div>
    <div>
            <i
        style="position: relative;font-size: 54px;color: #607D8B;"
        @click="showDrawer=!showDrawer"
        :class="showDrawer?'el-icon-caret-right':'el-icon-caret-left'"
      ></i>
    </div>

      <el-drawer title="目录" :visible.sync="showDrawer" direction='ltr' size="30%">
        <div @click="changeDoc(item)" style="margin-left:30px;cursor:pointer" v-for="item in docList" :key="item.id">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.title}}</span>
        </div>
      </el-drawer>
    <el-col :offset="1" :span="16">
      <el-card>
        <div slot="header">
          <h1>{{nowDoc.title}}</h1>
        </div>
        <!-- <div id="editor">
          <textarea v-model="nowDoc.content">input</textarea>
        </div> -->
        <div id="preview">
          <div v-html="compiledMarkdown"></div>
        </div>
      </el-card>
    </el-col>
    <i v-if="ifLogin" @click="toAdmin" class="el-icon-edit edit"></i>
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
      showDrawer: false,
      title: "JS闭包心得",
      dialogVisible: false,
      ifLogin: false,
      form: {
        user: "",
        password: ""
      },
      rules: {
        user: [{ required: true, message: "用户名", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      },
      docList: [],
      nowDoc:{}
    };
  },
  computed: {
    compiledMarkdown: function() {
      return marked(this.nowDoc.content||'');
    }
  },
  created() {
    let md5User = localStorage.getItem("md5");
    if (md5User) {
      // api.login({md5:md5User}).then(res=>console.log(res)).catch(err=>console.log(err))
      this.ifLogin = true;
    }
    api
      .getAllDoc()
      .then(e => {
        console.log(e);
        this.docList = e;
      })
      .catch(e => {
        console.log(e);
      });
      console.log(this.$route.query.docId)
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
          id: this.nowDoc.id
        }
      });
    },
    onSubmit(e) {
      const that = this;
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
                that.$message({ type: "success", message: "登录成功" });
              }
            })
            .catch(err => {
              that.$message({ type: "error", message: err });
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    changeDoc(doc){
      this.nowDoc = doc;
      this.showDrawer = false
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

