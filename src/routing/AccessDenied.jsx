import React from 'react';

import { Icon, Message } from 'semantic-ui-react';

function AccessDenied() {
  return (
    <div>
      <Message negative icon>
        <Icon name="bullhorn" />
        <Message.Header>Access Denied</Message.Header>
        Du kummst da net nei!
      </Message>
    </div>
  );
}

export default AccessDenied;
