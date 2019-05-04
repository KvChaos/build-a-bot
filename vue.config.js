module.exports = {
  configureWebpack: (config) => {

    const moddedExistingRule =
      /* config.module.rule('images') */
      {
        test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
        use: [
          /* config.module.rule('images').use('url-loader') */
          {
            loader: 'url-loader',
            options: {
              limit: 5022,
              fallback: {
                loader: 'file-loader',
                options: {
                  name: 'img/[name].[hash:8].[ext]'
                }
              }
            }
          }
        ]
      }; //end newRule

    // Find and splice the new rule; replacing one with the same test.
    const imageRulesIndex = config.module.rules.findIndex(x => x.test.source.includes('png|jpe?g|gif'));
    config.module.rules.splice(imageRulesIndex, 1, moddedExistingRule);
  },
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
