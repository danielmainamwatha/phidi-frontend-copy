/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import AuthService from './../services/authService';
import AuthHeader from './../components/authHeader';
import Footer from './../components/footer';
import withToastNotificationHOC from './../HOCs/notificationHOC';


class Verification extends Component {
    state = {
        emailConfirmed: null,
    }

    emailConfirmation = async() => {
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let email = params.get('email');
        let token = params.get('token');
        const response = await AuthService.confirmEmail({token, email});
        if (response.status === 200) {
            this.setState({emailConfirmed: true});
        } else {
            return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: false,
            })
        }
    }

    componentDidMount() {
       this.emailConfirmation();
    }

    render(){
        return (
            <>
            <div id="wrapper">
                <AuthHeader/>
                <div style={{minHeight: '75vh'}} class="container">
                    <div class="row">
                        <div class="col-md-12 margin-top-50">
                            {this.state.emailConfirmed ?   
                                <div class="order-confirmation-page">
                                    <div class="breathing-icon"><i class="fa fa-check" aria-hidden="true"></i></div>
                                    <h2 class="margin-top-30">Email successfully confirmed!</h2>
                                    <p>You can now Log in!</p>
                                    <Link to={'/'}><a class="button ripple-effect-dark button-sliding-icon margin-top-30">Log In <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a></Link>
                                </div>
                            : 
                                <div class="order-confirmation-page">
                                        <div class="breathing-icon"></div>
                                        <h2 class="margin-top-30">waiting for email confirmation.</h2>
                                        <p>.</p>
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        );
    }
}

export default withToastNotificationHOC(Verification);