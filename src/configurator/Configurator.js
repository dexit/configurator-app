import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from './configuratorActions';

class Configurator extends Component {
  state = {};

  handleClick = () => {
    this.props.testAction();
  };

  render() {
    const store = this.props.configuratorStore;

    return (
      <div>
        <button onClick={this.handleClick}>konfigurator</button>
        {store.itWorks && <div>Działa!!!</div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    testAction: eventId => dispatch(configuratorActions.testAction())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configurator);
