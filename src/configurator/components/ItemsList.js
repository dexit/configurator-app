import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './ItemsList.module.scss';

class ItemsList extends Component {
  handleClick = (activeCategorySlug, itemId) => {
    this.props.setActiveItemUserSettings(activeCategorySlug, itemId);
    this.props.setActiveItems();
  };

  list() {
    const configuratorStore = this.props.configuratorStore;
    const categories = configuratorStore.categories;
    const activeCategorySlug = configuratorStore.userSettings.activeCategory;
    const activeCategoryIndex = categories.findIndex(
      category => category.slug === activeCategorySlug
    );
    const activeItemsState = configuratorStore.userSettings.activeItems;

    let list = [];

    if (activeCategoryIndex > -1 && activeItemsState !== null) {
      list = categories[activeCategoryIndex].items.map(item => {
        const activeItemClass = () => item.active && styles.active;

        return (
          <div
            key={item.id}
            className="col-md-6 p-4 d-flex justify-content-center align-content-center"
          >
            <button
              className={`${styles.item} ${activeItemClass()}`}
              onClick={this.handleClick.bind(this, activeCategorySlug, item.id)}
            >
              <img
                src="./img/simple-model.png"
                alt=""
                className={styles.simpleModel}
              />
              <img src={item.imgThumb} alt="" className={styles.thumb} />
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
    setActiveItems: () => dispatch(configuratorActions.setActiveItems()),
    setActiveItemUserSettings: (activeCategorySlug, itemId) =>
      dispatch(
        configuratorActions.setActiveItemUserSettings(
          activeCategorySlug,
          itemId
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList);
