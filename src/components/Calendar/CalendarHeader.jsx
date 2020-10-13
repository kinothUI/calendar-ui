import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Segment, Grid, Button, Header } from 'semantic-ui-react';

import { ADD_MONTH, SUBTRACT_MONTH } from 'redux/actions/calender';
import { action } from 'redux/actions';

// hier besteht theoretisch die möglichkeit, dass ein Monat übersprungen wird
// könnte man mit "index-setzen" vorbeugen

const CalenderHeader = (props) => {
  const { calendar } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();

  return (
    <Segment>
      <Grid columns="3" verticalAlign="middle">
        <Grid.Column textAlign="left">
          <Button
            icon="angle left"
            circular
            onClick={() =>
              dispatch(
                action(SUBTRACT_MONTH, {
                  moment: calendar.content.currentMonth,
                }),
              )
            }
          />
        </Grid.Column>
        <Grid.Column textAlign="center">
          <Header
            content={t('format:longMonth', {
              date: calendar.content.currentMonth,
            })}
          />
        </Grid.Column>
        <Grid.Column textAlign="right">
          <Button
            icon="angle right"
            circular
            onClick={() =>
              dispatch(
                action(ADD_MONTH, { moment: calendar.content.currentMonth }),
              )
            }
          />
        </Grid.Column>
      </Grid>
    </Segment>
  );
};

export default CalenderHeader;
