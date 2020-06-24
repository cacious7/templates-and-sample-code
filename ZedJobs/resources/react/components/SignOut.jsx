import React from "react";
import {Link} from 'react-router-dom';

export default class SignOut extends React.Component {
   render() {
      return (
        <div className="d-flex mt-5 flex-column justify-content-center align-items-center">
            <div class="alert alert-success" role="alert">
                <h1>You have successfully Signed out. Should we redirect you to </h1>
            </div>
            <Link className="btn btn-warning mt-5 btn-xl hoverable m-auto" to="home">home?</Link>
        </div>
      );
   }
}
