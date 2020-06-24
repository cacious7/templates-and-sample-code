import React from "react";
import SignIn from './SignIn';
import CaxhHelper from '../services/CaxhHelper';
import {Redirect} from 'react-router-dom';

export default class Auth extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isIllegalAccess: false,
            isNewJobMode: true
        }

        //caxhHelper 
        this.caxhHelper = new CaxhHelper();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTitle = this.handleTitle.bind(this);
        this.handleIntro = this.handleIntro.bind(this);
        this.handleDescription = this.handleDescription.bind(this);
        this.handleAddress1 = this.handleAddress1.bind(this);
        this.handleAddress2 = this.handleAddress2.bind(this);
        this.handleCity = this.handleCity.bind(this);
        this.handleProvince = this.handleProvince.bind(this);
        this.handleCountry = this.handleCountry.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.parseText = this.parseText.bind(this);
    }

    parseText(text){
        // this preocess should happen exactly twice in order to remove the signle and double quotes
        text = text.replace(/"/gi, "");
        text = text.replace(/'/gi, "");
        text = text.replace(/'/gi, "");
        text = text.replace(/"/gi, "");
    console.log("parsed text =" + text);
    }

    handleSubmit(e){
        this.caxhHelper.preventDefault(e);

        //returns an empty array if user doesnt exist
        this.caxhHelper.send(
            this.state, 
            "newjob", 
            (results) => { 
                results !== [] && results !== "" && results !== null && results !== undefined ?
                this.onSuccess(results) : this.onError(results) 
            },
            (results) => { this.onError(results)} 
        );

    }

    onSuccess(data){
        console.log("Success on job creation");
        alert("Successfully posted the job");
        this.setState({ isNewJobMode: true});
        if(data[0].status === "illegalAccess"){
            //this.setState({isIllegalAccess: true});
            this.setState({ isIllegalAccess: true});
            console.log("illegal access to profile page, please sign in");
            alert("llegal access to profile page, please sign in");
        }

    }

    onError(error){
        console.log("Failure on job creation");
    }

    handleTitle(e){
        this.caxhHelper.preventDefault(e);
        //this.setState({ title: e.currentTarget.value });
        this.setState({ title: e.currentTarget.value });
    }

    handleIntro(e){
        this.caxhHelper.preventDefault(e);
        this.setState({ intro: e.currentTarget.value });
    }

    handleDescription(e){
        this.caxhHelper.preventDefault(e);
        this.setState({ description: e.currentTarget.value });
    }

    handleAddress1(e){
        this.caxhHelper.preventDefault(e);
        this.setState({ address1: e.currentTarget.value });
    }

    handleAddress2(e){
        this.caxhHelper.preventDefault(e);
        this.setState({ address2: e.currentTarget.value });
    }

    handleCity(e){
        this.caxhHelper.preventDefault(e);
        this.setState({ city: e.currentTarget.value });
    }

    handleProvince(e){
        this.caxhHelper.preventDefault(e);
        this.setState({ province: e.currentTarget.value });
    }

    handleCountry(e){
        this.caxhHelper.preventDefault(e);
        this.setState({ country: e.currentTarget.value });
    }

    handleZipCode(e){
        this.caxhHelper.preventDefault(e);
        this.setState({ zipCode: e.currentTarget.value });
    }

   render() {
      return (<div className="d-flex flex-column __job_form_wrapper justify-content-center align-items-center" id="jobForm">
                {/*  Redirect page if accessed illegally and no user is signed in      */
                    this.isIllgalAccess ? <Redirect push to="signin"/> : ""
                }

                <form className="container z-depth-2 p-3 mt-3 mb-1 __new_job_form" onSubmit={ (e) => { this.handleSubmit(e); } }>
                    <h2>New Job</h2>
                    <small id="requireFieldsHelp" className="form-text my-3 text-muted">
                        <span className="text-warning">Note:</span> All fields are required!
                    </small>
                    <div className="form-group">
                        <label htmlFor="jobTitle">Job Title</label>
                        <input type="text"  onChange={ (e) => { this.handleTitle(e) } } className="form-control" id="jobTitle" placeholder="Enter your the job title here..." required></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="jobIntro">Job Intro</label>
                        <textarea className="form-control" onChange={ (e) => { this.handleIntro(e) } } id="jobIntro" rows="2" required></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="jobIntro">Job Description</label>
                        <textarea className="form-control" onChange={ (e) => { this.handleDescription(e) } } id="jobIntro" rows="6" required></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="Address1">Job Address 1</label>
                        <input type="text" onChange={ (e) => { this.handleAddress1(e) } } className="form-control" id="Address1" placeholder="1234 Main St" required></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Address2">Job Address 2</label>
                        <input type="text" onChange={ (e) => { this.handleAddress2(e) } }  className="form-control" id="Address2" placeholder="Apartment, studio, or floor" required></input>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="City">Job City</label>
                        <input type="text" onChange={ (e) => { this.handleCity(e) } } className="form-control" id="City" placeholder="Monze" required></input>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="Province">Job Province/State</label>
                        <select id="Province" onChange={ (e) => { this.handleProvince(e) } }  className="form-control" required>
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

                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <input type="text" onChange={ (e) => { this.handleCountry(e) } } className="form-control" id="Address1" placeholder="Zambia" required></input>
                        </div>

                        <div className="form-group col-md-2">
                            <label htmlFor="Zip">Job Zip</label>
                            <input type="text" onChange={ (e) => { this.handleZipCode(e) } }  className="form-control" id="iZip" placeholder="10101" required></input>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Post Job</button><br></br>
                </form>
            </div>);
   }
}