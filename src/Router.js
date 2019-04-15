import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import Configurator from './configurator/Configurator';

import translations from './translations';

class Rtr extends Component {
  getLanguagesString() {
    let languages = [];

    for (const key in translations) {
      languages.push(key);
    }

    const languagesString = languages.join('|');

    return languagesString;
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route
            path={`/:lng(${this.getLanguagesString()})`}
            component={Configurator}
          />
          <Route
            path={'/' + this.props.t('routeCategoryName') + '/:category'}
            component={Configurator}
          />
          <Route
            path={'/' + this.props.t('routeSummaryName')}
            component={Configurator}
          />
          <Route path="/" component={Configurator} />
        </Switch>
      </Router>
    );
  }
}

export default withTranslation()(Rtr);
