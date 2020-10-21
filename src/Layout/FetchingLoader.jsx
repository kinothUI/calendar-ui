import React from 'react';
import { useSelector } from 'react-redux';
import { Loader, Dimmer, Label } from 'semantic-ui-react';
import { getFetchingEntity } from 'redux/selectors/fetching-entity';
import { useTranslation } from 'react-i18next';

function FetchingLoader(props) {
  const { t } = useTranslation();
  const fetchingEntity = useSelector((state) => getFetchingEntity(state));
  const active = fetchingEntity !== undefined;

  return (
    <Dimmer active={active} page inverted>
      <Loader size="large">
        <Label circular basic size="large" color="grey">
          {active && t(`backend.menu.${fetchingEntity}.label`)}
        </Label>
      </Loader>
    </Dimmer>
  );
}

export default FetchingLoader;
