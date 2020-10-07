/* eslint-disable no-useless-concat */
import React, {Component} from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './../../views/wizard.css';
import {withRouter} from 'react-router-dom';

import WizardContext from './../../helpers/wizardContext';

class MetricsOfSuccess extends Component {
    static contextType = WizardContext;

    state = {
        metricsOfSuccess: [''],
        edit: false
    }

    componentDidMount() {
        const {wizardState} = this.context
        const edit = this.props.location && this.props.location.state ? this.props.location.state.edit : false;
        const {metricsOfSuccess, percentageCompletion} = wizardState;
        this.setState({metricsOfSuccess, edit, percentageCompletion});
        
        
    }

    handleUserDetailsInput = (index, type, e) => {
        e.preventDefault();
        const {metricsOfSuccess} = this.state;
        metricsOfSuccess[index] =  e.target.value;
        this.setState({metricsOfSuccess});
    }

    handleDeleteAction = (index, array) => {
        const reducedArray = array.filter((item, i) => i !== index);
        this.setState({metricsOfSuccess: reducedArray})

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues({...this.state, percentageCompletion: 84.6153});
        this.props.history.push('/wizard/aesthetics');
    }

    handleSubmitEdit = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues(this.state);
        this.props.history.push('/wizard/wizard-review');
    }

    handleBackButton = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues(this.state);
        this.props.history.push('/wizard/features-priority');
    }

    render() {
        const {metricsOfSuccess, percentageCompletion} = this.state;

        return (
            <div style={{overflowY: 'hidden'}} class="row">
                    <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                        <div class="row align-items-center animate__animated animate__fadeInRight wizard-left">
                            <div class="col-xl-12 col-lg-12">
                                <div class='pageTitle' style={{fontSize: '50px', margin: '15px'}}>Metrics of Success</div>
                                <div style={{margin: '15px'}}>List countable measures of effectiveness.</div>
                            </div>
                        </div>
                    </div>

                    <div  class="col-xl-6 col-lg-6 wizard-div">
                            <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp wizard-right">
                                <div class="col-xl-12 col-lg-12">
                                        {metricsOfSuccess.map((eachMetric,index, array) => {
                                            return (
                                                <div style={{width: '100%', marginBottom: '30px'}}>
                                                    <div style={{width: '95%', display: 'inline-block'}}>
                                                        <textarea onInput={(e) =>this.handleUserDetailsInput(index, 'description', e)} style={{padding: '4px', paddingLeft: '8px', fontSize: '15px', minHeight: '70px', border:'0.5px #a1a9e4 solid', overflow: 'auto', color: 'white', background: 'transparent'}} class="wizard-text-area-input" placeholder="e.g the device must generate enough electricity during the duration of the campfire to charge devices enough for the next day." name="metricOfSuccess" value={eachMetric}></textarea>
                                                    </div>
                                                    <div style={{width: '5%', display: 'inline-block'}}>
                                                        <div onClick={() => this.handleDeleteAction(index, array)} style={{width: '2.5%', paddingLeft: '4px', color:'red', display: 'inline-block', cursor: 'pointer'}}><i class="fa fa-trash" aria-hidden="true"></i></div>
                                                    </div>
                                            </div>
                                            )
                                        })}

                                        <div class="col-xl-12 col-lg-12 margin-bottom-40 d-flex justify-content-center">
				                                <button style={{color: '#ffffff', fontSize: '14px', width: '80%', boxShadow: '0 2px 12px rgba( 245, 245, 245,0.12)'}}  onClick={() => this.setState((prevState) =>({metricsOfSuccess: [...prevState.metricsOfSuccess, ''] }))} class="button full-width ripple-effect">Add A Metric Of Success <i class='icon-material-outline-add'></i></button>
                                        </div>
                                </div>

                                <div class="col-xl-12 col-lg-12">
                                    <div style={{ width: '100%', padding: '2%'}}>
                                        <div class="d-flex justify-content-between">
                                            {this.state.edit ? 
                                    <>
                                        <button class="button ripple-effect gray-button "><i class="icon-material-outline-arrow-back"></i>Back</button>
                                        <button onClick={this.handleSubmitEdit} class="button ripple-effect wizard-button">Review<i class="icon-material-outline-arrow-forward"></i></button>
                                    </> : 
                                    <>
                                        <button onClick={this.handleBackButton} class="button ripple-effect wizard-button"><i class="icon-material-outline-arrow-back"></i>Back</button>
                                        <button onClick={this.handleSubmit} class="button ripple-effect wizard-button">Next<i class="icon-material-outline-arrow-forward"></i></button>
                                    </>
                                    }
                                        </div>
                                        { this.state.edit ? null :
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
                </div>
            );
    }
}

export default withRouter(MetricsOfSuccess);