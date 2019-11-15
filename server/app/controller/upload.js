const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
module.exports = class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = +new Date()+'-'+ path.basename(file.filename);

      // 处理文件，比如上传到云端
       fs.copyFileSync(file.filepath,path.join(__dirname,'../public/img',name));
     fs.unlink(file.filepath,err=>{
        console.log('tmp file delete error',err)
      });


    ctx.body = {
      status:0,
      msg:'上传成功',
      pic:'http://119.23.105.188:8088/public/img/'+name
    };
  }
};