import React from 'react';
import { Checkbox as SemanticCheckbox, Form } from 'semantic-ui-react';

function Checkbox(props) {
  const { input, label, description, meta, required, ...rest } = props;

  const handleOnClick = (event, data) => {
    input.onChange(input.checked !== false ? input.value : data.checked);
  };

  return (
    <Form.Field required={required}>
      <label>{label}</label>
      <SemanticCheckbox
        className="remove-require"
        checked={input.checked !== false ? input.checked : input.value}
        label={description}
        onClick={handleOnClick}
        error={meta.error}
        {...rest}
        slider
      />
    </Form.Field>
  );
}

export default Checkbox;
