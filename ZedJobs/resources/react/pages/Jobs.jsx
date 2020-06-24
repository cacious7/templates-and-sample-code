import React from "react";

//components
import JobCard from '../components/JobCard';

export default class Jobs extends React.Component{
    render(){
        return(
            <div className="__jobs_wrapper" id="__jobs_wrapper">
                <h1 className="__jobs_page_title px-4">Jobs</h1>
                <JobCard/>
            </div>
        );
    }
}

