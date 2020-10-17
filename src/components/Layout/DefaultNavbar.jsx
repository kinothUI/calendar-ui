import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { action } from 'redux/actions';
import { LOGOUT } from 'redux/actions/ownAccount';
import { Menu, Dropdown, Container } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';
import { Link } from 'react-router-dom';

const DefaultHeader = () => {
  const { ownAccount, router } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  /**
   * @type {String}
   */
  const pathname = router.location.pathname;
  const isBackend = pathname.includes('/backend', 0);

  return (
    <React.Fragment>
      {(!ownAccount.content && (
        <Menu
          attached
          inverted
          borderless
          size="small"
          color={isBackend ? 'black' : 'grey'}
        >
          <Container>{renderBrandButton()}</Container>
        </Menu>
      )) || (
        <Menu
          attached
          inverted
          borderless
          size="small"
          color={isBackend ? 'black' : 'grey'}
        >
          <Container>
            {renderBrandButton()}
            <Menu.Item position="right" className="no-padding">
              <Dropdown
                item
                text={`${ownAccount.content.name} ${ownAccount.content.surname}`}
              >
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() =>
                      dispatch(push('/', { openUserSettingsModal: true }))
                    }
                  >
                    Account Einstellungen
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => dispatch(push('/backend/account'))}
                  >
                    Administration
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => dispatch(action(LOGOUT))}>
                    {t('auth.logout')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Container>
        </Menu>
      )}
    </React.Fragment>
  );
};

const renderBrandButton = () => (
  <Menu.Item
    position="left"
    className="brand-button-container"
    header
    as={Link}
    to="/"
  >
    <div className="brand-button" />
  </Menu.Item>
);

export default DefaultHeader;
