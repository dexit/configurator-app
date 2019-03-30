import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './Summary.module.scss';

import { Spinner } from 'reactstrap';

import html2pdf from 'html2pdf.js';
import saveBase64AsFile from '../../utils/saveBase64AsFile';

import SendProductEmail from './SendProductEmail';
import TemplatePDF from './TemplatePDF';

class Summary extends Component {
  state = {
    creatingPdf: false,
    creatingImg: false
  };

  handleOpenProductsClick = () => {
    this.props.openSavedProducts();
  };

  handleSaveProductImgClick = () => {
    this.setState({
      creatingImg: true
    });

    const opt = {
      html2canvas: {
        logging: false,
        ignoreElements: element => element.id === 'btnAdd'
      }
    };

    html2pdf()
      .set(opt)
      .from(document.querySelector('#product'))
      .toImg()
      .outputImg('dataurlstring')
      .then(image => {
        return saveBase64AsFile(image, 'produkt.jpg');
      })
      .then(() => {
        this.setState({
          creatingImg: false
        });
      });
  };

  handleSaveProductPdfClick = () => {
    this.setState({
      creatingPdf: true
    });

    const opt = {
      margin: 1,
      filename: 'produkt.pdf',
      image: { type: 'png' },
      html2canvas: {
        logging: false
      },
      jsPDF: { orientation: 'landscape' }
    };

    html2pdf()
      .set(opt)
      .from(document.querySelector('#templatePDF'))
      .save()
      .then(() => {
        this.setState({
          creatingPdf: false
        });
      });
  };

  handleProductEmailModalOpen = () => {
    this.props.productEmailModalOpen();
  };

  render() {
    const savedProductsCount = this.props.configuratorStore.userSettings
      .savedProducts.length;

    return (
      <>
        <div className={styles.wrapper}>
          <div className="row">
            <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
              <button
                type="button"
                className={`btn p-3 ${styles.item}`}
                onClick={this.handleOpenProductsClick}
              >
                Zapisane produkty ({savedProductsCount})
              </button>
            </div>
            <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
              <button
                type="button"
                className={`btn p-3 ${styles.item}`}
                onClick={this.handleSaveProductImgClick}
                disabled={this.state.creatingImg}
              >
                Zapisz produkt jako obrazek
                {this.state.creatingImg && (
                  <div>
                    <Spinner size="sm" color="danger" className="ml-2" />
                  </div>
                )}
              </button>
            </div>
            <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
              <button
                type="button"
                className={`btn p-3 ${styles.item}`}
                onClick={this.handleSaveProductPdfClick}
                disabled={this.state.creatingPdf}
              >
                Zapisz opis produktu jako PDF
                {this.state.creatingPdf && (
                  <div>
                    <Spinner size="sm" color="danger" className="ml-2" />
                  </div>
                )}
              </button>
            </div>
            <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
              <button
                type="button"
                className={`btn p-3 ${styles.item}`}
                onClick={this.handleProductEmailModalOpen}
              >
                Wyślij opis produktu w wiadomości E-mail
              </button>
            </div>
          </div>
        </div>

        <SendProductEmail />

        <TemplatePDF categories={this.props.configuratorStore.categories} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    openSavedProducts: () => dispatch(configuratorActions.openSavedProducts()),
    productEmailModalOpen: () =>
      dispatch(configuratorActions.productEmailModalOpen())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary);
