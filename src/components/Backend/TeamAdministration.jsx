import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import { action, FETCH } from 'redux/actions';
import { EntityDescriptions } from 'redux/reducers/entity';
import { useTranslation } from 'react-i18next';

import DataTable from 'components/elements/DataTable';

function TeamAdministration() {
  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.entities);
  const { t } = useTranslation();
  const { TEAM } = EntityDescriptions;

  React.useEffect(() => {
    dispatch(
      action(`${FETCH}_${TEAM}`, {
        entityDescription: TEAM,
      }),
    );
  }, [dispatch, TEAM]);

  const handleOnCreate = (event) => {
    console.log(
      '%c create button handler in teamAdmin',
      'color: green;',
      event,
    );
  };

  const handleOnEdit = (row) => {
    console.log('%c edit button handler in teamAdmin', 'color: orange;', row);
  };

  const handleOnDelete = (row) => {
    console.log('%c delete button handler in teamAdmin', 'color: red;', row);
  };

  const cols = [
    { dataKey: 'id', name: 'Kennzeichen' },
    { dataKey: 'name', name: 'Team-Name' },
  ];

  return (
    <div className="padding-top">
      <Header as="h2" content={t(`backend.menu.${TEAM.toLowerCase()}.label`)} />
      <Divider />
      <DataTable
        cols={cols}
        rows={team.content}
        onCreate={handleOnCreate}
        onEdit={handleOnEdit}
        onDelete={handleOnDelete}
      />
    </div>
  );
}

export default TeamAdministration;
