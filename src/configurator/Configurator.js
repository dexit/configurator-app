import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from './configuratorActions';
import { Route, Switch, Redirect } from 'react-router-dom';
import { withTranslation } from 'react-i18next';

import styles from './Configurator.module.scss';

import Menu from './components/Menu';
import MenuItems from './components/MenuItems';
import ItemImg from './components/ItemImg';
import Summary from './components/Summary';
import SavedProducts from './components/SavedProducts';

import translations from '../translations';

class Configurator extends Component {
  setDefaultCategory() {
    const matchCategorySlug = this.props.match.params.category;
    const activeCategorySlug = this.props.configuratorStore.userSettings
      .activeCategorySlug;
    const matchCategoryExist =
      this.props.configuratorStore.categories.findIndex(
        category => category.slug === matchCategorySlug
      ) > -1
        ? true
        : false;

    let firstCategory = '';

    if (this.props.configuratorStore.categories.length) {
      firstCategory = this.props.configuratorStore.categories[0].slug;
    }

    const setCategory = () => {
      if (matchCategorySlug) {
        if (matchCategoryExist) {
          this.props.setActiveCategory(matchCategorySlug);
        } else {
          this.props.setActiveCategory(firstCategory);
          this.props.history.replace(
            '/' + this.props.t('routeCategoryName') + '/' + firstCategory
          );
        }
      } else if (!activeCategorySlug) {
        this.props.setActiveCategory(firstCategory);
      } else if (activeCategorySlug) {
        this.props.setActiveCategory(activeCategorySlug);
      }
    };

    setCategory();
  }

  setDefaultItems() {
    const activeItems = this.props.configuratorStore.userSettings.activeItems;

    if (activeItems === null) {
      this.props.setDefaultActiveItems();
    }

    this.props.setActiveItems();
  }

  componentDidMount() {
    this.props.getCategories(this.props.API_CATEGORIES).then(() => {
      this.setDefaultItems();
      this.setDefaultCategory();
    });
  }

  getDefaultCategory() {
    const activeCategorySlug = this.props.configuratorStore.userSettings
      .activeCategorySlug;
    let firstCategory = '';

    if (this.props.configuratorStore.categories.length) {
      firstCategory = this.props.configuratorStore.categories[0].slug;
    }

    if (activeCategorySlug) {
      return activeCategorySlug;
    } else {
      return firstCategory;
    }
  }

  changeLanguage = lng => {
    const { i18n } = this.props;

    i18n.changeLanguage(lng);
  };

  render() {
    const { t } = this.props;
    const isLoading = this.props.configuratorStore.isLoading;

    const spinner = (
      <div
        className={`d-flex justify-content-center align-items-center ${
          styles.loadingSpinner
        }`}
      >
        <div
          className={`spinner-border text-danger ${
            styles.loadingSpinnerBorder
          }`}
          role="status"
        >
          <span className="sr-only">{t('loading')}...</span>
        </div>
      </div>
    );

    const Lang = () => {
      const { i18n } = this.props;
      const lang = [];

      for (const key in translations) {
        const active = key === i18n.language ? styles.active : undefined;

        if (translations.hasOwnProperty(key)) {
          lang.push(
            <button
              key={lang}
              onClick={() => this.changeLanguage(key)}
              className={`${styles.lang__btn} ${active}`}
            >
              {key.toUpperCase()}
            </button>
          );
        }
      }

      return <div className={styles.lang}>{lang}</div>;
    };

    return (
      <>
        <div className={`d-flex flex-column ${styles.wrapper}`}>
          <header
            className={`${styles.header} text-center text-uppercase my-5`}
          >
            <h1>{t('configurator')}</h1>
            <Lang />
          </header>
          <div className={`row flex-grow-1 ${styles.contentWrapper}`}>
            <div className="col-md-2">
              <Menu />
            </div>
            <div className="col-md-3">
              <Switch>
                <Route
                  path={'/' + t('routeCategoryName') + '/:category'}
                  component={MenuItems}
                />
                <Route path={'/' + t('routeSummaryName')} component={Summary} />
                <Redirect
                  to={
                    '/' +
                    t('routeCategoryName') +
                    '/' +
                    this.getDefaultCategory()
                  }
                />
              </Switch>
            </div>
            <div className="col-md-7">
              <ItemImg />
            </div>
          </div>
        </div>

        <SavedProducts />
        {isLoading ? spinner : null}
      </>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    setActiveCategory: categorySlug =>
      dispatch(configuratorActions.setActiveCategory(categorySlug)),
    setDefaultActiveItems: () =>
      dispatch(configuratorActions.setDefaultActiveItems()),
    setActiveItems: () => dispatch(configuratorActions.setActiveItems()),
    getCategories: () => dispatch(configuratorActions.getCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Configurator));
