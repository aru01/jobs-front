import React from 'react';
import './job.scss';
import {JobItem} from './JobItem';
import {Item, Message} from 'semantic-ui-react';
import ResultLine from '../search/ResultLine';
import {CSSTransitionGroup} from 'react-transition-group'
import {PlaceholderItems} from "../../pages/allJobs/PlaceholderItems";

const JobsList = (props) => {
  const {
    allJobs,
    activeSearchQuery,
    activeType,
    activeCity,
    activeTeam,
    lang,
    jobsAreLoading,
    languageSetting,
    setActiveQuery,
    errorJobs,
    filterItems,
    setCurrentJob
  } = props;
 // const filteredJobs = filterJobsFunction(allJobs, lang, activeSearchQuery, activeCity, activeType, activeTeam);

  return (
    <div>
      {errorJobs ?
        <Message negative>
          <Message.Header>{languageSetting('errorText', lang)}</Message.Header>
          <p>{languageSetting('errorDescription', lang)}</p>
        </Message>
        :
        <>
          <ResultLine
            activeTeam={activeTeam}
            activeCity={activeCity}
            activeType={activeType}
            responseNumber={filteredJobs.length}
            languageSetting={languageSetting}
          />
          {!allJobs.size ?
            <>
              {jobsAreLoading ?
                <PlaceholderItems/>
                :
                <CSSTransitionGroup
                  transitionName="job-loading"
                  transitionEnterTimeout={300}
                  transitionAppear={true}
                  transitionAppearTimeout={300}
                  transitionLeaveTimeout={300}>
                  <Item.Group divided className='jobs'>
                    {filteredJobs.map((job, i) =>
                      <JobItem
                        job={job}
                        setActiveQuery={setActiveQuery}
                        jobsAreLoading={jobsAreLoading}
                        filterItems={filterItems}
                        lang={lang}
                        key={i}
                        setCurrentJob={setCurrentJob}
                      />
                    )}
                  </Item.Group>
                </CSSTransitionGroup>
              }
            </>
            :
            <Message info>
              <Message.Header>{languageSetting('noVacancies', lang)}</Message.Header>
            </Message>
          }
        </>
      }
    </div>
  );
};

export default JobsList;
