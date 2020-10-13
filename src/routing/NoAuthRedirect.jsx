import React from 'react';
import { Redirect } from 'react-router-dom';

export default function NoAuthRedirect({ pathname, ...rest }) {
  return <Redirect to={{ pathname }} {...rest} />;
}
