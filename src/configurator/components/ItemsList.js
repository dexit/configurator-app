import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';
import { withRouter } from 'react-router-dom';

import styles from './ItemsList.module.scss';

class ItemsList extends Component {
  handleClick = (activeCategorySlug, itemId) => {
    this.props.setActiveItem(activeCategorySlug, itemId);
  };

  list = () => {
    const configuratorStore = this.props.configuratorStore;
    const categories = configuratorStore.categories;
    const activeCategorySlug = this.props.match.params.category;
    const activeCategoryIndex = categories.findIndex(
      category => category.slug === activeCategorySlug
    );

    let list = [];

    if (activeCategoryIndex > -1) {
      list = categories[activeCategoryIndex].items.map(item => {
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
    }

    return list;
  };

  render() {
    return <>{this.list()}</>;
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ItemsList)
);
