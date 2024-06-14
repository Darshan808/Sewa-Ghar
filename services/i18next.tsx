import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from 'react-native-localize'

const getLanguage = () => {
  const locales = getLocales();
  return locales[0].languageCode;
}

export const resources = {
    en: {
        translation: {
          'product_name': 'Sewa Ghar',
          count: 'Count {{count}}'
        },
    },
    ne: {
        translation: {
          'product_name': 'सेवा घर',
          count: 'गणना {{count}}'
        },
    },
}

i18next.use(initReactI18next).init({
  debug: __DEV__,
  resources,
  lng: getLanguage() ?? 'en',
  lazy: true,
  supportedLngs: ['en', 'ne'],
  compatibilityJSON: 'v3',
  fallbackLng: ['en', 'ne'],
  interpolation: {
    escepeValue: false,
  },
});

export default i18next;
