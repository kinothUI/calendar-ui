import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as SemanticForm } from 'semantic-ui-react';
import { SimpleInput } from 'components/elements/inputs';

function TeamAdministration(props) {
  console.log('%c props in TeamAdministration', 'color: green;', props);
  return (
    <Form
      onSubmit={props.handleSubmit}
      initialValues={props.initialValues}
      validate={(fields) => {
        console.log('fields in validate TeamAdministration', fields);
        return undefined;
      }}
    >
      {({ handleSubmit, ...rest }) => (
        <SemanticForm onSubmit={handleSubmit} id="TeamAdministrationForm">
          <SemanticForm.Group widths="2">
            <Field
              name="name"
              label="Team-Name"
              placeholder="Team-Name"
              component={SimpleInput}
              required
            />
          </SemanticForm.Group>
        </SemanticForm>
      )}
    </Form>
  );
}

export default TeamAdministration;
