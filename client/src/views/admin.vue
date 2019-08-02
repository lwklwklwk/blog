<template>
  <div>
    <mavon-editor ref="md" @imgAdd="addImg" @save="saveMD" v-model="MDValue" />
  </div>
</template>
<script>
import api from "../api/api";
export default {
  data() {
    return {
      MDValue:''
    };
  },
  created(){
    api.findDoc(this.$route.query.id).then(res=>{
      this.MDValue=res.content
    })
  },
  methods: {
    //md编辑器相关
    saveMD() {
      console.log(this.MDValue);
      flowApi
        .update(this.flowId, { doc: this.MDValue })
        .then(res => {
          console.log(res);
          this.$message.success("保存成功");
        })
        .catch(err => {
          console.log(err);
        });
    },
    addImg(url, file) {
      flowApi
        .uploadStaticFile(file)
        .then(res => {})
        .catch(err => {
          console.log(err);
          if (err.url) {
            this.$refs.md.$img2Url(url, err.url);
          }
        });
    }
  }
};
</script>
