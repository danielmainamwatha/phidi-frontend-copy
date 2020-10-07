/* eslint-disable no-useless-concat */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './../../views/wizard.css';
import { ReactSortable} from "react-sortablejs";
import {withRouter} from 'react-router-dom';
import WizardContext from './../../helpers/wizardContext';

class FeaturesPriority extends Component {
    static contextType = WizardContext;  

    state = {
        features: [{name: '', description: ''}],
    }

    componentDidMount() {
        const {wizardState} = this.context
        const {features, percentageCompletion} = wizardState;
        this.setState({features: features, percentageCompletion});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues({...this.state, percentageCompletion: 61.5384});
        this.props.history.push('/wizard/metrics-of-success');
    }

    handleBackButton = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues(this.state);
        this.props.history.push('/wizard/key-features');
    }

    render() {
        const {features, percentageCompletion} = this.state;

        return (
            <div style={{overflowY: 'hidden'}} class="row">
                    <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                        <div style={{height: '100%', position: 'fixed'}} class="row align-items-center animate__animated animate__fadeInRight">
                            <div class="col-xl-12 col-lg-12">
                                <div style={{fontSize: '50px', margin: '15px'}}>Rank Features</div>
                                <div style={{margin: '15px'}}>Click and Drag to rank each key feature according to importance</div>
                            </div>
                        </div>
                    </div>

                    <div style={{paddingTop: '100px'}} class="col-xl-6 col-lg-6 wizard-div">
                            <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp">
                                {features.length > 0 ? 
                                <div class="col-xl-12 col-lg-12">
                                    <div class="dashboard-box margin-top-0 rankItemsListContainer">
                                        <div class="content">
                                            <ul class="dashboard-box-list rankItemsListContainer">      
                                                <ReactSortable list={features} setList={(list) => this.setState({features: list})}>
                                                    {features.map((eachFeature,index, array) => {
                                                        return (
                                                            <li key={index} style={{background: '#FFFFFF', marginBottom: '3px', borderRadius: '5px'}}>
                                                                <div style={{padding: '10px'}} class="job-listing">
                                                                    <div class="job-listing-details">
                                                                        <div class="job-listing-description">
                                                                            <span class="drag-icon">
                                                                                <i class="fa fa-th"></i>
                                                                            </span>
                                                                            <h4 style={{fontWeight: '600'}} class="job-listing-title">{index+1}. {eachFeature.name}</h4>
                                                                            <div class="job-listing-footer">
                                                                                <span>{eachFeature.description}</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                    
                                                        )
                                                    })}
                                                    </ReactSortable>
                                            </ul> 
                                        </div> 
                                    </div>
                                </div>
                                    : 
                                <div class="col-xl-12 col-lg-12 d-flex justify-content-center">
                                    <div style={{color: '#ffffff'}}>No Features added yet.</div>
                                </div>
                            }

                                <div class="col-xl-12 col-lg-12">
                                    <div style={{ width: '100%', padding: '2%'}}>
                                        <div class="d-flex justify-content-between">
                                            <button class="button ripple-effect wizard-button" onClick={this.handleBackButton}><i class="icon-material-outline-arrow-back"></i>Back</button>
                                            <button class="button ripple-effect wizard-button" onClick={this.handleSubmit}>Next<i class="icon-material-outline-arrow-forward"></i></button>
                                        </div>
                                        <div style={{marginTop: '60px', padding: '2%'}}>
                                        <Progress percent={Math.floor(percentageCompletion)} 
                                                theme={
                                                    {
                                                    active: {
                                                        symbol: `${Math.floor(percentageCompletion)}` + '%',
                                                        trailColor: '#5869ee',
                                                        color: '#ffffff'
                                                    },
                                                    }
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                            </div>
                    </div>
                </div>
            );
    }
}

export default withRouter(FeaturesPriority);