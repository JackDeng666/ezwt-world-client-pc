module.exports = {
  lintOnSave: false,
  publicPath: '/ying-nav/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "./src/assets/styles/variables";`
      }
    }
  }
}
