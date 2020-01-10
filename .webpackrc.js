module.exports = {
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  alias:{
    "@":require('path').resolve('src')
  },
  proxy: {
    "/api": {
      "target": "http://169.254.148.194:8801",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
},
publicPath:"/"
}
