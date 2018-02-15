let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
	  main: './public/src/js/main.js',
	  styles: './public/src/styles/main.js'
  },
	output: {
		filename: '[name].js',
		path: __dirname + '/public/dist/js'
	},
  module: {
    rules: [
		{
			enforce: 'pre',
			test: [/\.jss$/, /\.es6$/],
			exclude: /node_modules/,
			loader: 'jshint-loader'
		},
		{ // Babel loader for transpiling ES6 syntax
			test: [/\.js$/, /\.es6$/],
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
				presets: ['env']
			}
		}
	]
  },
  // Resolve allows webpack to process files without 
  // specifying file type extension, eg.require(./main) 
  resolve: {
   extensions: ['.js', '.es6']
  },
  plugins: [
    // Clean build directories before building
    new CleanWebpackPlugin(['images', 'js', 'css', 'fonts'], {
      root: __dirname + '/public/dist',
      verbose: true, 
      dry: false,
      // We wish to keep an empty directory structure for git tracking
      exclude: ['.gitignore']
    })
  ]
};