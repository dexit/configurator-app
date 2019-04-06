import { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';

class Api extends Component {
  constructor(props) {
    super(props);

    const { language } = this.props.i18n;

    this.API = '/';
    this.API_CATEGORIES = this.API + `categories-${language}.json`;
    this.API_PRODUCT_EMAIL = 'http://httpbin.org/post';
  }

  componentDidMount() {
    this.props.setApi(this.API_CATEGORIES, this.API_PRODUCT_EMAIL);
  }

  componentDidUpdate(prevProps) {
    const { language } = this.props.i18n;

    if (language !== prevProps.language) {
    }
  }

  render() {
    return {};
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => {
  return {
    // setApi: () => dispatch(configuratorActions.getCategories())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Api));
