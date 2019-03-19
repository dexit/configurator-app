import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import styles from './SavedProducts.module.scss';

class SavedProducts extends Component {
  handleProductClick = items => {
    this.props.changeActiveItems(items);
    this.props.setActiveItems();
  };

  render() {
    const modal = this.props.configuratorStore.savedProductsModal;
    const savedProducts = this.props.configuratorStore.userSettings
      .savedProducts;

    const savedProductsList = savedProducts.map((item, index) => (
      <button
        key={index}
        className={styles.item}
        onClick={this.handleProductClick.bind(this, item.productParts)}
      >
        Produkt {index}
      </button>
    ));

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
          <ModalBody>{savedProductsList}</ModalBody>
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
    setActiveItems: () => dispatch(configuratorActions.setActiveItems())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SavedProducts);
