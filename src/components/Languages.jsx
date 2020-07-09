import React from 'react';
import { useTranslation } from 'react-i18next';

const Languages = ({ activeLang, setActiveLang }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setActiveLang(lang);
  };

  return (
    <>
      <button
        className={`lang-btn ${activeLang === 'ru' ? 'active' : ''}`}
        type="button"
        onClick={() => changeLanguage('ru')}
      >
        ru
      </button>
      <button
        className={`lang-btn ${activeLang === 'en' ? 'active' : ''}`}
        type="button"
        onClick={() => changeLanguage('en')}
      >
        en
      </button>
    </>
  );
};

export default Languages;
