const path = require("path");
const webpack = require("webpack");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");


const PRODUCTION = 'production';
const DEVELOPMENT = 'development';
const NODE_ENV = process.env.NODE_ENV || PRODUCTION;
const SOURCE_PATH = 'src';
const COMMON_CHUNK_NAME = 'vendors';
let config = {
  mode: NODE_ENV,
  devtool: NODE_ENV === DEVELOPMENT?'cheap-module-eval-source-map':false,
  context: path.resolve(__dirname, 'src'),
  entry: {
    [COMMON_CHUNK_NAME]: ["react", "react-dom", "prop-types"],
    // home: ['pages/home/home.entrity.js'],
    // about: 'pages/about/about.entrity.js',

  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.(css|less)$/,
      include: /src/,
      exclude: /node_modules/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        {
          loader: 'css-loader',
          options: { importLoaders: 1, sourceMap: NODE_ENV===DEVELOPMENT }
        },
        {
          loader: 'less-loader',
          options: { sourceMap: NODE_ENV===DEVELOPMENT }
        }
      ]
    }
    ]
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, './src/pages'),
      common: path.resolve(__dirname, './src/common')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: COMMON_CHUNK_NAME,
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      //chunkFilename:'[name].[hash:8].chunk.css'
    })
  ]
}
const entryFileNameList = glob.sync(`${SOURCE_PATH}\\pages\\**\\*.entrity.js`);
const entryNameList = entryFileNameList.map((entryFileName) => {
    var filename = path.basename(entryFileName, '.js');
    var pathname = path.relative(path.join(SOURCE_PATH, 'pages'), entryFileName);
    return [filename, pathname];
});
entryNameList.forEach(function(entryName){
  const [filename, pathname] = entryName;
  config.entry[filename] = `pages/${pathname}`;//入口
  config.plugins.push(new HtmlWebpackPlugin({//指定html路径
    template: `html/${pathname.replace('.entrity.js','.html')}`,
    filename: `entries/${pathname.replace('.entrity.js','.html')}`,
    chunks: [COMMON_CHUNK_NAME, filename]
  }))
});
if(NODE_ENV === DEVELOPMENT){
  config.devServer = {
    port: 8085,
    hot: true,
    host: '127.0.0.1',
    contentBase: './dist/',
    historyApiFallback: {
      disableDotRule: true
    },
    overlay: true,
    inline: true,
    open: true,
    stats: "errors-only"
  };
  // 开始热更新
  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  );
}
module.exports = config;