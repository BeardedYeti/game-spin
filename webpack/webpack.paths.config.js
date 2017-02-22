/* Path Config */

import path from 'path';

const ROOT_PATH = path.resolve(__dirname, '..');

const resolvePath = (relativePath) => (
	path.resolve(ROOT_PATH, relativePath)
);

const APP_PATH = resolvePath('src');
const DIST_PATH = resolvePath('dist');
const MODULES_PATH = resolvePath('node_modules');
const ASSETS_PATH = resolvePath('src/assets');

export {
	APP_PATH,
	DIST_PATH,
	MODULES_PATH,
	ASSETS_PATH
};