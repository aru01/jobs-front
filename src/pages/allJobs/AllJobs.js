import React, {Component} from 'react';
import JobsList from '../../components/jobItem/JobsList';
import SearchBar from '../../components/search';
import FiltersGroup from '../../components/filter';
import Texts from '../../utils/texts.js';
import LanguageContext from '../../context/LanguageContext';
import CitiesApi from '../../api/CitiesApi';
import TeamsApi from '../../api/TeamsApi';
import TypesApi from '../../api/TypesApi';

export default class AllJobs extends Component {
  state = {
    activeSearchQuery: '',
    optionsCity: null,
    optionsTeam: null,
    optionsType: null,
    activeCity: 'all',
    activeTeam: 'all',
    activeType: 'all',
    responseNumber: null,
    filtersAreLoading: true,
    languageSetting: Texts,
  };

  async componentDidMount() {
    const params = this.props.match.params;
    if (!!params && params.lang && params.lang.match(/ru|kk|en/)) {
      this.props.setLanguageValue(params.lang.toUpperCase());
    } else {
      this.props.setLanguageValue('RU');
    }
    try {
      const citiesResponse = await CitiesApi.getAllCities();
      const teamsResponse = await TeamsApi.getAllTeams();
      const typesResponse = await TypesApi.getAllTypes();
      this.setState({optionsCity: citiesResponse.data});
      this.setState({optionsTeam: teamsResponse.data});
      this.setState({optionsType: typesResponse.data});
    } catch (err) {
      this.setState({errorJobs: true});
    } finally {
      this.setState({
        filtersAreLoading: false
      });
    }

  }

  filterItems = (val, type) => {
    switch (type) {
      case 'city':
        this.setState({activeCity: val});
        break;
      case 'team':
        this.setState({activeTeam: val});
        break;
      case 'searchResult':
        this.setState({activeSearchQuery: val});
        break;
      case 'type':
        this.setState({activeType: val});
        break;
      default:
        break;
    }
  };
  resetFilters = () => {
    this.setState({
      activeCity: 'all',
      activeTeam: 'all',
      activeType: 'all',
      activeSearchQuery: ''
    });
  };
  setActiveQuery = (tagValue) => {
    this.setState({
      activeSearchQuery: tagValue
    });
  };

  render() {
    const {
      activeSearchQuery,
      optionsCity,
      optionsType,
      optionsTeam,
      activeCity,
      activeTeam,
      activeType,
      responseNumberHandler,
      languageSetting,
      filtersAreLoading,
      errorJobs
    } = this.state;

    return (
      <LanguageContext.Consumer>{
        (value) =>
          <>
            <SearchBar
              filterItems={this.filterItems}
              activeSearchQuery={activeSearchQuery}
              languageSetting={languageSetting}
              currentLanguage={value.languageValue}
              filtersAreLoading={filtersAreLoading}
              errorJobs={errorJobs}
            />
            <FiltersGroup
              filterItems={this.filterItems}
              optionsCity={optionsCity}
              optionsType={optionsType}
              optionsTeam={optionsTeam}
              activeCity={activeCity}
              activeTeam={activeTeam}
              activeType={activeType}
              currentLanguage={value.languageValue}
              languageSetting={languageSetting}
              resetFilters={this.resetFilters}
              filtersAreLoading={filtersAreLoading}
              errorJobs={this.props.errorJobs}
            />
            <JobsList
              activeCity={activeCity} activeType={activeType}
              activeTeam={activeTeam} allJobs={this.props.allJobs}
              activeSearchQuery={activeSearchQuery}
              responseNumberHandler={responseNumberHandler}
              lang={value.languageValue}
              jobsAreLoading={this.props.jobsAreLoading}
              languageSetting={languageSetting}
              setActiveQuery={this.setActiveQuery}
              errorJobs={this.props.errorJobs}
              filterItems={this.filterItems}
              setCurrentJob={this.props.setCurrentJob}
            />
          </>
      }
      </LanguageContext.Consumer>
    );
  }
}

