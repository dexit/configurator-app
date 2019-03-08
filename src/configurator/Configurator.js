import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from './configuratorActions';
import { withRouter } from 'react-router-dom';

import styles from './Configurator.module.scss';

import Menu from './components/Menu';
import MenuItems from './components/MenuItems';
import ItemImg from './components/ItemImg';

class Configurator extends Component {
  setCategoryUrlIfEmpty() {
    const matchCategory = this.props.match.params.category;
    const activeCategory = this.props.configuratorStore.userSettings
      .activeCategory;

    if (!matchCategory) {
      this.props.history.replace(activeCategory);
    }
  }

  loadSettings() {
    const firstCategory = this.props.configuratorStore.categories[0].slug;
    const matchCategory = this.props.match.params.category;

    const settingsLocalStorage = JSON.parse(
      localStorage.getItem('userSettings')
    );

    function setCategory() {
      if (matchCategory) {
        this.props.setActiveCategory(matchCategory);
        this.props.history.replace(matchCategory);
      } else {
        this.props.setActiveCategory(firstCategory);
        this.props.history.replace(firstCategory);
      }
    }

    if (!settingsLocalStorage || !settingsLocalStorage.activeCategory) {
      setCategory();
    } else {
      this.props.loadSettingsFromLocalStorage(settingsLocalStorage);
    }
  }

  updateCategoryFromUrl() {
    const matchCategory = this.props.match.params.category;
    const activeCategory = this.props.configuratorStore.userSettings
      .activeCategory;

    if (matchCategory && matchCategory !== activeCategory) {
      this.props.setActiveCategory(matchCategory);
    }
  }

  componentDidMount() {
    this.loadSettings();
  }

  componentDidUpdate() {
    this.setCategoryUrlIfEmpty();
    this.updateCategoryFromUrl();
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
            <MenuItems />
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
    loadSettingsFromLocalStorage: settingsLocalStorage =>
      dispatch(
        configuratorActions.loadSettingsFromLocalStorage(settingsLocalStorage)
      )
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Configurator)
);
