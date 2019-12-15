<template>
  <div>
    <div class="upload-box">
      <input type="file" ref="files" />
      <el-button @click="upload">上传</el-button>
    </div>

    <div style="width:700px;margin:0 auto;">
      <el-table :data="fileList" border style="width: 100%;">
        <el-table-column prop="name" label="名称" width="150"></el-table-column>
        <el-table-column prop="ctime" label="创建时间" width="200"></el-table-column>
        <el-table-column prop="size" label="大小" width="100"></el-table-column>
        <el-table-column width="100">
          <template slot-scope="scope">
          <img @click="nowPic=scope.row.pic;showPicDetail=true" style="max-width:70px" :src="scope.row.pic">
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="danger" @click="deleteFile(scope.row)" size="small">删除</el-button>
            <el-button type="primary" @click="download(scope.row)" size="small">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :show-close="false" custom-class="pic-dialog" :visible.sync="showPicDetail" width="80%" style="text-align:center;background:none">
      <img style="max-width:70%;margin:0 auto" :src="nowPic">
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api/api";
import help from "@/util/help";
export default {
  data() {
    return {
      fileList: [],
      showPicDetail:false,
      nowPic:''
    };
  },
  mounted() {
    console.log("url", process.env);
    if (!localStorage.getItem("md5")) {
      this.$message({ type: "error", message: "未登录" });
      this.$router.push({
        path: "/"
      });
    }
    this.getFileList();
  },
  methods: {
    upload() {
      if (!this.$refs.files.files.length) {
        return;
      }
      api
        .uploadFile(this.$refs.files.files[0])
        .then(res => {
          console.log(res);
          this.$message({
            type: "success",
            message: "上传成功",
            showClose: true
          });
          this.getFileList();
        })
        .catch(err => {
          console.log(err);
          // if (err.url) {
          //   this.$refs.md.$img2Url(url, err.url);
          // }
        });
    },
    getFileList() {
      api
        .getFileList()
        .then(e => {
          console.log(e);
          let picType=['bmp','jpg','png','tif','gif','pcx','tga','exif','fpx','svg','psd','cdr','pcd','dxf','ufo','eps','ai','raw','WMF','webp']
          this.fileList = e.map(item => {
            let obj= {
              name: item.name,
              ctime: help.UTCTimeChange(item.ctime),
              size:
                item.size < 1048576
                  ? (item.size / 1024).toFixed(1) + "KB"
                  : (item.size / 1048576).toFixed(1) + "MB"
            };
            if(picType.indexOf(item.name.split('.').slice(-1)+'')>-1){
              obj.pic=process.env.VUE_APP_url+'/public/uploadFile/'+item.name
            }
            return obj
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    download(row) {
      console.log(row);
      api.download(row.name);
    },
    deleteFile(row) {
      this.$confirm("确定删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api
            .deleteFile(row.name)
            .then(e => {
              this.$message({
                type: "success",
                message: "删除成功!",
                showClose: true
              });
              this.getFileList();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
            showClose: true
          });
        });
    }
  }
};
</script>
<style>
.upload-box {
  margin: 0 auto;
  margin-bottom: 2%;
  width: 600px;
}
.pic-dialog{
  background: none !important;
}
</style>