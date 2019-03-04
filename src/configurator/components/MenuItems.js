import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import styles from './MenuItems.module.scss';

class MenuItems extends Component {
  render() {
    const configStore = this.props.configuratorStore;
    const categories = configStore.categories;

    const activeCategoryIndex = categories.findIndex(
      category => category.slug === this.props.match.params.category
    );

    const itemsList = categories[activeCategoryIndex].items.map(item => (
      <div
        key={item.id}
        className="col-md-6 p-4 d-flex justify-content-center align-content-center"
      >
        <button className={styles.item}>
          <img src={item.imgThumb} alt="" className="img-fluid" />
          {item.name}
        </button>
      </div>
    ));

    return (
      <div className={styles.wrapper}>
        <div className="row">{itemsList}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    // testAction: eventId => dispatch(configuratorActions.testAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuItems);
