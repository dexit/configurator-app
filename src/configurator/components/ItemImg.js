import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ItemImg.module.scss';

class ItemImg extends Component {
  render() {
    const categories = this.props.configuratorStore.categories;
    const activeItems = this.props.configuratorStore.userSettings.activeItems;

    const images = categories.map(category => {
      return activeItems.map(activeItem => {
        let items = [];

        if (category.slug === activeItem.categorySlug) {
          let item = category.items.map((item, index) => {
            let images = [];

            if (item.id === activeItem.itemId) {
              let img = (
                <img
                  src={item.imgLarge}
                  alt=""
                  key={item.id}
                  className={styles.img}
                  style={{zIndex: item.indexCss}}
                />
              );
              images.push(img);
            }
            return images;
          });
          items.push(item);
        }
        return items;
      });
    });

    return (
      <div
        className={styles.bg}
        style={{ backgroundImage: 'url(./img/product-bg.jpg)' }}
      >
        <img src="./img/transparent-bg.png" alt="" className="img-fluid" />
        {images}
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
)(ItemImg);
