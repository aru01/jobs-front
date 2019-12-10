import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';

const Description = ({currentJob, currentLanguage}) => {
  let desc = currentJob.descRu;

  switch (currentLanguage) {
    case 'RU':
      desc = currentJob.descRu;
      break;
    case 'EN':
      desc = currentJob.descEn;
      break;
    case 'KK':
      desc = currentJob.descKk;
    default:
      desc = currentJob.descRu;
  }

  return (
    <ReactMarkdown source={desc} escapeHtml={true}/>
  )
}

export default Description;

