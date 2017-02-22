/* Production Config */

import webpack from 'webpack';

const PROD_CONFIG = {
	plugins: [
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				screw_ie8: true,
				warnings: false
			},
			output: {
				comments: false,
				screw_ie8: true
			}
		})
	]
};

export default PROD_CONFIG