const express from 'express';
const mongoose from 'mongoose';
const morgan from 'morgan';

const router from './src/router';
const wbConfig from './webpack.config.babel.js';

mongoose.connect('mongodb://localhost:27017/movies');

if (process.env.NODE_ENV === 'development') {
	//Could try running webpack here instead of npm script

	const app = express();

	app.use(morgan('combined'));

	app.use('/api', router);

	app.listen(8081, () => {
		console.log("Magic has spawned the API for Development on Port 8081")
	};
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
