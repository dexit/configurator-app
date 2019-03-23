import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './ItemsList.module.scss';

class ItemsList extends Component {
  handleClick = (activeCategorySlug, itemId) => {
    this.props.saveActiveItemUserSettings(activeCategorySlug, itemId);
    this.props.setActiveItems();
    this.props.updateActiveCategoryObject();
  };

  list() {
    const activeCategory = this.props.configuratorStore.activeCategory;

    let list = [];

    if (activeCategory.id !== undefined) {
      list = activeCategory.items.map(item => {
        const activeItemClass = () => item.active && styles.active;

        return (
          <div
            key={item.id}
            className="col-md-6 p-4 d-flex justify-content-center align-content-center"
          >
            <button
              className={`${styles.item} ${activeItemClass()}`}
              onClick={this.handleClick.bind(
                this,
                activeCategory.slug,
                item.id
              )}
            >
              <img
                src="/img/simple-model.png"
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
    saveActiveItemUserSettings: (activeCategorySlug, itemId) =>
      dispatch(
        configuratorActions.saveActiveItemUserSettings(
          activeCategorySlug,
          itemId
        )
      ),
    updateActiveCategoryObject: () =>
      dispatch(configuratorActions.updateActiveCategoryObject())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemsList);
