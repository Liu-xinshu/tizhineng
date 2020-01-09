module.exports = {
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ],
  alias:{
    "@":require('path').resolve('src')
  },
  proxy: {
    "/api": {
      "target": "http://127.0.0.1:8801",
      "changeOrigin": true,
      "pathRewrite": { "^/api" : "" }
    }
},
publicPath:"/"
}
