import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';
import { withTranslation } from 'react-i18next';

import styles from './Menu.module.scss';

import { NavLink, withRouter } from 'react-router-dom';

class Menu extends Component {
  handleCategoryClick = categoryId => {
    this.props.setActiveCategory(categoryId);
  };

  render() {
    const t = this.props.t;
    const categories = this.props.configuratorStore.categories;

    const menu = categories.map(item => {
      return (
        <NavLink
          to={'/' + t('routeCategoryName') + '/' + item.slug}
          key={item.id}
          className={`d-block px-5 py-3 ${styles.link}`}
          activeClassName={styles.active}
          onClick={this.handleCategoryClick.bind(this, item.id)}
        >
          {item.name}
        </NavLink>
      );
    });

    const summary = (
      <NavLink
        to={'/' + t('routeSummaryName')}
        className={`d-block px-5 py-3 ${styles.link}`}
        activeClassName={styles.active}
      >
        {t('ready')}
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
    setActiveCategory: categoryId =>
      dispatch(configuratorActions.setActiveCategory(categoryId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withTranslation()(Menu))
);
