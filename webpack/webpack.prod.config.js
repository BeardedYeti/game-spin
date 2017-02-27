/* Production Config */

import webpack from 'webpack';
import { APP_PATH, DIST_PATH } from './webpack.paths.config';
//import ExtractTextPlugin from 'extract-text-webpack-plugin';

const PROD_CONFIG = {
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		// Bundle Production CSS
		//new ExtractTextPlugin('style.css'),
		new webpack.optimize.UglifyJsPlugin({
	      	compress: {
		        warnings: false,
		        screw_ie8: true,
		        conditionals: true,
		        unused: true,
		        comparisons: true,
		        sequences: true,
		        dead_code: true,
		        evaluate: true,
		        if_return: true,
		        join_vars: true,
	    	},
			output: {
				comments: false
			}
		})
	],
	// module: {
	//     rules: [
	// 	  	{
	// 	      test: /\.(scss|sass)$/,
	// 	      exclude: /node_modules/,
	// 	      use: ExtractTextPlugin.extract({
	// 	        fallback: 'style-loader',
 //          		use: [
 //          			'style-loader',
 //          			'css-loader',
	// 	        	'postcss-loader',
	// 	        	'autoprefixer-loader',
	// 	        	'sass-loader'
	// 	        ]
	// 	      }),
	// 	    }
	//     ],
	// },
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
	},
	entry: {
		app: APP_PATH,
		vendor: [
			'babel-polyfill',
			'immutable',
			'isomorphic-fetch',
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
		filename: 'bundle-[hash].js',
		publicPath: '/'
	},
};

export default PROD_CONFIG
