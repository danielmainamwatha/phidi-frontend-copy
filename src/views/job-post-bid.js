/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";

import Footer from '../components/footer';
import {fetchJobPostBid} from './../redux/action-creator';
import Comments from '../components/job-post/comments';
import withToastNotificationHOC from './../HOCs/notificationHOC';
import ConfirmDialog from '../components/confirm-dialog';
import JobPostDetails from '../components/job-post/job-post-details';
import CustomHeader from '../components/customHeader';
import ProfileDialog from '../components/profileModal';
import {
    BID_PAYMENT,
} from '../helpers/constants';
import './views.css';

class JobPostBid extends  Component {
    state = {
        displayProfileDialog: false,
        bidAmount: 0,
        bidNote: '',
        displayConfirmDialog: false,
        jobPostBid: {
            alreadyBid: false
        },
        bidSketches: null, 
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        const {fetchJobPostBid} = this.props;
        const {jobPostBid} = this.props;
        this.setState({jobPostBid});
		fetchJobPostBid(id);
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState){
			return {jobPostBid: nextProps.jobPostBid, profile: nextProps.profile };
        }
    }

    handleBidAmount = (e) => {
        this.setState({bidAmount: e.target.value});
    }

    handleBidNote = (e) => {
        this.setState({bidNote: e.target.value});
    }

    renderConfirmDialogVisible = () => {
        const {profile} = this.state;
        console.log('profile', profile);
        if (profile && profile.profilefilled === false) {
            this.setState({displayProfileDialog: true});

        } else {
            this.setState({displayConfirmDialog: true});
        }
    }

    hideConfirmDialog = () => {
        this.setState({displayConfirmDialog: false});
    }

    handleBidSketches = (e) => {
        e.preventDefault();
		const name = "bidSketches";
        const value = e.target.files;
        this.setState((prevState) => ({[name]: value}));
    }

    handleBidSketchesDisplay = (bidSketches) => {
        let files = [];
        if (bidSketches && bidSketches.length > 0) {
            for (let fileKey in Object.keys(bidSketches)) {
                files.push(<span key={fileKey} style={{marginLeft: '10px', color: '#2a41e8', fontWeight: '600'}} class="uploadButton-file-name">{bidSketches[fileKey].name ? `(${Number(fileKey) + 1}). ${bidSketches[fileKey].name}` : `(${Number(fileKey) + 1}). ${bidSketches[fileKey]}`}</span>);
            }
            if (bidSketches !== null & bidSketches.length > 0 || bidSketches !== null & bidSketches.files) {
                files.push(
                    <span style={{cursor: 'pointer', color: 'red'}} onClick={() => this.setState({bidSketches: []})} class="uploadButton-file-namex">
                        <span style={{marginLeft: '10px', color: 'red'}}>remove files</span>
                    </span>
                )
            }
        return files;
    } else {
       return <span id="uploadButtonCommentsSketchFileName" class="uploadButton-file-name">Images that might be helpful to accompany the note</span>
    }
}


hideProfileDialog = () => {
    this.setState({displayProfileDialog: false});
}

    render () {
        const jobPostBidId = JSON.parse(this.props.match.params.id);
        const {fetchJobPostBid} = this.props;
        const jobPostBidInState = this.state.jobPostBid;
        
    return (
        <>
        <CustomHeader/>

        <div class="single-page-header" >
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="single-page-header-inner">
                            <div class="left-side">
                                <div class="header-details">
                                <h3>{jobPostBidInState ? jobPostBidInState.title : null}</h3>
                                    <h4 style={{color: '#2a41e8', fontWeight: 700, marginBottom: '10px'}}>About the Employer</h4>
                                    <ul>
                                        <li><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i> {jobPostBidInState ? `${jobPostBidInState.User.nationality}, ${jobPostBidInState.User.usercity} `: '--'}</li>
                                        {jobPostBidInState && jobPostBidInState.User.company ? <li><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-building-o" aria-hidden="true"></i> {jobPostBidInState.User.company }, <>{jobPostBidInState && jobPostBidInState.User.city ? jobPostBidInState.User.city : null}</> </li>  : null}
                                    </ul>
                                    { jobPostBidInState ? 
                                    jobPostBidInState.alreadyBid ? 
                                    <h4 style={{background: '#ffcdcd', color: 'white', fontSize: '18px'}} class="notify-box margin-top-15">You have already bid on this project!</h4>
                                        :
                                        null
                                        :
                                null
                            } 
                                </div>
                            </div>
                            <div class="right-side">
                                <div class="salary-box">
                                    <div class="salary-type">Project Budget</div>
                                    <div class="salary-amount">{jobPostBidInState ? `$ ${jobPostBidInState.budget}` : null}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        {/* content */}
        <div style={{minHeight: '60vh'}} class="container">
            <div class="row">

                <div class="col-xl-8 col-lg-8 content-right-offset">
                    <div class="single-page-section">
                        <h3 style={{color: '#2a41e8'}} class="margin-bottom-25">Project Description</h3>
                        <p style={{fontWeight: 700}}>{ jobPostBidInState ? jobPostBidInState.objective : null }</p>
                        <p>{ jobPostBidInState ? jobPostBidInState.toggleObjective : null }</p>
                    </div>

                    <JobPostDetails jobPostState={jobPostBidInState} />

                    {jobPostBidInState ? 
                        <Comments paymentType={BID_PAYMENT} userId={jobPostBidInState.userId} comments={jobPostBidInState.comments} jobPostBidActionCreator={fetchJobPostBid} jobPostId={jobPostBidInState ? jobPostBidInState.id : null}/>
                            :
                        null
                    }
                </div>


                {/* <!-- Sidebar --> */}
                <div class="col-xl-4 col-lg-4">
                    <div class="sidebar-container">

                        <div class="sidebar-widget bid-sidebar">
                            <div class="bidding-widget">
                                <div class="bidding-headline">
                                    <h3>Bid on this job!</h3>
                                </div>
                                <div class="bidding-inner">

                                    <div >
                                    <div class="section-headline margin-top-25 margin-bottom-12">
                                        <h5>Set your bidding amount ($)</h5>
                                    </div>
                                    <input type='number' placeholder='type bid amount' onInput={this.handleBidAmount}/>

                                </div>
                                    <span style={{fontWeight: 600}} class="bidding-detail margin-top-30">Add a note</span>

                                    <div class="bidding-fields">
                                        <div class="bidding-field">
                                            <textarea onInput={this.handleBidNote} cols="30" rows="3" class="with-border" placeholder="Note"></textarea>
                                            
                                            <div class="col-xl-11 col-lg-11">
                                                <div class="uploadButtonx">
                                                    {this.state.bidSketches && this.state.bidSketches.length > 0 ? null : 
                                                        <>
                                                            <input onChange={this.handleBidSketches} id="uploadButtonAestheticSketch" class="uploadButton-inputx" type="file" name="bidSketches[]" accept="image/*" multiple="multiple" />
                                                            <label style={{color: '#2a41e8',  border: '1px solid #2a41e8'}} class="uploadButton-buttonx ripple-effect" for="upload">Upload Files</label>
                                                        </>
                                                    }
                                                    {this.handleBidSketchesDisplay(this.state.bidSketches)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    { jobPostBidInState ? 
                                        jobPostBidInState.alreadyBid ? 
                                            <button style={{boxShadow: 'none'}} class="button full-width gray button-sliding-icon ripple-effect">Place a Bid<i class="icon-material-outline-arrow-right-alt"></i></button>
                                            :
                                            <button onClick={this.renderConfirmDialogVisible} class="button full-width button-sliding-icon ripple-effect">Place a Bid<i class="icon-material-outline-arrow-right-alt"></i></button>
                                         :
                                    <button onClick={this.renderConfirmDialogVisible} class="button full-width button-sliding-icon ripple-effect">Place a Bid<i class="icon-material-outline-arrow-right-alt"></i></button>
                                    } 
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
        {this.state.displayConfirmDialog ?  
            <ConfirmDialog hideConfirmDialog={this.hideConfirmDialog} bidAmount={this.state.bidAmount} bidNote={this.state.bidNote} jobPostBidId={jobPostBidId} bidSketches={this.state.bidSketches}/>
        : null}
        {this.state.displayProfileDialog ? 
            <ProfileDialog hideProfileDialog={this.hideProfileDialog} currentPageLink={`/job-post-bid/${this.props.match.params.id}`}/>
                : 
            null
        }
    <Footer />
        </>
    );
    }

}

// export default JobPostBid;
const mapDispatchToProps = {
    fetchJobPostBid,
}

const mapStateToProps = ({jobPostBidStoreState, profileStoreState}) => ({
    ...jobPostBidStoreState,
    ...profileStoreState
});

export default withToastNotificationHOC(connect(
    mapStateToProps,
    mapDispatchToProps,
) (withRouter(JobPostBid)));
