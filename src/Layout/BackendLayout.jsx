import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import Sidebar from 'Layout/Sidebar';
import Navbar from 'Layout/Navbar';
// import { CalendarSidebar } from 'components/Calendar';
import FetchingLoader from 'Layout/FetchingLoader';
import { useModal } from 'hooks/withModal';

function BackendLayout(ownProps) {
  const { component: Component, user } = ownProps;

  const [visible, setVisible] = React.useState(false);

  const { ownAccount } = useSelector((state) => state);
  const { modalState, Modal } = useModal();

  return (
    <React.Fragment>
      <div className="ui fixed top sticky" style={{ width: '100%' }}>
        <Navbar
          modalState={modalState}
          user={user}
          ownAccount={ownAccount}
          visibility={{ visible, setVisible }}
          isBackend
        />
      </div>
      <Divider fitted hidden />

      <Sidebar />
      <Container as="main" className="backend-container" style={{ padding: '50px 0' }}>
        <Component modalState={modalState} />
      </Container>

      <Modal />
      <FetchingLoader />
      <div style={{ minHeight: '15vh' }} />
    </React.Fragment>
  );
}

export default BackendLayout;
