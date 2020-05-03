const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  // 输出文件目录
  outputDir: 'docs',
  // 基本路径
  publicPath: './',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,

  configureWebpack: (config) => {
    let plugins = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      }),
    ];
    if (process.env.NODE_ENV !== 'development') {
      config.plugins = [...config.plugins, ...plugins];
    }
  },
};
