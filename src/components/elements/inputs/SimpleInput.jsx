import React from 'react';
import { Form } from 'semantic-ui-react';

import { getValidationLabelProps } from 'components/elements/inputs/ValidationLabelProps';

export default function SimpleInput(props) {
  const { input, label, placeholder, meta, ...rest } = props;

  const validationLabelProps = getValidationLabelProps(meta, label);

  return (
    <Form.Input
      {...input}
      label={validationLabelProps.label}
      error={validationLabelProps.isError}
      icon={validationLabelProps.errorIcon}
      placeholder={placeholder}
      {...rest}
    />
  );
}
