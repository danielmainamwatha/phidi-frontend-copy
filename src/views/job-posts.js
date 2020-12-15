/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import dateFormat from 'dateformat';
import {fetchMyJobPosts} from './../redux/action-creator';
import Footer from './../components/footer';
// import Header from './../components/header';
import Header from './../components/customHeader';
import withToastNotificationHOC from './../HOCs/notificationHOC';
import ConfirmDialog from '../components/confirm-dialog';
import ProfileDialog from '../components/profileModal';
import JobPostService from '../services/jobPostsService';
import {
    JOB_VISIBILITY_PRIVATE,
    BID_TYPE_BID,
    JOB_POST_PUBLISHED,
    JOB_POST_PAYMENT,
    JOB_POST_NOT_PUBLISHED,
} from './../helpers/constants';

import WizardContext from './../helpers/wizardContext';


class JobPosts extends Component {
    static contextType = WizardContext;

    state = {
        displayProfileDialog: false,
        showDeleteJobpostModal: false,
        deleteJobpostId: null

    }
    
    componentDidMount() {
        const {fetchMyJobPosts} = this.props;
        const {myJobPosts} = this.props;
        this.setState({myJobPosts});
		fetchMyJobPosts();
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState){
			return {myJobPosts: nextProps.myJobPosts, profile: nextProps.profile};
        }
    }

    resumeJobPostWizard = (partiallySavedJobpost) => {
        const {setWizardValues} = this.context
        const {projectKeyFeatures: features} = partiallySavedJobpost;
        const {projectUsers: users} = partiallySavedJobpost;
        setWizardValues({...partiallySavedJobpost, users, features});
        this.props.history.push('/wizard');
    }

    handleJobPostEdit = (jobPost) => {
        let features = [{name: '', description: '',}];
        let users = [{name: '', description: '',}];
        const cleanJobPost = Object.entries(jobPost).reduce((acc, [key, val]) => {   	if (val) acc[key] = val;     return acc;  }, {})
        const {setWizardValues} = this.context

        if (cleanJobPost.projectKeyFeatures) {
            features = cleanJobPost.projectKeyFeatures;
        }
        if (cleanJobPost.projectUsers) {
            users = cleanJobPost.projectUsers;
        }
        setWizardValues({...cleanJobPost, users, features, toEdit: true});
        this.props.history.push('/wizard/wizard-review');
    }

    publishJobPost = (jobPostId) => {
        this.setState({jobPostId, displayConfirmDialog:true});
    }

    hideConfirmDialog = () => {
        this.setState({displayConfirmDialog: false});
    }

    hideProfileDialog = () => {
        this.setState({displayProfileDialog: false});
    }

    createNewProject = () => {
        const {profile} = this.state;
        console.log('profile', profile);
        if (profile && profile.profilefilled === false) {
            this.setState({displayProfileDialog: true});

        } else {
            this.props.history.push('/wizard');
        }
    }

    deleteUnpublishedJobpost = async() => {
        const {deleteJobpostId} = this.state;
        const response = await JobPostService.deleteUnpublishedJobpost(deleteJobpostId);

        if (response && response.status === 200 ) {
            const {fetchMyJobPosts} = this.props;
			fetchMyJobPosts();
            this.setState({showDeleteJobpostModal: false, deleteJobpostId: null});
            return this.props.addToast(response.data.message, {
				appearance: 'success',
				autoDismiss: true,
			})
        } else {
            this.setState({showDeleteJobpostModal: false, deleteJobpostId: null});
			return this.props.addToast(response.data.message, {
				appearance: 'error',
				autoDismiss: true,
			});
		}
    }

    renderDeleteJobPostModal = () => {
        return (
        <div class='mfp-wrap'>
                <div id="small-dialog-1" class='dialog-with-tabs mfp-wrap zoom-anim-dialog confirmation-modal'>
                <button onClick={() => this.onClose()} class="og-close mfp-close"></button>
                <div class="sign-in-form">
              <>
                <ul class="popup-tabs-nav">
                         <li><a style={{color: 'grey', fontWeight: '400'}}>Delete Unpublished Project</a></li>
                     </ul>
                <div class="popup-tabs-container">
                    <div class="popup-tab-content" id="tab">
                        <div class="welcome-text">
                            <h3 style={{fontWeight: '600'}}>Are you sure you want to delete unpublished project ?</h3>
                        </div>
                            <div class="social-login-buttons">
                                <button onClick={this.onClose} style={{fontWeight: '600', fontSize: '15px'}} class="facebook-login-cancel ripple-effect">Cancel</button>
                                <button onClick={this.deleteUnpublishedJobpost} style={{fontWeight: '600', fontSize: '15px'}} class="facebook-login-confirm ripple-effect">Delete</button>
                            </div>
                    </div>
                </div>
            </>
        </div>
            </div>
        </div>
        )
    }

    onClose = () => {
        this.setState({showDeleteJobpostModal: false, deleteJobpostId: null});
    }

    render() {
        const {myJobPosts} = this.state;
        return (
            <>
            <Header/>
            <div style={{minHeight: '75vh'}} class="container margin-bottom-50">
                <div class="dashboard-content-inner">

                    {/* <!-- Row --> */}
                    <div class="row">

                        {/* <!-- Dashboard Box --> */}
                        <div class="col-xl-12 col-lg-12">
                            {/* <!-- Dashboard Headline --> */}
                                <div class="dashboard-headline">

                                    {/* <!-- Breadcrumbs --> */}
                                    <nav id="breadcrumbs" style={{background: "#ffffff"}}>
                                        <ul>
                                            <li><button onClick={this.createNewProject} class="button ripple-effect"><i class="icon-material-outline-add"></i> Create new project</button></li>
                                        </ul>
                                    </nav>
                                </div>
                            <div class="dashboard-box margin-top-0">

                                {/* <!-- Headline --> */}
                                <div class="headline">
                                    <h3><i class="icon-material-outline-assignment"></i> My Projects</h3>
                                </div>

                                <div class="content">
                                    <ul class="dashboard-box-list">
                                        {myJobPosts && myJobPosts.length > 0 ? 
                                            myJobPosts.map((eachJobPost) => {
                                                let sumAmountBidValue = '---';
                                                const allTypeBids = eachJobPost.bids.filter ((eachJobPost) => eachJobPost.type === BID_TYPE_BID);
                                                const amountBidValue = allTypeBids.map((each) => each.amount);
                                                if (amountBidValue.length > 0) {
                                                    sumAmountBidValue = amountBidValue.reduce((accumulator, currentValue) => {
                                                        return accumulator + currentValue;
                                                    });
                                                }
                                                const averageBid = sumAmountBidValue / amountBidValue.length;
                                                return(
                                                    <li>
                                                        <div class="job-listing width-adjustment">
                                                            <div class="job-listing-details">
            
                                                                <div class="job-listing-description">
                                                                    <h3 class="job-listing-title">
                                                                        <Link to={`/job-post/${eachJobPost.id}`}><span class="job-post-objective">{eachJobPost.objective}</span></Link>
                                                                    </h3>
            
                                                                    <div class="job-listing-footer">
                                                                        <ul>
                                                                            <li><i style={{fontWeight: 700}} class="icon-material-outline-access-time"></i>Posted on {dateFormat(eachJobPost.createdAt, "mmm dS, yyyy, h:MM TT")}</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    {eachJobPost.savePartially ?
                                                        <ul class="dashboard-task-info">
                                                            <li><span style={{color: 'blue'}}><button onClick={() => this.resumeJobPostWizard(eachJobPost)} class="button full-width ripple-effect">Resume project posting </button></span></li>
                                                            <li><span style={{color: 'blue'}}></span><span>saved partially</span></li>
                                                        </ul>   
                                                        :  
                                                        <ul class="dashboard-task-info">
                                                            {eachJobPost.published === JOB_POST_PUBLISHED ?  
                                                            <>
                                                                <li><span style={{color: 'blue'}}>{eachJobPost.bids.length}</span><span>Bids</span></li>
                                                                <li><span style={{color: 'blue'}}>{isNaN(averageBid) ? '-' : `$ ${averageBid}`}</span><span>avg. Bid</span></li>
                                                                <li><span style={{color: 'blue'}}>published</span><span>{eachJobPost.visibility === JOB_VISIBILITY_PRIVATE ? 
                                                                <span class='dashboard-status-button green'>private</span>
                                                                : <span class='dashboard-status-button blue'>public</span>}</span></li>
                                                            </>
                                                                :
                                                            <>
                                                                <li><span style={{color: 'blue'}}><button onClick={() => this.publishJobPost(eachJobPost.id)} class="button full-width ripple-effect">Publish</button></span></li>
                                                                <li><span>not published</span></li>
                                                            </>
                                                            
                                                            }
                                                        </ul>
                                                    }
            
                                                        {/* <!-- Buttons --> */}
                                                        <div class="buttons-to-right always-visible">
                                                            <a onClick={() => this.handleJobPostEdit(eachJobPost)} class="button gray ripple-effect ico" title="Edit" data-tippy-placement="top"><i class="icon-feather-edit"></i></a>
                                                            {eachJobPost.published === JOB_POST_NOT_PUBLISHED ?
                                                                <a onClick={() => this.setState({showDeleteJobpostModal: true, deleteJobpostId: eachJobPost.id})} class="button gray ripple-effect ico" title="Remove" data-tippy-placement="top"><i class="icon-feather-trash-2"></i></a> 
                                                             : 
                                                             null}
                                                        </div>
                                                    </li>
                                                );
                                             }) : 
                                             <li>
                                                 <div> No projects yet</div>
                                            </li>}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.showDeleteJobpostModal ? this.renderDeleteJobPostModal() : null}
                {this.state.displayConfirmDialog ?  
                    <ConfirmDialog paymentType={JOB_POST_PAYMENT} jobPostId={this.state.jobPostId} hideConfirmDialog={this.hideConfirmDialog} />
                        : 
                    null
                }
                {this.state.displayProfileDialog ? 
                    <ProfileDialog hideProfileDialog={this.hideProfileDialog} currentPageLink={'/job-posts'}/>
                        : 
                    null
                }
            </div>
            <Footer />
            </>
        );
    }

}

const mapDispatchToProps = {
    fetchMyJobPosts,
}

const mapStateToProps = ({myJobPostsStoreState, profileStoreState}) => ({
    ...myJobPostsStoreState,
    ...profileStoreState
});

export default withToastNotificationHOC(connect(
    mapStateToProps,
    mapDispatchToProps,
) (withRouter(JobPosts)));