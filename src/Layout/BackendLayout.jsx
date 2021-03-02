import React from 'react';
import { Container, Divider } from 'semantic-ui-react';
import { useSelector } from 'react-redux';

import Sidebar from 'Layout/Sidebar';
import Navbar from 'Layout/Navbar';
// import { CalendarSidebar } from 'components/Calendar';
import FetchingLoader from 'Layout/FetchingLoader';
import { useModal, ModalStateProviderContext } from 'hooks/withModal';

function BackendLayout(ownProps) {
  const { component: Component } = ownProps;

  const [visible, setVisible] = React.useState(false);

  const { ownAccount } = useSelector((state) => state);
  const { modalState, Modal } = useModal();

  return (
    <React.Fragment>
      <ModalStateProviderContext.Provider value={{ modalState }}>
        <div className="ui fixed top sticky" style={{ width: '100%' }}>
          <Navbar ownAccount={ownAccount} sidebar={{ visible, setVisible }} isBackend />
        </div>
        <Divider fitted hidden />

        <Sidebar />
        <Container as="main" className="backend-container" style={{ padding: '50px 0' }}>
          <Component />
        </Container>

        <Modal />
        <FetchingLoader />
        <div style={{ minHeight: '15vh' }} />
      </ModalStateProviderContext.Provider>
    </React.Fragment>
  );
}

export default BackendLayout;
