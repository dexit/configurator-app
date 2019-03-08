import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './ItemsList.module.scss';

class ItemsList extends Component {
  handleClick = (activeCategorySlug, itemId) => {
    this.props.setActiveItem(activeCategorySlug, itemId);
  };

  componentDidMount() {
    const activeItems = this.props.configuratorStore.userSettings.activeItems;

    if (!activeItems.length) {
      this.props.setDefaultActiveItems();
    }
  }

  list() {
    const configuratorStore = this.props.configuratorStore;
    const categories = configuratorStore.categories;
    const activeCategorySlug = configuratorStore.userSettings.activeCategory;
    const activeCategoryIndex = categories.findIndex(
      category => category.slug === activeCategorySlug
    );
    const activeItemsState = configuratorStore.userSettings.activeItems;

    let list = [];

    if (activeCategoryIndex > -1 && activeItemsState.length) {
      list = categories[activeCategoryIndex].items.map(item => {
        const activeItemClass = () => {
          const activeItemsIndex = activeItemsState.findIndex(
            item => item.categorySlug === activeCategorySlug
          );
          const activeItemId = activeItemsState[activeItemsIndex].itemId;

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
    setDefaultActiveItems: () =>
      dispatch(configuratorActions.setDefaultActiveItems()),
    setActiveItem: (activeCategorySlug, itemId) =>
      dispatch(configuratorActions.setActiveItem(activeCategorySlug, itemId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList);
