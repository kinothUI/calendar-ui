import React from 'react';
import { Form } from 'semantic-ui-react';

function SelectField(props) {
  const { input, meta, multiSelect, ...rest } = props;
  const handleOnChange = (event, data) => input.onChange(data.value);
  return (
    <Form.Select
      value={input.value}
      // value={typeof input.value === 'string' ? [] : input.value}
      onChange={handleOnChange}
      multiple={multiSelect}
      error={meta.error}
      selection
      {...rest}
    />
  );
}

export default SelectField;
