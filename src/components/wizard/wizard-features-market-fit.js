/* eslint-disable no-useless-concat */
import React, {Component} from 'react';
import { Progress } from 'react-sweet-progress';
import {withRouter} from 'react-router-dom';
import "react-sweet-progress/lib/style.css";
import './../../views/wizard.css';
import WizardContext from './../../helpers/wizardContext';

class KeyFeaturesMarketFit extends Component {
    static contextType = WizardContext;  

    state = {
        features: [{name: '', description: ''}],
    }

    componentDidMount() {
        const {wizardState} = this.context
        const {features, percentageCompletion} = wizardState;
        this.setState({features: features, percentageCompletion});
    }

    handleFeaturesPurposeInput = (index, e) => {
        e.preventDefault();
            const {features} = this.state;
            const activeFeature = features[index]
            features[index] = {name: activeFeature.name, description: activeFeature.description, rationale: activeFeature.rationale, userPain: e.target.value}
            this.setState({features})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues({...this.state, percentageCompletion: 76.923 } );
        this.props.history.push('/wizard/metrics-of-success');
    }

    handleBackButton = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues(this.state);
        this.props.history.push('/wizard/features-purpose');
    }

    render() {
        const {features, percentageCompletion} = this.state;

        return (
            <div style={{overflowY: 'hidden'}} class="row">
                    <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                        <div style={{height: '100%', position: 'fixed'}} class="row align-items-center animate__animated animate__fadeInRight">
                            <div class="col-xl-12 col-lg-12">
                                <div class='pageTitle'  style={{fontSize: '50px', margin: '15px'}}>Features Market Fit</div>
                                <div style={{margin: '15px'}}>Describe how each feature addresses a user pain. </div>
                            </div>
                        </div>
                    </div>

                    <div style={{paddingTop: '100px'}} class="col-xl-6 col-lg-6 wizard-div">
                            <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp">
                                <div class="col-xl-12 col-lg-12">
                                        {features.map((eachFeature,index, array) => {
                                            return (
                                                <div style={{width: '100%', marginBottom: '30px'}}>
                                                    <div style={{width: '100%', display: 'inline-block'}}>
                                                        <div style={{padding: '4px', paddingLeft: '8px', fontSize: '18px', minHeight: '40px', marginBottom:'3px', color: 'white', 
                                                            background: 'transparent'}} class="wizard-text-area-input">{eachFeature.name}</div>
                                                        <textarea onInput={(e) =>this.handleFeaturesPurposeInput(index, e)} style={{padding: '4px', paddingLeft: '8px', 
                                                            fontSize: '15px', minHeight: '70px', border:'0.5px #a1a9e4 solid', overflow: 'auto', color: 'white', background: 'transparent'}} 
                                                            class="wizard-text-area-input" placeholder="Feature userPain" name="userPain" defaultValue={eachFeature.userPain}></textarea>
                                                    </div>
                                            </div>
                                            )
                                        })}
                                </div>

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

export default withRouter(KeyFeaturesMarketFit);