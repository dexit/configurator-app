import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './Menu.module.scss';

import { NavLink } from 'react-router-dom';

class Menu extends Component {
  handleCategoryClick = categorySlug => {
    this.props.setActiveCategory(categorySlug);
  };

  handleSummaryClick = () => {
    this.props.openSummary();
  };

  render() {
    const configuratorStore = this.props.configuratorStore;
    const userSettings = configuratorStore.userSettings;

    const menu = configuratorStore.categories.map(item => {
      return (
        <NavLink
          to={'/' + item.slug}
          key={item.id}
          className={`d-block px-5 py-3 ${styles.link}`}
          activeClassName={styles.active}
          isActive={() =>
            item.slug === userSettings.activeCategory &&
            userSettings.summaryOpen === false
          }
          onClick={this.handleCategoryClick.bind(this, item.slug)}
        >
          {item.name}
        </NavLink>
      );
    });

    const summary = (
      <NavLink
        to={'/gotowe'}
        className={`d-block px-5 py-3 ${styles.link}`}
        activeClassName={styles.active}
        isActive={() => userSettings.summaryOpen === true}
        onClick={this.handleSummaryClick}
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
      dispatch(configuratorActions.setActiveCategory(categorySlug)),
    openSummary: () => dispatch(configuratorActions.openSummary())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
