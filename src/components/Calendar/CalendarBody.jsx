import React from 'react';
import { Divider, Grid } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';

const CalenderBody = (props) => {
  const { calendar } = props;
  const {
    content: { currentMonth },
  } = calendar;
  const { t } = useTranslation();

  const startDay = moment(currentMonth)
    .clone()
    .startOf('month')
    .startOf('week');
  const endDay = moment(currentMonth).clone().endOf('month').endOf('week');
  const firstDayOfMonth = moment(currentMonth).startOf('month');
  const nextMonthsFirstDay = moment(currentMonth)
    .clone()
    .add(1, 'month')
    .startOf('month');
  const weekdays = moment.weekdays(true);

  let weeks = [];
  let date = startDay.clone().subtract(1, 'day');

  while (date.isBefore(endDay, 'day')) {
    weeks.push({
      days: Array(7)
        .fill(0)
        .map(() => date.add(1, 'day').clone()),
    });
  }

  return (
    <React.Fragment>
      <Divider />
      <Grid columns={7}>
        {weekdays.map((day, key) => (
          <Grid.Column key={key}>{day}</Grid.Column>
        ))}
      </Grid>
      <Grid celled columns={7}>
        {weeks.map((week, index) => (
          <Grid.Row key={index}>
            {renderWeekDays(week.days, t, firstDayOfMonth, nextMonthsFirstDay)}
          </Grid.Row>
        ))}
      </Grid>
    </React.Fragment>
  );
};

const renderWeekDays = (week, t, firstDayOfMonth, nextMonthsFirstDay) => {
  return (
    <React.Fragment>
      {week.map((day, index) => {
        const isFirstDayOfMonth = firstDayOfMonth.isSame(day);
        const isNextMonthsFirstDay = nextMonthsFirstDay.isSame(day);
        return (
          <Grid.Column key={index}>
            {((isFirstDayOfMonth || isNextMonthsFirstDay) &&
              t('format:firstDayOfMonth', { date: day })) ||
              t('format:weekDayShort', { date: day })}
          </Grid.Column>
        );
      })}
    </React.Fragment>
  );
};

export default CalenderBody;
