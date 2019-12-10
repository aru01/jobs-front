import React, {Component} from 'react';
import {Image, Dropdown, Container} from 'semantic-ui-react';
import './header.scss'
import LanguageContext from "../../context/LanguageContext";
import {NavLink, withRouter} from "react-router-dom";


class Header extends Component {
  render() {

    return (
      <div className='header-form' forceInset={{ bottom: 'never' }}>
        <Container>
          <div className='header-container d-flex justify-space-between align-items-center'>
            <NavLink to="/">
              <Image className='logo-header' src={logo}/>
            </NavLink>
            <LanguageContext.Consumer>
              {context =>
                <Dropdown text={context.languageValue}>
                  <Dropdown.Menu>
                    <Dropdown.Item text='РУ' onClick={() => {context.setLanguageValue('RU', 'fromSelect'); }}/>
                    <Dropdown.Item text='КК' onClick={() => {context.setLanguageValue('KK', 'fromSelect'); }}/>
                    <Dropdown.Item text='EN' onClick={() => {context.setLanguageValue('EN', 'fromSelect'); }}/>
                  </Dropdown.Menu>
                </Dropdown>
              }
            </LanguageContext.Consumer>
          </div>
        </Container>
      </div>
    );
  }
}

export default Header;
