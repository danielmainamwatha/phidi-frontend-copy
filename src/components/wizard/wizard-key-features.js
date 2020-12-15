/* eslint-disable no-useless-concat */
import React, {Component} from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './../../views/wizard.css';
import {withRouter} from 'react-router-dom';

import WizardContext from './../../helpers/wizardContext';

class KeyFeatures extends Component {
    static contextType = WizardContext;  

    state = {
        features: [{name: '', description: ''}],
        edit: false
    }

    componentDidMount() {
        const {wizardState} = this.context
        const edit = this.props.location && this.props.location.state ? this.props.location.state.edit : false;
        const {features, percentageCompletion} = wizardState;
        this.setState({features: features, edit, percentageCompletion});
    }

    handleUserDetailsInput = (index, type, e) => {
        e.preventDefault();

        if (type === 'name') {
            const {features} = this.state;
            const activeUser = features[index]
            features[index] = {name: e.target.value, description: activeUser.description}
            this.setState({features})

        } else if (type === 'description') {
            const {features} = this.state;
            const activeUser = features[index]
            features[index] = {name: activeUser.name, description: e.target.value}
            this.setState({features})
        }
    }

    handleDeleteAction = (index, array) => {
        const reducedArray = array.filter((item, i) => i !== index);
        this.setState({features: reducedArray})

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues({...this.state, percentageCompletion: 30.77});
        this.props.history.push('/wizard/features-priority');
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
        setWizardValues({...this.state, percentageCompletion: 23.7769});
        this.props.history.push('/wizard/user-pain-points');
    }

    render() {
        const {features, percentageCompletion} = this.state;

        return (
            <div style={{overflowY: 'hidden'}} class="row">
                    <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                        <div style={{height: '100%', position: 'fixed'}} class="row align-items-center animate__animated animate__fadeInRight">
                            <div class="col-xl-12 col-lg-12">
                                <div style={{fontSize: '50px', margin: '15px'}}>Features</div>
                                <div style={{margin: '15px'}}>List your product’s key features, with a brief description of each.</div>
                            </div>
                        </div>
                    </div>

                    <div style={{paddingTop: '100px'}} class="col-xl-6 col-lg-6 wizard-div">
                            <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp">
                                <div class="col-xl-12 col-lg-12">
                                        {features.map((eachFeature,index, array) => {
                                            return (
                                                <div className="animate__animated animate__fadeInUp" style={{width: '100%', marginBottom: '20px'}}>
                                                    <div style={{width: '95%', display: 'inline-block'}}>
                                                        <span class="input-keyword">Feature name</span>
                                                        <input onInput={(e) => this.handleUserDetailsInput(index, 'name', e)} style={{padding: '4px', paddingLeft: '8px', fontSize: '15px', height: '40px', border:'0.5px #a1a9e4 solid', marginBottom:'10px', color: 'white', background: 'transparent'}} class="wizard-text-area-input" placeholder="e.g fire containment mat" name="name" value={eachFeature.name}></input>
                                                        <span class="input-keyword">Feature description</span>
                                                        <textarea onInput={(e) =>this.handleUserDetailsInput(index, 'description', e)} style={{padding: '4px', paddingLeft: '8px', fontSize: '15px', minHeight: '70px', border:'0.5px #a1a9e4 solid', overflow: 'auto', color: 'white', background: 'transparent'}} class="wizard-text-area-input" placeholder="e.g the mat is composed of several linked seeback generators to allow folding for portability the mat also has auto inflating fire barrier" name="description" value={eachFeature.description}></textarea>
                                                    </div>
                                                    <div onClick={() => this.handleDeleteAction(index, array)} style={{width: '2.5%', paddingLeft: '4px', color:'red', display: 'inline-block', cursor: 'pointer'}}><i class="fa fa-trash" aria-hidden="true"></i></div>
                                            </div>
                                            )
                                        })}

                                        <div class="col-xl-12 col-lg-12 margin-bottom-40 d-flex justify-content-center">
				                                <button onClick={() => this.setState((prevState) =>({features: [...prevState.features, {name: '', description: ''}] }))} style={{color: '#ffffff', fontSize: '14px', width: '80%', boxShadow: '0 2px 12px rgba( 245, 245, 245,0.12)'}} class="button full-width ripple-effect">Add Feature <i class='icon-material-outline-add'></i></button>
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

export default withRouter(KeyFeatures);