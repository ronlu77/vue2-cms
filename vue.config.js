const { defineConfig } = require('@vue/cli-service')

// const port = process.env.port || process.env.npm_config_port || 8080

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // close eslint validate
  publicPath: '/',
  outputDir: 'dist',   // 生产环境构建文件的目录
  assetsDir: 'static', // 放置生成静态资源的目录
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4523/m1/2542920-0-default',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },

  }
})
