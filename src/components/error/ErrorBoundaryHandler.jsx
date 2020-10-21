import React from 'react';
import { Message, Icon, Container } from 'semantic-ui-react';

function ErrorBoundaryHandler({ error }) {
  return (
    <Container as="main">
      <Message icon negative size="huge">
        <Icon name="warning sign" />
        <Message.Content>
          <Message.Header>
            Error caught by Error Boundary Handler
            {error != null && (
              <React.Fragment>
                <p>
                  {error.name}: {error.message}
                </p>
                <p style={{ whiteSpace: 'pre-line' }}>{error.stack}</p>
              </React.Fragment>
            )}
          </Message.Header>
        </Message.Content>
      </Message>
    </Container>
  );
}

export default ErrorBoundaryHandler;
