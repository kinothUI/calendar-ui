import React from 'react';

import CalendarHeader from 'components/Calendar/CalendarHeader';
import CalendarBody from 'components/Calendar/CalendarBody';
import { useSharedMoment } from 'hooks/sharedMoment';

const Calendar = (ownProps) => {
  const { ownAccount } = ownProps;

  const [value, setValue] = useSharedMoment();

  return (
    <React.Fragment>
      <CalendarHeader currentMoment={{ value, setValue }} />
      <CalendarBody ownAccount={ownAccount} currentMoment={{ value, setValue }} />
    </React.Fragment>
  );
};

export default Calendar;
