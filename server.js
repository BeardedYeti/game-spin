import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import webpack from 'webpack';

import router from './src/router';
import webpackConfig from './webpack.config.babel.js';
import { DIST_PATH } from './webpack/webpack.paths.config';

mongoose.connect('mongodb://localhost:27017/movies');

if (process.env.NODE_ENV === 'development') {
	// Run Webpack Hot Module Reload Development Server
	const app = express();
	const compiler = webpack(webpackConfig);


	app.use(morgan('combined'));

	// Webpack Dev Server Middleware
	app.use(require('webpack-dev-middleware')(compiler, {
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
	}));

	// Webpack HMR Middleware
	app.use(require("webpack-hot-middleware")(compiler));

	// Serve API for Development
	
	app.use('/api', router);

	app.listen(8080, () => {
		console.log("Magic has spawned the API for Development on Port 8080")
	});
} else {
	const app = express();

	// Serve static bundle
	app.use('/', express.static('bundle'));

	// Serve api
	app.use('/api', router);

	app.listen(3000, () => {
		console.log('Production Server is running on port 3000')
	});
}
