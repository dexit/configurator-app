import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as configuratorActions from '../configuratorActions';

import styles from './Summary.module.scss';

class Summary extends Component {
  render() {
    return <div className={styles.wrapper}>Podsumowanie</div>;
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
)(Summary);
