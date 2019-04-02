import React, { Component, Suspense } from 'react';

import { Provider } from 'react-redux';
import store from '../store/store';

import Router from '../Router';

export const API = '/';
export const API_CATEGORIES = API + 'categories.json';
export const API_PRODUCT_EMAIL = 'http://httpbin.org/post';

const Loader = () => <div>loading...</div>;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <Router />
        </Suspense>
      </Provider>
    );
  }
}

export default App;
