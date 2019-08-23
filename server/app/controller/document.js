/* eslint-disable strict */
// app/controller/users.js
const Controller = require('egg').Controller;
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class DocumentController extends Controller {
  async index() {

    const ctx = this.ctx;
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    ctx.body = await ctx.model.Document.findAll(query);
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.model.Document.findByPk(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;
    const { name, phone } = ctx.request.body;
    console.log(name, phone)
    const document = await ctx.model.Document.create({ name, phone });
    ctx.status = 201;
    ctx.body = document;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.Document.findByPk(id);
    if (!user) {
      ctx.status = 200;
      ctx.body={
        status:-1,
        msg:'找不到这个id对应的数据'
      }
      return;
    }

    const { content ,title} = ctx.request.body;
    await user.update({ content ,title});
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
  // async login() {
  //   const ctx = this.ctx;
  //   console.log(ctx.request.body)
  //   ctx.status = 200
  //   let checkMD5 = md5(JSON.stringify({ user: 'lwk', password: '12345' }))
  //   console.log(checkMD5)
  //   if (ctx.request.body.md5 === checkMD5) {
  //     ctx.body = {
  //       status: 0,
  //       msg: 'ok'
  //     }
  //   }
  //   else {
  //   ctx.body = {
  //     status: 1,
  //     msg: 'check error'
  //   }

  //   }
  //   return
  // }
}

module.exports = DocumentController;
