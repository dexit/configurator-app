import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

import Configurator from '../configurator/Configurator';

export const routeCategoryName = 'kategoria';
export const routeSummaryName = 'gotowe';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
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
