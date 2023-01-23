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
    allowedHosts: "all",
    static: {
      directory: path.resolve(__dirname, "static"),
      staticOptions: {},
      // Don't be confused with `devMiddleware.publicPath`, it is `publicPath` for static directory
      // Can be:
      // publicPath: ['/static-public-path-one/', '/static-public-path-two/'],
      publicPath: "/",
      // Can be:
      // serveIndex: {} (options for the `serveIndex` option you can find https://github.com/expressjs/serve-index)
      serveIndex: true,
      // Can be:
      // watch: {} (options for the `watch` option you can find https://github.com/paulmillr/chokidar)
      watch: true,
    },
    client: {
      // Can be `string`:
      //
      // To get protocol/hostname/port from browser
      // webSocketURL: 'auto://0.0.0.0:0/ws'
      webSocketURL: {
        hostname: "0.0.0.0",
        pathname: "/ws",
        port: 8080,
      },
    },
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
