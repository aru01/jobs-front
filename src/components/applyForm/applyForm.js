import React from 'react';
import {Grid, Button, Container, Label, Form as FormSemantic, Icon, Message, Header} from 'semantic-ui-react';
import './applyForm.scss';
import {Form, Field} from 'react-final-form'
import {CSSTransitionGroup} from "react-transition-group";
import InputMask from 'react-input-mask';



const ApplyForm = (props) => {
  const {
    uploadFileHandler,
    inputButtonRef,
    currentLanguage,
    applyError,
    applicationUploaded,
    buttonApplyLoading,
    formRef,
    onSubmit,
    jobAreLoading,
    currentJob,
    languageSetting,
    applyFormText,
  } = props;

  return (
    <CSSTransitionGroup
      transitionName="job-item-loading"
      transitionEnterTimeout={300}
      transitionAppear={true}
      transitionAppearTimeout={300}
      transitionLeaveTimeout={300}>
      <div className="full-width mt-50" ref={formRef}>
        <Container>
          {(applyFormText) ?
              <Message
                success
                header={formText(currentLanguage).successSubmit}
                content={formText(currentLanguage).contentSubmit}
              />
            :
            <>
              <Header as='h2' className='text-zone mb-3'>
                {formText(currentLanguage).headerApplyForm}
                <Header.Subheader
                  className='mt-05'>{formText(currentLanguage).subheaderApplyForm} "{currentJob[`name${currentLanguage[0] + currentLanguage[1].toLowerCase()}`]}"</Header.Subheader>
              </Header>
              {
                checkJobsForApplyingAlready(currentJob.id) &&
                    <Message
                      className='apply-form'
                      success
                      header={formText(currentLanguage).alreadySubmit}
                    />
              }
              <Form
                ref={formRef}
                onSubmit={onSubmit}
                mutators={{
                  setValue: ([field, value], state, utils) => {
                    utils.changeValue(state, field, () => {
                      return value
                    });
                  }
                }}
                validate={(values) => validateFormFunction(values, currentLanguage)}
                render={({handleSubmit, pristine, invalid, submitting, form, values, ...rest}) => (
                  <form className='apply-form'
                        encType="multipart/form-data"
                        onSubmit={async () => {
                          await handleSubmit()
                          if (!applicationUploaded) {
                          }
                        }}
                  >
                    <FormSemantic className='form-field' loading={buttonApplyLoading}>

                      <Grid>
                        <Grid.Row columns={2}>
                          <Grid.Column mobile={16} computer={8} className='column-margin-buttom'>
                            <Field name="firstName">
                              {({input, meta}) => (
                                <FormSemantic.Field required fluid="true" error={meta.error && meta.touched}
                                                    disabled={jobAreLoading}>
                                  <label className='font-w-n'>{formText(currentLanguage).firstName}</label>
                                  <input
                                    type="text" {...input}
                                    placeholder={formText(currentLanguage).firstName}
                                  />
                                  {meta.error && meta.touched &&
                                  <Label basic pointing={true}>{meta.error}</Label>
                                  }
                                </FormSemantic.Field>
                              )}
                            </Field>
                          </Grid.Column>
                          <Grid.Column mobile={16} computer={8}>
                            <Field name="lastName">
                              {({input, meta}) => (
                                <FormSemantic.Field required fluid="true" error={meta.error && meta.touched}
                                                    disabled={jobAreLoading}>
                                  <label className='font-w-n'>{formText(currentLanguage).lastName}</label>
                                  <input
                                    type="text" {...input}
                                    placeholder={formText(currentLanguage).lastName}
                                  />
                                  {meta.error && meta.touched &&
                                  <Label basic pointing>{meta.error}</Label>
                                  }
                                </FormSemantic.Field>
                              )}
                            </Field>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={2}>
                          <Grid.Column>
                            <Field name="email">
                              {({input, meta}) => (
                                <FormSemantic.Field required fluid="true" error={meta.error && meta.touched}
                                                    disabled={jobAreLoading}>
                                  <label className='font-w-n'>{formText(currentLanguage).email}</label>
                                  <input
                                    type="email" {...input}
                                    placeholder={formText(currentLanguage).email}
                                  />
                                  {
                                    meta.error && meta.touched &&
                                    <Label basic pointing>{meta.error}</Label>
                                  }
                                </FormSemantic.Field>
                              )}
                            </Field>
                          </Grid.Column>
                          <Grid.Column>
                            <Field name="phone">
                              {({input, meta}) => (
                                <FormSemantic.Field required fluid="true" error={meta.error && meta.touched}
                                                    disabled={jobAreLoading}>
                                  <label className='font-w-n'>{formText(currentLanguage).phone}</label>
                                  <InputMask
                                    {...input}
                                    mask="+7 (999) 999-99-99"
                                    placeholder={formText(currentLanguage).phone}
                                  />
                                  {
                                    meta.error && meta.touched &&
                                    <Label basic pointing>{meta.error}</Label>
                                  }
                                </FormSemantic.Field>
                              )}
                            </Field>
                          </Grid.Column>
                        </Grid.Row>
                        {currentJob && (currentJob.optionalFields.github || currentJob.optionalFields.linkedIn) &&
                        <Grid.Row>
                          <Grid.Column mobile={16}
                                       computer={currentJob && (currentJob.optionalFields.github && currentJob.optionalFields.linkedIn) ? '8' : '16'}
                                       className={currentJob && (currentJob.optionalFields.github && currentJob.optionalFields.linkedIn) ? 'column-margin-buttom' : ''}>
                            {currentJob && currentJob.optionalFields.github &&
                            <Field name="githubAccount">
                              {({input, meta}) => (
                                <FormSemantic.Field fluid="true" disabled={jobAreLoading}>
                                  <label className='font-w-n'>{formText(currentLanguage).gitHunAcc}</label>
                                  <input
                                    type="text" {...input}
                                    placeholder={formText(currentLanguage).gitHunAcc}
                                  />
                                </FormSemantic.Field>
                              )}
                            </Field>
                            }
                          </Grid.Column>
                          <Grid.Column mobile={16}
                                       computer={currentJob && (currentJob.optionalFields.github && currentJob.optionalFields.linkedIn) ? '8' : '16'}>
                            {currentJob && currentJob.optionalFields.linkedIn &&
                            <Field name="linkedInAccount">
                              {({input, meta}) => (
                                <FormSemantic.Field fluid="true" disabled={jobAreLoading}>
                                  <label className='font-w-n'>{formText(currentLanguage).linkedInAcc}</label>
                                  <input
                                    type="email" {...input}
                                    placeholder={formText(currentLanguage).linkedInAcc}
                                  />
                                  {
                                    meta.error && meta.touched && <span>{meta.error}</span>
                                  }
                                </FormSemantic.Field>
                              )}
                            </Field>
                            }
                          </Grid.Column>
                        </Grid.Row>
                        }
                        <Grid.Row>
                          <Grid.Column>
                            <Field name="Headhunter">
                              {({input, meta}) => (
                                <FormSemantic.Field fluid="true" disabled={jobAreLoading}>
                                  <label className='font-w-n'>{formText(currentLanguage).hhunter}</label>
                                  <input
                                    type="text" {...input}
                                    placeholder={formText(currentLanguage).headhunter}
                                  />
                                </FormSemantic.Field>
                              )}
                            </Field>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column>
                            <Field name="coverLetter">
                              {({input, meta}) => (
                                <FormSemantic.Field fluid="true" disabled={jobAreLoading}>
                                  <label className='font-w-n'>{formText(currentLanguage).coverLetter}</label>
                                  <textarea
                                    {...input}
                                    placeholder={formText(currentLanguage).coverLetter}
                                  />
                                  {
                                    meta.touched && meta.error && <span>{meta.error}</span>
                                  }
                                </FormSemantic.Field>
                              )}
                            </Field>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column>
                            <Field name="fileCv">
                              {({meta}) => (
                                <>
                                  <input
                                    type='file'
                                    className='input-upload'
                                    ref={inputButtonRef}
                                    accept=".pdf,.doc,.rtf"
                                    onChange={(e) => {
                                      form.mutators.setValue('fileCv', e.target.files[0]);
                                    }}
                                  />
                                  <Button
                                    basic
                                    fluid={true}
                                    type="button"
                                    color='blue'
                                    disabled={jobAreLoading}
                                    onClick={uploadFileHandler}>
                                    <Icon name='upload'/>{formText(currentLanguage).buttonUpload}
                                  </Button>
                                  {
                                    meta.error && meta.touched &&
                                    <Label basic pointing>{meta.error}</Label>
                                  }
                                  {!meta.error && values.fileCv &&
                                  <Container fluid className='mt-1 blue-text'>
                                    <span><Icon color='blue' name='paperclip'/>{values.fileCv.name}</span>
                                    <Icon color='blue' onClick={() => {
                                      form.mutators.setValue('fileCv', null);
                                    }} name='delete'/>
                                  </Container>
                                  }
                                </>
                              )}
                            </Field>
                          </Grid.Column>
                        </Grid.Row>
                        <div className='d-flex flex-direction-column'>
                          <Field name="captcha">
                            {({meta}) => (
                              <>
                                <Captcha onChange={() => form.mutators.setValue('captcha', 'Approved')}
                                />
                                {
                                  meta.error && meta.touched &&
                                  <Label basic pointing>{meta.error}</Label>
                                }
                              </>
                            )}
                          </Field>
                          {applyError &&
                          <Message negative>
                            <Message.Header>{languageSetting('errorText', currentLanguage)}</Message.Header>
                            <p>{languageSetting('errorNotApply', currentLanguage)}</p>
                          </Message>}
                          <div className='button-apply'>
                            <Button
                              type="submit"
                              loading={buttonApplyLoading}
                              fluid={true}
                              color='teal'
                              size='large'
                            >
                              {formText(currentLanguage).buttonApply}
                            </Button>
                          </div>
                        </div>
                      </Grid>
                    </FormSemantic>
                  </form>
                )}
              />
            </>
          }
        </Container>
      </div>
    </CSSTransitionGroup>
  );
};

export default ApplyForm;
