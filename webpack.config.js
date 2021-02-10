
const path = require('node:path');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    library: 'awesomeTypeof',
    libraryTarget: 'umd',
    globalObject: 'this',
    clean: true
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      use: [
        'ts-loader'
      ]
    }]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/type.d.ts", to: "type.d.ts" }
      ]
    })
  ],
  mode: 'production'
};
