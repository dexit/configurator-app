import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from './configuratorActions';
import { Route, Switch, Redirect } from 'react-router-dom';

import styles from './Configurator.module.scss';

import Menu from './components/Menu';
import MenuItems from './components/MenuItems';
import ItemImg from './components/ItemImg';
import Summary from './components/Summary';
import SavedProducts from './components/SavedProducts';

import { routeCategoryName, routeSummaryName } from '../app/App';

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
            '/' + routeCategoryName + '/' + firstCategory
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
    this.setDefaultItems();
    this.setDefaultCategory();
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

  render() {
    return (
      <>
        <div className={`d-flex flex-column ${styles.wrapper}`}>
          <header className="text-center text-uppercase my-5">
            <h1>Konfigurator</h1>
          </header>
          <div className="row flex-grow-1">
            <div className="col-md-2">
              <Menu />
            </div>
            <div className="col-md-3">
              <Switch>
                <Route
                  path={'/' + routeCategoryName + '/:category'}
                  component={MenuItems}
                />
                <Route path={'/' + routeSummaryName} component={Summary} />
                <Redirect
                  to={'/' + routeCategoryName + '/' + this.getDefaultCategory()}
                />
              </Switch>
            </div>
            <div className="col-md-7">
              <ItemImg />
            </div>
          </div>
        </div>

        <SavedProducts />
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
    setActiveItems: () => dispatch(configuratorActions.setActiveItems())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configurator);
