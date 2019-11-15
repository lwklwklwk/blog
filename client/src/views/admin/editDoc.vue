<template>
  <div>
    <div @click="back" class="back-doc">
        <i class="el-icon-arrow-left"></i>返回文章页
    </div>
    <div style="width:80%;margin:0 auto">
      <div style="display:flex">
        <h2 style="margin:10px">标题</h2>
        <el-input style="width:300px;margin:10px" v-model="title"></el-input>
      </div>
      <mavon-editor ref="md" @imgAdd="addImg" @save="saveMD" v-model="MDValue" />
      <!--  -->
    </div>
    <input type="file" ref="files">
    <el-button @click="upload">上传</el-button>
  </div>
</template>
<script>
import api from "../../api/api";
export default {
  data() {
    return {
      MDValue: "",
      title: "",
      doc: {}
    };
  },
  created() {
    api.findDoc(this.$route.query.id).then(res => {
      this.doc = res;
      if (this.doc.content) {
        this.MDValue = this.doc.content;
      }

      this.title = this.doc.title;
    });
  },
  methods: {
    //md编辑器相关
    saveMD() {
      if (this.title.trim() == "") {
        this.$message.error("标题不能为空");
        return;
      }
      api
        .updateDoc(this.doc.id, { content: this.MDValue, title: this.title })
        .then(res => {
          console.log(res);
          this.$message.success("保存成功");
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    addImg(url, file) {
      api
        .uploadFile(file)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          // if (err.url) {
          //   this.$refs.md.$img2Url(url, err.url);
          // }
        });
    },
    back() {
      this.$router.push({
        path: `/client?id=${this.$route.query.id}`
      });
    },
    upload() {
      if(!this.$refs.files.files){
        return
      }

            api
        .uploadFile(this.$refs.files.files[0])
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
          // if (err.url) {
          //   this.$refs.md.$img2Url(url, err.url);
          // }
        });
    }
  }
};
</script>
<style scoped>
.back-doc {
  float: left;
  margin-left: 2%;
  color: #8ea3ad;
  cursor: pointer;
}
</style>


