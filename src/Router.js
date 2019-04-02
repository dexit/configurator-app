import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import Configurator from './configurator/Configurator';

const Rtr = props => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route
          path={'/' + props.t('configurator.routeCategoryName') + '/:category'}
          component={Configurator}
        />
        <Route
          path={'/' + props.t('configurator.routeSummaryName')}
          component={Configurator}
        />
        <Route path="/" component={Configurator} />
      </Switch>
    </Router>
  );
};

export default withTranslation()(Rtr);
