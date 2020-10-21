import React from 'react';
import { Container } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

function NotFound() {
  const { t } = useTranslation();

  return (
    <Container as="main">
      <h2>{t('page.not_found')}</h2>
    </Container>
  );
}

export default NotFound;
