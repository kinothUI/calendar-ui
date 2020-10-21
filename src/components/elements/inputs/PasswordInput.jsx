import React from 'react';
import { Form, Input } from 'semantic-ui-react';

export default function PasswordInput(props) {
  const { input, label, meta, labelText, placeholder, required, ...rest } = props;

  return (
    <Form.Field>
      <div className={required ? 'required field' : 'field'}>
        <label>{labelText}</label>
        <Input {...input} error={meta.error} label={label} placeholder={placeholder} {...rest} />
      </div>
    </Form.Field>
  );
}
