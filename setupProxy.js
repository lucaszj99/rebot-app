const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("setting up proxy");
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://asia-southeast2-rebot-ef7ef.cloudfunctions.net/api",
      changeOrigin: true,
    })
  );
};
