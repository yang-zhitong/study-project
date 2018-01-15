const Koa = require("koa");
const path = require("path");
const views = require("koa-views");
const Router = require("koa-router");
const static = require("koa-static");

const app = new Koa();
const router = new Router();

// 加载模板引擎, 如果先加载静态文件目录, 会无法找到views
app.use(
  views(path.join(__dirname, "/views"), {
    extension: "ejs"
  })
);

router.get("/", async (ctx, next) => {
  let title = "hello koa2";
  await ctx.render("index", {
    title
  });
});

app.use(router.routes()).use(router.allowedMethods());

app.use(static(path.join(__dirname, "public")));

app.listen(3000);
