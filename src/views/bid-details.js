import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router-dom";
import Footer from './../components/footer';
import bidsService from './../services/bidsService';
import withNotificationHOC from './../HOCs/notificationHOC';
import JobPostDetails from '../components/job-post/job-post-details';
import CustomHeader from '../components/customHeader';

import {
    BID_ACCEPTED,
    BID_PENDING
} from './../helpers/constants';

class BidDetails extends Component {
    state = {
        bid: {
            objective: '',
            budget: '',
        },
        jobPost: {
            objective: '',
            toggleObjective: '',
            budget: '',
        }
    }

    componentDidMount () {
        const id = this.props.match.params.id;
        this.fetchBid(Number(id));
    }

    fetchBid = async(id) => {
        const response = await bidsService.fetchSingleBid(id);
        if (response.status === 200) {
            this.setState({bid: response.data.bid, jobPost: response.data.bid.JobPost});
        } else {
            return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    } 

    renderBidStatus = (status) => {
        if (status === BID_PENDING) {
            return <div style={{background: '#fbf6dd', padding: '15px', width: '10vw', textAlign: 'center'}}>bid pending</div>
        } else if (status === BID_ACCEPTED) {
            return <div style={{background: '#e0f5d7', padding: '0px', width: '10vw', textAlign: 'center'}}>bid accepted</div>
        }
        else {
            return null;
        }
    }


    titleBar = () => {
        return (
            <div class="single-page-header">
            <div class="container">
                <div class="row">
                   {this.state.bid ? 
                    <div class="col-md-12">
                    <div class="single-page-header-inner">
                        <div class="left-side">
                            <div class="header-details">
                                <h3 style={{color: 'black', fontWeight: '600'}}>{this.state.jobPost.objective}</h3>
                                <Link to={`/job-post-bid/${this.state.jobPost.id}`}><h3 style={{color: '#2a41e8', fontWeight: '600', cursor: 'pointer'}}>[view full project details]</h3></Link>
                                {this.renderBidStatus(this.state.bid.status)}
                            </div>
                        </div>
                        <div class="right-side">
                            <div class="salary-box">
                                <div class="salary-type">Project Budget</div>
                                <div class="salary-amount">${this.state.jobPost.budget}</div>
                            </div>
                            <div class="salary-box">
                                <div class="salary-type">My Bid</div>
                                <div class="salary-amount">$ {this.state.bid.amount}</div>
                            </div>
                            
                        </div>
                    </div>
                </div> 
                :
                null
                }
                </div>
            </div>
        </div>
        );
    }

    render() {
            return (
                <>
                    <CustomHeader />
                    {this.titleBar()}
                    <div style={{minHeight: '35vh'}} class="container margin-top-50 margin-bottom-50">
                        <div class="row margin-bottom-50">

                            {/* <!-- Content --> */}
                            <div class="col-xl-12 col-lg-12 content-right-offset">

                                {/* <!-- Description --> */}
                                <div class="single-page-section">
                                    <h3 style={{fontWeight: 700, fontSize: '25px'}} class="margin-bottom-25 ">Project Description</h3>
                                    <p style={{fontWeight: 600}}>{this.state.jobPost.objective}</p>
                                    <p>{this.state.jobPost.toggleObjective}</p>

                                </div>
                    {/* job post details */}
                    <JobPostDetails jobPostState={this.state.jobPost} />

                                <div class="clearfix"></div>

                                {/* <!-- Freelancers Bidding Was Here --> */}

                                <Link to={'/bids'}><button style={{padding: '10px', paddingLeft: '40px', paddingRight: '40px'}} class="button button-sliding-icon ripple-effect margin-top-40" ><i class="icon-material-outline-arrow-back"></i> Back </button></Link>
                            </div>

                        </div>
                    </div>

                    <Footer />
                </>
            )
    }
}

export default withRouter(withNotificationHOC(BidDetails));
