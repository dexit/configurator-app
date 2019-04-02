import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';
import { withTranslation } from 'react-i18next';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import ProductEmailForm from './ProductEmailForm';

import { API_PRODUCT_EMAIL } from '../../app/App';

import createProductPdf from '../../utils/createProductPdf';

class SendProductEmail extends Component {
  state = {
    successMessage: '',
    errorMessage: ''
  };

  handleToggleModal = () => {
    this.props.productEmailModalToggle();
  };

  handleSubmit = values => {
    const t = this.props.t;
    const data = new FormData();

    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        data.append(key, values[key]);
      }
    }

    return createProductPdf()
      .then(pdf => {
        data.append('product_pdf', pdf);
      })
      .then(() => {
        return fetch(API_PRODUCT_EMAIL, {
          method: 'POST',
          body: data
        })
          .then(resp => {
            if (resp.ok) {
              this.setState({
                submitting: false,
                successMessage: t('form_sent'),
                errorMessage: ''
              });
            } else {
              this.setState({
                submitting: false,
                errorMessage: t('form_error')
              });
            }

            return resp;
          })
          .then(resp => (resp.ok ? resp.json() : resp))
          .then(resp => {
            console.log(resp);
          });
      });
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.configuratorStore.productEmailModal !==
      prevProps.configuratorStore.productEmailModal
    ) {
      setTimeout(() => {
        this.setState({
          successMessage: ''
        });
      }, 1000);
    }
  }

  render() {
    const t = this.props.t;
    const modalProductEmail = this.props.configuratorStore.productEmailModal;

    return (
      <Modal
        isOpen={modalProductEmail}
        toggle={this.handleToggleModal}
        className={this.props.className}
      >
        <ModalHeader toggle={this.handleToggleModal}>
          {t('send_product_email')}
        </ModalHeader>
        <ModalBody>
          {this.state.successMessage ? null : (
            <ProductEmailForm onSubmit={this.handleSubmit} />
          )}
          <div className="my-4 text-center">
            {this.state.successMessage && <h3>{this.state.successMessage}</h3>}
            {this.state.errorMessage && <h3>{this.state.errorMessage}</h3>}
          </div>
        </ModalBody>
      </Modal>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    productEmailModalToggle: () =>
      dispatch(configuratorActions.productEmailModalToggle())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(SendProductEmail));
