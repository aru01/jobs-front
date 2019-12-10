import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import './semantic/dist/semantic.min.css';
import './App.scss';
import Header from './components/header';
import AllJobs from './pages/allJobs/AllJobs';
import LanguageContext from './context/LanguageContext';
import { Switch, Route, Redirect } from 'react-router-dom';
import JobDescription from './pages/jobDescription/JobDescription';
import JobsApi from './api/JobsApi';
import Footer from './components/footer/Footer';


export default class App extends Component {
  state = {
    languageValue: 'RU',
    jobsAreLoading: true,
    allJobs: [],
    errorJobs: false,
    currentJob: null,
    errorJob: false,
    languageSetting: Texts
  };

  async componentDidMount() {
    try {
      const response = await JobsApi.getAllJobs();
      this.setState({ allJobs: response.data });
      this.state.languageValue = getFromStorage('language') ? getFromStorage('language') : 'RU';
    } catch (err) {
      this.setState({ errorJobs: true });
    } finally {
      this.setState({
        jobsAreLoading: false
      });
    }
  }

  setCurrentJob = (valueJob) => {
    this.setState({ currentJob: valueJob });
  };

  setLanguageValue = (value, fromSelect) => {
    this.setState({ languageValue: value });
    addToStorage('language', value);
    const langPref = value.toLowerCase();
    const langPrefNotRu = langPref!=='ru'? `/${langPref}`: '';
    if (fromSelect) {
      //todo change url on change select lang
      const regExp = new RegExp(/\/ru\/|\/en\/|\/kk\//);
      const matching = window.location.pathname.match(regExp);
      if (matching) {
        const URL_REDIRECT = window.location.origin +`${langPrefNotRu}/`
          + window.location.pathname.replace(regExp, ``);
        console.log('URL_REDIRECT', URL_REDIRECT);
        window.history.replaceState('object and string', 'Title', `${URL_REDIRECT}`);
      } else {
        if(window.location.pathname.match(/\/$|\/ru$|\/kk$|\/en$/)){
          const URL_REDIRECT = window.location.origin +`${langPrefNotRu}`;
          window.history.replaceState('object and string', 'Title', `${URL_REDIRECT}`);
        }
        else {
          const URL_REDIRECT = window.location.origin + `${langPrefNotRu}`+ window.location.pathname;
          window.history.replaceState('object and string', 'Title', `${URL_REDIRECT}`);
        }
      }
    }
  };

  render() {
    return (
      <LanguageContext.Provider
        value={{
          languageValue: this.state.languageValue,
          setLanguageValue: this.setLanguageValue
        }}>
        <ScrollToTop>
          <Header/>
          <Container style={{ flex: '1 0 auto' }}>
            <Switch>
              <Route
                exact
                path="/:lang?"
                render={({ match }) => {
                  const lang = match.params.lang;
                  if (!lang || (lang && lang.match(/ru|kk|en/))) {
                    return (
                      <AllJobs
                        match={match}
                        allJobs={this.state.allJobs}
                        jobsAreLoading={this.state.jobsAreLoading}
                        errorJobs={this.state.errorJobs}
                        setCurrentJob={this.setCurrentJob}
                        setLanguageValue={this.setLanguageValue}
                      />
                    );
                  } else {
                    return <Redirect to="/" />;
                  }
                }}
              />
              <Route
                exact
                path="/:lang?/:cityName/:slug"
                render={({ match }) => {
                  const params = match.params;
                  const lang = params.lang;
                  const cityName = params.cityName;
                  const slug = params.slug;
                  if (!lang || (lang && lang.match(/ru|kk|en/))) {
                    return (
                      <JobDescription
                        currentJob={this.state.currentJob}
                        match={match}
                        errorJob={this.state.errorJob}
                        languageSetting={this.state.languageSetting}
                        lang={this.state.lang}
                        currentLanguage={this.state.languageValue}
                        errorApply={this.state.errorApply}
                        setLanguageValue={this.setLanguageValue}
                      />
                    );
                  } else {
                    return <Redirect to={`/${cityName}/${slug}`} />;
                  }
                }}
              />
              <Redirect to="/" />
            </Switch>
          </Container>
          <Footer
            currentLanguage={this.state.languageValue}
            languageSetting={this.state.languageSetting}
          />
        </ScrollToTop>
      </LanguageContext.Provider>
    );
  }
}
