import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './ItemImg.module.scss';

import createProductThumb from '../../utils/createProductThumb';

class ItemImg extends Component {
  handleAddClick = () => {
    this.props.openSavedProducts();
    createProductThumb(this.props.addProduct);
  };

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
        style={{ backgroundImage: 'url(/img/product-bg.jpg)' }}
        id="product"
      >
        <img src="/img/transparent-bg.png" alt="" className="img-fluid" />
        {images}
        <button
          className={styles.btnAdd}
          id="btnAdd"
          onClick={this.handleAddClick}
        >
          Dodaj produkt <br /> do ulubionych
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    openSavedProducts: () => dispatch(configuratorActions.openSavedProducts()),
    addProduct: img => dispatch(configuratorActions.addProduct(img))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemImg);
