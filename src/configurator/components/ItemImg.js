import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';
import { withTranslation } from 'react-i18next';

import styles from './ItemImg.module.scss';

import createProductThumb from '../../utils/createProductThumb';

class ItemImg extends Component {
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.configuratorStore.userSettings.activeItems !==
      this.props.configuratorStore.userSettings.activeItems
    ) {
      this.props.checkProductExist();
    }
  }

  render() {
    const t = this.props.t;
    const categories = this.props.configuratorStore.categories;

    const images = categories.map(category =>
      category.items.map(item => {
        if (item.active) {
          return (
            <img
              src={process.env.PUBLIC_URL + item.imgLarge}
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

    const btnAddProduct = (
      <button
        className={`btn btn-primary ${styles.btnAdd} ${
          productExists ? styles.active : undefined
        }`}
        id="btnAdd"
        onClick={this.handleAddClick}
      >
        {!productExists ? (
          <span>{t('save_product')}</span>
        ) : (
          <span>{t('saved_product')}</span>
        )}
      </button>
    );

    return (
      <div
        className={styles.bg}
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/img/product-bg.jpg)`
        }}
        id="product"
      >
        <img
          src={`${process.env.PUBLIC_URL}/img/transparent-bg.png`}
          alt=""
          className="img-fluid"
        />
        {images}
        {categories.length && !this.props.onlyImg ? btnAddProduct : null}
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
)(withTranslation()(ItemImg));
