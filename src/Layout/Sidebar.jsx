import React from 'react';
import { Sidebar as SemanticSidebar, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Sidebar(props) {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <SemanticSidebar
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
            <Menu.Item as={Link} to="/backend/team" link>
              {t('backend.menu.team.label')}
            </Menu.Item>
            <Menu.Item as={Link} to="/backend/room" link>
              {t('backend.menu.room.label')}
            </Menu.Item>
          </Menu.Menu>
        </Menu.Item>
      </SemanticSidebar>
    </React.Fragment>
  );
}

export default Sidebar;
