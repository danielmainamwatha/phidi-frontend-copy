/* eslint-disable no-useless-concat */
import React, {Component} from 'react';
import "react-sweet-progress/lib/style.css";
import './../../views/wizard.css';
import {Timeline, TimelineEvent} from 'react-event-timeline'
import {withRouter} from 'react-router-dom';

class KeyFeatures extends Component {

    
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/wizard/objective');
    }

    render() {
        return (
            <div style={{overflowY: 'hidden'}} class="row">
                    <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                        <div style={{height: '100%', position: 'fixed'}} class="row align-items-center animate__animated animate__fadeInRight">
                            <div class="col-xl-12 col-lg-12">
                                <div style={{fontSize: '50px', margin: '15px'}}>Welcome</div>
                                <div style={{margin: '15px'}}>Lets get you started - ( Save + Exit at any time )</div>
                            </div>
                        </div>
                    </div>

                    <div style={{paddingTop: '50px'}} class="col-xl-6 col-lg-6 wizard-div">
                            <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp">
                                <div class="col-xl-12 col-lg-12">

                                <div class="col-xl-12 col-lg-12 margin-bottom-40 d-flex justify-content-center">
                                            <div style={{color: 'white'}}>
                                                <h4 style={{color: 'white'}}><u>THE WIZARD</u></h4>
                                            </div>
                                        </div>

                                        <div class="col-xl-12 col-lg-12 margin-bottom-40 d-flex justify-content-center">
                                            {/* timeline here  */}

                                            <Timeline orientation={'left'}>
                                                <TimelineEvent
                                                            title="Welcome"
                                                            style={{color: 'white', paddingBottom: '10px'}}
                                                            icon={<i style={{color: '#2a41e8'}} className="material-icons md-18">check</i>}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                    title="Objective"
                                                    style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                            title="Users"
                                                            style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                    title="User Needs"
                                                    style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                            title="Features"
                                                            style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                    title="Rank Features"
                                                    style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                            title="Metrics Of Success"
                                                            style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                    title="Form And Fit"
                                                    style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                    title="Project Details"
                                                    style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                    title="Project Details Continued"
                                                    style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                                <TimelineEvent
                                                    title="Review And Submit"
                                                    style={{color: 'white', paddingBottom: '10px'}}
                                                >
                                                </TimelineEvent>
                                        </Timeline>
                                        </div>
                                        <div class="col-xl-12 col-lg-12 margin-bottom-40 d-flex justify-content-center">
                                            <div style={{color: 'white'}}>* A service fee of $25 is collected to help connect your project with potential designers.
                                                This post will remain active for 30 days. Renewal is available. Expired posts will 
                                                remain viewable by author.
                                            </div>
                                        </div>
                                </div>

                                <div class="col-xl-12 col-lg-12">
                                    <div style={{ width: '100%', padding: '2%'}}>
                                        <div class="d-flex justify-content-between">
                                                <>
                                                    <button style={{visibility: 'hidden'}} class="button ripple-effect gray-button "><i class="icon-material-outline-arrow-back"></i>Back</button>
                                                    <button onClick={this.handleSubmit} class="button ripple-effect wizard-button">Next<i class="icon-material-outline-arrow-forward"></i></button>
                                                </> 
                                        </div>
                                    </div>
                                </div>

                            </div>
                    </div>
                </div>
            );
    }
}

export default withRouter(KeyFeatures);