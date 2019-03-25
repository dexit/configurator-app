import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './Summary.module.scss';

class Summary extends Component {
  handleOpenProductsClick = () => {
    this.props.openSavedProducts();
  };

  handleSaveProductImgClick = () => {
    // this.saveProductImg();
  };

  render() {
    return (
      <div className={styles.wrapper}>
        <div className="row">
          <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
            <button
              className={`${styles.item}`}
              onClick={this.handleOpenProductsClick}
            >
              Ulubione produkty
            </button>
          </div>
          <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
            <button
              className={`${styles.item}`}
              onClick={this.handleSaveProductImgClick}
            >
              Zapisz produkt jako obrazek
            </button>
          </div>
        </div>
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
    saveProductImg: () => dispatch(configuratorActions.saveProductImg())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary);
