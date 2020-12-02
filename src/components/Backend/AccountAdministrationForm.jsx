import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Form as SemanticForm, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  SimpleInput,
  Checkbox,
  PasswordInput,
  SelectField,
  populateMenuItems,
} from 'components/elements/inputs';

function AccountAdministrationForm(ownProps) {
  const [hidden, setHidden] = useState(true);
  const { entities } = useSelector((state) => state);
  const { t } = useTranslation();

  const teamOptions = populateMenuItems(entities.team.content, true);

  const PasswordLabel = (
    <Label icon="unhide" onClick={() => setHidden(!hidden)} className="password-icon" />
  );
  return (
    <Form
      onSubmit={ownProps.handleSubmit}
      initialValues={ownProps.initialValues}
      autoComplete="off"
    >
      {({ handleSubmit }) => (
        <SemanticForm onSubmit={handleSubmit} id="AccountAdministrationForm">
          <SemanticForm.Group widths="2">
            <Field
              name="firstName"
              label={t('form-entities:account_administration.form.first_name.label')}
              placeholder={t('form-entities:account_administration.form.first_name.placeholder')}
              component={SimpleInput}
              required
            />
            <Field
              name="lastName"
              label={t('form-entities:account_administration.form.last_name.label')}
              placeholder={t('form-entities:account_administration.form.last_name.placeholder')}
              component={SimpleInput}
              required
            />
          </SemanticForm.Group>
          <SemanticForm.Group widths="equal">
            <Field
              name="email"
              label={t('form-entities:account_administration.form.email.label')}
              placeholder={t('form-entities:account_administration.form.email.placeholder')}
              component={SimpleInput}
              required
            />
            {ownProps.isCreate && (
              <Field
                name="password"
                labelText={t('form-entities:account_administration.form.password.label')}
                placeholder={t('form-entities:account_administration.form.password.placeholder')}
                label={PasswordLabel}
                component={PasswordInput}
                type={hidden ? 'password' : 'text'}
                required
              />
            )}
          </SemanticForm.Group>
          <SemanticForm.Group widths="2">
            <Field
              name="teams"
              label={t('form-entities:account_administration.form.teams.label')}
              placeholder={t('form-entities:account_administration.form.teams.placeholder')}
              component={SelectField}
              options={teamOptions}
              multiSelect
              search
            />
            <Field
              name="isAdmin"
              label={t('form-entities:account_administration.form.admin.label')}
              component={Checkbox}
              type="checkbox"
            />
          </SemanticForm.Group>
        </SemanticForm>
      )}
    </Form>
  );
}

export default AccountAdministrationForm;
