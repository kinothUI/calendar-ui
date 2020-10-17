import React from 'react';
import { push } from 'connected-react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Container, Grid } from 'semantic-ui-react';

import { FallBackLoader } from 'components/Layout/DefaultLayout';
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
    <div className="main-content">
      <Container as="main">
        <Grid columns="1" centered>
          <Grid.Column>
            <React.Suspense fallback={FallBackLoader}>
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
            </React.Suspense>
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default Calender;
