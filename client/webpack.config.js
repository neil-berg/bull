const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
  const isDev = env.NODE_ENV === 'development';
  const config = {
    mode: isDev ? 'development' : 'production',
    // Root file in the SPA
    entry: './src/Entry.tsx',
    output: {
      // Output path of the built app
      path: path.resolve(__dirname, 'dist'),
      // Root path that a browser references r
      publicPath: '/',
      // Filename of built and bundled app
      filename: 'app.js',
    },
    module: {
      rules: [
        // Instructions for TypeScript files
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        // Instructions for .css files
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Instructions for images
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
              },
            },
          ],
        },
        // Instructions for svg files
        {
          test: /\.svg$/,
          use: '@svgr/webpack',
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
      ],
    },
    // Allow for the following extensions to be excluded for imported filenames
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
      // Delete files in output.path directory (/dist) on new builds
      new CleanWebpackPlugin(),
      // Use src/index.html as the HTML template
      new HtmlWebpackPlugin({
        title: 'Bull',
        template: './src/index.html',
        favicon: './src/assets/images/rising.png',
      }),
      // Set environmental vars
      new webpack.EnvironmentPlugin({
        API_URL: isDev
          ? 'http://localhost:3000'
          : 'https://my-bull-app.herokuapp.com',
        FINNHUB_API_TOKEN: process.env.FINNHUB_API_TOKEN,
      }),
    ],
    // Increase source mapping in development
    devtool: isDev ? 'eval-source-map' : 'eval',
    devServer: {
      // Exposed port on localhost
      port: 8000,
      // Host name for accessing the dev server externally
      host: '0.0.0.0',
      // Directory (built path) to serve content
      contentBase: path.join(__dirname, 'dist'),
      // Hot reloads of modules when saving changed files
      hot: true,
      // Serve index.html on 404s
      historyApiFallback: true,
      // Proxy API requests to the backend 
      // Important to use container name (server) for the host
      proxy: {
        '/api': {
          target: 'http://server:3000',
          disableHostCheck: true,
          secure: false,
        },
      },
    },
  };

  return config;
};
