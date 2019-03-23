import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from './configuratorActions';
import { Route, Switch, Redirect } from 'react-router-dom';

import styles from './Configurator.module.scss';

import Menu from './components/Menu';
import MenuItems from './components/MenuItems';
import ItemImg from './components/ItemImg';
import Summary from './components/Summary';

import { categoryName, summaryName } from '../app/App';

class Configurator extends Component {
  setDefaultCategory() {
    let firstCategory = '';

    if (this.props.configuratorStore.categories.length) {
      firstCategory = this.props.configuratorStore.categories[0].slug;
    }

    const matchCategory = this.props.match.params.category;
    const activeCategory = this.props.configuratorStore.userSettings
      .activeCategory;

    const setCategory = () => {
      if (matchCategory) {
        this.props.setActiveCategory(matchCategory);
      } else {
        this.props.setActiveCategory(firstCategory);
      }
    };

    if (!activeCategory) {
      setCategory();
    }
  }

  setDefaultItems() {
    const activeItems = this.props.configuratorStore.userSettings.activeItems;

    if (activeItems === null) {
      this.props.setDefaultActiveItems();
    }

    this.props.setActiveItems();
  }

  componentDidMount() {
    this.setDefaultCategory();
    this.setDefaultItems();
  }

  getDefaultCategory() {
    const activeCategory = this.props.configuratorStore.userSettings
      .activeCategory;
    let firstCategory = '';

    if (this.props.configuratorStore.categories.length) {
      firstCategory = this.props.configuratorStore.categories[0].slug;
    }

    if (activeCategory) {
      return activeCategory;
    } else {
      return firstCategory;
    }
  }

  render() {
    return (
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
                path={'/' + categoryName + '/:category'}
                component={MenuItems}
              />
              <Route path={'/' + summaryName} component={Summary} />
              <Redirect
                to={'/' + categoryName + '/' + this.getDefaultCategory()}
              />
            </Switch>
          </div>
          <div className="col-md-7">
            <ItemImg />
          </div>
        </div>
      </div>
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
