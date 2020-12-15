/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { useHistory} from "react-router-dom";

// import Header from './../components/header';
import Header from './../components/customHeader';
import Footer from './../components/footer';
import ViewAccessService from './../services/viewAccess';

const GetViewAccess = () => {
    const routerLocation = useLocation();
    const { jobPost } = routerLocation.state;
    const { addToast } = useToasts();
    let history = useHistory();

    const sendViewAccessBid = async () => {
        const response = await ViewAccessService.getViewAccess(jobPost.id);
        if (response.status === 200) {
            setTimeout(
                () => {
                    return history.push('/bids');
                }, 700);

            return addToast(response.data.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });
        } else {
            setTimeout(
                () => {
                    return history.push('/bids');
                }, 700);
            return addToast(response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
        }
    }   

    const renderTitleBar = () => (
        <div class="single-page-header">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="single-page-header-inner">
                        <div class="left-side">
                            <div class="header-details">
                                <h3>Ask For Access To View Private Project </h3>
                                <h5>{jobPost.title}</h5>
                                <ul>
                                    <li><a href="single-company-profile.html"><i style={{color: '#2a41e8'}} class="icon-material-outline-business"></i> {jobPost.User.city || '--'}</a></li>
                                    <li><a href="single-company-profile.html"><i style={{color: '#2a41e8'}} class="icon-line-awesome-flag"></i> {jobPost.User.nationality || '--'}</a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="right-side">
                            <div class="salary-box">
                                <div class="salary-type">Private Project</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );

    return (
        <>
            <Header />
                {renderTitleBar()}
                <div style={{minHeight: '75vh'}} class="container padding-bottom-50">
                <div class="row">
                    <div class="col-xl-12 col-lg-12 content-right-offset">
                        <div class="single-page-section">
                            <h3 style={{fontWeight: 600}} class="margin-bottom-25">Project Description</h3>
                            <p class="container padding-bottom-70">{jobPost.objective}</p>
                        </div>
                        <button onClick={sendViewAccessBid} class="button ripple-effect"><span>Get View Access</span></button>
                        <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            <Footer />
        </>
    );
}

export default GetViewAccess;