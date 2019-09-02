<template>
  <div style="width:80%;margin:0 auto">
    <div style="display:flex">
      <h2 style="margin:10px">标题</h2>
      <el-input style="width:300px;margin:10px" v-model="title"></el-input>
    </div>
    <mavon-editor ref="md" @imgAdd="addImg" @save="saveMD" v-model="MDValue" />
    <!--  -->
  </div>
</template>
<script>
import api from "../../api/api";
export default {
  data() {
    return {
      MDValue:'',
      title:"",
      doc:{}
    };
  },
  created(){
    api.findDoc(this.$route.query.id).then(res=>{
      this.doc=res
      this.MDValue =this.doc.content
      this.title = this.doc.title
    })
  },
  methods: {
    //md编辑器相关
    saveMD() {
      if(this.title.trim()==''){
        this.$message.error('标题不能为空')
        return
      }
      api.updateDoc(this.doc.id, { content: this.MDValue ,title:this.title})
        .then(res => {
          console.log(res);
          this.$message.success("保存成功");
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg)
        });
    },
    addImg(url, file) {
     api
        .uploadFile(file)
        .then(res => {
          console.log(res)
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
