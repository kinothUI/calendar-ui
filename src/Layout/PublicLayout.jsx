import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Grid } from 'semantic-ui-react';

import { CalendarSidebar } from 'components/Calendar';
import { useModal } from 'hooks/withModal';
import Navbar from 'Layout/Navbar';
import Footer from 'Layout/Footer';
import FetchingLoader from 'Layout/FetchingLoader';
import { FallBackLoader } from 'index';

function PublicLayout(ownProps) {
  const { component: Component, user } = ownProps;

  const { ownAccount } = useSelector((state) => state);
  const { modalState, Modal } = useModal();

  const [visible, setVisible] = React.useState(false);

  return (
    <React.Fragment>
      <React.Suspense fallback={FallBackLoader}>
        <Navbar
          modalState={modalState}
          user={user}
          ownAccount={ownAccount}
          visibility={{ visible, setVisible }}
        />
        <CalendarSidebar visibility={{ visible, setVisible }}>
          <div style={{ background: '#eef2f7' }}>
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

            <Modal />
            <div className="padding-bottom" />
          </div>
        </CalendarSidebar>
        <Footer />
        <FetchingLoader />
      </React.Suspense>
    </React.Fragment>
  );
}

export default PublicLayout;
