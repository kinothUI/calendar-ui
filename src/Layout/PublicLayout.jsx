import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';

import { useModal } from 'hooks/withModal';
import Navbar from 'Layout/Navbar';
import Footer from 'Layout/Footer';
import FetchingLoader from 'Layout/FetchingLoader';
import MeetingForm from 'components/elements/forms/MeetingForm';
import { FallBackLoader } from 'index';

function CalendarLayout(ownProps) {
  const { component: Component, user } = ownProps;

  const { router, ownAccount } = useSelector((state) => state);
  const { modalState, Modal } = useModal();

  const isBackend = router.location.pathname.includes('/backend', 0);

  console.log('modalState in PublicLayout', modalState);

  return (
    <React.Fragment>
      <React.Suspense fallback={FallBackLoader}>
        <Navbar modalState={modalState} user={user} isBackend={isBackend} ownAccount={ownAccount} />

        <div className="pre-main-content">
          <div className="main-content">
            <Container as="main">
              <Grid columns="1" centered>
                <Grid.Column>
                  <Component modalState={modalState} />
                </Grid.Column>
              </Grid>
            </Container>
          </div>
        </div>

        <Modal>
          <MeetingForm
            handleSubmit={modalState.handleSubmit.form}
            initialValues={modalState.initialValues}
          />
        </Modal>
        <div className="padding-bottom" />
        <Footer />
        <FetchingLoader />
      </React.Suspense>
    </React.Fragment>
  );
}

export default CalendarLayout;
