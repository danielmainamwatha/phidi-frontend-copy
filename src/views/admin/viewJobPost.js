/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import dateFormat from 'dateformat';

import baseUrl from './../../helpers/baseURL';
import Lightbox from "react-awesome-lightbox";
import Comments from './../../components/job-post/comments';
import Footer from './../../components/footer';
import withToastNotificationHOC from './../../HOCs/notificationHOC';
import {fetchMyJob} from './../../redux/action-creator';
import Avatar from './../../images/user-avatar-placeholder.png';
import JobPostDetails from '../../components/job-post/job-post-details';
import AdminHeader from './../../components/admin/adminHeader';
import {
    BID_TYPE_REQUEST,
    BID_ACCEPTED,
} from './../../helpers/constants';
import WizardContext from './../../helpers/wizardContext';

class JobPost extends Component {
    static contextType = WizardContext;

    state = {
        displayConfirmDialog: false,
        nonPaymentDialogConfirm: false,
        dialogConfirmType: '',
        bidAmount: 0,
        lightBoxShown: false,
        imageLink: null,
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

        // light box (display comment images)
        viewOnLightBox = (imageLink) => {
            this.setState({lightBoxShown: true, imageLink})
        }

        closeLightBox = () => {
            this.setState({lightBoxShown: false})
        }


    render() {
        const { myJob, lightBoxShown, imageLink } = this.state;
        const {fetchMyJob} = this.props;
        return (
            <>
            <AdminHeader />
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
                    </div>


                    {/* job post details */}
                    <JobPostDetails jobPostState={myJob} />

                    {/* <!-- COMMENTS SECTION --> */}
                        {myJob.comments?   
                        <Comments userId={myJob.userId} employer={false} admin={true} comments={myJob.comments} jobPostId={myJob.id} fetchMyJobActionCreator={fetchMyJob}/>
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
                                                            </div>
                                                            <div class="freelancer-name bid-details-container">
                                                                <h4>{`${eachBid.User.firstName} ${eachBid.User.lastName.charAt(0)}.`}</h4>
                                                                {eachBid.type === BID_TYPE_REQUEST ?
                                                                    <>
                                                                    <span class="freelancer-detail-item"><i class="icon-material-outline-date-range"></i> {dateFormat(eachBid.createdAt, "mmm dS, yyyy, h:MM TT")}</span>
                                                                       
                                                                    </>
                                                                        :
                                                                    <>
                                                                        <span class="freelancer-detail-item"><i class="icon-material-outline-date-range"></i> {dateFormat(eachBid.createdAt, "mmm dS, yyyy, h:MM TT")}</span>
                                                                        {eachBid.status === BID_ACCEPTED ? 
                                                                            <>
                                                                                <span class="freelancer-detail-item"><i class="icon-feather-mail"></i> {eachBid.User.email}</span>
                                                                                <span class="freelancer-detail-item" style={{color: "blue"}}><strong>{`$ ${eachBid.amount}`}</strong></span>
                                                                                <ul class="dashboard-task-info " style={{background: "blue"}}>
                                                                                </ul>
                                                                            </>
                                                                                : 
                                                                            <>
                                                                                <span class="freelancer-detail-item" style={{color: "blue"}}><strong>{`$ ${eachBid.amount}`}</strong></span>
                                                                                <ul class="dashboard-task-info bid-info">
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