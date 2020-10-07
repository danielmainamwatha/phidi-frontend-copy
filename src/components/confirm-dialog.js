/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    BID_PAYMENT,
    JOB_POST_PAYMENT,
    BID_ACCEPT_PAYMENT,
    ACCEPT_VIEW_REQUEST
} from '../helpers/constants';

const ConfirmDialog = (props) => {
    const history = useHistory();
    const {hideConfirmDialog, bidAmount, bidNote, bidSketches, jobPostBidId, jobPostId, paymentType, bidId, nonPaymentDialogConfirm, dialogConfirmType, rejectViewRequestFunc, acceptViewRequestFunc} = props;


    const onClose = () => {
        hideConfirmDialog();
        history.push('/job-posts');
    }

    const renderPaymentSpecificComponents = (paymentType) => {
        if (paymentType === JOB_POST_PAYMENT) {

            return (
                <div class="sign-in-form">
                    <ul class="popup-tabs-nav">
                        <li><a>Publish Project</a></li>
                    </ul>
                    <div class="popup-tabs-container">
                        <div class="popup-tab-content" id="tab">
                            <div class="welcome-text">
                                <h3>Accept billing to publish Project</h3>
                                <div class="bid-acceptance margin-top-15">
                                    Service Fee:  $25
                                </div>
                            </div>
                            <Link
                                to={{
                                    pathname: "/bid-payment",
                                    state: { 
                                        jobPostId,
                                        paymentType: JOB_POST_PAYMENT,
                                    }
                                }}> <button class="margin-top-15 button full-width button-sliding-icon ripple-effect"> Accept Billing <i class="icon-material-outline-arrow-right-alt"></i></button> </Link>
                        </div>
                    </div>
                </div> );

        } else if (paymentType === BID_ACCEPT_PAYMENT) {

            return (
                <div class="sign-in-form">
                    <ul class="popup-tabs-nav">
                        <li><a>Accept Bid Acceptance billing</a></li>
                    </ul>
                    <div class="popup-tabs-container">
                        <div class="popup-tab-content" id="tab">
                            <div class="welcome-text">
                                <h3>Accept billing to accept a bid</h3>
                                <div class="bid-acceptance margin-top-15">
                                  Service Fee: $ {bidAmount}
                                </div>
                            </div>
                            <Link
                                to={{
                                    pathname: "/bid-payment",
                                    state: { 
                                        jobPostId,
                                        bidId,
                                        paymentType: BID_ACCEPT_PAYMENT,
                                        bidAmount
                                    }
                                }}> <button class="margin-top-15 button full-width button-sliding-icon ripple-effect"> Accept Billing <i class="icon-material-outline-arrow-right-alt"></i></button> </Link>
                        </div>
                    </div>
                </div>);

        } else {
            return (
                <div class="sign-in-form">
                    <ul class="popup-tabs-nav">
                        <li><a>Complete Bid</a></li>
                    </ul>
                    <div class="popup-tabs-container">
                        <div class="popup-tab-content" id="tab">
                            <div class="welcome-text">
                                <h3>Bid ${bidAmount} for this project?</h3>
                                <div class="bid-acceptance margin-top-15">
                                    Service Fee: $1
                                </div>
                            </div>
                            <Link
                                to={{
                                    pathname: "/bid-payment",
                                    state: { 
                                        bidAmount, 
                                        bidNote, 
                                        bidSketches,
                                        jobPostBidId,
                                        paymentType: BID_PAYMENT,
                                    }
                                }}> <button class="margin-top-15 button full-width red button-sliding-icon ripple-effect"> Accept Billing <i class="icon-material-outline-arrow-right-alt"></i></button> </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    const renderNonPaymentDialogConfirm = () => {
        return (
            <div class="sign-in-form">
                {dialogConfirmType === ACCEPT_VIEW_REQUEST ?
                 <> 
                 <ul class="popup-tabs-nav">
                  <li><a>Accept View Access Request</a></li>
                </ul>
                <div class="popup-tabs-container">
                    <div class="popup-tab-content" id="tab">
                        <div class="welcome-text">
                            <h3>Are you sure you want to accept view request bid?</h3>
                        </div>
                    <button class="margin-top-15 button full-width button-sliding-icon ripple-effect" onClick={() => acceptViewRequestFunc(bidId)}> Accept View Request <i class="icon-material-outline-arrow-right-alt"></i></button>
                    </div>
                </div> 
              </> :
              <>
                <ul class="popup-tabs-nav">
                    <li><a>Reject View Access Request</a></li>
                </ul>
                <div class="popup-tabs-container">
                    <div class="popup-tab-content" id="tab">
                        <div class="welcome-text">
                            <h3>Are you sure you want to reject view request bid?</h3>
                        </div>
                    <button class="margin-top-15 button full-width button-sliding-icon ripple-effect" onClick={() => rejectViewRequestFunc(bidId)}> Reject View Request <i class="icon-material-outline-arrow-right-alt"></i></button>
                    </div>
                </div>
            </>
            }
        </div>
        );
    }

    return (
        <div class='mfp-wrap'>
            <div id="small-dialog-1" class='dialog-with-tabs mfp-wrap zoom-anim-dialog confirmation-modal'>
            <button onClick={onClose} class="og-close mfp-close"></button>

            {nonPaymentDialogConfirm ?
            renderNonPaymentDialogConfirm()
                :
            renderPaymentSpecificComponents(paymentType)}
        </div>
    </div>
    );
}

export default ConfirmDialog;