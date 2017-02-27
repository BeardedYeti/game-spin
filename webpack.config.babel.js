/* Common Webpack */

import webpack from 'webpack';
import path from 'path';
import merge from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
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
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
let config;

isProduction ? config = PROD_CONFIG : config = DEV_CONFIG

const COMMON_CONFIG = {		
// Common Plugins
	plugins: [
	  	new webpack.optimize.CommonsChunkPlugin({
	  		name: 'vendor',
	  		minChunks: Infinity,
	  		filename: 'vendor-[hash].js',
	  	}),
	  	new webpack.DefinePlugin({
	  		'process.env.NODE_ENV': JSON.stringify(nodeEnv)
	  	}),
	  	new webpack.NamedModulesPlugin(),
	  	new HtmlWebpackPlugin({
		    template: path.join(__dirname, 'index.html'),
		    path: DIST_PATH,
		    filename: 'index.html',
		}),
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
	],	
// Common Rules and Loaders
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules)/,
	  			include: APP_PATH,
	  			use: [
	  				'babel-loader',
	  				'eslint-loader'
	  			]
			}//,
			// {
			//     test: /\.(png|gif|jpg|svg)$/,
			//     include: IMG_PATH,
			//     use: 'url-loader?limit=20480&name=assets/[name]-[hash].[ext]',
			// },
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
	
};

export default merge(config, COMMON_CONFIG);
