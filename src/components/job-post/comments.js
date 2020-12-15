/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import withToastNotificationHOC from './../../HOCs/notificationHOC';
import dateFormat from 'dateformat';
import baseUrl from './../../helpers/baseURL';
import Lightbox from "react-awesome-lightbox";
import OutsideClickHandler from 'react-outside-click-handler';

import CommentsService from './../../services/comments';
import { 
    COMMENT_EDITED,
    COMMENT_DELETED
} from './../../helpers/constants';
import processToFormData from './../../helpers/toFormData';

import './../../views/wizard.css';

class Comments extends Component {
    state = {
        editableReplyId: null,
        editableCommentId: null,
        lightBoxShown: false,
        imageLink: null,
        showCommentSketches: null,
        commentIndex: null,
    }

    componentDidMount () {
        const localStorage = window.localStorage;
        const userId = localStorage.getItem('userId');
        this.setState({userId});
    }

    replyToComment = (index) => {
        this.setState({reply: true, openCommentIndex: index});
    }

    cancelCommentReply = () => {
        this.setState({reply: false})
    }

    makeReplyEditable = (replyId) => {
        this.setState({ editableReplyId: replyId });
    }

    makeCommentEditable = (commentId) => {
        this.setState({ editableCommentId: commentId });
    }

    cancelReplyEditable = () => {
        this.setState({ editableReplyId: null });
    }

    cancelCommentEditable = () => {
        this.setState({ editableCommentId: null });
    }

    handleReplyEdit = (e) => {
        this.setState({editedReply: e.target.textContent});
    }

    handleCommentEdit = (e) => {
        this.setState({editedComment: e.target.textContent});
    }

    handleSendCommentEditable = async () => {
        const {jobPostId, fetchMyJobActionCreator, jobPostBidActionCreator} = this.props;
        const response = await CommentsService.editCommentReply(this.state.editableCommentId, this.state.editedComment);
        this.setState({editedComment: '', editableCommentId: null});

        if (response.status === 200){
            if (jobPostBidActionCreator){
                jobPostBidActionCreator(jobPostId);
            } else if (fetchMyJobActionCreator){
                fetchMyJobActionCreator(jobPostId);
            }
        } else {
            return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    handleSendReplyEditable = async () => {
        const {jobPostId, fetchMyJobActionCreator} = this.props;
        const response = await CommentsService.editCommentReply(this.state.editableReplyId, this.state.editedReply);

        if (response.status === 200){
            this.setState({editedReply: '', editableReplyId: null});
            fetchMyJobActionCreator(jobPostId);
        } else {
            return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }


    handleCommentReply = (e) => {
        let value = e.target.value;
        this.setState({comment: value});
    }

    handleSendCommentReply = async (commentId) => {
        const { jobPostId, jobPostBidActionCreator, fetchMyJobActionCreator } = this.props;
        
        const response = await CommentsService.postCommentReply(this.state.comment, commentId);
        this.setState({reply: false});

        if (response.status === 201){
                if (jobPostBidActionCreator){
                    jobPostBidActionCreator(jobPostId);
                } else if (fetchMyJobActionCreator){
                    fetchMyJobActionCreator(jobPostId);
                }
			return this.props.addToast('reply successful', {
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

    renderCommentReplies = (replies) => {
        return replies.map((eachReply) => {
            return (
                <li style={{paddingBottom: '5px', paddingTop: '5px', background: '#F5F5F5'}}>
                    <div class="boxed-list-item">
                        <div class="item-content">
                            <div class="item-details margin-top-10">
                                <div class="detail-item" style={{color: 'black', fontSize: '15px', fontWeight: 500}}><i style={{color: '#2a41e8'}} class="icon-material-outline-account-circle"></i> {`${eachReply.User.firstName} ${eachReply.User.lastName.charAt(0)}.`}</div>
                                <div class="detail-item" style={{color: 'black', fontSize: '14px', fontWeight: 500}}><i style={{color: '#2a41e8'}} class="icon-material-outline-date-range"></i> {dateFormat(eachReply.createdAt, "mmm d, yyyy, h:MM TT")}</div>

                                {this.props.employer ? 
                                    <>
                                        <div  style={{cursor: 'pointer'}} class="detail-item" onClick={() => this.makeReplyEditable(eachReply.id)}><i style={{color: 'blue'}} class="icon-feather-edit-3"></i></div> 
                                        <div  style={{cursor: 'pointer'}} class="detail-item" onClick={() => this.deleteReplyAndComment(eachReply.id)}><i style={{color: 'red'}} class="icon-material-outline-delete"></i></div> 
                                    </>
                                    :
                                null }
                            </div>
                            <div class="item-description">
                                {
                                    this.state.editableReplyId === eachReply.id ? 
                                        <>
                                            <div contentEditable='true' class="item-description" style={{fontSize: '14px', padding: '10px', border: '1px solid blue'}} onInput={this.handleReplyEdit}>{eachReply.comment}</div> 
                                            <button style={{width: '45%', marginRight: '2%', background: 'gray', marginLeft: '2%', marginTop: '3px'}} onClick={this.cancelReplyEditable} class="button  button-sliding-icon ripple-effect" >cancel</button>
                                            <button style={{width: '45%',marginRight: '2%', marginLeft: '2%', marginTop: '3px'}} class="button  button-sliding-icon ripple-effect" onClick={this.handleSendReplyEditable}>Send</button>
                                        </>
                                    : 
                                        <>
                                            <div class="item-description" style={{fontSize: '14px'}}>{eachReply.comment}</div>
                                            <div class="detail-item"><span style={{fontSize: '13px', color: '#9cbadd'}}>{eachReply.edited === COMMENT_EDITED ? '[edited]' : null}</span></div>
                                        </>
                                }
                                        
                                </div>
                        </div>
                    </div>
                </li>
            );
        })
    }

    deleteReplyAndComment = async (replyId) => {
        const { jobPostId, fetchMyJobActionCreator, jobPostBidActionCreator } = this.props;
        const response = await CommentsService.deleteCommentReply(replyId);

        if (response.status === 200){
            if (jobPostBidActionCreator){
                jobPostBidActionCreator(jobPostId);
            } else if (fetchMyJobActionCreator){
                fetchMyJobActionCreator(jobPostId);
            }
        } else {
            return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    handleComment = (e) => {
        let value = e.target.value;
        this.setState({comment: value});
    }

    handleSendComment = async () => {
        const { jobPostId, jobPostBidActionCreator } = this.props;
        let formData = await processToFormData({...this.state, jobPostId});
        const response = await CommentsService.postComment(formData);
        this.setState({comment: '', commentSketches: null});

        if (response.status === 201){
            jobPostBidActionCreator(jobPostId);
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

    handleCommentSketches = (e) => {
        e.preventDefault();
		const name = "commentSketches";
        const value = e.target.files;
        this.setState((prevState) => ({[name]: value}));
    }

    handleCommentSketchesDisplay =  (commentSketches) => {
        let files = [];
        if (commentSketches && commentSketches.length > 0) {
            for (let fileKey in Object.keys(commentSketches)) {
                files.push(<span key={fileKey} style={{marginLeft: '10px', color: '#2a41e8', fontWeight: '600'}} class="uploadButton-file-namex">{commentSketches[fileKey].name ? `(${Number(fileKey) + 1}). ${commentSketches[fileKey].name}` : `(${Number(fileKey) + 1}). ${commentSketches[fileKey]}`}</span>);
            }
            if (commentSketches !== null & commentSketches.length > 0 || commentSketches !== null & commentSketches.files) {
                files.push(
                    <span style={{cursor: 'pointer', color: 'red'}} onClick={() => this.setState({commentSketches: []})} class="uploadButton-file-namex">
                        <span style={{marginLeft: '10px', color: 'red'}}>remove files</span>
                    </span>
                )
            }
        return files;
    } else {
       return files;
    }
}

    renderCommentActions = (comment) => {
        if (parseInt(this.state.userId) === comment.User.id) {
            if (comment.Comments.length >= 1) { // check if comment has replies, if so, dont show comments actions
                return null;
            } else {
                return <>
                            <div  style={{cursor: 'pointer'}} class="detail-item" onClick={() => this.makeCommentEditable(comment.id)}><i style={{color: 'blue'}} class="icon-feather-edit-3"></i></div> 
                            <div  style={{cursor: 'pointer'}} class="detail-item" onClick={() => this.deleteReplyAndComment(comment.id)}><i style={{color: 'red'}} class="icon-material-outline-delete"></i></div>    
                        </> 
            }
        }
    }

    // light box (display comment images)
    viewOnLightBox = (imageLink) => {
        this.setState({lightBoxShown: true, imageLink})
    }

    closeLightBox = () => {
        this.setState({lightBoxShown: false})
    }

    showCommentSketches = (bool, commentIndex=null) => {
        this.setState({showCommentSketches: bool, commentIndex: commentIndex})
    }

    render() {
    const {comments} = this.props;
    const {lightBoxShown, imageLink} = this.state;
    return (
        <>
            <div class="row">
                {/* <!-- Dashboard Box --> */}
                <div class="col-xl-12">
                    <div class="dashboard-box margin-top-0 margin-bottom-50">
                        {/* <!-- Headline --> */}
                        <div class="headline">
                            <h3><i class="fa fa-comments-o" aria-hidden="true"></i> Comments</h3>
                        </div>

                        <div class="content">
                            <ul class="dashboard-box-list ">
                            {lightBoxShown && imageLink ?   
                                        <Lightbox onClose={this.closeLightBox} image={`${baseUrl()}/${imageLink}`} title={`${imageLink}`} />
                                    : null}
                                {comments && comments.length > 0 ? 
                                <>
                                {comments.map((eachComment, index) => {
                                    return (
                                        <li style={{ paddingBottom: '5px', paddingTop: '5px' }}>
                                            <div class="boxed-list-item">
                                                <div class="item-content">
                                                    <div class="item-details margin-top-10">
                                                        <div class="detail-item" style={{color: 'black', fontSize: '15px', fontWeight: 500}}><i style={{color: '#2a41e8'}} class="icon-material-outline-account-circle"></i> {`${eachComment.User.firstName} ${eachComment.User.lastName.charAt(0)}.`}</div>
                                                        <div class="detail-item" style={{color: 'black', fontSize: '14px', fontWeight: 500}}><i style={{color: '#2a41e8'}} class="icon-material-outline-date-range"></i> {dateFormat(eachComment.createdAt, "mmm dS, yyyy, h:MM TT")}</div>
                                                        
                                                        {/* comment sketches trigger */}
                                                        { eachComment.commentSketches && eachComment.commentSketches.length > 0 ? 
                                                        <div  onClick={() => this.showCommentSketches(true, index)} class="detail-item attachment-icon">
                                                            <div class="header-notifications-trigger">
                                                        <a><i style={{color: 'blue', fontSize: '16px'}} class="icon-material-outline-attach-file"></i><span>{eachComment.commentSketches.length}</span></a>
                                                            </div>
                                                        </div> 
                                                        : null}

                                                        {this.renderCommentActions(eachComment, index)}

                                                        {this.props.employer? 
                                                        <div class="detail-item"><span onClick={() => this.replyToComment(index)} style={{marginLeft: '20px'}} class="button  ripple-effect">reply</span></div>
                                                        : null}

                                                    </div>

                                                    <div class="item-description">
                                                        { this.state.editableCommentId === eachComment.id ?
                                                            <>
                                                                <div contentEditable='true' class="item-description" style={{fontSize: '14px', padding: '10px', border: '1px solid blue'}} onInput={this.handleCommentEdit}>{eachComment.comment}</div> 
                                                                <button style={{width: '45%', marginRight: '2%', background: 'gray', marginLeft: '2%', marginTop: '3px', marginBottom: '15px'}} onClick={this.cancelCommentEditable} class="button  button-sliding-icon ripple-effect" >cancel</button>
                                                                <button style={{width: '45%',marginRight: '2%', marginLeft: '2%', marginTop: '3px', marginBottom: '15px'}} class="button  button-sliding-icon ripple-effect" onClick={this.handleSendCommentEditable}>Send</button>
                                                            </>
                                                        : 
                                                            <>
                                                                <p style={{fontSize: '14px'}}>{eachComment.comment}</p> 
                                                                    {eachComment.deleted === COMMENT_DELETED ? 
                                                                    <span style={{fontSize: '13px', color: '#9cbadd'}}>[deleted]</span>
                                                                : 
                                                                    <span style={{fontSize: '13px', color: '#9cbadd'}}>
                                                                        {eachComment.edited === COMMENT_EDITED ? '[edited]' : null}
                                                                    </span>
                                                                }
                                                            </>
                                                        }

                                                    {/* images */}
                                                    {this.state.commentIndex === index ?  
                                                    <OutsideClickHandler onOutsideClick={() => this.showCommentSketches(false)}>
                                                        <li style={{paddingBottom: '5px', marginBottom: '10px', background: '#ffffff'}}>
                                                            <div class="boxed-list-item">
                                                                <div style={{width: '100%'}} class="item-content">
                                                                <div class="col-xl-12 col-md-12">
                                                                <div class="attachments-container">
                                                                            <div style={{marginBottom: '-10px'}} class="attachments-container">
                                                                                {eachComment.commentSketches.map((eachFile, index) => {
                                                                                        return <div class="col-xl-4 col-md-4">
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
                                                        </li>
                                                    </OutsideClickHandler>
                                                    : null}
                                                    {/* end of images */}
                                                        
                                                        <ul class="dashboard-box-list ">
                                                            {eachComment.Comments ?
                                                                this.renderCommentReplies(eachComment.Comments)
                                                            :
                                                                null }
                                                        </ul>
                                                    </div>

                                                    {/* reply to comment */}
                                                    {this.state.reply && this.state.openCommentIndex === index?  
                                                    <div>
                                                        <div style={{marginTop: '10px', width: '100%'}}>
                                                            <textarea cols="150" placeholder="Reply to comment" class="with-border" onInput={this.handleCommentReply} ></textarea>
                                                            <button style={{width: '45%', marginRight: '2%', background: 'gray', marginLeft: '2%'}} onClick={this.cancelCommentReply} class="button  button-sliding-icon ripple-effect" >cancel<i class="icon-material-outline-arrow-right-alt"></i></button>
                                                            <button style={{width: '45%',marginRight: '2%', marginLeft: '2%'}} onClick={() => this.handleSendCommentReply(eachComment.id)} class="button  button-sliding-icon ripple-effect" >Send<i class="icon-material-outline-arrow-right-alt"></i></button>
                                                        </div>
                                                    </div>
                                                    :
                                                    null}

                                                </div>
                                            </div>
                                            
                                        </li>
                                    );
                                })}
                                </>
                                : 
                                <li>
                                    no comments yet
                                </li>}
                                {/* end comments */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {this.props.employer || this.props.admin ? null  : 
            <div class="row">
                <div style={{boxShadow: '0 2px 12px rgba(0,0,0,0.12)'}} class="col-xl-12 margin-bottom-40 padding-bottom-15">
                    <h4 class="margin-top-20 margin-bottom-20"><b>Add Comment</b></h4>

                    {/* <!-- Form --> */}
                    <form method="post" id="add-comment">
                        <textarea style={{border: '1px solid #e0e0e0'}} name="comment" cols="30" rows="0" placeholder="Comment"  onInput={this.handleComment} value={this.state.comment}></textarea>
                        <div class="col-xl-11 col-lg-11">
                            <div class="uploadButtonx">
                                {this.state.commentSketches && this.state.commentSketches.length > 0 ? null : 
                                    <>
                                        <input onChange={this.handleCommentSketches} id="uploadButtonAestheticSketch" class="uploadButton-inputx" type="file" name="commentSketches[]" accept="image/*" multiple="multiple" />
                                        <label style={{color: '#2a41e8',  border: '1px solid #2a41e8'}} class="uploadButton-buttonx ripple-effect" for="upload">Upload Files</label>
                                        <span style={{marginLeft: '10px'}} id="uploadButtonCommentsSketchFileName" class="uploadButton-file-name">Images that might be helpful to accompany the comment</span>
                                    </>
                                }
                                {this.handleCommentSketchesDisplay(this.state.commentSketches)}
                            </div>
                        </div>
                    </form>

                    {/* <!-- Button --> */}
                    <button class="button button-sliding-icon full-width ripple-effect " onClick={this.handleSendComment}>Add Comment <i class="icon-material-outline-arrow-right-alt"></i></button>
                    
                </div>
            </div>
        }
        </>
    );
    }
}

export default withToastNotificationHOC(Comments);