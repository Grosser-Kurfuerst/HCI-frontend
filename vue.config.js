const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8080,  //没被占用，可以使用的端口
    open: true,
    proxy: {
      '/api':{
        target: 'http://localhost:8000', //接口域名
        changeOrigin: true,             //是否跨域
        secure: true,                   //是否https接口
        pathRewrite: {                  //路径重置
          '^/api': ''
        }
      }
    },
    client: {
      overlay: false,
    },
  }
})
