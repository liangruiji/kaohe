const CopyWebpackPlugin = require('copy-webpack-plugin')
// const ZipPlugin = require('zip-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const fs = require('fs')
const path = require('path')
// 判断环境
const isProd = ['production'].includes(process.env.NODE_ENV)
const copDirPath = isProd ? path.resolve(`..${process.env.VUE_APP_REMOTE_ENV_PATH}${process.env.VUE_APP_REMOTE_ENV_DIR}`) : path.resolve('dist')

// Generate pages object
const pagesObj = {}
const chromeName = ['popup', 'background', 'myPage']

chromeName.forEach(name => {
  pagesObj[name] = {
    entry: `src/${name}/index.js`,
    filename: `${name}.html`,
  }
})
const copyFiles = []
// 生成manifest文件
const manifest = isProd
  ? {
      from: path.resolve('src/manifest.production.json'),
      to: `${copDirPath}/manifest.json`,
    }
  : {
      from: path.resolve('src/manifest.development.json'),
      to: `${copDirPath}/manifest.json`,
    }
copyFiles.push(manifest)
const assets = {
  from: path.resolve('src/assets'),
  to: `${copDirPath}/assets`,
}
copyFiles.push(assets)

const plugins = [new CopyWebpackPlugin(copyFiles)]

const entryFile = {
  // 不需要远程的文件
  init: './src/options/init.js',
  init_start: './src/options/init_start.js',
  init_end: './src/options/init_end.js',
  background: './src/background/index.js',
}

// 远程文件
let remoteFiles = {}
const remoteFilesDir = './src/remote_entry'
fs.readdirSync(remoteFilesDir).forEach(file => {
  // 直接读取需要远程的入口文件目录
  if (file.includes('.js')) {
    remoteFiles[file.replace('.js', '')] = `${remoteFilesDir}/${file}`
  }
})
if (isProd) {
  for (const f in remoteFiles) {
    // 生产环境下将需要远程的文件独立remote文件夹
    entryFile[`../remote/${f}`] = remoteFiles[f]
  }
  // 生产环境打包dist为zip（因要将文件打包到远程库，所以不自动打包zip）
  // plugins.push(
  //   new ZipPlugin({
  //     path: path.resolve('dist'),
  //     filename: 'dist.zip'
  //   })
  // )
} else {
  Object.assign(entryFile, remoteFiles)
  // 开发环境将热加载文件复制到dist文件夹
  plugins.push(
    new CopyWebpackPlugin([
      {
        from: path.resolve('src/utils/hot-reload.js'),
        to: path.resolve('dist'),
      },
    ]),
  )
}

const configureWebpackHandle = () => {
  let initConfigureWebpack = {
    entry: entryFile,
    output: {
      filename: 'js/[name].js',
    },
    externals: {
      vue: 'Vue',
      'element-ui': 'ELEMENT',
    },
    plugins: plugins,
  }

  if (!isProd) {
    delete initConfigureWebpack.externals
  }
  return initConfigureWebpack
}

module.exports = {
  pages: pagesObj,
  // // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  assetsDir: 'static',
  outputDir: isProd ? path.resolve(`..${process.env.VUE_APP_REMOTE_ENV_PATH}`, process.env.VUE_APP_REMOTE_ENV_DIR) : 'dist',
  configureWebpack: configureWebpackHandle(),
  css: {
    extract: {
      filename: 'css/[name].css',
      // chunkFilename: 'css/[name].css'
    },
  },

  chainWebpack: config => {
    config.plugins.delete('preload-popup')
    config.plugins.delete('preload-options')
    config.plugins.delete('prefetch-options')
    config.plugins.delete('prefetch-popup')
    config.plugins.delete('preload-background')
    config.plugins.delete('prefetch-background')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')

    if (isProd) {
      config.optimization.minimizer([
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            // 删除注释
            output: {
              comments: false,
            },
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'],
            },
          },
        }),
      ])
    } else {
      config.optimization.minimize(false)
    }

    // 设置别名系统
    config.resolve.alias.set('@', path.resolve('src'))

    // 处理字体文件名，去除hash值
    const fontsRule = config.module.rule('fonts')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    fontsRule.uses.clear()
    fontsRule
      .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      .use('url')
      .loader('url-loader')
      .options({
        limit: 1000,
        name: 'assets/css/fonts/[name].[ext]',
      })

    // 处理html-webpack-plugin
    for (const i of chromeName) {
      config.plugin('html-' + i).tap(options => {
        // eslint-disable-next-line no-path-concat
        options[0].template = path.join(__dirname, `/src/${i}/index.html`)
        if (isProd) {
          options[0].cdn = {
            ARMS_KEY: process.env.VUE_APP_ARMS_KEY,
          }
        }

        return options
      })
    }

    // 查看打包组件大小情况
    if (process.env.npm_config_report) {
      config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    }
  },
}
