import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { apiMiddleware, reducer } from './reducers/reducer';
import { AppContainer } from 'react-hot-loader';

import App from './components/App';

// Create Redux Store
const store = createStore(reducer, {}, applyMiddleware(apiMiddleware));

// Fetch Data
store.dispatch({type: 'GET_MOVIE_DATA'});

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NewApp = require('./components/App').default
    render(NewApp)
  });
}

render(<App/>, document.getElementById('root'));
