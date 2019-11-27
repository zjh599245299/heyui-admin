module.exports = {
  root: "build",
  webpack: {
    umd: {
      entry: "./src/qiniu.js",
      library: "Qiniu",
      filename: 'qiniu.js'
    },
    externals: {
      "plupload-es6": "plupload-es6"
    }
  }
};
