const config = {
  entry: './lib/index.tsx',
  output: {
    filename: 'index.js',
    path: __dirname + '/dist',
    library: 'fsm',
    libraryTarget: 'commonjs2'
  },
  devtool: 'sourcemap',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "ts-loader" },

      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  }
}

module.exports = config;
