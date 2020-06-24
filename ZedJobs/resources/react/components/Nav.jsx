import React from "react";
import {Link} from 'react-router-dom';

export default class Nav extends React.Component {
   render() {
      return (
         <div id="navWrapper">
            <nav className="__navbar navbar navbar-dark bg-dark navbar-expand-lg navbar-light ">
                <Link className="navbar-brand" to="#">ZedJobs</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="home">Home <span className="sr-only">(current)</span></Link>
                    </li>
                    <Link className="nav-link" to="jobs">Jobs</Link>
                    <li className="nav-item dropdown">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        My Account
                        </Link>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <Link className="dropdown-item" to="notifications">Notifications</Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="profile">Profile</Link>
                            <Link className="dropdown-item" to="messages">Messages</Link>
                            <Link className="dropdown-item" to="organizations">Organizations</Link>
                            <Link className="dropdown-item" to="files">Files</Link>
                            <Link className="dropdown-item" to="settings">Settings</Link>
                        </div>
                    </li>
                    </ul>
                    <form className="form-inline my-2 my-lg-0" action="#" method="get" id="navbarSearch">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
                </nav>
         </div>
      );
   }
}

