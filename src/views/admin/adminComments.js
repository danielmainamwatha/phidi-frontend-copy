/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import CreatableSelect from 'react-select/creatable';
import makeAnimated from 'react-select/animated';
import dateFormat from 'dateformat';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import AdminService from './../../services/adminService';
import {fetchAdminComments} from '../../redux/action-creator';
import AdminHeader from './../../components/admin/adminHeader';
import withToastNotificationHOC from '../../HOCs/notificationHOC';
import { 
    COMMENT_EDITED,
    COMMENT_DELETED
} from './../../helpers/constants';

import './admin.css';

class AdminMessages extends Component {
    state = {
        userId: null,
        userName: null,
        jobPostId: null,
        jobPost: null,
        commentId: null,
        comment: null,
        optionCommentsData: [],
        comments: []
    }

    componentDidMount() {
        this.fetchOptionComments();
        const {fetchAdminComments} = this.props;
        const {comments} = this.props;
        this.setState({comments});
		fetchAdminComments();
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState) {
			return { comments: nextProps.comments };
        }
    }
    
    fetchOptionComments = async() => {
		const response = await AdminService.fetchAdminComments();

		if (response && response.status === 200) {
			this.setState({optionCommentsData: response.data.comments})
		} else {
            return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: false,
            });
		}
    }
    
    handleIdChange = (newValue) => {
		const value = newValue === null ? newValue : newValue.value;
		this.setState({userId: value})
    }

    handleUserNameChange = (newValue) => {
		const value = newValue === null ? newValue : newValue.value;
		this.setState({userName: value})
    }

    handleJobPostIdChange = (newValue) => {
		const value = newValue === null ? newValue : newValue.value;
		this.setState({jobPostId: value})
    }

    handleCommentIdChange = (newValue) => {
		const value = newValue === null ? newValue : newValue.value;
		this.setState({commentId: value})
	}

    fetchFilteredComments = (e) => {
		const {userId, userName, jobPostId, jobPost, commentId, comment} = this.state;
        const {fetchAdminComments} = this.props;
		fetchAdminComments(userId, userName, jobPostId, jobPost, commentId, comment);
    }

    handleInput = (e) => {
        e.preventDefault();
		const name = e.target.name;
        const value = e.target.value;
        const trimmedValue = value.trim();
        const nonEmptyStringVal = trimmedValue === '' ? null : trimmedValue;
        this.setState({[name]: nonEmptyStringVal});
    }

    hideComment = async (id) => {
        const response = await AdminService.hideComment(id);

        if (response && response.status === 200) {
            const {fetchAdminComments} = this.props;
		    fetchAdminComments();
            return this.props.addToast(response.data.message, {
                appearance: 'success',
                autoDismiss: true,
            });
		} else {
            return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
		}
    }

    showComment = async (id) => {
        const response = await AdminService.showComment(id);

        if (response && response.status === 200) {
            const {fetchAdminComments} = this.props;
		    fetchAdminComments();
            return this.props.addToast(response.data.message, {
                appearance: 'success',
                autoDismiss: true,
            });
		} else {
            return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
		}

    }
    
    render() {
        const {comments} = this.state;
        const userIdOptions = this.state.optionCommentsData.map((eachComment) => {
            return {value: eachComment.User.id, label: eachComment.User.id }
		});

		const firstNameOptions = this.state.optionCommentsData.map((eachComment) => {
            return {value: `${eachComment.User.firstName} ${eachComment.User.lastName}`, label: `${eachComment.User.firstName} ${eachComment.User.lastName}`}
        });
        
        const jobPostIdOptions = this.state.optionCommentsData.map((eachComment) => {
            return {value: eachComment.jobPostId, label: eachComment.jobPostId}
        });
        
        const commentIdOptions = this.state.optionCommentsData.map((eachComment) => {
            return {value: eachComment.id, label: eachComment.id}
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
            <div style={{minHeight: '75vh'}} class="container-fluid margin-top-70 margin-bottom-30">
                <div class="row">
                    <div class="col-xl-3 col-lg-4">
                        <div class="sidebar-container sidebar-admin">
                        <Accordion allowZeroExpanded>
                                        <AccordionItem>
                                            <AccordionItemHeading>
                                                <AccordionItemButton>
                                                    Filters
                                                </AccordionItemButton>
                                            </AccordionItemHeading>
                                            <AccordionItemPanel>
                            <div>

                            <div class="sidebar-widget">
                                <CreatableSelect
                                    className="basic-single" 
                                    isClearable={true} 
                                    placeholder={<span>user id</span>}
									options={userIdOptions} 
									components={animatedComponents} 
                                    styles={selectStyles} 
                                    formatCreateLabel={(value) => `search ${value}`}
									defaultValue={this.state.userId}
									onChange={this.handleIdChange} 
                                    />
                            </div>
                            <div class="sidebar-widget">
                                <CreatableSelect
                                        className="basic-single" 
                                        isClearable={true} 
                                        placeholder={<span>user name</span>}
                                        options={firstNameOptions} 
                                        components={animatedComponents} 
                                        styles={selectStyles} 
                                        formatCreateLabel={(value) => `search ${value}`}
                                        defaultValue={this.state.userName}
                                        onChange={this.handleUserNameChange} 
                                        />
                            </div>
                            <div class="sidebar-widget">
                                <CreatableSelect
                                        className="basic-single" 
                                        isClearable={true} 
                                        placeholder={<span>project id</span>}
                                        options={jobPostIdOptions} 
                                        components={animatedComponents} 
                                        styles={selectStyles} 
                                        formatCreateLabel={(value) => `search ${value}`}
                                        defaultValue={this.state.jobPostId}
                                        onChange={this.handleJobPostIdChange} 
                                        />
                            </div>
                            <div class="sidebar-widget">
                                <textarea name="jobPost" className="comments-textarea" onInput={this.handleInput} style={{minHeight: '30px', color: '#6d74cc', border: 'solid #cccccc 1px', fontWeight: 550}} placeholder='project'/>
                            </div>

                            <div class="sidebar-widget">
                                <CreatableSelect
                                        className="basic-single" 
                                        isClearable={true} 
                                        placeholder={<span>comment id</span>}
                                        options={commentIdOptions} 
                                        components={animatedComponents} 
                                        styles={selectStyles} 
                                        formatCreateLabel={(value) => `search ${value}`}
                                        defaultValue={this.state.commentId}
                                        onChange={this.handleCommentIdChange} 
                                        />
                            </div>
                            <div class="sidebar-widget">
                                <textarea name="comment" className="comments-textarea" onInput={this.handleInput} style={{minHeight: '30px', color: '#6d74cc', border: 'solid #cccccc 1px', fontWeight: 550}} placeholder='comment'/>
                            </div>
                            <div class="sidebar-widget">
                                <span onClick={this.fetchFilteredComments} class="button button-sliding-icon full-width ripple-effect">search <i class="icon-material-outline-arrow-right-alt"></i></span>
                            </div>

                            <div class="clearfix"></div>

                        </div>
                                                </AccordionItemPanel>
                                            </AccordionItem>
                                        </Accordion>
                    </div>
                    </div>

                    
		    <div class="col-xl-9 col-lg-8 content-left-offset offset-comments">
            <h3 class="page-title">Comments</h3>
                <div class="tasks-list-container margin-top-1">    

                    {comments && comments.length > 0 ?
                        <>
                            {comments.map((eachComment) => (
                                <a class="task-listing">
                                    <div class="task-listing-details">

                                        <div class="task-listing-description">
                                            <p class="task-listing-text">{eachComment.comment}</p>
                                        </div>
                                        <ul class="task-icons">
                                            <li style={{fontSize: '13px', marginRight: '30px'}}><i style={{marginRight: '3px'}} class="icon-material-outline-account-circle" aria-hidden="true"></i> {eachComment.User? eachComment.User.firstName : null} {eachComment.User? eachComment.User.lastName : null}</li>
                                            <li style={{fontSize: '13px'}}><i style={{marginRight: '3px'}} class="fa fa-clock-o" aria-hidden="true"></i> {dateFormat(eachComment.createdAt, "mmm dS, yyyy")}</li>
                                            <li style={{fontSize: '13px'}}>{eachComment.edited === COMMENT_EDITED ? '[edited]' : null}</li>
                                            <li style={{fontSize: '13px', color: 'red'}}>{eachComment.deleted === COMMENT_DELETED ? '[deleted]' : null}</li>
                                        </ul>

                                    </div>
                                    {eachComment.active ?  
                                    <div class="task-listing-bid">
                                        <div class="task-listing-bid-inner">
                                            <span onClick={() => this.hideComment(eachComment.id)} class="button button-sliding-icon ripple-effect">Hide <i class="icon-material-outline-arrow-right-alt"></i></span>
                                        </div>
                                    </div>
                                        : 
                                        <div class="task-listing-bid">
                                            <div class="task-listing-bid-inner">
                                                <span style={{background: 'grey'}} onClick={() => this.showComment(eachComment.id)} class="button button-sliding-icon ripple-effect"> Show <i class="icon-material-outline-arrow-right-alt"></i></span>
                                            </div>
                                        </div>
                                    }
                                </a> 
                            ))}
                        </>
                     : 
                        null
                    } 
                </div>
            </div>
                </div>
            </div>
            </>
        )
    }
}
const mapDispatchToProps = {
    fetchAdminComments,
}

const mapStateToProps = ({adminCommentsStoreState}) => ({
    ...adminCommentsStoreState
});

export default withToastNotificationHOC(connect(
    mapStateToProps,
    mapDispatchToProps,
) (AdminMessages));