import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import { Form as SemanticForm, Label } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import {
  SimpleInput,
  Checkbox,
  PasswordInput,
  SelectField,
  populateMenuItems,
} from 'components/elements/inputs';

function AccountAdministrationForm(props) {
  const { isUpdate } = props;

  console.log('props in ACCADMINFORM', props);

  const [hidden, setHidden] = useState(true);
  const { entities } = useSelector((state) => state);

  const teamOptions = populateMenuItems(entities.team.content);

  const PasswordLabel = (
    <Label icon="unhide" onClick={() => setHidden(!hidden)} className="password-icon" />
  );
  return (
    <Form
      onSubmit={props.handleSubmit}
      initialValues={props.initialValues}
      validate={(fields, meta) => {
        console.log('fields in validate AccountAdministrationForm', fields, meta);
        return undefined;
      }}
    >
      {({ handleSubmit }) => (
        <SemanticForm onSubmit={handleSubmit} id="AccountAdministrationForm">
          <SemanticForm.Group widths="2">
            <Field
              name="name"
              label="Vorname"
              placeholder="Vorname"
              component={SimpleInput}
              required
            />
            <Field
              name="surname"
              label="Nachname"
              placeholder="Nachname"
              component={SimpleInput}
              required
            />
          </SemanticForm.Group>
          <SemanticForm.Group widths="equal">
            <Field
              name="email"
              label="E-Mail Adresse"
              placeholder="E-Mail Adresse"
              component={SimpleInput}
              required
            />
            {!isUpdate && (
              <Field
                name="password"
                labelText="Passwort"
                placeholder="Passwort"
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
              label="Teams"
              component={SelectField}
              options={teamOptions}
              multiSelect
              search
            />
            <Field
              name="admin"
              label="als Administrator setzen"
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
