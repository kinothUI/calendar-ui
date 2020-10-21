import React from 'react';
import { Form } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import 'components/elements/inputs/DateTimePicker.css';

function DateTimePicker(props) {
  const { input, label, required } = props;

  const onChange = (date) => {
    console.log('onChange in DateTimePicker', date);
    input.onChange(date);
  };

  const value = moment(input.value).toDate();
  return (
    <Form.Field required={required}>
      <label>{label}</label>
      <DatePicker
        selected={value}
        name={input.name}
        onChange={onChange}
        popperPlacement="auto"
        showTimeSelect
        dateFormat="dd.MM.yyyy HH:mm"
        timeFormat="HH:mm"
        timeIntervals={60}
      />
    </Form.Field>
  );
}

export default DateTimePicker;
