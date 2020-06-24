import React from "react";
import {Link, Redirect, Route} from "react-router-dom";
import $ from "jquery";

export default class SignUp extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
                        userName: "",
                        firstName: "",
                        middleName: "",
                        lastName: "",
                        dateOfBirth: "",
                        email: "",
                        password: "",
                        address1: "",
                        address2: "",
                        city: "",
                        province: "",
                        country: "",
                        zipCode: "",
                        isAjaxOn: false,
                        isSignUpComplete: false,
                    }; 

        //bind all function in order to restrict their "this" object to always refer to their origin class
        //to avoid referencing a different object inside another class.
        //this however restricts the value of this within the functions only
        this.handleUserName = this.handleUserName.bind(this);
        this.handleAddress1 = this.handleAddress1.bind(this);
        this.handleAddress2 = this.handleAddress2.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleDateOfBirth = this.handleDateOfBirth.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handleFistName = this.handleFirstName.bind(this);
        this.handleLastName = this.handleLastName.bind(this);
        this.handleMiddleName = this.handleMiddleName.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleProvince = this.handleProvince.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserName = this.handleUserName.bind(this);
        this.handleZipCode = this.handleZipCode.bind(this);
        this.preventDefault = this.preventDefault.bind(this);
        
    }

    //Functions

    preventDefault(e){
        e.preventDefault();
        e.stopPropagation();
        console.log("Sign Up form submitted");
        console.log("is default prevented? " + e.isDefaultPrevented() + ",   is propagation stopped? " + e.isPropagationStopped());

    }

    // Sync Form Values
    handleUserName(e){

        //sync the state value with the form value upon user input
        // '...' is the spread operator returns all the properties and values of a list data structure
        this.setState({  userName: e.currentTarget.value });
        console.log(e.currentTarget.value);

    }
    
    handleFirstName(e){

        //sync the state value with the form value upon user input
        this.setState({  firstName: e.currentTarget.value });
        console.log(e.currentTarget.value);

    }
    
    handleLastName(e){

        //sync the state value with the form value upon user input
        this.setState({  lastName: e.currentTarget.value });
        console.log(e.currentTarget.value);

    }
    
    handleMiddleName(e){

        //sync the state value with the form value upon user input
        this.setState({  middleName: e.currentTarget.value });
        console.log(e.currentTarget.value);

    }
    
    handleDateOfBirth(e){

        //sync the state value with the form value upon user input
        this.setState({  dateOfBirth: e.currentTarget.value });
        
        console.log(e.currentTarget.value);

    }
    
    handleEmail(e){

        //sync the state value with the form value upon user input
        this.setState({  email: e.currentTarget.value });
        console.log(e.currentTarget.value);

    }
    
    handlePassword(e){

        //sync the state value with the form value upon user input
        this.setState({  password: e.currentTarget.value });
        console.log(e.currentTarget.value);
    }
    
    handleAddress1(e){

        //sync the state value with the form value upon user input
        this.setState({  address1: e.currentTarget.value });
        console.log(e.currentTarget.value);

    }
    
    handleAddress2(e){

        //sync the state value with the form value upon user input
        this.setState({  address2: e.currentTarget.value });
        console.log(e.currentTarget.value);

    }

    handleCity(e){

        //sync the state value with the form value upon user input
        this.setState({  city: e.currentTarget.value });
        console.log(e.currentTarget.value);
    }

    handleProvince(e){

        //sync the state value with the form value upon user input
        this.setState({  province: e.currentTarget.value });
        console.log(e.currentTarget.value);

    }

    handleZipCode(e){

        //sync the state value with the form value upon user input
        this.setState({  zipCode: e.currentTarget.value });
        console.log(e.currentTarget.value);

    }

    handleSubmit(e){
        this.preventDefault(e);
        let userData = this.state;
        console.log("userData : ");
        console.log(userData);

        //prevent duplicate requests
        if(this.state.isAjaxOn) {
            console.Error("Duplicate ajax sign up request prevented");

            this.setState({isAjaxOn: true});
            return;
        }

        //auth Function
        $.ajax({
            type: "POST",
            url: "signup",
            data: userData,
            dataType: "json",
            success: (data) => {
                console.log("data has been recieved!!!!");
                console.log(data);
                //update trackers to prevent duplicate requests and allow redirecting of the page
                //by rendering <redirect></redirect> element
                this.setState({isAjaxOn: false, isSignUpComplete: true});

                if(data.status){
                    history.pushState(null,"/jobs");
                }
            },
            error: (error) => {

                if(error.statusText == "OK" && error.status == 200){
                    //sometimes, successfull request lands here for uknown purposes
                    //so if successfull, we redirect to the correct place
                    alert("Success on Sign UP");
                    console.log("success on Sign UP");
                    console.log("=== " +JSON.stringify(error));
                    this.setState({isAjaxOn: false, isSignUpComplete: true});
                }else{
                    alert("Error on Sign Up")
                    console.log("Error on Sign Up");
                    console.log("=== " +JSON.stringify(error));

                    this.setState({isAjaxOn: false, isSignUpComplete: true});
                }
            }
        });

    }
    
    render() {
        return (
            <div className="d-flex flex-column __sign_up_wrapper justify-content-center align-items-center" id="signUp">

                 {    //REDIRECTS THE APP WHEN SIGN UP IS COMPLETE
                      this.state.isSignUpComplete ? <Redirect push to="/jobs"/> : "" 
                    }

                <form className="hoverable z-depth-2 p-3 mt-5 __sign_up_form" onSubmit={ (e) => { this.handleSubmit(e); } }>
                    <h2>Sign up</h2>
                    <small id="requireFieldsHelp" className="form-text my-3 text-muted">
                        <span className="text-warning">Note:</span> Fields marked with <span className="__required text-danger">' * ' </span> are required!
                    </small>
                    <div className="form-group">
                        <label htmlFor="inputUserName">User Name</label>
                        <input type="text"  onChange={ (e) => { this.handleUserName(e) } } className="form-control" id="inputAddress" placeholder="Enter your user name here..."></input>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputFirstName"><span className="__required text-danger">* </span>First Name</label>
                            <input type="text" onChange={ (e) => { this.handleFirstName(e) } } className="form-control" id="inputFirstName" placeholder="Your first name" required></input>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputLastName"><span className="__required text-danger">* </span>Last Name</label>
                            <input type="text" onChange={ (e) => { this.handleLastName(e) } } className="form-control" id="inputLastName" placeholder="Your last name" required></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputMiddleName">Middle Name(s)</label>
                            <input type="text" onChange={ (e) => { this.handleMiddleName(e) } } className="form-control" id="inputMiddleName" placeholder="YourFirstMiddleName, yourSecondMiddleName, ..." required></input>
                            <small id="middleNameHelp" className="form-text text-muted">Seperate you middle names with a comma. Eg. caious, other-name, anotherName</small>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputDateOfBirth"><span className="__required text-danger">* </span>Date of birth(DOB)</label>
                            <input type="date" onChange={ (e) => { this.handleDateOfBirth(e) } } className="form-control" id="inputDateOfBirth" required></input>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4"><span className="__required text-danger">* </span>Email</label>
                        <input type="email" onChange={ (e) => { this.handleEmail(e) } } className="form-control" id="inputEmail4" placeholder="Email" required></input>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="inputPassword"><span className="__required text-danger">* </span>Password</label>
                        <input type="password" onChange={ (e) => { this.handlePassword(e) } } className="form-control" id="inputPassword" placeholder="Password" required></input>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress1">Address 1</label>
                        <input type="text" onChange={ (e) => { this.handleAddress1(e) } } className="form-control" id="inputAddress1" placeholder="1234 Main St"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Address 2</label>
                        <input type="text" onChange={ (e) => { this.handleAddress2(e) } }  className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"></input>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input type="text" onChange={ (e) => { this.handleCity(e) } } className="form-control" id="inputCity" placeholder="Monze"></input>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="inputProvince">Province/State</label>
                        <select id="inputProvince" onChange={ (e) => { this.handleProvince(e) } }  className="form-control">
                            <option selected>Select..</option>
                            <option>Central province</option>
                            <option>Copperbelt province</option>
                            <option>Eastern province</option>
                            <option>Luapula province</option>
                            <option>Lusaka province</option>
                            <option>Muchinga province</option>
                            <option>Northern province</option>
                            <option>North-Western province</option>
                            <option>Southern province</option>
                            <option>Western province</option>
                        </select>
                        </div>
                        <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input type="text" value={this.state.zipCode} onChange={ (e) => { this.handleZipCode(e) } }  className="form-control" id="inputZip" placeholder="10101"></input>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button><br></br>
                    <small className="form-text py-3">
                        Please <Link to="signin"><strong title="Sign in with an existing account">Sign in</strong></Link> with an existing account or Sign in as a <Link to="guestAuth"><strong title="Sign in as a Guest">Guest</strong></Link> if you don't want to register right now.
                    </small>
                </form>
            </div>
        );
    }
}
