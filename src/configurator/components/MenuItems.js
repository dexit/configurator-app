import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as configuratorActions from '../configuratorActions';

import styles from './MenuItems.module.scss';

import ItemsList from './ItemsList';

class MenuItems extends Component {
  render() {
    const configuratorStore = this.props.configuratorStore;
    const categories = configuratorStore.categories;
    const activeCategoryParamsSlug = this.props.match.params.category;
    const activeCategoryIndex = categories.findIndex(
      category => category.slug === activeCategoryParamsSlug
    );
    const activeCategoryName =
      activeCategoryIndex > -1 ? categories[activeCategoryIndex].name : null;

    return (
      <div className={styles.wrapper}>
        {activeCategoryName ? (
          <div className="text-center py-4">
            <h2>{activeCategoryName}</h2>
          </div>
        ) : null}
        <div className="row">
          {/* {activeCategoryIndex > -1 ? (
            <ItemsList />
          ) : (
            <div className="col text-center py-5">
              <p>Wybierz kategorię</p>
            </div>
          )} */}
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
