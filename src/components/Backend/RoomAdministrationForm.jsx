import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as SemanticForm } from 'semantic-ui-react';
import { SimpleInput } from 'components/elements/inputs';

function RoomAdministrationForm(props) {
  console.log('%c props in RoomAdministrationForm', 'color: green;', props);
  return (
    <Form
      onSubmit={props.handleSubmit}
      initialValues={props.initialValues}
      validate={(fields) => {
        console.log('fields in validate RoomAdministrationForm', fields);
        return undefined;
      }}
    >
      {({ handleSubmit }) => (
        <SemanticForm onSubmit={handleSubmit} id="RoomAdministrationForm">
          <SemanticForm.Group widths="2">
            <Field
              name="name"
              label="Besprechungsraum-Name"
              placeholder="Besprechungsraum-Name"
              component={SimpleInput}
              required
            />
          </SemanticForm.Group>
        </SemanticForm>
      )}
    </Form>
  );
}

export default RoomAdministrationForm;
