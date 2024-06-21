const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');
const webpack = require('webpack');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'dk',
    projectName: 're-react',
    webpackConfigEnv,
    argv,
  });
  // Determine the API URL based on the provided environment variable
  var apiUrl;
  if (webpackConfigEnv.production === 'true') {
    apiUrl = 'http://localhost/api';
  } else {
    apiUrl = 'http://localhost:5036/api';
  }

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    devServer: {
      webSocketServer: webpackConfigEnv.standalone ? false : 'ws',
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env.API_URL': JSON.stringify(apiUrl),
      }),
    ],
  });
};
