import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as SemanticForm } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import {
  SimpleInput,
  SelectField,
  DateTimePicker,
  populateMenuItems,
} from 'components/elements/inputs';

function MeetingForm(props) {
  const {
    entities: { account, team, room },
  } = useSelector((state) => state);

  // lazy building menu options for dropdown and sorting ascending by `name`
  const attendeeOptions = populateMenuItems(
    []
      .concat(
        ...account.content.map((acc) => ({
          ...acc,
          id: acc.identifier,
          description: 'Benutzer',
        })),
        ...team.content.map((team) => ({
          ...team,
          id: team.identifier,
          description: 'Team',
        })),
      )
      .sort((a, b) => (a.name > b.name ? 1 : -1)),
  );

  const roomOptions = populateMenuItems(room.content.sort((a, b) => (a.name > b.name ? 1 : -1)));

  const validateMeetingForm = (fields, meta, wasweisich) => {
    const error = {};
    error.name = 'asdf';
    console.log('fields, meta, 3rd arg in MeetinForm', fields, meta, wasweisich);
    return undefined;
  };

  return (
    <Form
      onSubmit={props.handleSubmit}
      initialValues={props.initialValues}
      validate={validateMeetingForm}
    >
      {({ handleSubmit }) => (
        <SemanticForm onSubmit={handleSubmit} id="MeetingForm">
          <Field name="name" label="Thema" placeholder="Thema" component={SimpleInput} required />
          <Field name="time" label="Meeting Start" component={DateTimePicker} required />
          <Field
            name="attendees"
            label="Teilnehmer hinzufügen"
            component={SelectField}
            options={attendeeOptions}
            multiSelect
            search
          />
          <Field
            name="room"
            label="Besprechungsraum"
            component={SelectField}
            options={roomOptions}
            search
          />
        </SemanticForm>
      )}
    </Form>
  );
}

export default MeetingForm;
