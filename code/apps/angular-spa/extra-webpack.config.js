const singleSpaAngularWebpack =
  require('single-spa-angular/lib/webpack').default;

module.exports = (config, options) => {
  config.output = {
    ...config.output,
    filename: 'angular-spa.js',
  };

  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
