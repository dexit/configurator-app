import React from 'react';
import styles from './Menu.module.scss';

import { NavLink } from 'react-router-dom';

const Menu = props => {
  const menu = props.categories.map(item => (
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
};

export default Menu;
