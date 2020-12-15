/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import dateFormat from 'dateformat';
import OutsideClickHandler from 'react-outside-click-handler';

import baseUrl from './../helpers/baseURL';
import Lightbox from "react-awesome-lightbox";
import ConfirmDialog from './../components/confirm-dialog';
import Comments from './../components/job-post/comments';
import Footer from './../components/footer';
// import Header from './../components/header';
import CustomHeader from './../components/customHeader';
import withToastNotificationHOC from './../HOCs/notificationHOC';
import {fetchMyJob} from './../redux/action-creator';
import Avatar from './../images/user-avatar-placeholder.png';
import JobPostDetails from '../components/job-post/job-post-details';
import {
    BID_TYPE_REQUEST,
    BID_ACCEPTED,
    REQUEST_BID_REJECTED,
    REQUEST_BID_AUTHORIZED, 
    BID_ACCEPT_PAYMENT,
    REJECT_VIEW_REQUEST,
    ACCEPT_VIEW_REQUEST
} from './../helpers/constants';
import BidsService from './../services/bidsService';
import WizardContext from './../helpers/wizardContext';

class JobPost extends Component {
    static contextType = WizardContext;

    state = {
        displayConfirmDialog: false,
        nonPaymentDialogConfirm: false,
        dialogConfirmType: '',
        bidAmount: 0,
        lightBoxShown: false,
        imageLink: null,
        showBio: false,
    }
    
    componentDidMount() {
        const id = this.props.match.params.id;
        const {fetchMyJob} = this.props;
        const {myJob} = this.props;
        this.setState({myJob});
		fetchMyJob(id);
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState){
			return {myJob: nextProps.myJob};
        }
    }

    renderAcceptViewRequestDialog = (id) => {
        this.setState(() => ({displayConfirmDialog: true, nonPaymentDialogConfirm: true, dialogConfirmType: ACCEPT_VIEW_REQUEST, bidId: id}));
    }

    acceptViewRequest = async (bidId) => {
        const response = await BidsService.acceptViewRequest(bidId);
        if (response.status === 200) { 
            this.setState({displayConfirmDialog: false, nonPaymentDialogConfirm: false, dialogConfirmType: null, bidId: null});
            const {fetchMyJob} = this.props;
            const id = this.props.match.params.id;
            fetchMyJob(id);
            this.props.addToast(response.data.message, {
				appearance: 'success',
				autoDismiss: true,
			});
        } else if (response.status === 405) {
            this.setState({displayConfirmDialog: false, nonPaymentDialogConfirm: false, dialogConfirmType: null, bidId: null});
            this.props.addToast(response.data.message, {
				appearance: 'error',
				autoDismiss: true,
			});
        } else {
            this.setState({displayConfirmDialog: false, nonPaymentDialogConfirm: false, dialogConfirmType: null, bidId: null});
                this.props.addToast(response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }
        renderRejectViewRequestDialog = (id) => {
            this.setState(() => ({displayConfirmDialog: true, nonPaymentDialogConfirm: true, dialogConfirmType: REJECT_VIEW_REQUEST, bidId: id}));
        }

        rejectViewRequest = async (bidId) => {
            const response = await BidsService.rejectViewRequest(bidId);
            if (response.status === 200) { 
                const {fetchMyJob} = this.props;
                const id = this.props.match.params.id;
                this.setState({displayConfirmDialog: false, nonPaymentDialogConfirm: false, dialogConfirmType: null, bidId: null});
                fetchMyJob(id);
                this.props.addToast(response.data.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
            } else {
                this.setState({displayConfirmDialog: false, nonPaymentDialogConfirm: false, dialogConfirmType: null, bidId: null});
                this.props.addToast(response.data.message, {
                    appearance: 'error',
                    autoDismiss: true,
                });
            }
        }

        renderRequestBidActions = (requestBidStatus, id) => {
            if (requestBidStatus === REQUEST_BID_AUTHORIZED) {
                return (
                    <ul style={{background: '#ffffff'}} class="dashboard-task-info bid-info">
                        <li ><span style={{color: 'blue', fontWeight: 500}} >View Request Accepted</span></li>
                    </ul>
                );
            } else if (requestBidStatus === REQUEST_BID_REJECTED) {
                return (
                    <ul style={{background: '#ffffff'}} class="dashboard-task-info bid-info">
                        <li style={{cursor: 'pointer'}} ><span style={{color: 'red', fontWeight: 500}} >View Request Rejected</span></li>
                    </ul>
                );
            } else {
                return (
                    <ul class="dashboard-task-info bid-info">
                        <li style={{cursor: 'pointer'}} onClick={() => this.renderAcceptViewRequestDialog(id)}><span style={{color: 'blue'}} >Accept Request</span></li>
                        <li><span style={{cursor: 'pointer', color: 'blue'}} onClick={() => this.renderRejectViewRequestDialog(id)}>Reject Request</span></li>
                    </ul>
                );
            }
        }

        hideConfirmDialog = () => {
            this.setState({displayConfirmDialog: false, nonPaymentDialogConfirm: false, dialogConfirmType: ''});
        }

        showConfirmDialog = (bidId, bidAmount) => {
            this.setState(() => ({displayConfirmDialog: true, bidId: bidId, bidAmount: bidAmount}));
        }

        // light box (display comment images)
        viewOnLightBox = (imageLink) => {
            this.setState({lightBoxShown: true, imageLink})
        }

        closeLightBox = () => {
            this.setState({lightBoxShown: false})
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

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      setShowBio = (bool) => {
        this.setState({showBio: bool});
      }
      

    render() {
        const { myJob, lightBoxShown, imageLink, showBio } = this.state;
        const {fetchMyJob} = this.props;
        return (
            <>
            <CustomHeader />
            <div style={{minHeight: '75vh'}} class="container">
            <div class="dashboard-content-inner">
            <div class="row margin-top-20">

                {/* <!-- Content --> */}
                {myJob ? 
                <div class="col-xl-12 col-lg-12">

                    {/* <!-- Description --> */}
                    <div class="single-page-section">
                        <h3 class="margin-bottom-25">Project Description</h3>
                        <p style={{fontWeight: 700}}>{myJob.objective}</p>
                        <p>{myJob.toggleObjective}</p>
                        <button onClick={() => this.handleJobPostEdit(myJob)} class="button blue margin-top-20 ripple-effect button-sliding-icon">edit project details <i class="fa fa-edit"></i></button>
                    </div>


                    {/* job post details */}
                    <JobPostDetails jobPostState={myJob} />

                    {/* <!-- COMMENTS SECTION --> */}
                        {myJob.comments?   
                        <Comments userId={myJob.userId} employer={true} comments={myJob.comments} jobPostId={myJob.id} fetchMyJobActionCreator={fetchMyJob}/>
                        :  null}

                    {/* <!-- Row --> */}
                    <div class="row">

                        {/* <!-- Dashboard Box --> */}
                        <div class="col-xl-12">
                            <div class="dashboard-box margin-top-0 margin-bottom-25">

                                {/* <!-- Headline --> */}
                                <div class="headline">
                                    <div class="margin-bottom-20">
                                        <h2>Bids</h2>
                                    </div>
                                    <h3><i class="icon-material-outline-supervisor-account"></i>{`${myJob.bids.length} bidders`}</h3>
                                </div>

                                <div class="content">
                                    <ul class="dashboard-box-list">
                                        {myJob.bids ? 
                                            myJob.bids.map((eachBid) => {
                                                return (
                                                    <li style={{paddingTop: '5px', paddingBottom: '5px'}}>
                                                    <div class="freelancer-overview manage-candidates">
                                                        <div class="freelancer-overview-inner">
        
                                                            <div class="freelancer-avatar">
                                                                <img src={Avatar} alt=""/>
                                                                <a onClick={() => this.setShowBio(true)} class="view-bio-btn">view bio</a>
                                                            </div>
                                                            <div class="freelancer-name bid-details-container">
                                                                <h3 style={{fontWeight: 700}}>{`${this.capitalizeFirstLetter(eachBid.User.firstName)} ${eachBid.User.lastName.charAt(0)}.`} <span class="dashboard-status-button green" style={{fontSize: "15px"}}>{eachBid.User.usertype}</span></h3>
                                                                
                                                                <OutsideClickHandler onOutsideClick={() => this.setShowBio(false)}>
                                                                    <span style={{display: `${showBio ? 'block' : 'none'}`}} class="freelancer-detail-item">
                                                                        <div class="item-content bid-note bio-section">
                                                                            {eachBid.User.tagline}
                                                                        </div>
                                                                    </span>
                                                                </OutsideClickHandler>

                                                                <h4><i style={{ marginRight: '8px'}} class="fa fa-map-marker" aria-hidden="true"></i>{eachBid.User.nationality && eachBid.User.usercity ?`${eachBid.User.nationality}, ${eachBid.User.usercity}` : null}</h4>
                                                                
                                                                {eachBid.type === BID_TYPE_REQUEST ?
                                                                    <>
                                                                    <span class="freelancer-detail-item"><i class="icon-material-outline-date-range"></i> {dateFormat(eachBid.createdAt, "mmm dS, yyyy, h:MM TT")}</span>
                                                                        {
                                                                            this.renderRequestBidActions(eachBid.status, eachBid.id)
                                                                        }
                                                                    </>
                                                                        :
                                                                    <>
                                                                        <span class="freelancer-detail-item"><i class="icon-material-outline-date-range"></i> {dateFormat(eachBid.createdAt, "mmm dS, yyyy, h:MM TT")}</span>
                                                                        {eachBid.status === BID_ACCEPTED ? 
                                                                            <>
                                                                                <span class="freelancer-detail-item"><i class="icon-feather-mail"></i> {eachBid.User.email}</span>
                                                                                <span class="freelancer-detail-item" style={{color: "blue"}}><strong>{`$ ${eachBid.amount}`}</strong></span>
                                                                                <ul class="dashboard-task-info " style={{background: "blue"}}>
                                                                                    <li><span style={{color: "white"}}><i class="icon-material-outline-check"></i>Accepted Bid</span></li>
                                                                                </ul>
                                                                            </>
                                                                                : 
                                                                            <>
                                                                                <span class="freelancer-detail-item" style={{color: "blue"}}><strong>{`$ ${eachBid.amount}`}</strong></span>
                                                                                <ul class="dashboard-task-info bid-info">
                                                                                    <li style={{cursor: 'pointer'}} onClick={() => this.showConfirmDialog(eachBid.id, eachBid.amount)}><span style={{color: 'blue'}} >Accept Bid</span></li>
                                                                                </ul>
                                                                            </>
                                                                        }
                                                                        <div class="item-content bid-note">
                                                                            <div class="item-description margin-top-20">
                                                                            <p style={{fontSize: '15px', textAlign: 'left', marginTop: '-10px'}}>{eachBid.note ? eachBid.note : null}</p>
                                                                            </div>
                                                                        </div>


                                                                        {/* images */}
                                                                        {eachBid.bidSketches && eachBid.bidSketches.length > 0 ?
                                                                            <div class="item-content bid-note">
                                                                                <div class="boxed-list-item">
                                                                                    <div style={{width: '100%'}} class="item-content">
                                                                                    <div class="col-xl-12 col-md-12">
                                                                                    <div class="attachments-container">{lightBoxShown && imageLink ?   
                                                                                        <Lightbox onClose={this.closeLightBox} image={`${baseUrl()}/${imageLink}`} title={`${imageLink}`} />
                                                                                    : null}
                                                                                                <div style={{marginBottom: '-10px'}} class="attachments-container">
                                                                                                    { eachBid.bidSketches.map((eachFile, index) => {
                                                                                                            return <div class="col-xl-4 col-md-4 col-sm-6">
                                                                                                                    <a onClick={() => this.viewOnLightBox(eachFile)} class="photo-box small" style={{backgroundImage: `url(${baseUrl()}/${eachFile})`}}>
                                                                                                                        <div class="photo-box-content">
                                                                                                                            <i style={{fontSize: '200%', color: '#ffffff'}} class="icon-feather-zoom-in"></i>
                                                                                                                        </div>
                                                                                                                    </a>
                                                                                                                </div>
                                                                                                    })}
                                                                                                </div>
                                                                                        </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                        null }
                                                                    </>
                                                                }

                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                );
                                            })
                                            :
                                         null}

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div> 
                : 
                null }

            </div>
            </div>
        </div>

        { this.state.displayConfirmDialog ?  
            this.state.nonPaymentDialogConfirm === true ?
            <ConfirmDialog hideConfirmDialog={this.hideConfirmDialog} dialogConfirmType={this.state.dialogConfirmType} nonPaymentDialogConfirm={this.state.nonPaymentDialogConfirm} bidId={this.state.bidId} rejectViewRequestFunc={this.rejectViewRequest} acceptViewRequestFunc={this.acceptViewRequest}/>
                :
            <ConfirmDialog hideConfirmDialog={this.hideConfirmDialog} paymentType={BID_ACCEPT_PAYMENT} jobPostId={this.props.match.params.id} bidId={this.state.bidId} bidAmount={this.state.bidAmount}/> 
        : null }

        <Footer />
            </>
        );
    }
}


const mapDispatchToProps = {
    fetchMyJob,
}

const mapStateToProps = ({myJobStoreState}) => ({
    ...myJobStoreState
});

export default withToastNotificationHOC(connect(
    mapStateToProps,
    mapDispatchToProps,
) (withRouter(JobPost)));