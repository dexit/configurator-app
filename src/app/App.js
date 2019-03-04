import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

import Configurator from '../configurator/Configurator';

class App extends Component {
  render() {
    const firstCategorySlug = store.getState().configuratorStore.categories[0]
      .slug;

    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Redirect exact from="/" to={'/' + firstCategorySlug} />
            <Route path="/" component={Configurator} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
