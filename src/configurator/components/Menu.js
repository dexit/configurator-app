import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './Menu.module.scss';

import { NavLink, withRouter } from 'react-router-dom';

import { routeCategoryName, routeSummaryName } from '../../app/App';

class Menu extends Component {
  handleCategoryClick = categorySlug => {
    this.props.setActiveCategory(categorySlug);
  };

  render() {
    const categories = this.props.configuratorStore.categories;

    const menu = categories.map(item => {
      return (
        <NavLink
          to={'/' + routeCategoryName + '/' + item.slug}
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
        to={'/' + routeSummaryName}
        className={`d-block px-5 py-3 ${styles.link}`}
        activeClassName={styles.active}
      >
        Gotowe
      </NavLink>
    );

    return (
      <div className={styles.wrapper}>
        {menu}
        {categories.length ? summary : null}
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
