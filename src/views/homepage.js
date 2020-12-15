/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import {withRouter} from 'react-router-dom';

import {fetchJobPosts, changeShowPopupBool, fetchProfile} from './../redux/action-creator';
import Header from './../components/customHeader';
import Footer from './../components/footer';
import Sidebar from './../components/homepage/sidebar';
import withToastNotificationHOC from './../HOCs/notificationHOC';
import {
    JOB_VISIBILITY_PRIVATE, 
    REQUEST_BID_REJECTED,
    } from './../helpers/constants';

class Homepage extends Component {

    state = {
        showPopup: false,
        profile: {
            profilefilled: true
        }
    }
    
    componentDidMount() {
        const localStorage = window.localStorage;
        const userId = localStorage.getItem('userId');
        const {fetchJobPosts, fetchProfile, changeShowPopupBool} = this.props;
        const {jobPosts, showPopup} = this.props;
        this.setState({jobPosts, userId, showPopup});
        fetchJobPosts();
        fetchProfile();
        // changeShowPopupBool(true);
        
    }

    redirectToProfilePageBool = () => {
        const {profile} = this.state;
        if (profile && profile.profilefilled !== true) {
            this.props.history.push("/loading-page");
        }
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState){
			return {...nextProps};
        }
    }

    getAuthorisedBadge = (eachJobPost) => {
        const loggedInUserId = Number(localStorage.getItem('userId')); 
        if (eachJobPost.bids && eachJobPost.bids.length >= 1) {
            // check if current user is authorised
            const userId = eachJobPost.bids.filter(eachBid => eachBid.userId === parseInt(this.state.userId));
            if (userId.length >= 1) {
                if (userId[0].status === REQUEST_BID_REJECTED) {
                    return  (
                    <div class="task-listing">
                        <div class="task-listing-details">
                            <div class="task-listing-description">
                                <h3 class="task-listing-title">
                                    {eachJobPost.objective} 
                                    <>
                                        <span class='dashboard-status-button green' style={{fontSize: '15px'}}>private</span> 
                                        <span class='dashboard-status-button red' style={{fontSize: '15px'}}>rejected</span> 
                                    </>
                                </h3>

                                <ul class="task-icons">
                                    <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i> { eachJobPost.User.nationality && eachJobPost.User.city ? `${eachJobPost.User.nationality}, ${eachJobPost.User.usercity} ` : '---'}</li>
                                    <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmm dS, yyyy, h:MM TT")}</li>
                                </ul>   

                                <div class="task-tags">
                                    {eachJobPost.categories.map((eachCategory) => {
                                        return <span style={{marginLeft: '2px'}}>{eachCategory.category}</span>
                                    })}
                                </div>
                            </div>     
                        </div>
                        <div class="task-listing-bid">
                            <div class="task-listing-bid-inner">
                                <div class="task-offers">
                                    <strong>$ {eachJobPost.budget}</strong>
                                    <span style={{fontSize: '14px'}}>Projected Budget</span>
                                </div>
                                <button class="button -icon gray"><span style={{color: '#ffffff', fontWeight: 800}}>More Info</span></button>
                            </div>
                        </div>
                    </div>
                    );
                } else {
                    return (
                    <div class="task-listing">
                        <div class="task-listing-details">
                            <div class="task-listing-description">
                                <span>
                                <h3 class="task-listing-title">
                                    {eachJobPost.objective} 
                                    <>
                                        <span class='dashboard-status-button green' style={{fontSize: '15px'}}>private</span> 
                                        <span class='dashboard-status-button green' style={{fontSize: '15px'}}>authorised</span>
                                    </>
                                </h3>
                                </span>

                                <ul class="task-icons">
                                    <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i> { eachJobPost.User.nationality && eachJobPost.User.city ? `${eachJobPost.User.nationality}, ${eachJobPost.User.usercity} ` : '---'}</li>
                                    <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmm dS, yyyy, h:MM TT")}</li>
                                </ul>
                                <p style={{color: '#888888e0'}} class="task-listing-text">{eachJobPost.toggleObjective}</p> 

                        <div class="task-tags">
                            {eachJobPost.categories.map((eachCategory) => {
                                return <span style={{marginLeft: '2px'}}>{eachCategory.category}</span>
                            })}
                        </div>

                        </div>     
                    </div> <div class="task-listing-bid">
                        <div class="task-listing-bid-inner">
                            <div class="task-offers">
                                <strong>$ {eachJobPost.budget}</strong>
                                <span style={{fontSize: '14px'}}>Projected Budget</span>
                            </div>
                            {
                                loggedInUserId === eachJobPost.userId ? <Link to={`/job-post/${eachJobPost.id}`}><span style={{paddingLeft: '15px', cursor: 'pointer', paddingRight: '15px'}} class="keyword">View Your Post</span></Link>   
                                    : 
                                <Link to={`/job-post-bid/${eachJobPost.id}`}><span class="button button-sliding-icon ripple-effect">More Info
                                <i class="icon-material-outline-arrow-right-alt"></i></span></Link>
                            }
                        </div>
                    </div>

                    </div>
                    );

                }
            } else {
                return (
                    <div class="task-listing">
                        <div class="task-listing-details">
                            <div class="task-listing-description">
                                <h3 class="task-listing-title">
                                    {eachJobPost.objective} 
                                    <>
                                        <span class='dashboard-status-button green' style={{fontSize: '15px'}}>private</span> 
                                    </>
                                </h3>
    
                                <ul class="task-icons">
                                    <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i>{ eachJobPost.User.nationality && eachJobPost.User.city ? `${eachJobPost.User.nationality}, ${eachJobPost.User.usercity} ` : '---'}</li>
                                    <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmm dS, yyyy, h:MM TT")}</li>
                                </ul>   
    
                                <div class="task-tags">
                                    {eachJobPost.categories.map((eachCategory) => {
                                        return <span style={{marginLeft: '2px'}}>{eachCategory.category}</span>
                                    })}
                                </div>
    
                            </div>     
                        </div>
    
                        <div class="task-listing-bid">
                            <div class="task-listing-bid-inner">
                                <div class="task-offers">
                                    <strong>$ {eachJobPost.budget}</strong>
                                    <span style={{fontSize: '14px'}}>Projected Budget</span>
                                </div>
                                {
                                loggedInUserId === eachJobPost.userId ? <Link to={`/job-post/${eachJobPost.id}`}><span style={{paddingLeft: '15px', cursor: 'pointer', paddingRight: '15px'}} class="keyword">View Your Post</span></Link>   
                                    : 
                                    <Link to={{
                                        pathname: '/get-view-access', 
                                        state: {
                                            jobPost: eachJobPost
                                        }
                                    }}><span class="button button-sliding-icon ripple-effect">More Info <i class="icon-material-outline-arrow-right-alt"></i></span></Link>
                            }
                            </div>
                        </div>
                    </div>
                    );
            }
        } else {
            return (
                <div class="task-listing">
                    <div class="task-listing-details">
                        <div class="task-listing-description">
                            <h3 class="task-listing-title">
                                {eachJobPost.objective} 
                                <>
                                    <span class='dashboard-status-button green' style={{fontSize: '15px'}}>private</span> 
                                </>
                            </h3>

                            <ul class="task-icons">
                                <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i> { eachJobPost.User.nationality && eachJobPost.User.city ? `${eachJobPost.User.nationality}, ${eachJobPost.User.usercity} ` : '---'}</li>
                                <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmm dS, yyyy, h:MM TT")}</li>
                            </ul>   

                            <div class="task-tags">
                                {eachJobPost.categories.map((eachCategory) => {
                                    return <span style={{marginLeft: '2px'}}>{eachCategory.category}</span>
                                })}
                            </div>

                        </div>     
                    </div>

                    <div class="task-listing-bid">
                        <div class="task-listing-bid-inner">
                            <div class="task-offers">
                                <strong>$ {eachJobPost.budget}</strong>
                                <span style={{fontSize: '14px'}}>Projected Budget</span>
                            </div>

                            {
                                loggedInUserId === eachJobPost.userId ? <Link to={`/job-post/${eachJobPost.id}`}><span style={{paddingLeft: '15px', cursor: 'pointer', paddingRight: '15px'}} class="keyword">View Your Post</span></Link>   
                                    : 
                                    <Link to={{
                                        pathname: '/get-view-access', 
                                        state: {
                                            jobPost: eachJobPost
                                        }
                                    }}><span class="button button-sliding-icon ripple-effect">More Info <i class="icon-material-outline-arrow-right-alt"></i></span></Link>
                            }
                            
                        </div>
                    </div>
                </div>
                );
        }  
    }

    renderJobPostItem = (eachJobPost) => {
        const loggedInUserId = Number(localStorage.getItem('userId')); 
        if (eachJobPost.visibility === JOB_VISIBILITY_PRIVATE) {
            return ( 
                this.getAuthorisedBadge(eachJobPost)
            );

        } else {
            return (
                <div class="task-listing">
                <div class="task-listing-details">
                    <div class="task-listing-description">
                        <h3 class="task-listing-title"> {eachJobPost.objective} </h3>

                        <ul class="task-icons">
                            <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i>{ eachJobPost.User.nationality && eachJobPost.User.city ? `${eachJobPost.User.nationality}, ${eachJobPost.User.usercity} ` : '---'}</li>
                            <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmm dS, yyyy, h:MM TT")}</li>
                        </ul>
                        <p style={{color: '#888888e0'}} class="task-listing-text">{eachJobPost.toggleObjective}</p>
                        <div class="task-tags">
                            {eachJobPost.categories.map((eachCategory) => {
                                return <span style={{marginLeft: '2px'}}>{eachCategory.category}</span>
                            })}
                        </div>
                    </div>
                </div>
                <div class="task-listing-bid">
                    <div class="task-listing-bid-inner">
                        <div class="task-offers">
                            <strong>$ {eachJobPost.budget}</strong>
                            <span style={{fontSize: '14px'}}>Projected Budget</span>
                        </div>
                        {
                                loggedInUserId === eachJobPost.userId ? <Link to={`/job-post/${eachJobPost.id}`}><span style={{paddingLeft: '15px', cursor: 'pointer', paddingRight: '15px'}} class="keyword">View Your Post</span></Link>      
                                    : 
                                    <Link to={`/job-post-bid/${eachJobPost.id}`}><span class="button button-sliding-icon ripple-effect">More Info
                                    <i class="icon-material-outline-arrow-right-alt"></i></span></Link>
                            }
                    </div>
                </div>
            </div>
            );
        }
    }

    onClose = () => {
        this.props.changeShowPopupBool(false);
    }

    redirectToWizard = () => {
        this.props.changeShowPopupBool(false);
        this.props.history.push("/wizard");
    }

    renderPopUp = () => {
        return (
        <div class='mfp-wrap'>
                <div id="small-dialog-1" class='dialog-with-tabs mfp-wrap zoom-anim-dialog confirmation-modal'>
                <button onClick={() => this.onClose()} class="og-close mfp-close"></button>
                <div class="sign-in-form">
              <>
                <ul class="popup-tabs-nav">
                         <li><a style={{color: 'grey', fontWeight: '400'}}>Welcome</a></li>
                     </ul>
                <div class="popup-tabs-container">
                    <div class="popup-tab-content" id="tab">
                        <div class="welcome-text">
                            <h3 style={{fontWeight: '600'}}>Hello, welcome to Phidi</h3>
                        </div>
                            <div class="social-login-buttons">
                                <button onClick={this.onClose} style={{fontWeight: '600', fontSize: '15px'}} class="facebook-login-custom ripple-effect">Service a Project</button>
                                <button onClick={this.redirectToWizard} style={{fontWeight: '600', fontSize: '15px'}} class="facebook-login-custom ripple-effect">Post a Project</button>
                            </div>
                    </div>
                </div>
            </>
        </div>
            </div>
        </div>
        )
    }

    render() {
        const {fetchJobPosts} = this.props;
        const {jobPosts} = this.state;
        this.redirectToProfilePageBool();
        return(
            <>
            <Header />
            <div class="margin-top-70"></div>
                <div style={{minHeight: '70vh'}} class="container">
                     <div class="row">
                        <div class="col-xl-3 col-lg-4">
                            <Sidebar fetchJobPostsActionCreator={fetchJobPosts}/>
                        </div>

                        <div class="col-xl-9 col-lg-8 content-left-offset">

                            <h3>Active Posts</h3>
                            {/* <!-- Tasks Container --> */}
                            <div class="tasks-list-container compact-list margin-top-20">

                                {jobPosts ?  
                                    jobPosts.map((eachJobPost) => {
                                        return this.renderJobPostItem(eachJobPost)
                                    })
                                : null }
                            </div>

                    <div class="clearfix"></div>
                    <div class="row">
                        <div class="col-md-12 margin-bottom-60">
                        </div>
                    </div>

                        </div>
                    </div>
                </div>
                {this.state.showPopup ? this.renderPopUp() : null}
                <Footer />
            </>
        );
    }
}

const mapDispatchToProps = {
    fetchJobPosts,
    changeShowPopupBool,
    fetchProfile
}

const mapStateToProps = ({jobPostsReducer, showPopupState, profileStoreState}) => ({
    ...jobPostsReducer,
    ...showPopupState,
    ...profileStoreState
});

export default withToastNotificationHOC(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
) (Homepage)));