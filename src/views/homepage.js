/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';

import {fetchJobPosts} from './../redux/action-creator';
// import Header from './../components/header';
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
    }
    
    componentDidMount() {
        const localStorage = window.localStorage;
        const userId = localStorage.getItem('userId');
        const {fetchJobPosts} = this.props;
        const {jobPosts} = this.props;
        this.setState({jobPosts, userId});
		fetchJobPosts();
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState){
			return {jobPosts: nextProps.jobPosts};
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
                                    <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i> {eachJobPost.User.city || eachJobPost.User.nationality || '---'}</li>
                                    <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmmm dS, yyyy, h:MM TT")}</li>
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
                                    <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i> {eachJobPost.User.city || eachJobPost.User.nationality || '---'}</li>
                                    <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmmm dS, yyyy, h:MM TT")}</li>
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
                                    <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i> {eachJobPost.User.city || eachJobPost.User.nationality || '---'}</li>
                                    <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmmm dS, yyyy, h:MM TT")}</li>
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
                                <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i> {eachJobPost.User.city || eachJobPost.User.nationality || '---'}</li>
                                <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmmm dS, yyyy, h:MM TT")}</li>
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
                            <li style={{fontSize: '15px', marginRight: '30px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-map-marker" aria-hidden="true"></i> {eachJobPost.User.city || eachJobPost.User.nationality || '---'}</li>
                            <li style={{fontSize: '15px'}}><i style={{color: '#2a41e8', marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachJobPost.createdAt, "mmmm dS, yyyy, h:MM TT")}</li>
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

    render() {
        const {fetchJobPosts} = this.props;
        const {jobPosts} = this.state;
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

                            <h3>Current Jobs</h3>
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
                <Footer />
            </>
        );
    }
}

const mapDispatchToProps = {
    fetchJobPosts,
}

const mapStateToProps = ({jobPostsReducer}) => ({
    ...jobPostsReducer
});

export default withToastNotificationHOC(connect(
    mapStateToProps,
    mapDispatchToProps,
) (Homepage));