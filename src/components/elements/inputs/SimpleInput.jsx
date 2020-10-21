import React from 'react';
import { Form } from 'semantic-ui-react';

export default function SimpleInput(props) {
  const { input, label, placeholder, meta, ...rest } = props;

  return (
    <Form.Input {...input} label={label} error={meta.error} placeholder={placeholder} {...rest} />
  );
}
