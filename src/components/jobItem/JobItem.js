import React from 'react';
import {Icon, Item, Label, Header} from 'semantic-ui-react';
import {Link} from "react-router-dom";


export const JobItem = (props) => {

  const languagePrev = props.lang[0] + props.lang[1].toLowerCase();
  const {
    id: idJob,
    [`name${languagePrev}`]: title,
    city: {[`name${languagePrev}`]: cityJob},
    team: {[`name${languagePrev}`]: teamJob},
    jobType: {[`name${languagePrev}`]: typeJob},
    tags: tagsJob,
  } = props.job;

  return (
    <Item>
      <Item.Content className='job my-1'>
        <div className='title d-flex justify-space-between align-items-center'>
          <Header as='h2' className='m-0 cursor-pointer'>
            <Link to={`${languagePrev && languagePrev !== 'Ru' ? '/'+languagePrev : ''}/${props.job.city.nameEn}/${props.job.slug}`.toLowerCase().replace(' ', '-')}
                  className='primary-text job-title' onClick={() => props.setCurrentJob(props.job)}>
              {title}
              { checkJobsForApplyingAlready(idJob) &&
                <span title='Вы откликнулись на эту вакансию'><Icon className='chechicon' name='bookmark outline' color='blue' size='small'/></span>}
            </Link>
            <Header.Subheader>{teamJob}</Header.Subheader>
          </Header>
          <div className='description d-flex justify-space-between'>
            <span className='cursor-pointer secondary-text' onClick={() => props.filterItems(props.job.city, 'city')}>
              <Icon color='pink' name='map marker alternate'/>{cityJob}
            </span>
            <span className='cursor-pointer secondary-text' onClick={() => props.filterItems(props.job.jobType, 'type')}>
              <Icon color='pink' name='clock'/>{typeJob}
            </span>
          </div>
        </div>
        {tagsJob && tagsJob.length > 0 &&
          <Item.Extra className='mt-2'>
            {tagsJob.map((tag, i) =>
              <Label size='large' as='a' key={i}
                     onClick={() => props.setActiveQuery(tag.name)}>{tag.name}</Label>
            )}
          </Item.Extra>
        }
      </Item.Content>
    </Item>
  )
};

export default JobItem;
