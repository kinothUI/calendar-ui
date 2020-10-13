import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { action } from 'redux/actions';
import { LOGOUT } from 'redux/actions/ownAccount';
import { Menu, Dropdown } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import { push } from 'connected-react-router';

const DefaultHeader = () => {
  const { ownAccount } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      {(!ownAccount.content && (
        <Menu attached inverted borderless size="small" />
      )) || (
        <Menu attached inverted borderless size="small">
          <Menu.Item position="left">
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
                <Dropdown.Item onClick={() => dispatch(action(LOGOUT))}>
                  {t('auth.logout')}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu>
      )}
    </React.Fragment>
  );
};

export default DefaultHeader;
