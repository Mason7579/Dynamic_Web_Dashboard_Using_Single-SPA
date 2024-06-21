const { mergeWithRules } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

const webpack = require('webpack');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'dk',
    projectName: 'react-ui',
    webpackConfigEnv,
    argv,
  });
  require('dotenv').config({ path: __dirname + '/.env' });

  return mergeWithRules({
    module: {
      rules: {
        test: 'match',
        use: 'replace',
      },
    },
  })(defaultConfig, {
    devServer: {
      webSocketServer: webpackConfigEnv.standalone ? false : 'ws',
    },

    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),

      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            require.resolve('style-loader', {
              paths: [require.resolve('webpack-config-single-spa')],
            }),
            require.resolve('css-loader', {
              paths: [require.resolve('webpack-config-single-spa')],
            }),
            'postcss-loader',
          ],
        },
      ],
    },
  });
};
