const debug = process.env.NODE_ENV !== "production";
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './js/app.js',
  output: {
    path: __dirname + "/src/",
    filename: "app.min.js"
  },
  context: path.join(__dirname, "src"),
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
      },
      {
          test: /\.scss$/,
          use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties']
        }
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader' ,
            options: {
              name: "fonts/[name].[ext]",
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
};
