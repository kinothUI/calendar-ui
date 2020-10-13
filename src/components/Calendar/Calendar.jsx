import React from 'react';
import { push } from 'connected-react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Input } from 'semantic-ui-react';

import CalendarHeader from 'components/Calendar/CalendarHeader';
import CalendarBody from 'components/Calendar/CalendarBody';
import CalendarFooter from 'components/Calendar/CalendarFooter';
import UserSettingsForm from 'components/elements/forms/UserSettingsForm';

const Calender = (props) => {
  const { location } = props;

  const { ownAccount, calendar } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (!ownAccount.content) dispatch(push('/login'));

  return (
    <React.Fragment>
      <CalendarHeader ownAccount={ownAccount} calendar={calendar} />
      <CalendarBody ownAccount={ownAccount} calendar={calendar} />
      <CalendarFooter ownAccount={ownAccount} />
      {ownAccount.content && location && (
        <Modal
          dimmer="blurring"
          size="small"
          open={location.state.openUserSettingsModal}
        >
          <Modal.Header>Benutzer Einstellungen</Modal.Header>
          <Modal.Content>
            <UserSettingsForm initialValues={ownAccount.content} />
          </Modal.Content>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default Calender;
