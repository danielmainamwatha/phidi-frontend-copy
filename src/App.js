import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import {Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import AdminView from './views/admin/adminView';
import Login from './views/login';
import Register from './views/register';
import Verification from './views/verification';
import ForgotPassword from './views/forgotPassword';
import ResetPassword from './views/resetPassword';
import Homepage from './views/homepage';
import Profile from './views/profile';
import JobPostBid from './views/job-post-bid';
import JobPosts from './views/job-posts';
import WizardExample from './views/wizard';
import Bids from './views/bids';
import JobPost from './views/job-post';
import BidDetails from './views/bid-details';
import GetViewAccess from './views/getViewAccess';
import Payments from './views/payment';
import './App.css';

import {WizardProvider} from './helpers/wizardContext';

require('dotenv').config();

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

function App() {
  const wizardValues = {
    features: [{name: '', description: '',}],
    users: [{name: '', description: '',}],
    volume: '',
    targetMSRP: '',
    metricsOfSuccess: [''],
    toggleObjective: '',
    visibility: 'public',
    categories: [],
    budget: 0,
    milestones: [{date: '', milestone: ''}],
    deliverables: { Model: false, UXPrototype: false, FunctionalPrototype: false }
}

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Route exact path="/">
            <ToastProvider>
              <Login />
            </ToastProvider>
          </Route>

          <Route path="/register">
            <ToastProvider>
                <Register />
            </ToastProvider>
          </Route>

          <Route path="/verification">
            <ToastProvider>
              <Verification />
            </ToastProvider>
          </Route>

          <Route path="/forgot-password">
              <ToastProvider>
                <ForgotPassword />
              </ToastProvider>
          </Route>

          <Route path="/reset-password">
            <ToastProvider>
                <ResetPassword />
            </ToastProvider>
          </Route>

          <Route path="/homepage">
            <ToastProvider>
                <Homepage />
            </ToastProvider>
          </Route>

          <Route path="/profile">
            <ToastProvider>
                <Profile />
            </ToastProvider>
          </Route>

          <Route path="/job-post-bid/:id">
            <ToastProvider>
                <JobPostBid/>
            </ToastProvider>
          </Route>

          <Route path="/job-posts">
            <WizardProvider value={wizardValues}>
              <ToastProvider>
                  <JobPosts/>
              </ToastProvider>
            </WizardProvider>
          </Route>

        <Route path="/job-post/:id">
          <ToastProvider>
              <JobPost />
          </ToastProvider>
        </Route>

          <Route path="/wizard">
            <WizardProvider value={wizardValues}>
              <ToastProvider>
                <WizardExample />
              </ToastProvider>
            </WizardProvider>
          </Route>

          <Route path="/bids">
            <ToastProvider>
                <Bids />
            </ToastProvider>
          </Route>

          <Route path="/bid-details/:id">
            <ToastProvider>
                <BidDetails />
            </ToastProvider>
          </Route>

          <Route path="/get-view-access">
            <ToastProvider>
                <GetViewAccess />
            </ToastProvider>
          </Route>

          <Route path="/bid-payment">
              <Elements stripe={stripePromise}>
                <ElementsConsumer>
                  {({elements, stripe}) => (
                    <ToastProvider>
                      <Payments elements={elements} stripe={stripe} />
                    </ToastProvider>
                  )}
                </ElementsConsumer>
              </Elements>
          </Route>

          <Route path='/admin'>
            <ToastProvider>
              <AdminView/>
            </ToastProvider>
          </Route>

        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
