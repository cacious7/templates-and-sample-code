import React from "react";
import {Redirect} from "react-router-dom";

//custom
import CaxhHelper from "../services/CaxhHelper";
import JobForm from "../components/JobForm";

export default class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isNewJobMode: false,
            isIllegalAccess: false,
            firstName: "",
            lastName: "",
            userName: "",
            middleNames: "",
            email: "",
            dateOfBirth: "",
            address1: "",
            address2: "",
            city: "",
            province: "",
            zipCode: "",
            country: ""

        }

        this.caxhHelper = new CaxhHelper();

        this.getUser = this.getUser.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
        this.onError = this.onError.bind(this);
        this.handleNewJob = this.handleNewJob.bind(this);
        this.setIllegalAccess = this.setIllegalAccess.bind(this);
        this.setNewJobMode = this.setNewJobMode.bind(this);
    }

    componentDidMount(){
        this.getUser();
    }

    getUser(){
        //let userName = this.props.location.state.userName;
        
        this.caxhHelper.send(
            {"userName" : ""},
            "getuser",
            (user) => { this.caxhHelper != [] ? this.onSuccess(user) : this.onError(user) },
            (error) => { this.onError(error) }
        );
    }

    onSuccess(user){
        user = user[0];
        console.log("USER data gotten successfully!");
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            middleNames: user.middleNames,
            email: user.email,
            dateOfBirth: user.dateofBirth,
            address1: user.address1,
            address2: user.address2,
            city: user.city,
            province: user.province,
            zipCode: user.zipCode,
            country: user.country

        } );
    }

    handleNewJob(e){
        this.caxhHelper.preventDefault(e);
        console.log("Create New job please!");
        this.setState({ isNewJobMode: true });
    }

    onError(errorData){
        //if user doesnt exist, redirect to signin page
        console.log("Getting USER data failure!");
        this.setState({isIllegalAccess : true});
    }

    setNewJobMode(__bool){
        this.setState({ isNewJobMode: __bool});
    }

    setIllegalAccess(__bool){
        this.setState({ isIllegalAccess: __bool });
    }


    renderJobPostings(){
        return (<div className="my-3 p-3 bg-white rounded box-shadow">
                    <h6 className="border-bottom border-gray pb-2 mb-0">My Jobs Postings</h6>
                    <div className="media text-muted pt-3">
                        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <strong onClick={ (e) => { this.handleNewJob(e) } } className="__new_job d-block text-gray-dark">
                            <span className="text-success">+</span> new job</strong>
                            Post your job opportunity to the masses
                        </p>
                    </div>
                    <div className="media text-muted pt-3">
                        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <strong className="d-block text-success">Job Title</strong>
                            address
                        </p>
                    </div>
                    <div className="media text-muted pt-3">
                        <p className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                            <strong className="d-block text-gray-dark">Job Title</strong>
                            address
                        </p>
                    </div>
                        {/* <small className="d-block text-right mt-3">
                            <a href="#">All updates</a>
                        </small> */}
                        </div>
            );
    }



    renderJobForm(){
        return (<JobForm isNewJobMode= {()=> this.setNewJobMode} />);
    }

    render(){
        return(<div className="__profile_wrapper">
            { //redirect to signin page if user no user is logged in
                this.state.isIllegalAccess ? <Redirect push to="signin"/> : "" 
            }
                <div>
                    <main role="main" className="container py-3">
                        <div className="__name_card_wrapper d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded box-shadow">
                            <img className="mr-3" src="https://getbootstrap.com/assets/brand/bootstrap-outline.svg" alt="" width="48" height="48"></img>
                            <div className="lh-100">
                            <h6 className="mb-0 text-white lh-100">{this.state.firstName + " " + this.state.lastName}</h6>
                            <small>{this.state.email}</small>
                            </div> 
                        
                        </div>

                        { //redirect to signin page if user no user is logged in
                            this.state.isNewJobMode ? this.renderJobForm() : this.renderJobPostings() 
                        }

                        <div className="my-3 p-3 bg-white rounded box-shadow">
                            <h6 className="border-bottom border-gray pb-2 mb-0">About</h6>
                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                    <strong className="text-gray-dark">Full Name</strong>
                                    {/* <a href="#">Follow</a> */}
                                    </div>
                                    <span className="d-block">{`${this.state.firstName} ${this.state.lastName}`}</span>
                                </div>
                            </div>
                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                    <strong className="text-gray-dark">User Name</strong>
                                    {/* <a href="#">Follow</a> */}
                                    </div>
                                    <span className="d-block">{this.state.userName}</span>
                                </div>
                            </div>
                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <strong className="text-gray-dark">Middle Names</strong>
                                        {/* <a href="#">Follow</a> */}
                                        </div>
                                    <span className="d-block">{this.state.middleNames}</span>
                                </div>
                            </div>

                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <strong className="text-gray-dark">Date Of Birth(DOB)</strong>
                                        {/* <a href="#">Follow</a> */}
                                        </div>
                                    <span className="d-block">{this.state.dateOfBirth}</span>
                                </div>
                            </div>

                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <strong className="text-gray-dark">E-mail</strong>
                                        {/* <a href="#">Follow</a> */}
                                        </div>
                                    <span className="d-block">{this.state.email}</span>
                                </div>
                            </div>
                            
                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <strong className="text-gray-dark">Address</strong>
                                        {/* <a href="#">Follow</a> */}
                                        </div>
                                    <span className="d-block">{`${this.state.address1}, ${this.state.address2}`}</span>
                                </div>
                            </div>
                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <strong className="text-gray-dark">Cityp</strong>
                                        {/* <a href="#">Follow</a> */}
                                        </div>
                                    <span className="d-block">{this.state.city}</span>
                                </div>
                            </div>

                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <strong className="text-gray-dark">Province or State</strong>
                                        {/* <a href="#">Follow</a> */}
                                        </div>
                                    <span className="d-block">{this.state.province}</span>
                                </div>
                            </div>

                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <strong className="text-gray-dark">Country</strong>
                                        {/* <a href="#">Follow</a> */}
                                        </div>
                                    <span className="d-block">{this.state.country}</span>
                                </div>
                            </div>

                            <div className="media text-muted pt-3">
                                <div className="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                                    <div className="d-flex justify-content-between align-items-center w-100">
                                        <strong className="text-gray-dark">Zip</strong>
                                        {/* <a href="#">Follow</a> */}
                                        </div>
                                    <span className="d-block">{this.state.zipCode}</span>
                                </div>
                            </div>
                            {/* <small className="d-block text-right mt-3">
                                <a href="#">All suggestions</a>
                            </small> */}
                        </div>
                    </main>
            </div>
    </div>
        );
    }
}

