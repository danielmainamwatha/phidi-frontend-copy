/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import {Link} from 'react-router-dom';
import dateFormat from 'dateformat';
import 'react-accessible-accordion/dist/fancy-example.css';

import AdminService from './../../services/adminService';
import {fetchAdminBids} from '../../redux/action-creator';
import AdminHeader from './../../components/admin/adminHeader';
import withToastNotificationHOC from '../../HOCs/notificationHOC';
import {BID_ACCEPTED, BID_PENDING, BID_REJECTED, WORK_STATUS_NOT_STARTED, WORK_STATUS_IN_PROGRESS, WORK_STATUS_COMPLETED} from './../../helpers/constants';

import './admin.css';

class AdminBids extends Component {
    state = {
        bidId: null,
        bidderName: null,
        clientName: null,
        jobPost: null,
        commentId: null,
        comment: null,
        bids: [],
        workStatusUpdatedBidId: null,
        workStatus: null,
        showPopup: false,
        biddingStatus: null,
    }

    componentDidMount() {
        const {fetchAdminBids} = this.props;
        const {bids} = this.props;
        this.setState({bids});
		fetchAdminBids();
    }

	static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState) {
			return { bids: nextProps.bids };
        }
	}
    
    
    handleIdChange = (e) => {
        let value = Number(e.target.value);
		this.setState({bidId: value});
    }

    handleClientNameChange = (e) => {
        let value = e.target.value;
		this.setState({clientName: value})
    }

    handleBidderNameChange = (e) => {
        let value = e.target.value;
		this.setState({bidderName: value})
    }

    handleJobPostIdChange = (e) => {
        let value = Number(e.target.value);
		this.setState({jobPostId: value})
    }

    handleCommentIdChange = (newValue) => {
		const value = newValue === null ? newValue : newValue.value;
		this.setState({commentId: value})
    }

    handleBiddingStatus = (newValue) => {
        const value = newValue === null ? newValue : newValue.value;
		this.setState({biddingStatus: value})
    }
    handleWorkStatus = (newValue) => {
        const value = newValue === null ? newValue : newValue.value;
		this.setState({workStatus: value})
    }

    fetchFilteredBids = (e) => {
		const {bidId, jobPostId, clientName, bidderName, biddingStatus, workStatus} = this.state;
        const {fetchAdminBids} = this.props;
		fetchAdminBids(bidId, jobPostId, clientName, bidderName, biddingStatus, workStatus);
    }

    handleInput = (e) => {
        e.preventDefault();
		const name = e.target.name;
        const value = e.target.value;
        const trimmedValue = value.trim();
        const nonEmptyStringVal = trimmedValue === '' ? null : trimmedValue;
        this.setState({[name]: nonEmptyStringVal});
    }

    renderPopUp = () => {
        return (
        <div class='mfp-wrap'>
                <div id="small-dialog-1" class='dialog-with-tabs mfp-wrap zoom-anim-dialog confirmation-modal'>
                <button onClick={() => this.onClose()} class="og-close mfp-close"></button>
                <div class="sign-in-form">
              <>
                <ul class="popup-tabs-nav">
                         <li><a style={{color: 'grey', fontWeight: '400'}}>Change Project Status</a></li>
                     </ul>
                <div class="popup-tabs-container">
                    <div class="popup-tab-content" id="tab">
                        <div class="welcome-text">
                            <h3 style={{fontWeight: '600'}}>Change Project Status to <span style={{color: '#2a41e8', display: 'inline', fontWeight: '800'}}>'{this.renderWorkStatus(this.state.workStatus)}'</span> ?</h3>
                        </div>
                            <div class="social-login-buttons">
                                <button onClick={this.onClose} style={{fontWeight: '600', fontSize: '15px'}} class="facebook-login-cancel ripple-effect">Cancel</button>
                                <button onClick={this.changeWorkStatus} style={{fontWeight: '600', fontSize: '15px'}} class="facebook-login-confirm ripple-effect">Change Status</button>
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
        this.setState({showPopup: false, workStatusUpdatedBidId: null, workStatus: null});
    }

    renderWorkStatus = (status) => {
        switch(status) {
            case 0:
                return 'not started';
            case 1:
                return 'in progress';
            case 2: 
                return 'completed';
            default:
                return null;
        }
    } 

    renderBidStatus = (type) => {
        switch (type) {
            case BID_ACCEPTED:
                return <span style={{color: 'green'}}>accepted</span>
            case BID_PENDING:
                return <span style={{color: '#9a6300'}}>pending</span>
            case BID_REJECTED:
                return <span style={{color: 'red'}}>rejected</span>
            default:
                return null;
        }
    }

    changeWorkStatus = async() => {
        const {workStatusUpdatedBidId, workStatus} = this.state;
        const response = await AdminService.changeWorkStatus(workStatusUpdatedBidId, workStatus);

        if (response && response.status === 200 ) {
            const {fetchAdminBids} = this.props;
			fetchAdminBids();
            this.setState({showPopup: false, workStatusUpdatedBidId: null, workStatus: null});
            return this.props.addToast(response.data.message, {
				appearance: 'success',
				autoDismiss: true,
			})
        } else {
            this.setState({showPopup: false, workStatusUpdatedBidId: null, workStatus: null});
			return this.props.addToast(response.data.message, {
				appearance: 'error',
				autoDismiss: true,
			});
		}
    }


    selectChange = (e, workStatusUpdatedBidId) => {
        this.setState({workStatus: Number(e.target.value), workStatusUpdatedBidId});
    }
    
    render() {
        const workStatus = [{value: WORK_STATUS_NOT_STARTED, label: 'not started'}, { value: WORK_STATUS_IN_PROGRESS, label: 'in progress'}, { value: WORK_STATUS_COMPLETED, label: 'completed'}];
        const biddingStatus = [{value: BID_REJECTED, label: 'rejected'}, {value: BID_PENDING, label: 'pending'}, {value: BID_ACCEPTED, label: 'accepted'}];

        const {bids} = this.state;
        
        const workStatusOptions = workStatus.map((eachOption) => {
            return {value: eachOption.value, label: eachOption.label}
		});

        const animatedComponents = makeAnimated();
        const selectStyles = { 
            menu: styles => ({ 
                ...styles, 
                zIndex: 1000,
				fontSize: '15px',
                border: 'none',
                boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            }),
            control: (styles) => ({
            ...styles,
            }),
            
        };

        return (
            <>
            <AdminHeader />
            <div style={{minHeight: '75vh'}} class="container margin-top-0 margin-bottom-30">
                <div class="row">
                    <div class="col-xl-12 col-lg-12">
                        <div class="intro-banner-search-form margin-top-5">
                            <div class="intro-search-field">
                                <input class="bid-filter-input" type="number" placeholder="bid id" onInput={this.handleIdChange}/>
                            </div>
                            <div class="intro-search-field">
                                <input class="bid-filter-input" type="number" placeholder="project id" onInput={this.handleJobPostIdChange}/>
                            </div>
                            <div class="intro-search-field">
                                <input class="bid-filter-input" type="text" placeholder="client name" onInput={this.handleClientNameChange}/>
                            </div>
                            </div>
                            
                    </div>
                    <div class="col-xl-12 col-lg-12">
                        <div class="intro-banner-search-form margin-top-5">
                            <div class="intro-search-field">
                                <input class="bid-filter-input" type="text" placeholder="bidder name" onInput={this.handleBidderNameChange}/>
                            </div>
                            <div class="intro-search-field">
                                <CreatableSelect
                                        className="basic-single" 
                                        isClearable={true} 
                                        placeholder={<span>work status</span>}
                                        options={workStatusOptions} 
                                        components={animatedComponents} 
                                        styles={selectStyles} 
                                        formatCreateLabel={(value) => `search ${value}`}
                                        defaultValue={this.state.jobPostId}
                                        onChange={this.handleWorkStatus} 
                                        />
                            </div>
                            <div class="intro-search-field">
                            <CreatableSelect
                                        className="basic-single" 
                                        isClearable={true} 
                                        placeholder={<span>bidding status</span>}
                                        options={biddingStatus} 
                                        components={animatedComponents} 
                                        styles={selectStyles} 
                                        formatCreateLabel={(value) => `search ${value}`}
                                        defaultValue={this.state.userName}
                                        onChange={this.handleBiddingStatus} 
                                        />
                            </div>
                            <div class="intro-search-button">
                                <span onClick={this.fetchFilteredBids} class="button button-sliding-icon full-width ripple-effect">search <i class="icon-material-outline-arrow-right-alt"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                <div class="col-md-12 col-xl-12 col-md-12 ">
                    <div class="tasks-list-container margin-top-1">  
                        <div class="row margin-top-50">
                            <h3 class="margin-bottom-10">Bids</h3>
                                <table class="basic-table user-admin-table">
                                    <tr>
                                        <th>ID</th>
                                        <th>JOB POST ID</th>
                                        <th>CLIENT NAME</th>
                                        <th>BIDDER NAME</th>
                                        <th>POST CREATED</th>
                                        <th>DATE BIDDED</th>
                                        <th>DATE ACCEPTED</th>
                                        <th>BID STATUS</th>
                                        <th>WORK STATUS</th>
                                        <th>CONFIRM</th>
                                    </tr>
                                    {bids ? 
                                        <>
                                        {bids.map((eachBid) => {
                                            return (
                                                <tr>
                                                    <td data-label="id">{eachBid.id}</td>
                                                    <td data-label="job post id"><Link to={`/admin/view-project/${eachBid.JobPost.id}`}>{eachBid.JobPost.id}</Link></td>
                                                    <td data-label="client name">{eachBid.JobPost.User.firstName}  {eachBid.JobPost.User.lastName}</td>
                                                    <td data-label="bidder name">{eachBid.User.firstName}  {eachBid.User.lastName}</td>
                                                    <td data-label="post created">{dateFormat(eachBid.JobPost.createdAt, "mmm/d/yyyy")}</td>
                                                    <td data-label="date bidded">{dateFormat(eachBid.createdAt, "mmm/d/yyyy")}</td>
                                                    <td data-label="date accepted">
                                                        {eachBid.status === BID_ACCEPTED ? dateFormat(eachBid.updatedAt, "mmm/d/yyyy") : '--'}
                                                    </td>
                                                    <td data-label="bidding status">{this.renderBidStatus(eachBid.status)}</td>
                                                    <td class="work-status-td" data-label="work status">
                                                        {eachBid.status === BID_ACCEPTED ? 
                                                        <select onChange={(e) => this.selectChange(e, eachBid.id)} style={{margin: '0px'}} class="work-status-select" name="cars" id="cars">
                                                            <option selected={eachBid.workstatus === WORK_STATUS_NOT_STARTED ? true : false} value='0'>not started</option>
                                                            <option selected={eachBid.workstatus === WORK_STATUS_IN_PROGRESS ? true : false} value='1'>in progress</option>
                                                            <option selected={eachBid.workstatus === WORK_STATUS_COMPLETED ? true : false} value='2'>completed</option>
                                                        </select>
                                                        : '--'}
                                                    </td>
                                                    <td data-label="confirm">
                                                        {eachBid.id === this.state.workStatusUpdatedBidId ? 
                                                        <button onClick={() => this.setState({showPopup: true})} class="button full-width ripple-effect">confirm</button>
                                                         : '--'}
                                                    </td>

                                                </tr>
                                                )
                                        })}
                                        </>  
                                    : null}
                            </table>
                        </div>
                    </div>
                </div>
                </div>
                {this.state.showPopup ? this.renderPopUp() : null}
            </div>
            </>
        )
    }
}
const mapDispatchToProps = {
    fetchAdminBids,
}

const mapStateToProps = ({adminBidsStoreState}) => ({
    ...adminBidsStoreState
});

export default withToastNotificationHOC(connect(
    mapStateToProps,
    mapDispatchToProps,
) (AdminBids));