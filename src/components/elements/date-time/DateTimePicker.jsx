import React from 'react';
import { Form, Input } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { SimpleInput } from 'components/elements/inputs';
import { getValidationLabelProps } from 'components/elements/inputs/ValidationLabelProps';
import { getNextHourMoment } from 'helpers';
import 'react-datepicker/dist/react-datepicker.css';
import 'components/elements/date-time/DateTimePicker.css';

function DateTimePicker(ownProps) {
  const { input, label, meta, required } = ownProps;

  const onChange = (date) => {
    input.onChange(date);
  };

  const onBlur = (event) => {
    const value = moment(event.target.value);

    if (value.isValid()) onChange(value);
    else onChange(getNextHourMoment());
  };

  const value = moment(input.value);
  const selected = (value.isValid() && value.toDate()) || getNextHourMoment().toDate();

  const validationLabel = getValidationLabelProps(meta, label);

  return (
    <Form.Field>
      {/* {<label>{label}</label>} */}
      <DatePicker
        selected={selected}
        name={input.name}
        onChange={onChange}
        onBlur={onBlur}
        popperPlacement="auto"
        showTimeSelect
        dateFormat="dd.MM.yyyy HH:mm"
        timeFormat="HH:mm"
        timeIntervals={60}
        customInput={
          <Form.Input
            {...input}
            label={validationLabel.label}
            error={validationLabel.isError}
            icon={validationLabel.errorIcon}
          />
        }
      />
    </Form.Field>
  );
}

export default DateTimePicker;
