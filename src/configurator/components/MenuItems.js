import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as configuratorActions from '../configuratorActions';

import styles from './MenuItems.module.scss';

import ItemsList from './ItemsList';

class MenuItems extends Component {
  render() {
    const activeCategory = this.props.configuratorStore.categories.filter(
      category => category.active === true
    )[0];
    const activeCategoryName = activeCategory && activeCategory.name;

    return (
      <div className={styles.wrapper}>
        {activeCategoryName ? (
          <div className="text-center py-4">
            <h2>{activeCategoryName}</h2>
          </div>
        ) : null}
        <div className="row">
          <ItemsList />
        </div>
      </div>
    );
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
)(MenuItems);
