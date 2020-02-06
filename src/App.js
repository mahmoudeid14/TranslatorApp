import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@progress/kendo-theme-default/dist/all.css';
import { connect } from 'react-redux';
import HeaderComponent from './components/HeaderComponent';
import LoginComponent from './components/LoginComponent';
import TranslatorComponent from './components/TranslatorComponent';
import UserTranslationsComponent from './components/UserTranslationsComponent';

class App extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    let LoginComp;
    let TranslatorComp;
    let UserTranslationsComp;
    if (!this.props.currentUser.isLogin) {
      LoginComp = <LoginComponent />;
    }
    if (this.props.currentUser.isLogin) {
      TranslatorComp = <TranslatorComponent />;
      UserTranslationsComp = <UserTranslationsComponent />;
    }
    return (
      <div className="App">
        <HeaderComponent />
        <div className="container">
          {LoginComp}
          {TranslatorComp}
          {UserTranslationsComp}
        </div>
      </div>
    );
  }

}


const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  }
}
export default connect(mapStateToProps)(App)

