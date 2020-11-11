
const Koa = require("./koa");
const Router = require('./router')
const app = new Koa();
const router = new Router()
app.use(router.routes())

router.get('/',async (ctx,next)=>{
  ctx.body = "首页"
  next()
})

router.get('/user',async (ctx,next)=>{
  ctx.body = "用户页"
  next()
})

// app.use((ctx, next) => {
//   if (ctx.url == "/") {
//     ctx.body = "hi";
//   }
//   next();
// });

// app.use((ctx, next) => {
//   if (ctx.url == "/user") {
//     ctx.body = "user";
//   }
//   next();
// });

app.listen(9090, (err) => {
  if (err) throw err;
  console.log("app is running in the localhost:9090");
});
