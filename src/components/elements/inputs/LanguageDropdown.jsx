import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'semantic-ui-react';

import { languageOptions } from 'config/i18next';

function LanguageDropdown(ownProps) {
  const { isBackend } = ownProps;

  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const options = languageOptions(t).map((lng) => ({
    key: lng.text,
    value: lng.value,
    flag: lng.value === 'en' ? 'gb' : lng.value,
  }));

  return (
    <Dropdown
      selection
      item
      defaultValue={currentLanguage}
      options={options}
      onChange={(e, d) => i18n.changeLanguage(d.value)}
      className={isBackend ? 'language-dropdown' : 'language-dropdown footer'}
    />
  );
}

export default LanguageDropdown;
