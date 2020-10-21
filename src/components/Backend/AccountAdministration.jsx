import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, Divider } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { action, FETCH, CREATE, UPDATE } from 'redux/actions';
import { EntityDescriptions } from 'redux/reducers/entity';
import DataTable from 'components/elements/DataTable';

function AccountAdministration(ownProps) {
  const {
    modal: {
      modalState: {
        setTitle,
        setActionButtonState,
        setInitialValues,
        setOpen,
        setSize,
        setComponent,
        setHandleSubmit,
      },
      actionButtonDefaultState,
    },
  } = ownProps;

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
    return () => console.log('AccountAdministration unmounted, useEffect clearup');
  }, [dispatch, ACCOUNT]);

  const cols = [
    { dataKey: 'id', name: 'Kennzeichen' },
    { dataKey: 'name', name: 'Vorname' },
    { dataKey: 'surname', name: 'Nachname' },
    { dataKey: 'email', name: 'E-Mail' },
  ];

  const component = 'AccountAdministrationForm';

  return (
    <React.Fragment>
      <Header as="h2" content={t(`backend.menu.${ACCOUNT.toLowerCase()}.label`)} />
      <Divider />
      <DataTable
        cols={cols}
        rows={account.content}
        onCreate={() => {
          setSize('large');
          setTitle(t('form-entities:account.crud.add'));
          setComponent(component);
          setInitialValues({});
          setActionButtonState(actionButtonDefaultState);
          setHandleSubmit({
            form: (fields) =>
              dispatch(
                action(`${CREATE}_${ACCOUNT}`, { entityDescription: ACCOUNT, body: fields }),
              ),
          });
          setOpen(true);
        }}
        onEdit={(row) => {
          setSize('large');
          setTitle(t('form-entities:account.crud.edit', { name: row.email }));
          setComponent(component);
          setActionButtonState(actionButtonDefaultState);
          setInitialValues(row);
          setHandleSubmit({
            form: (fields) =>
              dispatch(
                action(`${UPDATE}_${ACCOUNT}`, {
                  entityDescription: ACCOUNT,
                  body: fields,
                }),
              ),
          });
          setOpen(true);
        }}
        onDelete={(row) => console.log(row)}
      />
    </React.Fragment>
  );
}

export default AccountAdministration;
