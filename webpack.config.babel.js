/* Common Webpack */

import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import autoprefixer from 'autoprefixer';

// Environment Configs
import DEV_CONFIG from './webpack/webpack.dev.config.js';
import PROD_CONFIG from './webpack/webpack.prod.config.js';
import {
	APP_PATH,
	DIST_PATH,
	MODULES_PATH,
	ASSETS_PATH
} from './webpack/webpack.paths.config.js';

// Define ENV
const ENV = process.env.NODE_ENV;
const environments = ['development', 'production'];
const config = {
	development: DEV_CONFIG,
	production: PROD_CONFIG
}[ENV];

const COMMON_CONFIG = {
	entry: {
		app: [
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server',
			APP_PATH,
		],
		vendor: [
			'react',
	    	'react-dom',
	    	'react-addons-shallow-compare',
	    	'redux',
	    	'react-redux',
	    	'react-router'
		]
	},
	output: {
		path: DIST_PATH,
		filename: '[name].bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
	  			include: APP_PATH,
	  			use: [
	  				'babel-loader',
	  				'eslint-loader'
	  			]
			},
			{
				test: /\.(scss|sass)$/,
	  			include: APP_PATH,
	  			use: [
	  				'style-loader',
	  				{
	  					loader: 'css-loader',
	  					options: {
	  						modules: true,
	  						importLoaders: 2,
	  						camelCase: true,
	  						localIdentName: '[folder]_[local]_[hash:base64:5]'
	  					}
	  				},
	  				'postcss-loader',
	  				{
	  					loader: 'sass-loader',
	  					options: {
	  						outputStyle: 'expanded',
	  						includePaths: ASSETS_PATH
	  					}
	  				}
	  			]
	  		},

		]
	},
	resolve: {
	  	extensions: ['.js', '.jsx', '.scss', '.sass'],
	  	modules: [
	  		MODULES_PATH,
	  		APP_PATH
	  	],
	  	alias: {
	  		components: path.resolve(APP_PATH, 'components'),
	  		reducers: path.resolve(APP_PATH, 'reducers'),
	  		actions: path.resolve(APP_PATH, 'actions'),
	  		api: path.resolve(APP_PATH, 'api')
	  	}
	},
	plugins: [
	  	new webpack.optimize.CommonsChunkPlugin({
	  		name: 'vendor',
	  		minChunks: Infinity
	  	}),
	  	new webpack.DefinePlugin({
	  		'process.env.NODE_ENV': JSON.stringify(ENV)
	  	}),
	  	new webpack.NamedModulesPlugin(),
	  	new webpack.LoaderOptionsPlugin({
	  		options: {
	  			eslint: {
	  				emitWarning: true
	  			},
	  			postcss: [
	  				autoprefixer({
				      browsers: ['last 3 versions', '> 1%', 'not ie < 8']
				    })
	  			]
	  		}
	  	})
	]
};

export default merge(config, COMMON_CONFIG);
