import moment from 'moment';
/**
 * Get a moment the next hour.
 *
 * Provide an argument as moment to get the next hour
 * of it or leave it for the current next hour.
 *
 * Adds an hour and a minute on striking hour/minute/second
 * otherwise adds an hour and rounds down.
 *
 * Additionally set's time to 08:00 AM when moment is not today
 */
export const getNextHourMoment = (date) => {
  const value = moment(date);
  const today = moment();

  if (value.isAfter(today, 'day')) {
    const morningMoment = value.add(8, 'hour').startOf('hour');

    return morningMoment;
  }

  if (value.isValid()) {
    const nextHour =
      value.hours() && value.minutes() && value.seconds()
        ? value.add(1, 'minute').add(1, 'hour').startOf('hour')
        : value.add(1, 'hour').startOf('hour');

    return nextHour;
  }

  const now = moment();
  const nextHour =
    now.hours() && now.minutes() && now.seconds()
      ? now.add(1, 'minute').add(1, 'hour').startOf('hour')
      : now.add(1, 'hour').startOf('hour');
  return nextHour;
};
