import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './MenuItems.module.scss';

class MenuItems extends Component {
  handleClick = (activeCategorySlug, itemId) => {
    this.props.setActiveItem(activeCategorySlug, itemId);
  };

  render() {
    const configuratorStore = this.props.configuratorStore;
    const categories = configuratorStore.categories;
    const activeCategorySlug = this.props.match.params.category;
    const activeCategoryIndex = categories.findIndex(
      category => category.slug === activeCategorySlug
    );
    const activeCategoryName =
      activeCategoryIndex > -1 ? categories[activeCategoryIndex].name : null;

    const itemsList =
      activeCategoryIndex > -1 &&
      categories[activeCategoryIndex].items.map(item => {
        const activeItemsIndex = configuratorStore.activeItems.findIndex(
          item => item.categorySlug === activeCategorySlug
        );
        const activeItemId =
          configuratorStore.activeItems[activeItemsIndex].itemId;
        const activeItemClass = activeItemId === item.id && styles.active;

        return (
          <div
            key={item.id}
            className="col-md-6 p-4 d-flex justify-content-center align-content-center"
          >
            <button
              className={`${styles.item} ${activeItemClass}`}
              onClick={this.handleClick.bind(this, activeCategorySlug, item.id)}
            >
              <img src={item.imgThumb} alt="" className="img-fluid" />
              {item.name}
            </button>
          </div>
        );
      });

    return (
      <div className={styles.wrapper}>
        {activeCategoryName ? (
          <div className="text-center py-4">
            <h2>{activeCategoryName}</h2>
          </div>
        ) : null}
        <div className="row">
          {itemsList ? (
            itemsList
          ) : (
            <div className="col text-center py-5">
              <p>Wybierz kategorię</p>
            </div>
          )}
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
    setActiveItem: (activeCategorySlug, itemId) =>
      dispatch(configuratorActions.setActiveItem(activeCategorySlug, itemId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItems);
