const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const args = process.argv;
const isFileCSS = args.includes('--styles');
const date = Date.now();

const imageExt = ['jpg', 'jpeg', 'gif', 'svg', 'png'];

const plugins = [
  new HtmlWebpackPlugin({
    template: 'index.html',
    title: 'element builder',
    filename: 'index.html',
    chunksSortMode: 'none'
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.ProvidePlugin({
    React: 'react',
    Component: ['react', 'Component'],
  }),
  new CopyWebpackPlugin(
    imageExt.map(ext => ({
      from: `**/*/*${ext}`,
      to: 'images/[name].[ext]'
    }))
  ),
];

if (isFileCSS) {
  plugins.push(new MiniCssExtractPlugin({ filename: `styles-[hash]-${date}.css` }));
}

module.exports = {
  entry: ['@babel/polyfill', './app.js'], //'./app.js',
  context: path.resolve(__dirname, '../src'),
  output: {
    filename: 'bundle-[name].js',
    path: path.resolve(__dirname, '../dist'),
    chunkFilename: 'vendors.js',
    publicPath: '/',
  },

  mode: 'development',

  resolve: {
    alias: {
      services: path.resolve(__dirname, '../src/services'),
      components: path.resolve(__dirname, '../src/components')
    }
  },

  module: {
    rules: [
      // {
      //   enforce: 'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'eslint-loader',
      //  },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-proposal-class-properties',
              '@babel/plugin-transform-regenerator',
            ]
          }
        }
      },
      {
        test: /\.s?css$/,
        use: [
          isFileCSS ? MiniCssExtractPlugin.loader : 'style-loader',
          "css-loader",
          "sass-loader"
        ]
      },
      {
        //IMAGE LOADER
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
    ]
  },

  plugins,

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
  },

  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    port: 9000,
    hot: true,
    historyApiFallback: true,
  },

  devtool: 'inline-source-map'

};
