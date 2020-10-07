/* eslint-disable no-useless-concat */
import React, {Component} from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './../../views/wizard.css';
import {withRouter} from 'react-router-dom';

import WizardContext from './../../helpers/wizardContext';

class KeyFeaturesPurpose extends Component {
    static contextType = WizardContext;  

    state = {
        users: [{name: '', description: ''}],
    }

    componentDidMount() {
        const {wizardState} = this.context
        const {users, percentageCompletion} = wizardState;
        this.setState({users: users, percentageCompletion});
        
    }

    handleusersPainPointsInput = (index, e) => {
        e.preventDefault();
            const {users} = this.state;
            const activeUser = users[index]
            users[index] = {name: activeUser.name, description: activeUser.description, painPoint: e.target.value}
            this.setState({users})
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues({...this.state, percentageCompletion: 30.7692});
        this.props.history.push('/wizard/key-features')
    }

    handleBackButton = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues(this.state);
        this.props.history.push('/wizard/users')
    }

    render() {
        const {percentageCompletion} = this.state;
        const {users} = this.state;

        return (
            <div style={{overflowY: 'hidden'}} class="row">
                    <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                        <div style={{height: '100%', position: 'fixed'}} class="row align-items-center animate__animated animate__fadeInRight">
                            <div class="col-xl-12 col-lg-12">
                                <div class='pageTitle'  style={{fontSize: '50px', margin: '15px'}}>User Needs</div>
                                <div style={{margin: '15px'}}>Explain why each user needs your product.</div>
                            </div>
                        </div>
                    </div>

                    <div style={{paddingTop: '100px'}} class="col-xl-6 col-lg-6 wizard-div">
                            <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp">
                                <div class="col-xl-12 col-lg-12">
                                        {users.map((eachFeature,index, array) => {
                                            return (
                                                <div style={{width: '100%', marginBottom: '30px'}}>
                                                    <div style={{width: '100%', display: 'inline-block'}}>
                                                        <div  style={{padding: '4px', paddingLeft: '8px', fontSize: '18px', minHeight: '40px', marginBottom:'3px', color: 'white', background: 'transparent'}} class="wizard-text-area-input">{eachFeature.name}</div>
                                                        <textarea onInput={(e) =>this.handleusersPainPointsInput(index, e)} style={{padding: '4px', paddingLeft: '8px', fontSize: '15px', minHeight: '70px', border:'0.5px #a1a9e4 solid', overflow: 'auto', color: 'white', background: 'transparent'}} class="wizard-text-area-input" placeholder="e.g solar power is not enough to charge all of the user's devices, in many cases." name="painPoint" value={eachFeature.painPoint}></textarea>
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

export default withRouter(KeyFeaturesPurpose);