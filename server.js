import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import webpack from 'webpack';
import path from 'path';

import router from './src/api/router';
import webpackConfig from './webpack.config.babel.js';
import { DIST_PATH } from './webpack/webpack.paths.config';

mongoose.connect('mongodb://localhost:27017/movies');

const app = express();

// General Express Middleware
app.use(morgan('combined'));

if (process.env.NODE_ENV === 'development') {
	const compiler = webpack(webpackConfig);

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
	        target: 'http://localhost:8080',
	        secure: false
	    	}
	    }
	}));

	// Webpack HMR Middleware
	app.use(require("webpack-hot-middleware")(compiler));

	// Serve API for Development
	app.use('/api', router);

	// Serve Development App on 8080
	app.listen(8080, () => {
		console.log("Magic has spawned the API for Development on Port 8080")
	});
} else {
	// Serve static bundle
	app.use(express.static(path.resolve(__dirname, 'dist')));
	// app.get('*', function(req, res) {
	// 	res.sendFile(path.resolve(__dirname, 'dist/index.html'));
	// });
	// Serve API for Production
	app.use('/api', router);

	// Serve Production App on 3000
	app.listen(3000, () => {
		console.log('Production Server is running on port 3000')
	});
}
