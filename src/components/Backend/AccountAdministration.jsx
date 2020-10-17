import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { action, FETCH } from 'redux/actions';
import { EntityDescriptions } from 'redux/reducers/entity';
import DataTable from 'components/elements/DataTable';

function UserAdministration() {
  const dispatch = useDispatch();
  const { account } = useSelector((state) => state.entities);
  const { t } = useTranslation();
  const { ACCOUNT } = EntityDescriptions;

  React.useEffect(() => {
    dispatch(
      action(`${FETCH}_${ACCOUNT}`, {
        entityDescription: ACCOUNT,
      }),
    );
  }, [dispatch, ACCOUNT]);

  const cols = [
    { dataKey: 'id', name: 'Kennzeichen' },
    { dataKey: 'name', name: 'Vorname' },
    { dataKey: 'surname', name: 'Nachname' },
    { dataKey: 'email', name: 'E-Mail' },
  ];

  const handleOnCreate = (event) => {
    console.log(
      '%c create button handler in accountAdmin',
      'color: green;',
      event,
    );
  };

  const handleOnEdit = (row) => {
    console.log(
      '%c edit button handler in accountAdmin',
      'color: orange;',
      row,
    );
  };

  const handleOnDelete = (row) => {
    console.log('%c delete button handler in accountAdmin', 'color: red;', row);
  };

  return (
    <div className="padding-top">
      <Header
        as="h2"
        content={t(`backend.menu.${ACCOUNT.toLowerCase()}.label`)}
      />
      <Divider />
      <DataTable
        cols={cols}
        rows={account.content}
        sortable
        onCreate={handleOnCreate}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
      />
    </div>
  );
}

export default UserAdministration;
