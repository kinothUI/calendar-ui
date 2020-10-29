import React from 'react';
import { Form, Field } from 'react-final-form';
import { Form as SemanticForm } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { SimpleInput } from 'components/elements/inputs';

function TeamAdministration(props) {
  const { t } = useTranslation();

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
              label={t('form-entities:team_administration.form.name.label')}
              placeholder={t('form-entities:team_administration.form.name.placeholder')}
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
