import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Divider, Button, Segment } from 'semantic-ui-react';
import { push } from 'connected-react-router';
import { action } from 'redux/actions';
import { ACCOUNT_PATCH } from 'redux/actions/ownAccount';

const UserSettingsForm = (props) => {
  const {
    initialValues: { id, name, surname, email },
  } = props;

  const dispatch = useDispatch();
  const InitialState = {
    id: id || undefined,
    name: name || '',
    surname: surname || '',
    email: email || '',
  };
  const [state, setState] = useState(InitialState);

  const handleOnChange = (event) =>
    setState({ ...state, [event.target.name]: event.target.value });
  const handleSubmit = () => {
    dispatch(push('/calendar', { openUserSettingsModal: false }));
    dispatch(action(ACCOUNT_PATCH, { account: state }));
  };

  return (
    <React.Fragment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          name="name"
          type="text"
          onChange={handleOnChange}
          placeholder="Name"
          label="Name"
          value={state.name}
          required
        />
        <Form.Input
          name="surname"
          type="text"
          onChange={handleOnChange}
          placeholder="Nachname"
          label="Nachname"
          value={state.surname}
          required
        />
        <Form.Input
          name="email"
          type="text"
          onChange={handleOnChange}
          placeholder="E-Mail"
          label="E-Mail"
          value={state.email}
          required
        />
        <Divider />
        <Segment basic floated="right" vertical>
          <Button
            size="tiny"
            color="red"
            inverted
            content="Schließen"
            onClick={() =>
              dispatch(push('/calendar', { openUserSettingsModal: false }))
            }
          />
          <Button
            size="tiny"
            color="green"
            inverted
            content="Speichern"
            type="submit"
          />
        </Segment>
      </Form>
    </React.Fragment>
  );
};

export default UserSettingsForm;
