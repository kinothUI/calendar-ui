import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-xhr-backend';
import yaml from 'js-yaml';
import moment from 'moment';
import 'moment/locale/de';

const LANGUAGES = ['de', 'en'];
const FALLBACK_LANGUAGE = 'de';

const LOCALE_COOKIE = 'LOCALE';

const format = (value, formatString, lng) => {
  if (moment.isMoment(value)) return value.locale(lng).format(formatString);
  else return value;
};

const onLanguageChange = (language) => {
  console.log('%c local in onLanguageChange()', 'color: purple;', language);
  moment.locale(language);
};

i18next
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .on('languageChanged', onLanguageChange)
  .init({
    load: 'languageOnly',
    fallbackLng: FALLBACK_LANGUAGE,
    detection: {
      order: ['cookie', 'navigator'],
      lookupCookie: LOCALE_COOKIE,
    },
    debug: process.env.NODE_ENV !== 'production',
    ns: ['translations', 'format', 'form-entities'],
    defaultNS: 'translations',
    react: {
      wait: true, // Wait until loaded in every translated HOC
    },
    interpolation: {
      escapeValue: false,
      format,
    },
    // Load and parse YAML files from the locales folder
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.yaml',
      parse: yaml.safeLoad,
    },
  });

/**
 * Extract the first language part from a locale string, e.g. returns 'en' for 'en-US'.
 */
export const extractLanguage = (locale) => {
  if (locale != null) {
    const language = locale.split('-')[0];
    if (LANGUAGES.includes(language)) return language;
  }
  return FALLBACK_LANGUAGE;
};

/**
 * Menu options for all supported languages.
 */
export const languageOptions = (t) =>
  LANGUAGES.map((language) => ({
    text: t(`language.${language}`),
    value: language,
  }));

export default i18next;
