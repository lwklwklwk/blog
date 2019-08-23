const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
module.exports = class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = +new Date()+'-'+ path.basename(file.filename);
    try {
      // 处理文件，比如上传到云端
      await fs.copyFile(file.filepath,path.join(__dirname,'/static/img',name),err=>{
        console.log('copy err',err)
      });
    } finally {
      // 需要删除临时文件
      await fs.unlink(file.filepath,err=>{
        console.log('tmp file delete error',err)
      });
    }

    ctx.body = {
      status:0,
      msg:'上传成功'
    };
  }
};