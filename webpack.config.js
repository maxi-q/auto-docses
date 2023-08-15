const path = require('path')
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
} );

const CopyWebpackPlugin = require('copy-webpack-plugin');


const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: { myAppName: path.resolve(__dirname, './src/index.tsx') },
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: production ? '[name].[contenthash].js' : '[name].js',
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  devtool: 'inline-source-map',
  module: {
    rules : [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(scss)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(jpg|png)$/,
        exclude: /node_modules/,
        use: {
          loader: 'url-loader',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        exclude: /node_modules/,
        type: 'asset/resource'
      },
    ],
  },
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@constants': path.resolve(__dirname, 'src/constants'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@api': path.resolve(__dirname, 'src/API'),
      '@ui': path.resolve(__dirname, 'src/ui'),
    },
    extensions: ['.*', '.js', '.jsx', '.scss','.tsx', '.ts'],
    fallback: { 
      "util": require.resolve("util/"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "buffer": require.resolve("buffer/"),
      "zlib": require.resolve("browserify-zlib"),
      "assert": require.resolve("assert/"),
      "fs": false,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_DEBUG': JSON.stringify(process.env.NODE_DEBUG),
      'process.env': JSON.stringify(process.env),
    }),
    new CopyWebpackPlugin({
      patterns: [
          { from: 'public/public' }
      ]
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Автоматические документы',
      template: path.join(__dirname, 'public', 'index.html'),
      favicon: './public/favicon64x64.ico',
    }),
    new MiniCssExtractPlugin({
      filename: production ? '[name].[contenthash].css' : '[name].css',
    }),
  ],
  externals: {
  },              
  devServer: {
    static: './build',
    historyApiFallback: true,
    port: 3001,
  },
  mode: production ? 'production' : 'development',
}