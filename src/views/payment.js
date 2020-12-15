/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useToasts } from 'react-toast-notifications';
import { useLocation } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { useHistory } from "react-router-dom";

import Header from './../components/customHeader';
import Footer from './../components/footer';
import PaymentsService from './../services/paymentsService';
import BidsService from './../services/bidsService';
import {
          JOB_POST_PAYMENT,
          BID_ACCEPT_PAYMENT,
          BID_PAYMENT,
        } from './../helpers/constants';

import dotenv from 'dotenv';
import JobPostsService from '../services/jobPostsService';

dotenv.config();

const Payments = (props) => {
  const localStorage = window.localStorage;
  const userId = localStorage.getItem('userId');
  const routerLocation = useLocation();
  let history = useHistory();
  let  bidAmount, bidNote, bidSketches, jobPostBidId, jobPostId, bidId = '';

  if (routerLocation.state.paymentType === JOB_POST_PAYMENT) {
      jobPostId = routerLocation.state.jobPostId;

  } else if (routerLocation.state.paymentType === BID_ACCEPT_PAYMENT) {
      bidAmount = routerLocation.state.bidAmount;
      jobPostId = routerLocation.state.jobPostId;
      bidId = routerLocation.state.bidId;

  } else {
      bidAmount = routerLocation.state.bidAmount;
      bidNote = routerLocation.state.bidNote;
      jobPostBidId = routerLocation.state.jobPostBidId;
      bidSketches = routerLocation.state.bidSketches;

  }

  const { addToast } = useToasts();
  
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        getPaymentIntent();
    }, []);

    const getPaymentIntent =  async () => {

        const response =  await PaymentsService.fetchPaymentIntent(routerLocation.state.paymentType, bidAmount);

          if (response.status === 201) {
              setClientSecret(response.data.clientSecret);
          } else {
             addToast(response.data.message, {
              appearance: 'error',
              autoDismiss: true,
            });
          }
    }

    const handleChange = async (event) => {
      // Listen for changes in the CardElement
      // and display any errors as the customer types their card details
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "");
      };
  
      const handleSubmit = async (event) => {
      event.preventDefault();
      setProcessing(true);
      const payload = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: event.target.name.value
          }
        }
      });

      if (payload.error) {
          setError(`Payment failed ${payload.error.message}`);
          setProcessing(false);
          setSucceeded(false);

          return addToast(`Payment failed ${payload.error.message}`, {
            appearance: 'error',
            autoDismiss: true,
        });
      } else {
          setError(null);
          setProcessing(false);
          setSucceeded(true);
          // create the jobpostBid or publish jobpost
          if ( routerLocation.state.paymentType === JOB_POST_PAYMENT ){
              PaymentsService.sendTransactionEmail(JOB_POST_PAYMENT, userId, bidAmount);
              publishJobPost(jobPostId);

          } else if( routerLocation.state.paymentType === BID_ACCEPT_PAYMENT ) {
            PaymentsService.sendTransactionEmail(BID_ACCEPT_PAYMENT, userId, bidAmount);
              acceptJobBid(bidId);

          } else {
              PaymentsService.sendTransactionEmail(BID_PAYMENT, userId, bidAmount);
              createUserJobPostBid(jobPostBidId, bidNote, bidSketches, bidAmount);

          }
        }
  
    };

    const acceptJobBid = async (bidId) => {
      const response = await BidsService.acceptBid(bidId);
      if (response.status === 200) { 
        return history.push({
          pathname: '/payment-confirmation',
          state: {
            message: response.data.message,
            redirectLocation: `/job-post/${jobPostId}`
          }
        });

    } else {
       return addToast(response.data.message, {
            appearance: 'error',
            autoDismiss: true,
        });
    }

    }

    const publishJobPost = async (jobPostId) => {
      const response = await JobPostsService.publishJobPost(jobPostId);

      if (response.status === 200) {
          return history.push({
            pathname: '/payment-confirmation',
            state: {
              message: response.data.message,
              redirectLocation: '/job-posts'
            }
          });

      } else {
        return addToast(response.data.message, {
          appearance: 'error',
          autoDismiss: true,
      });
      }
    }

    const createUserJobPostBid = async (jobPostBidId, bidNote, bidSketches, bidAmount) => {
      const response = await BidsService.createJobPostBid(jobPostBidId, bidNote, bidSketches, bidAmount);

      if (response.status === 201) {
        return history.push({
          pathname: '/payment-confirmation',
          state: {
            message: response.data.message,
            redirectLocation: '/bids'
          }
        });

      } else {
        return addToast(response.data.message, {
          appearance: 'error',
          autoDismiss: true,
      });
      }
    }

    const amountToBeBilled = (paymentType) => {
      if (paymentType === JOB_POST_PAYMENT ) {
        return '$25.00';
      } else if (paymentType === BID_PAYMENT ) {
        return '$1.00'
      } else if (paymentType === BID_ACCEPT_PAYMENT) {
        return `$${bidAmount}`
      }
    }
  
    return (
        <>
        <Header />
        <div style={{minHeight: '75vh'}} class="container">
            <div class="row margin-top-70 margin-bottom-90">
                <div class="col-xl-5 offset-xl-3">
                    <div class="login-register-page">
                        {/* <!-- Welcome Text --> */}
                        <div class="welcome-text">
                            <h3>Payment</h3>
                            <span>Make payment by filling in card details.</span>
                        </div>

                        {/* <!-- Spacer --> */}
                        <div class="margin-top-10"></div>
                        <div class="billing-cycle margin-top-25">
                          {/* <!-- Radio --> */}
                          <div style={{textAlign: 'center'}} class="radio">
                            <label for="radio-5">
                              <span class="radio-label"></span>
                              Amount to be billed
                              <span class="billing-cycle-details">
                                <span class="regular-price-tag"> 
                                    {
                                      amountToBeBilled(routerLocation.state.paymentType)
                                    } 
                                </span>
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* <!-- Spacer --> */}
                        <div class="margin-top-40"></div>
                        <form onSubmit={handleSubmit}>
                          <div style={{ padding: '15px', borderRadius: '5px', boxShadow: '0 2px 12px rgba(0,0,0,0.12)'}}>

                            <CardElement 
                              onChange={handleChange}
                              options={{
                                  style: {
                                    base: {
                                      color: '#2a41e8',
                                      fontSize: "16px",
                                      "::placeholder": {
                                        color: "#aab7c4",
                                      },
                                    }
                                  }
                              }}
                            />
                            </div>
                            <button class="margin-top-15 button full-width button-sliding-icon ripple-effect" type="submit" disabled={!stripe}>
                                {processing ?   
                              <span>
                              <Loader
                                  type="Puff"
                                  color="#00BFFF"
                                  height={15}
                                  width={15} />
                              </span> : 
                                <span>Pay Now <i class="icon-material-outline-arrow-right-alt"></i></span>
                              }
                            </button>
                        </form>
                        
                    </div>
                    {error ? <p style={{padding: '10px', textAlign: 'center', background: '#FFB2B2', color: 'black', marginTop: '10px'}} >{error}</p> : null }
                    { succeeded ? <p style={{padding: '10px', textAlign: 'center', background: '#e0f5d7', color: 'black', marginTop: '10px'}}>Payment succeded</p> : null } 
                </div>
            </div>
        </div>
    <Footer />
    </>
    );
  };

export default Payments;