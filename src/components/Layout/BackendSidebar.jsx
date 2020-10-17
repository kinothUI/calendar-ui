import React from 'react';
import { Sidebar, Menu, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function BackendSidebar(props) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Divider fitted />
      <Sidebar
        as={Menu}
        width="thin"
        vertical
        inverted
        visible
        animation="overlay"
        className="position-top"
      >
        <Menu.Item>
          <Menu.Header>Administration</Menu.Header>
          <Menu.Menu>
            <Menu.Item as={Link} to="/backend/account" link>
              {t('backend.menu.account.label')}
            </Menu.Item>
            <Menu.Item as={Link} to="/backend/group" link>
              {t('backend.menu.team.label')}
            </Menu.Item>
            <Menu.Item as={Link} to="/backend/room" link>
              {t('backend.menu.room.label')}
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </Sidebar>
    </React.Fragment>
  );
}

export default BackendSidebar;
