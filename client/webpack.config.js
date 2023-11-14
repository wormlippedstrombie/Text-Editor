const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),

      // Webpack PWA Manifest plugin configuration
      new WebpackPwaManifest({
        name: 'Your PWA Name',
        short_name: 'PWA',
        description: 'Your PWA description',
        background_color: '#ffffff',
        theme_color: '#000000',
        crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('icons', 'ios'),
          },
          {
            src: path.resolve('src/images/icon.png'),
            sizes: [120, 152, 167, 180],
            destination: path.join('icons', 'ios'),
            ios: true,
          },
        ],
      }),

      // Workbox InjectManifest plugin configuration
      new InjectManifest({
        swSrc: './src/sw.js', // path to your service worker file
        swDest: 'sw.js', // output file name
        exclude: [/\.map$/, /_redirects/], // exclude unnecessary files
      }),
    ],

    module: {
      rules: [
        // CSS loader configuration
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },

        // Babel loader configuration
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
