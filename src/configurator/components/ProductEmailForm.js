import React from 'react';
import { Field, reduxForm } from 'redux-form';

import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

const errorsMessages = {
  email: 'Wpisz poprawny E-mail',
  title: 'Wpisz tytuł',
  message: 'Wpisz wiadomość',
  regulation: 'Zaakceptuj zgodę'
};

const validate = values => {
  const errors = {};

  const emailPatt = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!emailPatt.test(values.emailSender)) {
    errors.emailSender = errorsMessages.email;
  }

  if (!emailPatt.test(values.emailRecipient)) {
    errors.emailRecipient = errorsMessages.email;
  }

  if (!values.title) {
    errors.title = errorsMessages.title;
  }

  if (!values.regulation) {
    errors.regulation = errorsMessages.regulation;
  }

  return errors;
};

const input = ({ input, id, label, type, meta: { touched, error } }) => (
  <>
    <Label htmlFor={id}>{label}</Label>
    <Input id={id} {...input} type={type} />
    <div className="text-danger">
      {touched && (error && <span>{error}</span>)}
    </div>
  </>
);

const checkbox = ({ input, label, meta: { touched, error } }) => (
  <>
    <Label check>
      <Input {...input} type="checkbox" />
      {label}
    </Label>
    <div className="text-danger">
      {touched && (error && <span>{error}</span>)}
    </div>
  </>
);

const productEmailForm = props => {
  const { handleSubmit, pristine, submitting } = props;

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup>
        <Field
          name="emailSender"
          id="emailSender"
          label="Twój E-mail *"
          component={input}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Field
          name="emailRecipient"
          id="emailRecipient"
          label="E-mail odbiorcy *"
          component={input}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Field
          name="title"
          id="title"
          label="Tytuł *"
          component={input}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Field
          name="message"
          id="message"
          label="Wiadomość"
          component={input}
          type="textarea"
        />
      </FormGroup>
      <FormGroup check>
        <Field
          name="regulation"
          label="Zgadzam się na regulamin *"
          component={checkbox}
        />
      </FormGroup>
      <p className="mt-4">* pola wymagane</p>
      <Button
        color="primary"
        className="mt-4"
        disabled={pristine || submitting}
      >
        Wyślij{' '}
        {submitting && <Spinner size="sm" color="danger" className="ml-2" />}
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: 'productEmail',
  validate
})(productEmailForm);
