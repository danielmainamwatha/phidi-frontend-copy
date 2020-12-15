/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import {useHistory} from 'react-router-dom';
import WizardContext from './../../helpers/wizardContext';
import {SAVE_PARTIALLY_TRUE, SAVE_PARTIALLY_FALSE} from '../../helpers/constants';
import ProcessToFormData from '../../helpers/toFormData';
import JobPostsService from '../../services/jobPostsService';
import { useToasts } from 'react-toast-notifications';

const ConfirmDialog = (props) => { 
    let history = useHistory();
    const {hideWizardOptionsDialog} = props;
    const context = useContext(WizardContext);
    const {setWizardValues, resetWizard, wizardState} = context;
    const { addToast } = useToasts();

    const onClose = () => {
        hideWizardOptionsDialog();
    }

    const handleReview = () => {
        history.push('/wizard/wizard-review');
        hideWizardOptionsDialog();
    }

    const handlePartialSaveSubmit = async (wizardState) => {
        let formData = await ProcessToFormData(wizardState);
        formData.append('savePartially', SAVE_PARTIALLY_TRUE);
        let response;

        // get a way to determine if the service getting called is either to create a new one or to update existing one.
        if (wizardState.id) {
            response = await JobPostsService.savePartiallyCreatedJobPost(formData);

        } else {
            response = await JobPostsService.createJobPost(formData);
        }

        if (response.status === 201 || response.status === 200) {
            setWizardValues({id: null});
            formData.set('savePartially', SAVE_PARTIALLY_FALSE)
            return addToast(response.data.message, {
                appearance: 'success',
                autoDismiss: SAVE_PARTIALLY_FALSE,
            });
        } else {
            setWizardValues({id: null});
            formData.set('savePartially', SAVE_PARTIALLY_FALSE);
            return addToast(response.data ? response.data.message : response.message, {
                appearance: 'error',
                autoDismiss: true,
            });
        }
    }

    const handleSavePartially = async() => {
        await handlePartialSaveSubmit(wizardState);
        resetWizard();
        history.push('/job-posts');
        hideWizardOptionsDialog();

    }

    const handleDiscard = () => {
        resetWizard()
        history.push('/job-posts');
        hideWizardOptionsDialog();
        
    }

    const renderNonPaymentDialogConfirm = () => {
        return (
            <div class="sign-in-form">
              <>
                <ul class="popup-tabs-nav">
                    <li><a>Choose an option to exit the wizard</a></li>
                </ul>
                <div class="popup-tabs-container">
                    <div class="popup-tab-content" id="tab">
                        <div class="welcome-text">
                            <h3>Pick an option to exit wizard</h3>
                        </div>
                    <button onClick={handleSavePartially} class="margin-top-5 button full-width options-button">Save Project Partially</button>
                    <button onClick={handleReview} class="margin-top-5 button full-width options-button">Review Project</button>
                    <button onClick={handleDiscard} class="margin-top-5 button full-width options-button">Exit without saving</button>
                    </div>
                </div>
            </>
        </div>
        );
    }

    return (
        <div class='mfp-wrap'>
                <div id="small-dialog-1" class='dialog-with-tabs mfp-wrap zoom-anim-dialog confirmation-modal'>
                <button onClick={onClose} class="og-close mfp-close"></button>
                {renderNonPaymentDialogConfirm()}
            </div>
        </div>
    );
}

export default ConfirmDialog;