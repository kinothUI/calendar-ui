import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as SemanticForm } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { SimpleInput } from 'components/elements/inputs';

function RoomAdministrationForm(ownProps) {
  const { t } = useTranslation();

  return (
    <Form
      onSubmit={ownProps.handleSubmit}
      initialValues={ownProps.initialValues}
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
              label={t('form-entities:room_administration.form.name.label')}
              placeholder={t('form-entities:room_administration.form.name.placeholder')}
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
