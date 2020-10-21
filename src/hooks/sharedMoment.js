import React from 'react';
import moment from 'moment';

export function useSharedMoment() {
  const [value, setValue] = React.useState(moment());

  return [value, setValue];
}
