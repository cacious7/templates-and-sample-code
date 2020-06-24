import React from 'react';

import Card from './Card';
import $ from 'jquery';

export default class JobCard extends React.Component{
    
    constructor(props){
        super(props);

        //isAjaxDone starts from true because no request is running then
        this.state = {
            rawJobs: [],
            parsedJobs:[]            
        };
    
        this.getJobs = this.getJobs.bind(this);
        this.jobRequest = this.jobRequest.bind(this);
        this.parseJobs = this.parseJobs.bind(this);
    }

    componentDidMount(){
        //get the jobs and update their state
        this.getJobs();
    }

    getJobs(){
        //if ajax is running, there there is a duplicate request made
        //restrict any oncomming dulicate requests until this one is done
        //Since setState is an asynchronous function, we use isAjaxRunning which is set before body element
        //so it never changes by re-rendering
        if(isAjaxRunning === false){
            console.log("GETJOBS:: Is Ajax running ? " + isAjaxRunning);
            //set the isAjaxRunning flag to control ajax requests
            isAjaxRunning = true;
            this.jobRequest();

         }else{
             //this.state.isAjaxRunning == true
            console.log("A Duplicate ajax request has been successfully stopped.");
        
        }
    }

    jobRequest(){
       
        //auth Function
        $.ajax({
            type: "GET",
            url: "getjobs",
            dataType: "json",
            success: (data) => {
                console.log("SUCCESS: request was a success");
                console.log(data);

                //upon success, parse the jobs and update their array list in this.state
                //so as to force a re-render and view the jobs
                const parsedJobs = this.parseJobs(data);

                //if parsed jobs and raw jobs have already been set, dont set them again
                //to prevent duplicate data
                //SINCE WE CANT STOP MULTIPLE RE-RENDERS AND CONSEQUENTLY REQUESTS YET 
                    this.setState({parsedJobs : parsedJobs});

                //when the first request is successfull, other requests can run 
                //this is to prevent duplicate requests and data
                isAjaxRunning = false;
            },
            error: (error) => {
                console.log("ERROR: request was a failure");
                alert("The request for jobs failed, the server might be down, try again soon.");
                console.log(error);

            }
        });

       
    }

    parseJobs(rawJobs){
        //parse cards to a list for more convinient displaying
        rawJobs = rawJobs;
        var jobCards = jQuery.map(rawJobs, (rawJobData) => {
           return <Card key={rawJobData.id} rawJobData={rawJobData}/>
        });

        //return the parsed cards for rendering/displaying
        return jobCards;
    }

    renderJobs(){
        return (<div className="__job_card_wrapper py-3" id="__job_card_wrapper">
      			{this.state.parsedJobs.reverse()}
                </div>);
    }

    renderLoading(){
        return (<h5 className="text-muted">Loading...</h5>);
    }
    

    render(){
        return( this.state.parsedJobs.length > 0 ? this.renderJobs() : this.renderLoading() );
    }
}