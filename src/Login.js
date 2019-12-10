/*jshint esversion: 6 */
import React from 'react';
import {Input, Button,Form, Container,Grid, Message } from 'semantic-ui-react';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
// import AuthAPI from './API/AuthAPI';
// import LoginApi from './API/LoginApi';
import jwtDecode from 'jwt-decode';

export default class Login extends React.Component {
  constructor(){
    super();
    this.state = {
      userLogin:'',
      userPassword:'',
      error:false,
      loading:true,
      serverError:false,
    };
  }
  userLogin(event){
      this.setState({
        userLogin:event.target.value
      });
  }
  userPassword(event){
    this.setState({
      userPassword:event.target.value
    });
  }
   async submit(){
    const { userLogin, userPassword} = this.state;
     try {
       const response = await LoginApi.findOneUser({
         username: userLogin,
         password: userPassword,
       });
       addToStorage('api_token',response.data.access_token);
       addToStorage('jobs_api_user_email',response.data.user.email);
       AuthAPI.setToken = response.data.access_token;
         this.props.history.push('/jobs');

     } catch (err) {
       if(err.message === 'Request failed with status code 404') {
         this.setState({
           error:true,
           serverError:false,
         });
       }
       else{
         this.setState({
           serverError:true,
           error:false,
         });
       }

     } finally {
       this.setState({
         loading: false
       });
     }
  }
  componentDidMount(){
     if(getFromStorage('api_token')!==null){
       try{
         jwtDecode(getFromStorage('api_token'));
         // this.props.history.push('/personaloffice');
       }
       catch(err){
       }
     }
  }

  render(){
    const {text} = this.props;
    const {error,serverError} = this.state;
    return (
      <LanguageContext.Consumer>{
        (value) =>
          <div style={{textAlign: "center"}} >
            <Header />
            <Container>
              <Grid centered>
                <Grid.Column computer={5} mobile={16}>
                  <Form className='text-center'>
                    <Form.Field>
                      <Input
                        placeholder={text('username', value.languageValue)}
                        type={'text'}
                        onChange={this.userLogin.bind(this)}/>
                    </Form.Field>
                    <Form.Field>
                      <Input
                        placeholder={text('password', value.languageValue)}
                        type={'password'}
                        onChange={this.userPassword.bind(this)}/>
                    </Form.Field>
                    {error ?
                      <Message negative>
                        <p>{text('invalidLoginOrPwd', value.languageValue)}</p>
                      </Message> : ''
                    }
                    {serverError ?
                      <Message negative>
                        <p>{text('networkError', value.languageValue)}</p>
                      </Message> : ''
                    }
                    <Button
                      onClick={this.submit.bind(this)}
                      className='primary-bg'
                      size='large'
                      disabled={this.state.userLogin==='' || this.state.userPassword==='' }>
                      {text('btnLogin', value.languageValue)}
                    </Button>
                  </Form>
                </Grid.Column>
              </Grid>
            </Container>
          </div>
      }

  </LanguageContext.Consumer>
    )
  }
}
