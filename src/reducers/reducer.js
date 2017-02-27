
const nodeEnv = process.env.NODE_ENV || 'development';

let API = (nodeEnv) => {
	let apiUrl;

	nodeEnv === 'production' ? apiUrl = 'http://localhost:3000/api' : apiUrl = 'http://localhost:8080/api';

	return apiUrl;
};

console.log(API(nodeEnv));

// API Middleware
export const apiMiddleware = store => next => action => {
	// Pass all actions through by default
	next(action);
	switch (action.type) {
		// In case we receive an action to send an API request
		case 'GET_MOVIE_DATA':
			// Dispatch GET_MOVIE_DATA_LOADING to update loading state
			store.dispatch({type: 'GET_MOVIE_DATA_LOADING'});
			fetch(`${API(nodeEnv)}/movies.json`)
				.then(response => response.json())
				.then(data => next({
					type: 'GET_MOVIE_DATA_RECEIVED',
					data
				}))
				.catch(error => next({
					type: 'GET_MOVIE_DATA_ERROR',
					error
				}));
			break;
			// Do nothing if the action does not interest us
		default:
			break;
	}
};

// Reducer handling dispatched actions, updating the storage
export const reducer = (state = { movies: [], loading: true }, action) => {
	switch (action.type) {
		case 'GET_MOVIE_DATA_LOADING':
			return {
				...state,
				loading: true,
			};
		case 'GET_MOVIE_DATA_RECEIVED':
			return {
				loading: false,
				movies: action.data.movies,
			};
		case 'GET_MOVIE_DATA_ERROR':
			return state;
		default:
			return state;	
	}
};
