import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './ItemImg.module.scss';

class ItemImg extends Component {
  render() {
    const categories = this.props.configuratorStore.categories;

    const images = categories.map(category =>
      category.items.map(item => {
        if (item.active) {
          return (
            <img
              src={item.imgLarge}
              alt=""
              key={item.id}
              className={styles.img}
              style={{ zIndex: item.indexCss }}
            />
          );
        }
        return null;
      })
    );

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
