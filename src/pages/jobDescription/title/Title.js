import React from 'react';
import { Button, Header, Label, Breadcrumb } from 'semantic-ui-react';
import './title.scss';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const Title = (props) => {
  const { currentJob, languageSetting, currentLanguage, scrollToApplyForm } = props;
  const languagePrefix = currentLanguage[0] + currentLanguage[1].toLowerCase();

  return (
    <div>
      <Helmet>
        <title>{`Работа в Kcell | ${currentJob[`name${languagePrefix}`]}`}</title>
      </Helmet>
      <Breadcrumb className='mb-3'>
        <NavLink to="/">
          <Breadcrumb.Section link>{languageSetting('main', currentLanguage)}</Breadcrumb.Section>
        </NavLink>
        <Breadcrumb.Divider/>
        <Breadcrumb.Section active>{currentJob[`name${languagePrefix}`]}</Breadcrumb.Section>
      </Breadcrumb>
      <div className='title-area d-flex justify-space-between mb-2'>
        <div>
          <Header as='h2' className='primary-text'>{currentJob[`name${languagePrefix}`]}</Header>
          <ul className='ul-area'>
            <li
              className='ul-area li-area mt-05'>{languageSetting('titleLocation', currentLanguage)} {currentJob.city[`name${languagePrefix}`]}</li>
            <li
              className='li-area mt-05'>{languageSetting('titleTeam', currentLanguage)} {currentJob.team[`name${languagePrefix}`]}</li>
            <li
              className='li-area mt-05'>{languageSetting('titleJobType', currentLanguage)} {currentJob.jobType[`name${languagePrefix}`]}</li>
          </ul>
          {currentJob.tags &&
          <div className='mt-2 mb-2'>
            {currentJob.tags.map((tag, i) => <Label key={i} size='large'>{tag.name}</Label>)}
          </div>
          }
        </div>
        <div className='button-area cursor-pointer'>
          <Button basic color='pink' onClick={scrollToApplyForm}>
            {languageSetting('buttonApply', currentLanguage)}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Title;
