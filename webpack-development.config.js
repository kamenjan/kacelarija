let baseConfig = require('./webpack.config.js');

baseConfig.devtool = 'source-map';

let lessLoader = {
	test: /\.less$/,
	use: [{
		loader: "style-loader" // creates style nodes from JS strings
	}, {
		loader: "css-loader",
		options: {
			sourceMap: true
		} // translates CSS into CommonJS
	}, {
		loader: "less-loader",
		options: {
			sourceMap: true
		} // compiles Less to CSS
	}]
};

baseConfig.module.rules.push(lessLoader);

module.exports = baseConfig;