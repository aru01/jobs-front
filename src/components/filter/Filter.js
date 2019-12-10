import React from 'react';
import {Dropdown, Grid, Button} from 'semantic-ui-react';
import './filter.scss';
import {CSSTransitionGroup} from 'react-transition-group'

const FiltersGroup = (props) => {
  const {
    optionsCity,
    optionsTeam,
    optionsType,
    filterItems,
    activeCity,
    activeTeam,
    activeType,
    resetFilters,
    languageSetting,
    currentLanguage,
    filtersAreLoading,
    errorJobs,
  } = props;

  let resultCity = null;
  let resultTeam = null;
  let resultType = null;
  const langPrev = currentLanguage[0] + currentLanguage[1].toLowerCase();

  optionsCity ?
    resultCity = [{
      value: 'all',
      text: languageSetting('cityPlaceholder', currentLanguage),
      key: 'all'
    }, ...optionsCity.map(item => (
      {
        value: item,
        text: item[`name${langPrev}`],
        key: item[`id`]
      }))]
    : resultCity = null;
  optionsTeam ?
    resultTeam = [{
      value: 'all',
      text: languageSetting('teamPlaceholder', currentLanguage),
      key: 'all'
    }, ...optionsTeam.map(item => (
      {
        value: item,
        text: item[`name${langPrev}`],
        key: item[`id`]
      }))]
    : resultTeam = null;
  optionsType ?
    resultType = [{
      value: 'all',
      text: languageSetting('typePlaceholder', currentLanguage),
      key: 'all'
    }, ...optionsType.map(item => (
      {
        value: item,
        text: item[`name${langPrev}`],
        key: item[`id`]
      }))]
    : resultType = null;

  return (
    <div className='filter'>
      <CSSTransitionGroup
        transitionName="filter-loading"
        transitionEnterTimeout={300}
        transitionAppear={true}
        transitionAppearTimeout={300}>
        <Grid>
          <Grid.Column mobile={16} computer={4}>
            <Dropdown
              placeholder={languageSetting('cityPlaceholder', currentLanguage)}
              fluid
              selection
              search
              options={resultCity}
              disabled={(filtersAreLoading || errorJobs)}
              value={activeCity}
              onChange={({target}, data) => {
                filterItems(data.value, 'city');
              }}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4}>
            <Dropdown
              placeholder={languageSetting('teamPlaceholder', currentLanguage)}
              fluid
              selection
              search
              options={resultTeam}
              disabled={(filtersAreLoading || errorJobs)}
              value={activeTeam}
              onChange={({target}, data) => {
                filterItems(data.value, 'team');
              }}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4}>
            <Dropdown
              placeholder={languageSetting('typePlaceholder', currentLanguage)}
              fluid
              search
              selection
              options={resultType}
              disabled={(filtersAreLoading || errorJobs)}
              value={activeType}
              onChange={({target}, data) => {
                filterItems(data.value, 'type');
              }}
            />
          </Grid.Column>
          <Grid.Column mobile={16} computer={4}>
            <Button
              className='btn-color'
              disabled={(filtersAreLoading || errorJobs)}
              fluid basic color='pink'
              onClick={resetFilters}>{languageSetting('buttonText', currentLanguage)}
            </Button>
          </Grid.Column>
        </Grid>
      </CSSTransitionGroup>
    </div>
  );
};

export default FiltersGroup;
