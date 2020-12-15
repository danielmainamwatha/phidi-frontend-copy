/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {fetchProfile} from './../redux/action-creator';
// import Header from './../components/header';
import Header from './../components/customHeader';
import Footer from './../components/footer';
import countries from './../helpers/countries';
import withToastNotificationHOC from './../HOCs/notificationHOC';
import ProfileService from './../services/profileService';

class Profile extends Component {
	state = {
		submitAttempt: false,
	}

	componentDidMount () {
		const {fetchProfile} = this.props;
		fetchProfile();
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
		  this.setState({...this.props.profile});
		}
	  }

	handelInputChange = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;

		if(name === 'password' || name === 'repeatPassword'){
			if (document.getElementById("profilePassword").value !== document.getElementById("profilePasswordRepeat").value ) {
				this.setState(() => ({passwordMissMatch: true}))
			} else {
				this.setState(() => ({passwordMissMatch: false}));
			}
		}
		this.setState({[name]: value});

	}

	// Send new details to service
	handelProfileSubmit = async() => {
		this.setState({submitAttempt: true});
		let {firstName, lastName, tagline, nationality, usertype, usercity} = this.state;

		if (this.state.passwordMissMatch) {
			this.props.addToast("Make sure you have confirmed your password correctly!", {
				appearance: 'error',
				autoDismiss: true,
			});
		}
		let userDetails = this.state;
		const email = this.state.email;

		if (firstName && lastName && nationality && usercity && usertype && tagline) {
			const response = await ProfileService.editProfile({...userDetails, profilefilled: true, email});
			const {fetchProfile} = this.props;
			fetchProfile();
			if (response.status === 200) {

				const currentPageLink = this.props.location.state ? this.props.location.state.currentPageLink : null;

				if (currentPageLink) {
					setTimeout(
						() => {
							return this.props.history.push(currentPageLink);
						}, 500);

					return this.props.addToast(response.data.message, {
						appearance: 'success',
						autoDismiss: true,
					});
					 
				} else {
					return this.props.addToast(response.data.message, {
						appearance: 'success',
						autoDismiss: true,
					});

				}

			} else {
				return this.props.addToast(response.data.message, {
					appearance: 'error',
					autoDismiss: true,
				});
			}

		} else {
			this.props.addToast("Please make sure you fill all required fields!", {
				appearance: 'error',
				autoDismiss: true,
			});
		}
	}
	
	inputErrorBool = (inputStateValue) => {
		if(this.state.submitAttempt) {
			if (inputStateValue) {
				return 'hidden';
			} else {
				return 'visible';
			}
		} else {
			return 'hidden'
		}
	}

    render() {
		let { firstName, lastName, email, company, city, tagline, nationality, usertype, usercity, state } = this.state;
        return (
            <>
				<Header />
					<div  style={{minHeight: '75vh'}} class="dashboard-content-container" data-simplebar>
						<div class="dashboard-content-inner" >

							{/* <!-- Row --> */}
							<div class="row justify-content-center">
						
								{/* <!-- Dashboard Box --> */}
								<div class="col-xl-10">
									<div class="dashboard-box margin-top-0">

										{/* <!-- Headline --> */}
										<div class="headline">
											<h3><i class="fa fa-user" aria-hidden="true"></i> My Account</h3>
										</div>

										<div class="content with-padding padding-bottom-0">

											<div class="row">
												<div class="col-xl-12">

													<div class="row justify-content-center">
														<div class="col-xl-6 justify-content-center">
															<div class="submit-field">
																<h5>First Name <span style={{color: 'red'}}>*</span></h5>
																<div class="input-with-icon-left">
																	<i class="icon-feather-user"></i>
																	<input type="text" name="firstName" placeholder="first name" class="with-border" onInput={this.handelInputChange} defaultValue={firstName}/>
																	<span class={`profile-error ${this.inputErrorBool(firstName)}`}> * This field is required</span>
																</div>
															</div>
														</div>
														<div class="col-xl-6 col-md-offset-3">
															<div class="submit-field">
																<h5>Last Name <span style={{color: 'red'}}>*</span></h5>
																<div class="input-with-icon-left">
																	<i class="icon-feather-user"></i>
																	<input type="text" name="lastName" class="with-border" placeholder="last name" onInput={this.handelInputChange} defaultValue={lastName}/>
																	<span class={`profile-error ${this.inputErrorBool(lastName)}`}> * This field is required</span>
																</div>
															</div>
														</div>
													</div>

													<div class="row justify-content-right">
														<div class="col-xl-6 col-md-offset-3">
															<div class="submit-field">
																<h5>Email</h5>
																<div class="input-with-icon-left">
																	<i class="fa fa-envelope-o" aria-hidden="true"></i>
																		<input type="text" name="email" class="with-border" value={email}/>
																</div>
															</div>
														</div>
													</div>

												</div>
											</div>

										</div>
									</div>
								</div>
								{/* <!-- Dashboard Box --> */}
								<div class="col-xl-10">
									<div class="dashboard-box margin-top-20">

										{/* <!-- Headline --> */}
										<div class="headline">
											<h3><i class="fa fa-building-o" aria-hidden="true"></i> My Company</h3>
										</div>

										<div class="content with-padding padding-bottom-0">

											<div class="row">
												<div class="col">

													<div class="row justify-content-center">
														<div class="col-xl-6 justify-content-center">
															<div class="submit-field">
																<h5>Company Name</h5>
																<input type="text" name="company" class="with-border" onInput={this.handelInputChange} defaultValue={company}/>
															</div>
														</div>
														<div class="col-xl-6 col-md-offset-3">
															<div class="submit-field">
																<h5>City</h5>
																<input type="text" name="city" class="with-border" onInput={this.handelInputChange} defaultValue={city}/>
															</div>
														</div>
													</div>

												</div>
											</div>

										</div>
									</div>
								</div>

								{/* <!-- Dashboard Box --> */}
								<div class="col-xl-10">
									<div class="dashboard-box">

										{/* <!-- Headline --> */}
										<div class="headline">
											<h3><i class="icon-material-outline-face"></i> My Profile</h3>
										</div>

										<div class="content">
											<ul class="fields-ul">
											<li>
												<div class="row">
													<div class="col-xl-6">
														<div class="submit-field">
															<h5>Nationality <span style={{color: 'red'}}>*</span></h5>
															<select class="selectpicker" name="nationality" data-size="5" title={nationality ? nationality : "Select Your Nationality"} data-live-search="true" onChange={this.handelInputChange}>
																<option selected="selected">{nationality}</option>
																{countries.map((eachCountry) => {
																	return <option value={eachCountry.name}>{eachCountry.name}</option>
																})}
															</select>
															<span class={`profile-error ${this.inputErrorBool(nationality)}`}> * This field is required</span>
														</div>
													</div>

													<div class="col-xl-6">
														<div class="submit-field">
															<h5>City <span style={{color: 'red'}}>*</span></h5>
															<input type="text" name="usercity" class="with-border" placeholder="Which city do you live in ?" onInput={this.handelInputChange} defaultValue={usercity}></input>
															<span class={`profile-error ${this.inputErrorBool(usercity)}`}> * This field is required</span>
														</div>
													</div>
												</div>
												<div class="row">
													<div class="col-xl-6">
													<div class="submit-field">
															<h5>State</h5>
															<input type="text" name="state" class="with-border" placeholder="Which state do you live in ?" onInput={this.handelInputChange} defaultValue={state}></input>
														</div>
													</div>

													<div class="col-xl-6">
														<div class="submit-field">
															<h5>What best describes you? <span style={{color: 'red'}}>*</span></h5>
															<select class="selectpicker" name="usertype" data-size="5" title={usertype ? usertype : "Select choice"}  onChange={this.handelInputChange}>
																<option selected="selected">Designer</option>
																<option selected="selected">Client</option>
															</select>
															<span class={`profile-error ${this.inputErrorBool(usertype)}`}> * This field is required</span>
														</div>
													</div>
												</div>
												<div class="row">
													<div class="col-xl-8">
														<div class="submit-field">
															<h5>Bio <span style={{color: 'red'}}>*</span></h5>
															<textarea type="text" name="tagline" class="with-border" onInput={this.handelInputChange} maxLength={200} placeholder="Short description of you" defaultValue={tagline}></textarea>
															<span class={`profile-error ${this.inputErrorBool(tagline)}`}> * This field is required</span>
														</div>
													</div>

												</div>
											</li>
										</ul>
										</div>
									</div>

									
								</div>

								{/* <!-- Dashboard Box --> */}
								<div class="col-xl-10">
									<div id="test1" class="dashboard-box">

										{/* <!-- Headline --> */}
										<div class="headline">
											<h3><i class="fa fa-unlock-alt" aria-hidden="true"></i> Password & Security</h3>
										</div>

										<div class="content with-padding">
											<div class="row">
												<div class="col-xl-4">
													<div class="submit-field">
														<h5>Current Password</h5>
														<div class="input-with-icon-left">
															<i class="icon-material-outline-lock"></i>
															<input type="password" name="currentPassword" class="with-border" onInput={this.handelInputChange}></input>
														</div>
													</div>
												</div>

												<div class="col-xl-4">
													<div class="submit-field">
														<h5>New Password</h5>
														<div class="input-with-icon-left">
															<i class="icon-material-outline-lock"></i>
															<input id="profilePassword" name="password" type="password" class="with-border" onInput={this.handelInputChange}></input>
														</div>
														{this.state.passwordMissMatch ? <span style={{color: 'red', fontSize: '13px'}}>* passwords must match</span> : null}
													</div>
												</div>

												<div class="col-xl-4">
													<div class="submit-field">
														<h5>Repeat New Password</h5>
														<div class="input-with-icon-left">
															<i class="icon-material-outline-lock"></i>
															<input id="profilePasswordRepeat" type="password" name="repeatPassword" class="with-border" onInput={this.handelInputChange}></input>
														</div>
														{this.state.passwordMissMatch ? <span style={{color: 'red', fontSize: '13px'}}>* passwords must match</span> : null}
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="col-xl-10">
									<span  class="button  button-sliding-icon ripple-effect  margin-top-30" onClick={this.handelProfileSubmit}>Save Changes <i class="fa fa-check" aria-hidden="true"></i></span>
								</div>

							</div>
							<div class="dashboard-footer-spacer"></div>
						</div>
					</div>
				<Footer /> 
            </>
        );
    }
}

const mapDispatchToProps = {
    fetchProfile,
}

const mapStateToProps = ({profileStoreState}) => ({
    ...profileStoreState
});

export default withToastNotificationHOC(connect(
    mapStateToProps,
    mapDispatchToProps,
) (withRouter(Profile)));