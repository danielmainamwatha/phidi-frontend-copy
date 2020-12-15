/* eslint-disable no-useless-concat */
import React, { useState, useContext, useEffect } from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import './../../views/wizard.css';
import WizardContext from './../../helpers/wizardContext';

const TargetMSRP = (props) => {
    let history = useHistory();
    let location = useLocation();
    const context = useContext(WizardContext);
    const {setWizardValues, wizardState} = context;
    const editValue = location && location.state ? location.state.edit : false;
    const {percentageCompletion} = wizardState;

    const [targetMSRP, setTargetMSRP] = useState('');
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        setTargetMSRP(wizardState.targetMSRP);
        setEdit(editValue)
      }, [wizardState.targetMSRP, editValue]);

    const handleTargetMSRP = (e) => {
        e.preventDefault();
        setTargetMSRP(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setWizardValues({targetMSRP, percentageCompletion: 46.1538});
        history.push('/wizard/key-features');
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault();
        setWizardValues({targetMSRP});
        history.push('/wizard/wizard-review');
    }

    const handleBackButton = (e) => {
        e.preventDefault();
        setWizardValues({targetMSRP});
        history.push('/wizard/volume');
    }

    return (
        <div style={{overflowY: 'hidden'}} class="row">
                <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                    <div style={{height: '100%'}} class="row align-items-center animate__animated animate__fadeInRight">
                        <div class="col-xl-12 col-lg-12">
                            <div style={{fontSize: '50px', margin: '15px'}}>Target MSRP</div>
                            <div style={{margin: '15px'}}>What is a reasonable retail price for your market?</div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6 col-lg-6 wizard-div">
                        <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp">
                            <div class="col-xl-12 col-lg-12 aesthetic-items-container">
                                <textarea onInput={handleTargetMSRP} class="wizard-text-area" placeholder="Reasonable retail price." defaultValue={targetMSRP}></textarea>
                            </div>

                            <div style={{width: '100%', padding: '2%'}}>
                                <div class="d-flex justify-content-between">
                                {edit ? 
                                    <>
                                        <button class="button ripple-effect gray-button "><i class="icon-material-outline-arrow-back"></i>Back</button>
                                        <button onClick={handleSubmitEdit} class="button ripple-effect wizard-button">Review<i class="icon-material-outline-arrow-forward"></i></button>
                                    </> : 
                                    <>
                                        <button onClick={handleBackButton} class="button ripple-effect wizard-button"><i class="icon-material-outline-arrow-back"></i>Back</button>
                                        <button onClick={handleSubmit} class="button ripple-effect wizard-button">Next<i class="icon-material-outline-arrow-forward"></i></button>
                                    </>
                                    }</div>
                                { edit ? null :
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

export default TargetMSRP;