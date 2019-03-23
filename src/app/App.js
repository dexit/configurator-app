import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/store';

import Configurator from '../configurator/Configurator';

export const categoryName = 'kategoria';
export const summaryName = 'gotowe';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              path={'/' + categoryName + '/:category'}
              component={Configurator}
            />
            <Route path={'/' + summaryName} component={Configurator} />
            <Route path="/" component={Configurator} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
