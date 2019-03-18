module.exports = {
  devServer: {
    disableHostCheck: true,
    proxy: {
      // This is actually a webpack config.
      // This is how you configure the webpack dev server
      // We have a proxy running at /api that will proxy all requests to /api to http://localhost:8081
      '/api': {
        target: 'http://localhost:8081',
        changeOrigin: true,
      }
    }
  },
};
