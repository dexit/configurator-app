import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './Summary.module.scss';

import SavedProducts from './SavedProducts';

class Summary extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className="row">
          <div className="col-md-6 p-4 d-flex justify-content-center align-content-center">
            <button
              className={`${styles.item}`}
              onClick={this.props.savedProductsOpen}
            >
              Zapisane produkty
            </button>
          </div>
        </div>
        <SavedProducts />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    savedProductsOpen: () => dispatch(configuratorActions.savedProductsOpen())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary);
