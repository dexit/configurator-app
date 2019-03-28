import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

import Configurator from '../configurator/Configurator';

export const API = '/';
export const API_CATEGORIES = API + 'categories.json';
export const API_PRODUCT_EMAIL = 'http://httpbin.org/post';

export const routeCategoryName = 'kategoria';
export const routeSummaryName = 'gotowe';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL}>
          <Switch>
            <Route
              path={'/' + routeCategoryName + '/:category'}
              component={Configurator}
            />
            <Route path={'/' + routeSummaryName} component={Configurator} />
            <Route path="/" component={Configurator} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
