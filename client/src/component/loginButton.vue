<template>
  <div>
    <i v-if="ifLogin" @click="goTo" class="el-icon-edit edit"></i>
    <i v-if="!ifLogin" @click="dialogVisible = true" class="el-icon-edit edit"></i>
    <el-dialog title="登陆" :visible.sync="dialogVisible" width="30%">
      <el-form v-if="!ifLogin" :rules="rules" ref="form" :model="form">
        <el-form-item prop="user" label="账户">
          <el-input v-model="form.user" placeholder></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input @keyup.enter.native="login" v-model="form.password" placeholder></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登陆</el-button>
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
import api from "../api/api";
import md5 from "js-md5";
export default {
  props: {
    url:{},query:{}
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    return {
      dialogVisible: false,
      ifLogin: false,
      form: {
        user: "",
        password: ""
      },
      rules: {
        user: [{ required: true, message: "用户名", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  mounted() {
    let md5User = localStorage.getItem("md5");
    if (md5User) {
      // api.login({md5:md5User}).then(res=>console.log(res)).catch(err=>console.log(err))
      this.ifLogin = true;
    }
  },
  methods: {
    login(e) {
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
                this.ifLogin = true;
                this.dialogVisible = false;
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
        goTo() {
      this.$router.push({
        path: this.url,
        query: {
          ...this.query
        }
      });
    },
  }
};
</script>
<style scoped>
.edit {
  border: 1px solid rgb(96, 125, 139);
  color: rgb(96, 125, 139);
  position: fixed;
  right: 30px;
  top: 50%;
  z-index: 2000;
  font-size: 50px;
  cursor: pointer;
}
</style>