/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import AuthHeader from './../components/authHeader';
import Footer from './../components/footer';
import { useLocation, useHistory } from 'react-router-dom';


export default function PaymentConfirmation () {
    const routerLocation = useLocation();
    let history = useHistory();

      setTimeout (
          () => {
              return history.push(routerLocation.state.redirectLocation);
          }, 3000 );

        return (
            <>
            <div id="wrapper">
                <AuthHeader/>
                <div style={{minHeight: '75vh'}} class="container">
                    <div class="row">
                        <div class="col-md-12 margin-top-50">
                                <div class="order-confirmation-page">
                                        <div class="breathing-icon"><i class="fa fa-check" aria-hidden="true"></i></div>
                                        <h2 class="margin-top-30">Payment Successful</h2>
                                        <p>{routerLocation.state.message}</p>
                                </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        );
}