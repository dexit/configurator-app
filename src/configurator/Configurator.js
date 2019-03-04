import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as configuratorActions from './configuratorActions';

import { Route } from 'react-router-dom';

import Menu from './components/Menu';
import MenuItems from './components/MenuItems';
import ItemImg from './components/ItemImg';

class Configurator extends Component {
  render() {
    const configStore = this.props.configuratorStore;

    return (
      <div className="d-flex flex-column" style={{ height: '100vh' }}>
        <header className="text-center text-uppercase my-5">
          <h1>Konfigurator</h1>
        </header>
        <div className="row flex-grow-1">
          <div className="col-md-2">
            <Menu categories={configStore.categories} />
          </div>
          <div className="col-md-3">
            <Route path="/:category" component={MenuItems} />
          </div>
          <div className="col-md-7">
            <ItemImg />
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
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Configurator);
