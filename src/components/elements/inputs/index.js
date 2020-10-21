import SimpleInput from 'components/elements/inputs/SimpleInput';
import Checkbox from 'components/elements/inputs/Checkbox';
import PasswordInput from 'components/elements/inputs/PasswordInput';
import DateTimePicker from 'components/elements/inputs/DateTimePicker';
import SelectField from 'components/elements/inputs/SelectField';

/**
 *
 * @param {Array} entity
 */
const populateMenuItems = (entity) => {
  return entity.map((item, index) => ({
    key: index,
    text: `${item.name} ${item.surname ? item.surname : ''}`,
    value: item,
    description: item.description,
  }));
};

export {
  SimpleInput,
  Checkbox,
  PasswordInput,
  DateTimePicker,
  SelectField,
  populateMenuItems,
};
