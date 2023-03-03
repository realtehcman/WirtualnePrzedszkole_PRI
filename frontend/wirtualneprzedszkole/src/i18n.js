import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

const availableLanguages = ['pl', 'en', 'ua']
const option = {
    order: ['navigator', 'htmlTag', 'path', 'subdomail'],
    checkWhiteList: true
}

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .init({
    fallbackLng: 'pl',
    lng: 'pl',    //default language
    debug: false,
    whiteList: availableLanguages,
    detection: option,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;