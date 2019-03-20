import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import styles from './SavedProducts.module.scss';

import html2canvas from 'html2canvas';
import imageResize from '../../utils/imageResize';

class SavedProducts extends Component {
  handleProductClick = items => {
    this.props.changeActiveItems(items);
    this.props.setActiveItems();
  };

  handleAddProductClick = () => {
    html2canvas(document.querySelector('#product'), {
      logging: false
    }).then(canvas => {
      const imgUrl = canvas.toDataURL('image/jpeg');

      imageResize(imgUrl, 186, 124).then(imgResized => {
        this.props.addProduct(imgResized);
      });
    });
  };

  handleRemoveProductClick = index => {
    this.props.removeProduct(index);
  };

  render() {
    const modal = this.props.configuratorStore.savedProductsModal;
    const savedProducts = this.props.configuratorStore.userSettings
      .savedProducts;

    const savedProductsList = savedProducts.map((item, index) => (
      <div className={styles.itemWrapper} key={index}>
        <button
          className={styles.btnRemove}
          onClick={this.handleRemoveProductClick.bind(this, index)}
        >
          Usuń
        </button>
        <button
          className={styles.btnChange}
          onClick={this.handleProductClick.bind(this, item.productParts)}
        >
          <img src={item.img} alt="" />
        </button>
      </div>
    ));

    const btnAddProduct = () => {
      if (this.props.configuratorStore.userSettings.savedProducts.length < 8) {
        return <button onClick={this.handleAddProductClick}>Dodaj nowy</button>;
      }

      return null;
    };

    return (
      <div>
        <Modal
          isOpen={modal}
          toggle={this.props.savedProductsToggle}
          className={this.props.className}
          centered={true}
        >
          <ModalHeader toggle={this.props.savedProductsToggle}>
            Zapisane produkty
          </ModalHeader>
          <ModalBody>
            {savedProductsList}
            {btnAddProduct()}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    savedProductsToggle: () =>
      dispatch(configuratorActions.savedProductsToggle()),
    changeActiveItems: items =>
      dispatch(configuratorActions.changeActiveItems(items)),
    setActiveItems: () => dispatch(configuratorActions.setActiveItems()),
    removeProduct: index => dispatch(configuratorActions.removeProduct(index)),
    addProduct: img => dispatch(configuratorActions.addProduct(img))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedProducts);