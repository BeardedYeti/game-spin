/* Development Config */

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { APP_PATH, DIST_PATH } from './webpack.paths.config';

const DEV_CONFIG = {
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	],
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
			APP_PATH,
		]
	},
	output: {
		path: DIST_PATH,
		filename: 'bundle.js',
		publicPath: '/'
	},
	module: {
	    rules: [
		  	{
			    test: /\.(scss|sass)$/,
			    exclude: /node_modules/,
			    use: [
			      'style-loader',
			      'css-loader',
			      'postcss-loader',
			      'sass-loader?sourceMap',
		      	]
		    }
	    ],
	}
};

export default DEV_CONFIG;
