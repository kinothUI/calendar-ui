import React from 'react';
import { useTranslation } from 'react-i18next';
import { Divider, Grid, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { action } from 'redux/actions';
import { REQUEST_SAVE } from 'redux/actions/meeting';
import { getNextHourMoment } from 'helpers';
import { generateActionButtonState } from 'hooks/withModal';

const CalenderBody = (ownProps) => {
  console.log('ownProps in CalendarBody render()', ownProps);
  const { currentMoment, modal } = ownProps;
  const {
    setTitle,
    setActionButtonState,
    setInitialValues,
    setOpen,
    setSize,
    setComponent,
    setHandleSubmit,
  } = modal;

  const { meeting } = useSelector((state) => state);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const startDay = moment(currentMoment.value).clone().startOf('month').startOf('week');
  const endDay = moment(currentMoment.value).clone().endOf('month').endOf('week');
  const firstDayOfMonth = moment(currentMoment.value).clone().startOf('month');
  const nextMonthsFirstDay = moment(currentMoment.value).clone().add(1, 'month').startOf('month');
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

  const handleOnClick = (day) => {
    const form = 'MeetingForm';

    const actionButtonDefaultState = generateActionButtonState({
      save: () => {
        document.getElementById(form).dispatchEvent(new Event('submit', { cancelable: true }));
        setOpen(false);
      },
      cancel: () => setOpen(false),
    });

    setSize('mini');
    setTitle('neues Meeting anlegen');
    setComponent(form);
    setInitialValues({ time: getNextHourMoment(day) });
    setActionButtonState(actionButtonDefaultState);
    setHandleSubmit({ form: (fields) => dispatch(action(`${REQUEST_SAVE}`, { meeting: fields })) });
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Divider />
      {/* Table Header mit Wochentagen über dem eigentlichen Kalender */}
      <Grid columns={7} celled className="custom-border">
        {weekdays.map((day, key) => (
          <Grid.Column key={key} className="no-min-height">
            {day}
          </Grid.Column>
        ))}
      </Grid>
      {/* Eigentlicher Kalender mit Terminen */}
      <Grid celled columns={7} className="custom-border">
        {weeks.map((week, index) => (
          <Grid.Row key={index}>
            {renderWeekDays(
              week.days,
              t,
              firstDayOfMonth,
              nextMonthsFirstDay,
              handleOnClick,
              meeting.content,
            )}
          </Grid.Row>
        ))}
      </Grid>
    </React.Fragment>
  );
};

/**
 * Renders a whole row of a week
 * @param {Array} week
 * @param {any} t
 * @param {Boolean} firstDayOfMonth
 * @param {Boolean} nextMonthsFirstDay
 * @param {() => void} handleOnClick
 * @param {Array} meeting
 */
const renderWeekDays = (week, t, firstDayOfMonth, nextMonthsFirstDay, handleOnClick, meeting) => {
  return (
    <React.Fragment>
      {week.map((day, index) => {
        const isFirstDayOfMonth = firstDayOfMonth.isSame(day);
        const isNextMonthsFirstDay = nextMonthsFirstDay.isSame(day);
        const isToday = moment().isSame(day, 'day');
        const isPast = moment().isAfter(day, 'day');
        const meetings = meeting
          .filter((item) => moment(item.time).isSame(day, 'day'))
          .sort((a, b) =>
            moment(a.time).format('HH:mm') > moment(b.time).format('HH:mm') ? 1 : -1,
          );

        return (
          <Grid.Column key={index} className="no-padding">
            {meetings.length > 0 &&
              meetings.map((item, index) => (
                <div key={index} style={{ width: '100%', fontSize: '0.75em', display: 'flex' }}>
                  {moment(item.time).format('HH:mm')} {item.name}
                </div>
              ))}
            {isPast &&
              renderWeekDay(
                day,
                isFirstDayOfMonth,
                isNextMonthsFirstDay,
                isToday,
                isPast,
                handleOnClick,
                t,
              )}
            {!isPast && (
              <Popup
                trigger={renderWeekDay(
                  day,
                  isFirstDayOfMonth,
                  isNextMonthsFirstDay,
                  isToday,
                  isPast,
                  handleOnClick,
                  t,
                )}
                content={t('page.calendar.create')}
              />
            )}
          </Grid.Column>
        );
      })}
    </React.Fragment>
  );
};

/**
 *
 * Renders the Date of given Day
 */
const renderWeekDay = (
  day,
  isFirstDayOfMonth,
  isNextMonthsFirstDay,
  isToday,
  isPast,
  handleOnClick,
  t,
) => (
  <div
    onClick={() => (isPast ? null : handleOnClick(day))}
    className={
      isFirstDayOfMonth || isNextMonthsFirstDay
        ? 'calendar-day'
        : isToday && (isFirstDayOfMonth || isNextMonthsFirstDay)
        ? 'calendar-day today'
        : isToday
        ? 'calendar-day notfirstday today'
        : 'calendar-day notfirstday'
    }
  >
    {((isFirstDayOfMonth || isNextMonthsFirstDay) && t('format:firstDayOfMonth', { date: day })) ||
      t('format:weekDayShort', { date: day })}
  </div>
);

export default CalenderBody;
