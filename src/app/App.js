import React, { Component, Suspense } from 'react';

import { Provider } from 'react-redux';
import store from '../store/store';

import Router from '../Router';

export const API = process.env.PUBLIC_URL + '/';

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
