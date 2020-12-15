/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useHistory } from "react-router-dom";
import {
    BID_ACCEPT_PAYMENT,
} from '../helpers/constants';

const ProfileDialog = (props) => {
    const {hideProfileDialog, currentPageLink} = props;

    const onClose = () => {
        hideProfileDialog();
    }

    return (
        <div class='mfp-wrap'>
            <div id="small-dialog-1" class='dialog-with-tabs mfp-wrap zoom-anim-dialog confirmation-modal'>
            <button onClick={onClose} class="og-close mfp-close"></button>

            <div class="sign-in-form">
                    <ul class="popup-tabs-nav">
                        <li><a>Fill profile details</a></li>
                    </ul>
                    <div class="popup-tabs-container">
                        <div class="popup-tab-content" id="tab">
                            <div class="welcome-text">
                                <h3>You need to fill your profile details before going on with the next step</h3>
                            </div>
                            <Link
                                to={{
                                    pathname: "/profile",
                                    state: { 
                                        currentPageLink
                                    }
                                }}> <button class="margin-top-15 button full-width button-sliding-icon ripple-effect"> Fill Profile Details <i class="icon-material-outline-arrow-right-alt"></i></button> </Link>
                        </div>
                    </div>
                </div>

        </div>
    </div>
    );
}

export default ProfileDialog;