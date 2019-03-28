import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as configuratorActions from '../configuratorActions';

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Spinner
} from 'reactstrap';

import { API_PRODUCT_EMAIL } from '../../app/App';

import createProductPdf from '../../utils/createProductPdf';

class SendProductEmail extends Component {
  state = {
    sending: false,

    emailSender: '',
    emailRecipient: '',
    title: '',
    message: '',
    regulation: false,

    successMessage: '',
    errorMessage: '',

    errors: {
      emailSender: false,
      emailRecipient: false,
      title: false,
      message: false,
      regulation: false
    }
  };

  messages = {
    emailSender_incorrect: 'Wpisz poprawny E-mail',
    emailRecipient_incorrect: 'Wpisz poprawny E-mail',
    title_incorrect: 'Wpisz tytuł',
    message_incorrect: 'Wpisz wiadomość',
    regulation_incorrect: 'Zaakceptuj zgodę'
  };

  handleToggleModal = () => {
    this.props.productEmailModalToggle();
  };

  handleChange = e => {
    if (e.target.type === 'checkbox') {
      this.setState({
        [e.target.name]: e.target.checked
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const validation = this.formValidation();

    if (validation.correct) {
      this.setState({
        sending: true
      });

      const data = new FormData(e.target);

      createProductPdf()
        .then(pdf => {
          data.append('product_pdf', pdf);
        })
        .then(() => {
          fetch(API_PRODUCT_EMAIL, {
            method: 'POST',
            body: data
          })
            .then(resp => {
              if (resp.ok) {
                this.setState({
                  sending: false,

                  emailSender: '',
                  emailRecipient: '',
                  title: '',
                  message: '',
                  regulation: false,

                  successMessage:
                    'Formularz został wysłany. Email nie został dostarczony: testowe API - odpowiedź z serwera w konsoli.',
                  errorMessage: '',

                  errors: {
                    emailSender: false,
                    emailRecipient: false,
                    title: false,
                    message: false,
                    regulation: false
                  }
                });
              } else {
                this.setState({
                  sending: false,
                  errorMessage: 'Wystąpił błąd. Formularz nie został wysłany.',
                  errors: {
                    emailSender: false,
                    emailRecipient: false,
                    title: false,
                    message: false,
                    regulation: false
                  }
                });
              }

              return resp;
            })
            .then(resp => (resp.ok ? resp.json() : resp))
            .then(resp => {
              console.log(resp);
            });
        });
    } else {
      this.setState({
        errors: {
          sending: false,
          emailSender: !validation.emailSender,
          emailRecipient: !validation.emailRecipient,
          title: !validation.title,
          message: !validation.message,
          regulation: !validation.regulation
        }
      });
    }
  };

  formValidation() {
    let emailSender = false;
    let emailRecipient = false;
    let title = false;
    let message = false;
    let regulation = false;

    let correct = false;

    if (this.state.emailSender.indexOf('@') !== -1) {
      emailSender = true;
    }

    if (this.state.emailRecipient.indexOf('@') !== -1) {
      emailRecipient = true;
    }

    if (this.state.title.length) {
      title = true;
    }

    message = true;

    if (this.state.regulation) {
      regulation = true;
    }

    if (emailSender && emailRecipient && title && message && regulation) {
      correct = true;
    }

    return {
      correct,
      emailSender,
      emailRecipient,
      title,
      message,
      regulation
    };
  }

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
    const modalProductEmail = this.props.configuratorStore.productEmailModal;

    const form = (
      <Form onSubmit={this.handleSubmit} noValidate>
        <FormGroup>
          <Label for="emailSender">Twój E-mail</Label>
          <Input
            type="email"
            id="emailSender"
            name="emailSender"
            value={this.state.emailSender}
            onChange={this.handleChange}
          />
          <div className="text-danger">
            {this.state.errors.emailSender && (
              <span>{this.messages.emailSender_incorrect}</span>
            )}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="emailRecipient">E-mail odbiorcy</Label>
          <Input
            type="email"
            id="emailRecipient"
            name="emailRecipient"
            value={this.state.emailRecipient}
            onChange={this.handleChange}
          />
          <div className="text-danger">
            {this.state.errors.emailRecipient && (
              <span>{this.messages.emailRecipient_incorrect}</span>
            )}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="title">Tytuł</Label>
          <Input
            type="text"
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <div className="text-danger">
            {this.state.errors.title && (
              <span>{this.messages.title_incorrect}</span>
            )}
          </div>
        </FormGroup>
        <FormGroup>
          <Label for="message">Wiadomość</Label>
          <Input
            type="textarea"
            id="message"
            name="message"
            value={this.state.message}
            onChange={this.handleChange}
          />
          <div className="text-danger">
            {this.state.errors.message && (
              <span>{this.messages.message_incorrect}</span>
            )}
          </div>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input
              type="checkbox"
              name="regulation"
              checked={this.state.regulation}
              onChange={this.handleChange}
            />{' '}
            Zgadzam się na regulamin
          </Label>
          <div className="text-danger">
            {this.state.errors.regulation && (
              <span>{this.messages.regulation_incorrect}</span>
            )}
          </div>
        </FormGroup>
        <Button className="mt-4" disabled={this.state.sending}>
          Wyślij{' '}
          {this.state.sending && (
            <Spinner size="sm" color="danger" className="ml-2" />
          )}
        </Button>
      </Form>
    );

    return (
      <Modal
        isOpen={modalProductEmail}
        toggle={this.handleToggleModal}
        className={this.props.className}
      >
        <ModalHeader toggle={this.handleToggleModal}>
          Wyślij opis produktu w wiadomości E-mail
        </ModalHeader>
        <ModalBody>
          {this.state.successMessage ? null : form}
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
)(SendProductEmail);
