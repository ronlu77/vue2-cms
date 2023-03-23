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
        target: 'https://www.fastmock.site/mock/df0c73b1403ffe4d124009df8d63dc29/vue-cms',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },

  }
})
