import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';
import { withRouter } from 'react-router-dom';

import styles from './ItemsList.module.scss';

class ItemsList extends Component {
  handleClick = (activeCategorySlug, itemId) => {
    this.props.setActiveItem(activeCategorySlug, itemId);
  };

  componentDidMount() {
    this.props.setInitialActiveItems();
  }

  list() {
    const configuratorStore = this.props.configuratorStore;
    const categories = configuratorStore.categories;
    const activeCategorySlug = configuratorStore.activeCategory;
    const activeCategoryIndex = categories.findIndex(
      category => category.slug === activeCategorySlug
    );

    let list = [];

    if (activeCategoryIndex > -1 && configuratorStore.activeItems.length) {
      list = categories[activeCategoryIndex].items.map(item => {
        const activeItemClass = () => {
          const activeItemsIndex = configuratorStore.activeItems.findIndex(
            item => item.categorySlug === activeCategorySlug
          );
          const activeItemId =
            configuratorStore.activeItems[activeItemsIndex].itemId;

          return activeItemId === item.id ? styles.active : null;
        };

        return (
          <div
            key={item.id}
            className="col-md-6 p-4 d-flex justify-content-center align-content-center"
          >
            <button
              className={`${styles.item} ${activeItemClass()}`}
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
  }

  render() {
    return <>{this.list()}</>;
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    setInitialActiveItems: () =>
      dispatch(configuratorActions.setInitialActiveItems()),
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
