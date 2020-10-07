import React, {Component} from 'react';
import {withRouter, Switch, Route} from 'react-router-dom';

import withToastNotificationHOC from '../HOCs/notificationHOC';
import './wizard.css';
import logo from '../images/LOGO_SDW.png';
import Objective from '../components/wizard/wizard-objective';
import Aesthetics from '../components/wizard/wizard-aesthetics';
import ReviewSubmit from '../components/wizard/wizard-review-submit';
import KeyFeatures from '../components/wizard/wizard-key-features';
import FeaturesPriority from '../components/wizard/wizard-features-priority';
import Users from '../components/wizard/wizard-users';
import UserPain from '../components/wizard/wizard-user-pain';
import JobPostsService from '../services/jobPostsService';
import ConfirmDialog from '../components/confirm-dialog';
import WizardOptions from '../components/wizard/wizard-options';
import ProjectDetails from '../components/wizard/wizard-project-details';
import MetricsOfSuccess from '../components/wizard/wizard-metrics-of-success';
import JobPostDetails from '../components/wizard/wizard-job-post-details';
import ProcessToFormData from '../helpers/toFormData';
import WizardContext from '../helpers/wizardContext';
import {
    JOB_POST_PAYMENT,
  } from '../helpers/constants';

class WizardExample extends Component {
    static contextType = WizardContext;

    state = {
        letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
        activeLetterIndex: 0,
        percentageCompletion: 0,
        features: [{name: '', description: '',}],
        users: [{name: '', description: '',}],
        volume: '',
        targetMSRP: '',
        metricsOfSuccess: [''],
        toggleObjective: '',
        visibility: 'public',
        categories: [],
        budget: 0,
        milestones: [{date: '', milestone: ''}],
        deliverables: { Model: false, UXPrototype: false, FunctionalPrototype: false },
        wizardOptionsDisplay: false,
    }

    changeWizardState = (name, value, wizardPageState={}) => {
        if ( name === "aestheticSketches" || name === "dimensionalSketches" ) {
                let files = [];
                for (const fileKey in Object.keys(value)) {
                    files.push(value[fileKey]);
                }
                this.setState((prevState) => ({ ...prevState, [name]: files}));

            } else if (name === "prefferedMaterials") {
                this.setState((prevState) => ({ ...prevState, [name]: value}));
            } else {
                this.setState((prevState) => ({ ...prevState, [name]: value, activeLetterIndex: prevState.activeLetterIndex + 1, ...wizardPageState, percentageCompletion: prevState.percentageCompletion + 7.69230769231 }));
            }
    }

    handleNextWizardButton = () => {
        this.setState((prevState) => {
            return {activeLetterIndex: prevState.activeLetterIndex + 1, percentageCompletion: prevState.percentageCompletion + 7.69230769231}
        });
    }

    handlePrevWizardButton = () => {
        this.setState((prevState) => {
            return {activeLetterIndex: prevState.activeLetterIndex - 1}
        });
    }

    handleSubmit = async (wizardState) => {
        const {setWizardValues, resetWizard} = this.context;
        const formData = await ProcessToFormData(wizardState);
        let response;

        if (wizardState.id) {
            if (wizardState.toEdit){
                response = await JobPostsService.editJobPost(formData);

            } else {
                response = await JobPostsService.publishSavedPartiallyJobPost(formData);
            }

        } else {
            response = await JobPostsService.createJobPost(formData);

        }

        if (response.status === 201 || response.status === 200) {
            resetWizard();
            setWizardValues({id: null});
            if (wizardState.toEdit) {
                setWizardValues({toEdit: null});
                this.props.history.push('/job-posts');
                return this.props.addToast(response.data.message, {
                    appearance: 'success',
                    autoDismiss: false,
                });

            } else {
                this.setState({displayConfirmDialog: true, jobPostId: response.data.jobPost.id });
                return this.props.addToast(response.data.message, {
                    appearance: 'success',
                    autoDismiss: false,
                });

            }

        } else {
            return this.props.addToast(response.data ? response.data.message : response.response.data.message, {
                appearance: 'error',
                autoDismiss: false,
            });
        }
    }

    hideConfirmDialog = () => {
        this.setState({displayConfirmDialog: false});
    }

    hideWizardOptionsDialog = () => {
        this.setState({wizardOptionsDisplay: false});
    }

    exitEditWizardState = () => {
        const {resetWizard} = this.context;
        resetWizard();
        this.props.history.push('/job-posts')

    }

    render() {
        const {toggleObjective, categories, visibility, percentageCompletion, features, users, milestones, budget, deliverables} = this.state;
        const {wizardState} = this.context;
        return(
        <>
             <header style={{borderBottomStyle: 'none'}} id="header-container" class="fullwidth transparent-header">
                  <div id="header">
                      <div class="container">
                          <div class="left-side">
                          <div id="logo">
                              <img src={logo} alt=""/>
                          </div>
                          </div>
                          <div class="right-side d-flex align-items-center">
                          <div class="header-notifications">
                             <div class="header-notifications-trigger">
                                 {wizardState.toEdit ? 
                                    <div onClick={() => this.exitEditWizardState()} style={{cursor: 'pointer', color: '#ffffff', fontSize:'18px'}}>
                                        exit project editing
                                    </div>
                                        : 
                                     <div onClick={() => this.setState({wizardOptionsDisplay: true})} style={{cursor: 'pointer', color: '#ffffff', fontSize:'18px'}}>
                                        SAVE + EXIT <i class='icon-material-outline-arrow-drop-down wizard-options-dropdown'></i>
                                     </div>}
                             </div>
                         </div>
                      </div>
                      </div>
                  </div>
              </header>
              <div class="container-fluid">
                    <Switch>
                        <Route exact path={`${this.props.match.path}`}>
                            <Objective handleNextWizardButton={this.handleNextWizardButton} handlePrevWizardButton={this.handlePrevWizardButton} changeWizardState={this.changeWizardState} 
                                percentageCompletion={Math.floor(this.state.percentageCompletion)}/>
                        </Route>
                        <Route path={`${this.props.match.path}/job-post-details`}>
                            <JobPostDetails toggleObjective={toggleObjective} visibility={visibility} categories={categories}  handleNextWizardButton={this.handleNextWizardButton} handlePrevWizardButton={this.handlePrevWizardButton} changeWizardState={this.changeWizardState} 
                                percentageCompletion={Math.floor(percentageCompletion)} />
                        </Route>
                        <Route path={`${this.props.match.path}/users`}>
                            <Users users={users} handleNextWizardButton={this.handleNextWizardButton} handlePrevWizardButton={this.handlePrevWizardButton} 
                                changeWizardState={this.changeWizardState} percentageCompletion={Math.floor(percentageCompletion)} />
                        </Route>
                        <Route path={`${this.props.match.path}/user-pain-points`}>
                            <UserPain users={users} handleNextWizardButton={this.handleNextWizardButton} handlePrevWizardButton={this.handlePrevWizardButton} 
                                changeWizardState={this.changeWizardState} percentageCompletion={Math.floor(percentageCompletion)} />
                        </Route>
                        <Route path={`${this.props.match.path}/key-features`}>
                            <KeyFeatures features={features} handleNextWizardButton={this.handleNextWizardButton} handlePrevWizardButton={this.handlePrevWizardButton} 
                                changeWizardState={this.changeWizardState} percentageCompletion={Math.floor(percentageCompletion)} />
                        </Route>
                        <Route path={`${this.props.match.path}/features-priority`}>
                            <FeaturesPriority features={features} handleNextWizardButton={this.handleNextWizardButton} handlePrevWizardButton={this.handlePrevWizardButton} 
                                changeWizardState={this.changeWizardState} percentageCompletion={Math.floor(percentageCompletion)} />
                        </Route>
                        <Route path={`${this.props.match.path}/metrics-of-success`}>
                            <MetricsOfSuccess metricsOfSuccess={this.state.metricsOfSuccess} handleNextWizardButton={this.handleNextWizardButton} handlePrevWizardButton={this.handlePrevWizardButton} 
                                changeWizardState={this.changeWizardState} percentageCompletion={Math.floor(percentageCompletion)} />
                        </Route>
                        <Route path={`${this.props.match.path}/aesthetics`}>
                            <Aesthetics handleNextWizardButton={this.handleNextWizardButton} handlePrevWizardButton={this.handlePrevWizardButton} changeWizardState={this.changeWizardState} 
                                percentageCompletion={Math.floor(percentageCompletion)} />
                        </Route>
                        <Route path={`${this.props.match.path}/project-details`}>
                            <ProjectDetails budget={budget} deliverables={deliverables} milestones={milestones} handleNextWizardButton={this.handleNextWizardButton} handlePrevWizardButton={this.handlePrevWizardButton} 
                                changeWizardState={this.changeWizardState} percentageCompletion={Math.floor(percentageCompletion)} />
                        </Route>
                        <Route path={`${this.props.match.path}/wizard-review`}>
                            <ReviewSubmit handleSubmit={this.handleSubmit} handlePrevWizardButton={this.handlePrevWizardButton} percentageCompletion={Math.floor(percentageCompletion)} />
                        </Route>
                    </Switch>

              </div>
              {this.state.displayConfirmDialog ?  
                <ConfirmDialog paymentType={JOB_POST_PAYMENT} jobPostId={this.state.jobPostId} hideConfirmDialog={this.hideConfirmDialog} />
            : null}
            {this.state.wizardOptionsDisplay ?  
                <WizardOptions hideWizardOptionsDialog={this.hideWizardOptionsDialog} />
            : null}
        </>
        );
    }
}

export default withRouter(withToastNotificationHOC(WizardExample));