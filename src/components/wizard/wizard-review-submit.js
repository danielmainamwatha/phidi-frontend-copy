/* eslint-disable no-useless-concat */
import React, {Component} from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {withRouter} from 'react-router-dom';
import ReviewComponent from './../wizard/wizard-job-post-review'; 
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

import 'react-accessible-accordion/dist/fancy-example.css';

import './../../views/wizard.css';

import WizardContext from './../../helpers/wizardContext';

class ReviewAndSubmit extends Component{
    static contextType = WizardContext;

    state = {
        loading: false

    }

    componentDidMount() {
        const {wizardState} = this.context;
        this.setState({...wizardState});
    }

    handleBackButton = () => {
        this.props.history.push('/wizard/project-details')
    }

    handleWizardSubmit = (state) => {
        const { setWizardValues} = this.context;
        const { handleSubmit } = this.props;
        setWizardValues({loading: true})
        handleSubmit(state)
    }
    
    render() {
        const {percentageCompletion} = this.state;

        const { wizardState} = this.context;
        return (
            <div style={{overflowY: 'hidden'}} class="row">
                    <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                        <div style={{height: '100%', position: 'fixed'}}  class="row align-items-center animate__animated animate__fadeInRight">
                            <div class="col-xl-12 col-lg-12">
                                <div class='pageTitle' style={{fontSize: '50px', margin: '15px'}}>Review And Submit</div>
                                <div style={{margin: '15px'}}>Review and submit.</div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xl-6 col-lg-6 wizard-div">
                            <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp">
                                <div class="col-xl-12 col-lg-12">
                                    <ReviewComponent jobPostState={this.state}/>
                                </div>

                                <div className="margin-bottom-40" style={{width: '100%', padding: '2%'}}>
                                    <div class="d-flex justify-content-between">
                                        <button class="button ripple-effect wizard-button"onClick={this.handleBackButton}><i class="icon-material-outline-arrow-back"></i> Back</button>
                                        {wizardState.loading ? 
                                            <button class="button ripple-effect wizard-button"> 
                                                <Loader
                                                type="Puff"
                                                color="#00BFFF"
                                                height={15}
                                                width={15} />
                                            </button>
                                                : 
                                            <button class="button ripple-effect wizard-button" onClick={() => this.handleWizardSubmit(this.state)}>Submit <i class="icon-material-outline-arrow-forward"></i></button>
                                        }
                                    </div>
                                    { this.state.toEdit ? null :
                                            <div style={{marginTop: '60px', padding: '2%'}}>
                                                <Progress percent={Math.floor(percentageCompletion)} 
                                                        theme={
                                                            {
                                                            active: {
                                                                symbol: `${Math.floor(percentageCompletion)}%`,
                                                                trailColor: '#5869ee',
                                                                color: '#ffffff'
                                                            },
                                                            }
                                                        }
                                                    />
                                            </div>
                                    }
                                </div>
                            </div>
                    </div>
                </div>
        );
    }
}

export default withRouter(ReviewAndSubmit);