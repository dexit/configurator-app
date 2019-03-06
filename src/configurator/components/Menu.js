import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Menu.module.scss';

import { NavLink } from 'react-router-dom';

class Menu extends Component {
  render() {
    const configuratorStore = this.props.configuratorStore;

    const menu = configuratorStore.categories.map(item => (
      <NavLink
        to={'/' + item.slug}
        key={item.id}
        className={`d-block px-5 py-3 ${styles.link}`}
        activeClassName={styles.active}
      >
        {item.name}
      </NavLink>
    ));

    return <div className={styles.wrapper}>{menu}</div>;
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
