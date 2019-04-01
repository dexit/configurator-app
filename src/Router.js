import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

import Configurator from './configurator/Configurator';

const Rtr = (props, context) => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route
          path={'/' + context.t('routeCategoryName') + '/:category'}
          component={Configurator}
        />
        <Route
          path={'/' + context.t('routeSummaryName')}
          component={Configurator}
        />
        <Route path="/" component={Configurator} />
      </Switch>
    </Router>
  );
};

Rtr.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Rtr;
