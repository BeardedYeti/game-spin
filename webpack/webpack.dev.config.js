/* Development Config */

import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import { APP_PATH, DIST_PATH } from './webpack.paths.config';

const DEV_CONFIG = {
	module: {
	    rules: [
	      {
	        test: /\.(js|jsx)$/,
	        use: [
	          'babel-loader',
	        ],
	        exclude: /node_modules/
	      },
	      {
	        test: /\.css$/,
	        use: [
	          'style-loader',
	          'css-loader?modules',
	          'postcss-loader',
	        ],
	      },
	    ],
	},
	devServer: {
		hot: true,
		port: 8080,
		inline: true,
		host: '0.0.0.0',
		historyApiFallback: true,
		stats: {
			assets: true,
			timings: true,
			chunks: false,
			children: false
		},
		contentBase: DIST_PATH,
		publicPath: '/',
		proxy: {
	      '/api': {
	        target: 'http://localhost:8081',
	        secure: false
	    	}
	    }
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new htmlWebpackPlugin({
			title: 'React Application',
			template: 'index.html'
		})
	]
};

export default DEV_CONFIG;