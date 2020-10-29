import React from 'react';

import CalendarHeader from 'components/Calendar/CalendarHeader';
import CalendarBody from 'components/Calendar/CalendarBody';
import CalendarFooter from 'components/Calendar/CalendarFooter';
import { useSharedMoment } from 'hooks/sharedMoment';

const Calendar = (ownProps) => {
  const { modalState, ownAccount } = ownProps;

  const [value, setValue] = useSharedMoment();

  return (
    <React.Fragment>
      <CalendarHeader currentMoment={{ value, setValue }} />
      <CalendarBody
        ownAccount={ownAccount}
        currentMoment={{ value, setValue }}
        modalState={modalState}
      />
      <CalendarFooter ownAccount={ownAccount} />
    </React.Fragment>
  );
};

export default Calendar;
