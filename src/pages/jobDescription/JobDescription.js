import React from 'react';
import {Component} from 'react';
import LanguageContext from "../../context/LanguageContext";
import Title from "./title";
import Description from "../../components/description/Description.js"
import {CSSTransitionGroup} from "react-transition-group";
import './jobDescription.css';
import JobsApi from "../../api/JobsApi";
import UsersApi from "../../api/UsersApi";
import ApplyForm from "../../components/applyForm";
import {Message} from "semantic-ui-react";


export default class JobDescription extends Component {
  state = {
    currentJob: null,
    jobAreLoading: true,
    languageSetting: Texts,
    currentLanguage: null,
    applyError: false,
    applicationUploaded: false,
    buttonApplyLoading: false,
    buttonClicked: false,
    languageValue: 'RU',
    applyFormText: false,
  };
  formRef = React.createRef();
  inputButtonRef = React.createRef();

  async componentDidMount() {
    const params = this.props.match.params;
    if (!!params && params.lang && params.lang.match(/ru|kk|en/)) {
      this.props.setLanguageValue(params.lang.toUpperCase());
    } else {
      this.props.setLanguageValue('RU');
    }
    if (this.props.currentJob) {
      this.setState({currentJob: this.props.currentJob});
      this.setState({jobAreLoading: false});
    } else {
      try {
        const response = await JobsApi.getOneJob(this.props.match.params.slug);
        this.setState({currentJob: response.data});
      } catch (err) {
        this.setState({errorJob: true});
      } finally {
        this.setState({jobAreLoading: false});
      }
    }
  }


  onSubmit = async values => {
    const {currentJob} = this.state;
    try {
      this.setState({buttonApplyLoading: true});
      const formDataValues = new FormData();
      for (let key in values) {
        formDataValues.append(key, values[key]);
      }
      formDataValues.append('vacancyEn', currentJob.nameEn);
      formDataValues.append('vacancyRu', currentJob.nameRu);
      formDataValues.append('teamId', currentJob.team.id);
      const responce = await UsersApi.applyForm(formDataValues);
      if (responce.status === 201) {
        this.setState({applicationUploaded: true});
        this.setState({applyError: false});
        addJobtoStorage(currentJob.id);
        this.setState({applyFormText: true});
      }
    } catch (err) {
      this.setState({applyError: true});
      this.setState({applicationUploaded: false});
      this.setState({applyFormText: false});

    } finally {
      this.setState({buttonApplyLoading: false})
    }
  };
  scrollToApplyForm = () => {
    window.scrollTo(0, this.formRef.current.offsetTop)
  };
  uploadFileHandler = () => {
    const hiddenButton = this.inputButtonRef.current;
    hiddenButton.click();
    this.setState({buttonClicked: true});
  };

  render() {
    const {
      currentJob,
      jobAreLoading,
      languageSetting,
      applyError,
      applicationUploaded,
      buttonApplyLoading,
      buttonClicked,
      errorJob,
      lang,
      currentLanguage,
      applyFormText
    } = this.state;
    console.log('fjf', currentLanguage);
    return (
          <LanguageContext.Consumer>{
            (value) =>
              <div>
                {
                  errorJob?
                    <Message negative>
                      <Message.Header>{languageSetting('errorText', value.languageValue)}</Message.Header>
                      <p>{languageSetting('errorDescription', value.languageValue
                      )}</p>
                    </Message>
                    :
                    <div>
                    {jobAreLoading?
                        <> <PlaceholderJobDesc/> </>
                        :

                        <CSSTransitionGroup
                          transitionName="job-description-loading"
                          transitionEnterTimeout={300}
                          transitionAppear={true}
                          transitionAppearTimeout={300}
                          transitionLeaveTimeout={300}>
                          {currentJob &&
                          <>
                            <Title
                              currentJob={currentJob}
                              languageSetting={languageSetting}
                              currentLanguage={value.languageValue}
                              scrollToApplyForm={this.scrollToApplyForm}
                              errorJob={this.props.errorJob}
                              lang={lang}
                            />
                            <section style={{fontSize: '16px'}}>
                              <Description currentJob={currentJob} currentLanguage={value.languageValue}/>
                            </section>
                            <ApplyForm
                              formRef={this.formRef}
                              onSubmit={this.onSubmit}
                              uploadFileHandler={this.uploadFileHandler}
                              inputButtonRef={this.inputButtonRef}
                              currentLanguage={value.languageValue}
                              applyError={applyError}
                              applicationUploaded={applicationUploaded}
                              buttonApplyLoading={buttonApplyLoading}
                              buttonClicked={buttonClicked}
                              jobAreLoading={jobAreLoading}
                              currentJob={currentJob}
                              languageSetting={languageSetting}
                              lang={lang}
                              applyFormText={applyFormText}

                            />
                          </>
                          }
                        </CSSTransitionGroup>
                    }
                    </div>

                }
              </div>
          }
          </LanguageContext.Consumer>
          );
        };

        }

