const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // 這裡指定你的 API 路由前綴，例如 /api
    createProxyMiddleware({
      target: 'http://localhost:5000',  // 指定 Express 後端的地址
      changeOrigin: true,
    })
  );
};