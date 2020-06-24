import React from "react";
import {Link, Redirect} from 'react-router-dom';
import $ from 'jquery';

//my custom service classes and components
import CaxhHelper from '../services/CaxhHelper';

export default class SignIn extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userName: "",
            password: "",
            isAjaxRunning: false
        }

        this.caxhHelper = new CaxhHelper();
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
    }

    handleSubmit(e){
        this.caxhHelper.preventDefault(e);
        
         let userData = this.state;
        console.log("userData : ");
        console.log(userData);
        //returns an empty array if user doesnt exist
        this.caxhHelper.send(
            userData, 
            "signin", 
            (results) => { 
                results !== [] && results !== "" && results !== null && results !== undefined ?
                this.onSuccess(results) : this.onError(results) 
            },
            (results) => { this.onError(results)} 
        );
    }

    onSuccess(results){
        //when user is signed in
        this.setState({isSignInComplete: true}) 
    }

    onError(results){
        //when user doesnt exist or detales are wrong
        alert("User doesn\'t exist or UserName or passwords must be wrong, please double check");
    }

    handleUserName(e){
        this.caxhHelper.preventDefault(e);
        this.setState({userName: e.currentTarget.value});

    }

    handlePassword(e){
        this.caxhHelper.preventDefault(e);
        this.setState({password: e.currentTarget.value});
    }

    render() {
      return (
         <div className="d-flex flex-column __sign_in_wrapper justify-content-center align-items-center" id="signIn">
             {    //REDIRECTS THE APP WHEN SIGN IN IS COMPLETE
                      this.state.isSignInComplete ? <Redirect push to={{ pathname: "/profile", state: this.state.userName }}/> : "" 
                    }
            <form className="hoverable z-depth-2 p-3 mt-5 __sign_in_form" action="signIn" onSubmit={(e)=> { this.handleSubmit(e) }} method="post">
                <h2>Sign in</h2>
                <div className="form-group">
                    <label htmlFor="userName">Email address or user name</label>
                    <input type="text" onChange={ (e) => { this.handleUserName(e) } } className="form-control" id="userName" aria-describedby="emailHelp" placeholder="Enter email or user name" required></input>
                    <small id="emailHelp" className="form-text text-muted">Please enter your email addres or username to login.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control"  onChange={ (e) => { this.handlePassword(e) } }  id="password" placeholder="Password" required></input>
                    <small id="passwordHelp" className="form-text text-muted">Keep your password secure at all times.</small>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button><br></br>
                <small className="form-text py-3">
                    Please <Link to="signup"><strong title="Sign up for a new account">Sign up</strong></Link> or Sign in as a <Link to="guestAuth"><strong title="Sign in as a Guest">Guest</strong></Link> if you don't have an account.
                </small>
                <small id="passwordHelp" className="form-text text-muted">
                    Note:<br></br>
                    You can choose to create an account or discard your<br></br> informtion at any time durig a guest session.
                </small>
            </form>
         </div>
      );
   }
}
