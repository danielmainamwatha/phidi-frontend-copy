/* eslint-disable no-useless-concat */
import React, {Component} from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './../../views/wizard.css';
import {withRouter} from 'react-router-dom';
import withToastNotificationHOC from './../../HOCs/notificationHOC';

import WizardContext from './../../helpers/wizardContext';

class KeyFeatures extends Component {
    static contextType = WizardContext;

    state = {
        users: [{name: '', description: ''}],
        edit: false
    }

    componentDidMount() {
        const {wizardState} = this.context
        const edit = this.props.location && this.props.location.state ? this.props.location.state.edit : false;
        const {users, percentageCompletion} = wizardState;
        this.setState({users: users, percentageCompletion, edit});
        
    }

    handleUserDetailsInput = (index, type, e) => {
        e.preventDefault();
        if (type === 'name') {
            const {users} = this.state;
            const activeUser = users[index]
            users[index] = {name: e.target.value, description: activeUser.description}
            this.setState({users})

        } else if (type === 'description') {
            const {users} = this.state;
            const activeUser = users[index]
            users[index] = {name: activeUser.name, description: e.target.value}
            this.setState({users})
        }        
    }

    handleDeleteAction = (index, array) => {
        const reducedArray = array.filter((item, i) => i !== index);
        this.setState({users: reducedArray})

    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context;

        if (this.state.users.length >= 1 && this.state.users[0].name && this.state.users[0].description) {
            setWizardValues({...this.state, percentageCompletion: 15.39});
            this.props.history.push('/wizard/user-pain-points');

        } else {
            return this.props.addToast("Please provide at least one user of your project with their name and description.", {
                appearance: 'error',
                autoDismiss: true,
            });
        }
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
        setWizardValues({...this.state, percentageCompletion: 7.6923});
        this.props.history.push('/wizard/objective');
    }

    render() {
        const {percentageCompletion,} = this.state;
        const {users,} = this.state;

        return (
            <div style={{overflowY: 'hidden'}} class="row">
                    <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                        <div style={{height: '100%', position: 'fixed'}} class="row align-items-center animate__animated animate__fadeInRight">
                            <div class="col-xl-12 col-lg-12">
                                <div style={{fontSize: '50px', margin: '15px'}}>Users</div>
                                <div style={{margin: '15px'}}>Give each of your user archetypes a name and a vivid description.</div>
                            </div>
                        </div>
                    </div>

                    <div style={{paddingTop: '100px'}} class="col-xl-6 col-lg-6 wizard-div">
                            <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp">
                                <div class="col-xl-12 col-lg-12">
                                        {users.map((eachFeature,index, array) => {
                                            return (
                                                <div className="animate__animated animate__fadeInUp" style={{width: '100%', marginBottom: '30px'}}>
                                                    <div style={{width: '95%', display: 'inline-block'}}>
                                                        <span class="input-keyword">User name</span>
                                                        <input onInput={(e) => this.handleUserDetailsInput(index, 'name', e)} style={{padding: '4px', paddingLeft: '8px', fontSize: '15px', height: '40px', border:'0.5px #a1a9e4 solid', marginBottom:'10px', color: 'white', background: 'transparent'}} class="wizard-text-area-input" placeholder="e.g The Glamper w/ outdoorsman tendencies" name="name" value={eachFeature.name}></input>
                                                        <span class="input-keyword">Description</span>
                                                        <textarea onInput={(e) =>this.handleUserDetailsInput(index, 'description', e)} style={{padding: '4px', paddingLeft: '8px', fontSize: '15px', minHeight: '70px', border:'0.5px #a1a9e4 solid', overflow: 'auto', color: 'white', background: 'transparent'}} class="wizard-text-area-input" placeholder="e.g A 'techie' millenial introduced to camping in 2019. Loves the outdoors, but refuses to turn their back on technology" name="description" value={eachFeature.description}></textarea>
                                                    </div>
                                                        <div onClick={() => this.handleDeleteAction(index, array)} style={{width: '2.5%', paddingLeft: '4px', color:'red', display: 'inline-block', cursor: 'pointer'}}><i class="fa fa-trash" aria-hidden="true"></i></div>
                                            </div>
                                            )
                                        })}          

                                        <div class="col-xl-12 col-lg-12 margin-bottom-40 d-flex justify-content-center">
				                                <button style={{color: '#ffffff', fontSize: '14px', width: '80%', boxShadow: '0 2px 12px rgba( 245, 245, 245,0.12)'}}  onClick={() => this.setState((prevState) =>({users: [...prevState.users, {name: '', description: ''}] }))} class="button full-width ripple-effect">Add User <i class='icon-material-outline-add'></i></button>
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

export default withToastNotificationHOC(withRouter(KeyFeatures));