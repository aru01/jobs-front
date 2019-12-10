import React from 'react';
import './search.scss';
import LanguageContext from "../../context/LanguageContext";

const ResultLine = (props) => {
  const {responseNumber, languageSetting} = props;

  return (
    <LanguageContext.Consumer>
      {(value) =>
        <div
          className='response secondary-text-response '>{languageSetting('resultLine', value.languageValue)} {responseNumber}</div>
      }
    </LanguageContext.Consumer>
  );
};

export default ResultLine;
