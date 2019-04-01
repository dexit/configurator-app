import React, { Component } from 'react';

import { Provider } from 'react-redux';
import store from '../store/store';
import I18n from 'redux-i18n';

import { translations } from './translations';
import Router from '../Router';

export const API = '/';
export const API_CATEGORIES = API + 'categories.json';
export const API_PRODUCT_EMAIL = 'http://httpbin.org/post';

export const routeCategoryName = 'kategoria';
export const routeSummaryName = 'gotowe';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <I18n translations={translations} initialLang="pl" fallbackLang="pl">
          <Router />
        </I18n>
      </Provider>
    );
  }
}

export default App;
