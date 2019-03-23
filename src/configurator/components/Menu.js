import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './Menu.module.scss';

import { NavLink, withRouter } from 'react-router-dom';

import { categoryName, summaryName } from '../../app/App';

class Menu extends Component {
  handleCategoryClick = categorySlug => {
    this.props.setActiveCategory(categorySlug);
  };

  render() {
    const configuratorStore = this.props.configuratorStore;

    const menu = configuratorStore.categories.map(item => {
      return (
        <NavLink
          to={'/' + categoryName + '/' + item.slug}
          key={item.id}
          className={`d-block px-5 py-3 ${styles.link}`}
          activeClassName={styles.active}
          onClick={this.handleCategoryClick.bind(this, item.slug)}
        >
          {item.name}
        </NavLink>
      );
    });

    const summary = (
      <NavLink
        to={'/' + summaryName}
        className={`d-block px-5 py-3 ${styles.link}`}
        activeClassName={styles.active}
      >
        Gotowe
      </NavLink>
    );

    return (
      <div className={styles.wrapper}>
        {menu}
        {summary}
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Menu)
);
