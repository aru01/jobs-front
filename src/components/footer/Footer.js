import React from 'react';
import {Container} from 'semantic-ui-react';
import './footer.scss';

const Footer = (props) => {
  const {
    languageSetting,
    currentLanguage,
  } = props;
  return (
    <div className='footer-form'>
      <Container>
        <span className='white-text'> {languageSetting('footerText', currentLanguage)}</span>
      </Container>
    </div>
  );
};

export default Footer;
