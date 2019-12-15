const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const util = require('util');
const folderPath = path.join(__dirname, '../../../public/uploadFile')
module.exports = class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    const name = +new Date() + '-' + path.basename(file.filename);

    // 处理文件，比如上传到云端
    fs.copyFileSync(file.filepath, path.join(__dirname, '../../../public/uploadFile', name));
    fs.unlink(file.filepath, err => {
      console.log('tmp file delete error', err)
    });


    ctx.body = {
      status: 0,
      msg: '上传成功',
      pic: 'http://119.23.105.188:8081/public/uploadFile/' + name
    };
  }
  async getFileList() {
    const { ctx } = this;
    await util.promisify(fs.readdir)(folderPath).then(files => {
      console.log(files)
      ctx.body =
        files.map(item => {
          return {...fs.statSync(path.join(__dirname, '../../../public/uploadFile', item)),name:item}
        })
    }

    ).catch(err => {
      ctx.body = {
        status: 1,
        msg: err
      }
    })
  }
  async download() {
      const { ctx } = this;
      const filePath = path.join(__dirname, '../../../public/uploadFile', ctx.query.name)
      const fileSize = (await util.promisify(fs.stat)(filePath)).size.toString();
      ctx.attachment(filePath);
      ctx.set('Content-Length', fileSize);
      ctx.set('Content-Type', 'application/octet-stream');
      ctx.body = fs.createReadStream(filePath);
  }
  async deleteFile() {
    const { ctx } = this;
    console.log('删除',ctx.query.name)
    await util.promisify(fs.unlink)(path.join(__dirname, '../../../public/uploadFile', ctx.query.name)).then(e=>{
      ctx.body=e
      }
    ).catch(err=>{
      ctx.body=err
    })
  }
};