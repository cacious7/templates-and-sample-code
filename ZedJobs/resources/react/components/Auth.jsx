import React from "react";
import SignIn from './SignIn';

export default class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isAjaxRunning: false
        }

        this.preventDefault = this.preventDefault.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
    }

    preventDefault(e){
        e.preventDefault();
        e.stopPropagation();
        console.log(e.currentTarget.value);
    }

    
    handleSignIn(e){
        this.preventDefault(e);

    }

    handleUserName(e){
        this.preventDefault(e);

    }

    handlePassword(e){
        this.preventDefault(e);

    }

   render() {
      return (<SignIn 
        isAjaxRunning={ this.state.isAjaxRunning }
        handleUserName={ () =>  this.handleUserName.bind(this) }
        handlePassword={ () =>  this.handlePassword.bind(this) }
        handleSignIn={ () => this.handleSignIn.bind(this) }
        />);
   }
}