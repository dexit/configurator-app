import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from './configuratorActions';
import { Route } from 'react-router-dom';

import styles from './Configurator.module.scss';

import Menu from './components/Menu';
import MenuItems from './components/MenuItems';
import ItemImg from './components/ItemImg';

class Configurator extends Component {
  componentDidMount() {
    const matchCategory = this.props.match.params.category;
    const firstCategory = this.props.configuratorStore.categories[0].slug;
    const activeCategory = matchCategory ? matchCategory : firstCategory;

    this.props.setActiveCategory(activeCategory);
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
            <Route component={MenuItems} />
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
      dispatch(configuratorActions.setActiveCategory(categorySlug))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configurator);
