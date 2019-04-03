import React from 'react';
import { Field, reduxForm } from 'redux-form';
import i18n from 'i18next';
import { withTranslation } from 'react-i18next';
import translations from '../../translations';

import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';

const validate = values => {
  const currentLanguage = i18n.language;
  const errors = {};

  const emailPatt = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if (!emailPatt.test(values.emailSender)) {
    errors.emailSender = translations[currentLanguage].translation.error_email;
  }

  if (!emailPatt.test(values.emailRecipient)) {
    errors.emailRecipient =
      translations[currentLanguage].translation.error_email;
  }

  if (!values.title) {
    errors.title = translations[currentLanguage].translation.error_title;
  }

  if (!values.regulation) {
    errors.regulation =
      translations[currentLanguage].translation.error_regulation;
  }
  console.log(errors);

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
  const t = props.t;
  const { handleSubmit, pristine, submitting } = props;

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <FormGroup>
        <Field
          name="emailSender"
          id="emailSender"
          label={t('your_email') + '*'}
          component={input}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Field
          name="emailRecipient"
          id="emailRecipient"
          label={t('recipient_email') + '*'}
          component={input}
          type="email"
        />
      </FormGroup>
      <FormGroup>
        <Field
          name="title"
          id="title"
          label={t('title') + '*'}
          component={input}
          type="text"
        />
      </FormGroup>
      <FormGroup>
        <Field
          name="message"
          id="message"
          label={t('message')}
          component={input}
          type="textarea"
        />
      </FormGroup>
      <FormGroup check>
        <Field
          name="regulation"
          label={t('agree_regulations') + '*'}
          component={checkbox}
        />
      </FormGroup>
      <p className="mt-4">* {t('required_fields') + '*'}</p>
      <Button
        color="primary"
        className="mt-4"
        disabled={pristine || submitting}
      >
        {props.t('submit')}{' '}
        {submitting && <Spinner size="sm" color="danger" className="ml-2" />}
      </Button>
    </Form>
  );
};

export default reduxForm({
  form: 'productEmail',
  validate
})(withTranslation()(productEmailForm));
