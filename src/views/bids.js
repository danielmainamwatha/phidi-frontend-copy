/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';

import {fetchBids} from './../redux/action-creator';
import Footer from './../components/footer';
// import Header from './../components/header';
import Header from './../components/customHeader';
import withToastNotificationHOC from './../HOCs/notificationHOC';
import {
    BID_TYPE_REQUEST,
    REQUEST_BID_PENDING,
    REQUEST_BID_AUTHORIZED,
    REQUEST_BID_REJECTED,
    BID_ACCEPTED,
} from './../helpers/constants';

class Bids extends Component {
    state = {
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState) {
			return { bids: nextProps.bids };
        }
	}

    componentDidMount() {
        const {fetchBids} = this.props;
        fetchBids();
        const {bids} = this.props;
        this.setState({bids: bids});
    }

    renderRequestBidStatus = (eachBid) => {
        if (eachBid.status === REQUEST_BID_PENDING) {
            return  <>
                        <div class="job-listing width-adjustment">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                    <h4 class="job-listing-title"> {eachBid.JobPost.objective} </h4>
                                </div>
                            </div>
                        </div> 
                        <ul class="dashboard-task-info">
                            <li><span>view request<strong></strong></span></li>
                            <li><strong></strong><span>{dateFormat(eachBid.createdAt, "mmmm dS, yyyy, h:MM TT")}</span></li>
                            <li><strong>status</strong><span>pending</span></li>
                        </ul>
                    </>
        } else if (eachBid.status === REQUEST_BID_AUTHORIZED) {
            return <>
                        <div class="job-listing width-adjustment">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                    <h4 class="job-listing-title"><Link to={`job-post-bid/${eachBid.JobPost.id}`}> {eachBid.JobPost.objective} </Link></h4>
                                </div>
                            </div>
                        </div> 
                        <ul class="dashboard-task-info">
                            <li><span>view request<strong></strong></span></li>
                            <li><strong></strong><span>{dateFormat(eachBid.createdAt, "mmmm dS, yyyy, h:MM TT")}</span></li>
                            <li>status<span style={{color: 'blue'}}>authorized</span></li>
                        </ul>
                    </>
        } else if (eachBid.status === REQUEST_BID_REJECTED) {
            return <>
                        <div class="job-listing width-adjustment">
                            <div class="job-listing-details">
                                <div class="job-listing-description">
                                    <h4 class="job-listing-title"> {eachBid.JobPost.objective} </h4>
                                </div>
                            </div>
                        </div> 
                        <ul class="dashboard-task-info">
                            <li><span>view request<strong></strong></span></li>
                            <li><strong></strong><span>{dateFormat(eachBid.createdAt, "mmmm dS, yyyy, h:MM TT")}</span></li>
                            <li>status<span style={{color: 'red'}}>rejected</span></li>
                        </ul>
                    </>
        }
    }

    renderBidStatus = (status) => {
        if (status === BID_ACCEPTED) {
            return <li><span class="dashboard-status-button green">bid accepted</span></li>
        } else {
            return <li><span class="dashboard-status-button yellow">bid pending</span></li> 
        }
    }

    render() {
        const {bids} = this.state;
        return (
            <>
            <Header/>
            <div  class="container">
                <div class="dashboard-content-inner">

                    <div style={{minHeight: '70vh'}} class="row">

                        <div class="col-xl-12 col-lg-12">
                                <div class="dashboard-headline">
                                    <h3>My Bids</h3>
                                </div>
                            <div  class="dashboard-box ">
                                <div class="headline">
                                    <h3><i class="icon-material-outline-gavel"></i> My Bids</h3>
                                </div>

                                <div class="content">

                                <ul class="dashboard-box-list">
                                    { bids ?
                                        bids.map((eachBid) => (
                                        <li>

                                        {eachBid.type === BID_TYPE_REQUEST ? 
                                            this.renderRequestBidStatus(eachBid)
                                            :
                                                <>
                                                    <div class="job-listing width-adjustment">

                                                        <div class="job-listing-details">
                                                            <div class="job-listing-description">
                                                                <p style={{maxWidth: '70vh'}} class="job-listing-title"><Link to={`bid-details/${eachBid.id}`}>{eachBid.JobPost.objective}</Link>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                        <ul class="dashboard-task-info">
                                                            <li>bid amount<span><strong>{`$ ${eachBid.amount}`}</strong></span></li>
                                                            <li><strong></strong><span>{dateFormat(eachBid.createdAt, "mmmm dS, yyyy")}</span></li>
                                                            {this.renderBidStatus(eachBid.status)}
                                                    </ul>
                                                </>
                                            }
                                        </li>
                                        ))
                                    : 
                                            
                                    <li>
                                        <div class="job-listing width-adjustment">

                                            <div class="job-listing-details">
                                                <div class="job-listing-description">
                                                    <div class="job-listing-footer">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    }
                                      
                                    </ul>
                                </div>
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
    fetchBids,
}

const mapStateToProps = ({bidsStoreState}) => ({
    ...bidsStoreState
});

export default withToastNotificationHOC(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Bids));