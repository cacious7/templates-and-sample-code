import React from 'react';

// template of a card with fillable details
export default class Card extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            job : props.rawJobData
        }
    }

    render(){
        let job = this.state.job;
        return(
            <div className = "d-flex flex-column m-3 __card_wrapper justify-content-center align-items-center" id="__card_wrapper">
                <div className="__card card col-md-6 p-0">
                    <div className="card-header">
                        Job Poster
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{job.title}</h5>
                        <p className="card-text">{job.intro}</p>
                        <a href="#" className="btn btn-primary">LEARN MORE</a>
                    </div>
                </div>
            </div>
        );
    }
}