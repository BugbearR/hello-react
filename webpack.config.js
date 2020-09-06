const path = require("path");
const outputPath = path.resolve(__dirname, "dist");
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/react"
              ]
            }
          }
        ]
      }
    ]
  },
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    //useLocalIp: true,
    public: "0.0.0.0:8080",
    contentBase: outputPath,
    disableHostCheck: true
  },
  plugins: [
    new WriteFileWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: 'src',
          from: '**/*',
          globOptions: {
            ignore: [
              '*.js'
            ]
          },
          to: outputPath
        }
      ]
    })
  ]
}
