const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // Ensure proper import
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // Import the CSS minifier plugin

module.exports = {
  entry: './frontend/src/index.js',  // Adjusted path to the frontend/src/index.js
  output: {
    path: path.resolve(__dirname, 'dist'),  // Output folder
    filename: 'bundle.js', 
    publicPath: '/',  // Bundled file name
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Transpile JS/JSX files using Babel
          options: {
            presets: [
              '@babel/preset-env',   // Transpile ES6+ code
              '@babel/preset-react'  // Enable JSX transformation
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],  // Handle CSS files
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],  // Resolve JS and JSX file extensions
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),  // Replaces contentBase
    },
    historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
  },
  plugins: [
    new BundleAnalyzerPlugin()  // Add this line to analyze bundle size
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),  // Minimize the CSS bundle
    ],
  },
};
