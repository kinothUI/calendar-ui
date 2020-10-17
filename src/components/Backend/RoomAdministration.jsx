import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { action, FETCH } from 'redux/actions';
import { EntityDescriptions } from 'redux/reducers/entity';
import { Header, Divider } from 'semantic-ui-react';

import DataTable from 'components/elements/DataTable';

function RoomAdministration() {
  const dispatch = useDispatch();
  const { room } = useSelector((state) => state.entities);
  const { t } = useTranslation();
  const { ROOM } = EntityDescriptions;

  React.useEffect(() => {
    dispatch(
      action(`${FETCH}_${ROOM}`, {
        entityDescription: ROOM,
      }),
    );
  }, [dispatch, ROOM]);

  const handleOnCreate = (event) => {
    console.log(
      '%c create button handler in roomAdmin',
      'color: green;',
      event,
    );
  };

  const handleOnEdit = (row) => {
    console.log('%c edit button handler in roomAdmin', 'color: orange;', row);
  };

  const handleOnDelete = (row) => {
    console.log('%c delete button handler in roomAdmin', 'color: red;', row);
  };

  const cols = [
    { dataKey: 'id', name: 'Kennzeichzen' },
    { dataKey: 'name', name: 'Besprechungsraum-Name' },
  ];

  return (
    <div className="padding-top">
      <Header as="h2" content={t(`backend.menu.${ROOM.toLowerCase()}.label`)} />
      <Divider />
      <DataTable
        cols={cols}
        rows={room.content}
        onCreate={handleOnCreate}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
      />
    </div>
  );
}

export default RoomAdministration;
