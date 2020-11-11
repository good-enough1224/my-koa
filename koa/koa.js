const http = require("http");
const context = require("./context");
const request = require("./request");
const response = require("./response");

function compose(middleware) {
  //返回组合函数
  return function (ctx) {
    function dispatch(i) {
      const fn = middleware[i];
      if (!fn) return;
      // promise 外部可以调用 async await方法
      Promise.resolve(
        //将上下文和下一个中间件一起传递下去
        fn(ctx,function () {
          return dispatch(i + 1);
        })
      );
    }
    return dispatch(0);
  };
}

class Koa {
  constructor() {
    this.middlewares = [];
  }
  listen(...args) {
    const server = http
      .createServer(async (req, res) => {
        const ctx = this.createContext(req, res);
        //设置统一响应头
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        await compose(this.middlewares)(ctx);
        res.end(ctx.body);
      })
      .listen(...args);
  }
  use(callback) {
    this.middlewares.push(callback);
  }
  createContext(req, res) {
    const ctx = Object.create(context);
    ctx.request = Object.create(request);
    ctx.response = Object.create(response);
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res;
    return ctx;
  }
}

module.exports = Koa;
