import React, { Component, Suspense } from 'react';

import { Provider } from 'react-redux';
import store from '../store/store';

import Api from '../Api';
import Router from '../Router';

const Loader = () => <div>loading...</div>;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Suspense fallback={<Loader />}>
          <Api />
          <Router />
        </Suspense>
      </Provider>
    );
  }
}

export default App;
