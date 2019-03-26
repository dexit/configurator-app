import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './ItemImg.module.scss';

import createProductThumb from '../../utils/createProductThumb';

class ItemImg extends Component {
  componentUpdated = false;

  handleAddClick = () => {
    if (!this.props.configuratorStore.productExists) {
      this.props.openSavedProducts();
      createProductThumb(this.props.addProduct);
    } else {
      this.props.openSavedProducts();
    }
  };

  componentDidMount() {
    this.props.checkProductExist();
  }

  componentDidUpdate() {
    if (!this.componentUpdated) {
      this.props.checkProductExist();

      this.componentUpdated = true;
    } else {
      this.componentUpdated = false;
    }
  }

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

    const productExists = this.props.configuratorStore.productExists;

    return (
      <div
        className={styles.bg}
        style={{ backgroundImage: 'url(/img/product-bg.jpg)' }}
        id="product"
      >
        <img src="/img/transparent-bg.png" alt="" className="img-fluid" />
        {images}
        <button
          className={`${styles.btnAdd} ${
            productExists ? styles.active : undefined
          }`}
          id="btnAdd"
          onClick={this.handleAddClick}
        >
          {!productExists ? (
            <span>Zapisz produkt</span>
          ) : (
            <span>Produkt zapisany</span>
          )}
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
    addProduct: img => dispatch(configuratorActions.addProduct(img)),
    checkProductExist: () => dispatch(configuratorActions.checkProductExist())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemImg);
