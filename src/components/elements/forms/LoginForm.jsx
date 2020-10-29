import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Segment, Button, Divider, Message, Grid, Icon } from 'semantic-ui-react';

import { action } from 'redux/actions';
import { LOGIN } from 'redux/actions/ownAccount';

const InitialState = {
  email: '',
  password: '',
  submitted: false,
};

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState(InitialState);
  const { t } = useTranslation();
  const { ownAccount } = useSelector((state) => state);

  const handleOnChange = (event) => setState({ ...state, [event.target.name]: event.target.value });

  const handleSubmit = () => {
    const { email, password } = state;

    setState({ ...state, submitted: true });
    dispatch(action(LOGIN, { credentials: { email, password } }));
  };

  const statusMsg = renderStatusMessage(state.submitted, ownAccount, t);

  return (
    <React.Fragment>
      <Grid centered verticalAlign="middle" columns="1" doubling style={{ height: '70vh' }}>
        <Grid.Column width="8">
          <Segment padded attached="top">
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Form.Input
                name="email"
                type="text"
                label={t('form-entities:auth.email.label')}
                placeholder={t('form-entities:auth.email.placeholder')}
                onChange={handleOnChange}
                required
              />
              <Form.Input
                name="password"
                type="password"
                label={t('form-entities:auth.password.label')}
                placeholder={t('form-entities:auth.password.placeholder')}
                onChange={handleOnChange}
                required
              />
              <Divider />
              <Button
                content={t('form-entities:auth.button.label')}
                type="submit"
                disabled={ownAccount.isFetching}
                fluid
              />
            </Form>
          </Segment>
          {statusMsg}
        </Grid.Column>
      </Grid>
    </React.Fragment>
  );
};

const renderStatusMessage = (submitted, ownAccount, t) => {
  const { isFetching, error } = ownAccount;
  if (submitted) {
    if (isFetching) {
      return (
        <Message positive icon attached="bottom">
          <Icon name="circle notched" loading />
          <Message.Content>
            <Message.Header>{t('form-entities:auth.progress.header')}</Message.Header>
            {t('form-entities:auth.progress.body')}
          </Message.Content>
        </Message>
      );
    }

    if (error) {
      return (
        <Message negative icon attached="bottom">
          <Icon name="bullhorn" />
          <Message.Content>
            <Message.Header>{t('form-entities:auth.progress.error.header')}</Message.Header>
            {t('form-entities:auth.progress.error.body')}
          </Message.Content>
        </Message>
      );
    }
  }

  return null;
};

export default LoginForm;
