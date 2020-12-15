/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-concat */
import React, {Component} from 'react';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import {withRouter} from 'react-router-dom';

import WizardContext from './../../helpers/wizardContext';

import './../../views/wizard.css';

class Aesthetics extends Component  {
    static contextType = WizardContext;

    state = {
        edit: false,
        prefferedMaterials: '',
        aestheticSketches: null,
        dimensionalSketches: null,
    }

    componentDidMount() {
        const {wizardState} = this.context
        const edit = this.props.location && this.props.location.state ? this.props.location.state.edit : false;
        const {prefferedMaterials, aestheticSketches,dimensionalSketches, percentageCompletion} = wizardState;
        this.setState({prefferedMaterials, aestheticSketches,dimensionalSketches, edit, percentageCompletion});
        
    }

    handlePrefferedMaterials = (e) => {
        e.preventDefault();
		const name = "prefferedMaterials";
        const value = e.target.value;
        this.setState((prevState) => ({[name]: value}));
    }

    handleAestheticSketches = (e) => {
        e.preventDefault();
		const name = "aestheticSketches";
        const value = e.target.files;
        this.setState((prevState) => ({[name]: value}));
    }

    handleDimensionalSketches = (e) => {
        e.preventDefault();
		const name = "dimensionalSketches";
        const value = e.target.files;
        this.setState((prevState) => ({[name]: value}));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues({...this.state, percentageCompletion: 84.62});
        this.props.history.push('/wizard/job-post-details');
    }

    handleBackButton = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues({...this.state, percentageCompletion:  61.53});
        this.props.history.push('/wizard/metrics-of-success');
    }

    handleSubmitEdit = (e) => {
        e.preventDefault();
        const {setWizardValues} = this.context
        setWizardValues(this.state);
        this.props.history.push('/wizard/wizard-review');
    }

    handleAestheticFileDelete = (fileKey) => {
        let sketches = this.state.aestheticSketches;
        delete sketches[fileKey];
        this.setState({ aestheticSketches: sketches });
    }

    removeSingleSavedAestheticFile = (fileKey) => {
        const savedAesthFiles = this.state.aestheticSketches;
        savedAesthFiles.splice(fileKey, 1);
        this.setState({ aestheticSketches: savedAesthFiles });
    }

    removeSingleSavedDimensionFile = (fileKey) => {
        const savedDimenFiles = this.state.dimensionalSketches;
        savedDimenFiles.splice(fileKey, 1);
        this.setState({ dimensionalSketches: savedDimenFiles });
    }

    handleAestheticSketchesDisplay =  (aestheticSketches) => {
            let files = [];
            if (aestheticSketches) {
                for (let fileKey in Object.keys(aestheticSketches)) {
                    files.push(
                        <span  key={fileKey} class="uploadButton-file-namex">
                            <span style={{marginLeft: '10px'}}> 
                                {aestheticSketches[fileKey].name ? `${aestheticSketches[fileKey].name}` 
                                    :  
                                <><i onClick={() => this.removeSingleSavedAestheticFile(fileKey)} style={{cursor: 'pointer', color: 'red', marginRight: '6px'}} className="fa fa-times"></i><span>{aestheticSketches[fileKey]}</span></> }
                            </span>
                        </span>
                        );
                }
                
                if (aestheticSketches !== null & aestheticSketches.length > 0 || aestheticSketches !== null & aestheticSketches.files) {
                    files.push(
                        <span style={{cursor: 'pointer', color: 'red'}} onClick={() => this.setState({aestheticSketches: []})} class="uploadButton-file-namex">
                            <span style={{marginLeft: '10px', color: 'red'}}>remove files</span>
                        </span>
                    )
                }
            return files;
        } 
    }

    handleDimensionalSketchesDisplay =  (dimensionalSketches) => {
        let files = [];
        if (dimensionalSketches) {
            for (let fileKey in Object.keys(dimensionalSketches)) {
                files.push(
                <span key={fileKey} class="uploadButton-file-namex">
                    <span> {dimensionalSketches[fileKey].name ? `${dimensionalSketches[fileKey].name}` 
                        : 
                    <><i onClick={() => this.removeSingleSavedDimensionFile(fileKey)} style={{cursor: 'pointer', color: 'red', marginRight: '6px'}} className="fa fa-times"></i>{dimensionalSketches[fileKey]}</>}</span>
                </span>
                );
            }

            if (dimensionalSketches !== null & dimensionalSketches.length > 0 || dimensionalSketches !== null & dimensionalSketches.files) {
                files.push(
                    <span style={{cursor: 'pointer', color: 'red'}} onClick={() => this.setState({dimensionalSketches: []})} class="uploadButton-file-namex">
                        <span style={{marginLeft: '10px', color: 'red'}}>remove files</span>
                    </span>
                );
            }
        return files;
    } 
}

    render() {
        const {percentageCompletion} = this.state;
    return (
        <div style={{overflowY: 'hidden'}} class="row">
                <div style={{minHeight: '100vh'}} class="col-xl-6 col-lg-6 wizard-div-top">
                    <div style={{height: '100%', position: 'fixed'}} class="row align-items-center animate__animated animate__fadeInRight">
                        <div class="col-xl-12 col-lg-12">
                            <div class='pageTitle' style={{fontSize: '50px', margin: '15px'}}>Form and Fit</div>
                            <div style={{margin: '15px'}}>Upload relevant sketches and models.</div>
                        </div>
                    </div>
                </div>

                <div class="col-xl-6 col-lg-6 wizard-div">
                        <div style={{minHeight: '100%'}} class="row align-items-center animate__animated animate__bounceInUp">
                            <div class="col-xl-11 col-lg-11">
                                <div class="aesthetic-items-container">
                                    <div class="uploadButtonx margin-top-20 margin-bottom-50">
                                        <input onChange={this.handleAestheticSketches} id="uploadButtonAestheticSketch" class="uploadButton-inputx" type="file" accept="image/*" name="aestheticSketches[]" multiple="multiple" />
                                        <label class="uploadButton-buttonx ripple-effect" for="upload">Upload Files</label>
                                        <span id="uploadButtonAestheticSketchFileName" class="uploadButton-file-name-custom">Upload any napkin sketches or digital models.</span>
                                        {this.handleAestheticSketchesDisplay(this.state.aestheticSketches)}
                                    </div>
                                    <div class="uploadButtonx margin-top-20 margin-bottom-50">
                                        <input onChange={this.handleDimensionalSketches} id="uploadButtonDimensionalSketch" class="uploadButton-inputx" type="file" accept="image/*" name="dimensionalSketches[]" multiple="multiple" />
                                        <label class="uploadButton-buttonx ripple-effect" for="upload">Upload Files</label>
                                        <span id="uploadButtonAestheticSketchFileName" class="uploadButton-file-name-custom">Attach any dimensional or formal drawings.</span>
                                        {this.handleDimensionalSketchesDisplay(this.state.dimensionalSketches)} 
                                    </div>
                                        <textarea onInput={this.handlePrefferedMaterials} class="wizard-text-area" placeholder="Any preffered build materials ?" value={this.state.prefferedMaterials}></textarea>
                                </div>
                            </div>
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
    );
}
}

export default withRouter(Aesthetics);