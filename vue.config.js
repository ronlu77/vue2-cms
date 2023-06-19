const { defineConfig } = require('@vue/cli-service')
// 解析加载 svg
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
// const port = process.env.port || process.env.npm_config_port || 8080

const name = 'vue-cms'

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, // close eslint validate
  publicPath: '/',
  outputDir: 'dist',   // 生产环境构建文件的目录
  assetsDir: 'static', // 放置生成静态资源的目录
  devServer: {
    port: 8080,
    // open: true,
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
  },
  chainWebpack(config) {
    // 处理 vue-cli 默认情况下会使用 url-loader 对svg 进行处理,和 svg sprite 冲突
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
