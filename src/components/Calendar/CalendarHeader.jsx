import React from 'react';
import { useTranslation } from 'react-i18next';
import { Segment, Grid, Button, Header } from 'semantic-ui-react';
import moment from 'moment';

// hier besteht theoretisch die möglichkeit, dass ein Monat übersprungen wird
// könnte man mit "index-setzen" vorbeugen

const CalenderHeader = (ownProps) => {
  const { currentMoment } = ownProps;

  const { t } = useTranslation();

  return (
    <Segment>
      <Grid columns="3" verticalAlign="middle">
        <Grid.Column textAlign="left">
          <Button
            icon="angle left"
            circular
            color="olive"
            onClick={() => currentMoment.setValue((old) => moment(old).subtract(1, 'months'))}
          />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Header
            content={t('format:longMonth', {
              date: currentMoment.value,
            })}
          />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button
            icon="angle right"
            circular
            color="olive"
            onClick={() => currentMoment.setValue((old) => moment(old).add(1, 'months'))}
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default CalenderHeader;
