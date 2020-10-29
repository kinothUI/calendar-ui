import React from 'react';
import { Form } from 'semantic-ui-react';

import { getValidationLabelProps } from 'components/elements/inputs/ValidationLabelProps';

function SelectField(ownProps) {
  const { input, meta, label, multiSelect, ...rest } = ownProps;
  const handleOnChange = (event, data) => input.onChange(data.value);

  const validationLabelProps = getValidationLabelProps(meta, label);

  return (
    <Form.Select
      onChange={handleOnChange}
      multiple={multiSelect}
      label={validationLabelProps.label}
      error={validationLabelProps.isError}
      selection
      {...rest}
    />
  );
}

export default SelectField;
