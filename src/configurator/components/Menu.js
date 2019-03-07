import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './Menu.module.scss';

import { NavLink } from 'react-router-dom';

class Menu extends Component {
  handleClick = categorySlug => {
    this.props.setActiveCategory(categorySlug);
  };

  render() {
    const configuratorStore = this.props.configuratorStore;

    const menu = configuratorStore.categories.map(item => {
      return (
        <NavLink
          to={'/' + item.slug}
          key={item.id}
          className={`d-block px-5 py-3 ${styles.link}`}
          activeClassName={styles.active}
          isActive={() =>
            item.slug === configuratorStore.userSettings.activeCategory
          }
          onClick={this.handleClick.bind(this, item.slug)}
        >
          {item.name}
        </NavLink>
      );
    });

    return <div className={styles.wrapper}>{menu}</div>;
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
)(Menu);
