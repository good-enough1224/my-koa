class Router {
  constructor() {
    this.stack = [];
  }
  register(path, methods, handle) {
    this.stack.push({ path, methods, handle });
  }
  get(path, handle) {
    this.register(path, "GET", handle);
  }
  post(path, handle) {
    this.register(path, "POST", handle);
  }
  routes() {
    let stock = this.stack;
    return async function (ctx, next) {
      let route = stock.find((item) => {
        return item.path == ctx.url && ctx.methods == item.method;
      });
      if (typeof route.handle !== "function") return;
      route.handle(ctx, next);
      await next();
    };
  }
}

module.exports = Router;
