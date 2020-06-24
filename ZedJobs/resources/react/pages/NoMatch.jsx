import React from "react";
import {Link} from "react-router-dom";

export default class NoMatch extends React.Component{
    render(){
        return(
            <div className="d-flex mt-5 flex-column justify-content-center align-items-center">
                <div className="alert alert-danger" role="alert">
                    <h1>Sorry, the page you are looking for is not available. Go back to </h1>
                </div>
                <Link className="btn btn-warning mt-5 btn-xlg hoverable m-auto" to="home">home?</Link>
            </div>
        );
    }
}

