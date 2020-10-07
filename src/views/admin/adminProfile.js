/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchProfile} from './../../redux/action-creator';
import AdminHeader from './../../components/admin/adminHeader';
// import Header from './../components/header';
// import Footer from './../components/footer';
import countries from './../../helpers/countries';
import withToastNotificationHOC from './../../HOCs/notificationHOC';
import ProfileService from './../../services/profileService';

class AdminProfile extends Component {
	state = {
	}

	componentDidMount () {
		const {fetchProfile} = this.props;
		fetchProfile();
	}

	static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState){
			return {profile: nextProps.profile};
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
		
		if (this.state.passwordMissMatch) {
			this.props.addToast("Make sure you have confirmed your password correctly!", {
				appearance: 'error',
				autoDismiss: false,
			});
		}
		let userDetails = this.state;
		const email = this.state.profile.email;
		const response = await ProfileService.editProfile({...userDetails, email});


		const {fetchProfile} = this.props;
		fetchProfile();
		if (response.status === 200){
			return this.props.addToast(response.data.message, {
                appearance: 'success',
                autoDismiss: false,
            });
		} else {
			return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: false,
            });
		}
	}


    render() {
		let firstName, lastName, email, company, city, tagline, nationality;

		if (this.state.profile) {
			firstName = this.state.profile.firstName;
			lastName = this.state.profile.lastName;
			email = this.state.profile.email;
			company = this.state.profile.company;
			city = this.state.profile.city;
			tagline = this.state.profile.tagline;
			nationality = this.state.profile.nationality;
		}

        return (
            <>
				<AdminHeader />
					<div  style={{minHeight: '75vh'}} class="dashboard-content-container" data-simplebar>
						<div class="dashboard-content-inner" >

							{/* <!-- Row --> */}
							<div class="row">
						
								{/* <!-- Dashboard Box --> */}
								<div class="col-xl-12">
									<div class="dashboard-box margin-top-0">

										{/* <!-- Headline --> */}
										<div class="headline">
											<h3><i class="fa fa-user" aria-hidden="true"></i> My Account</h3>
										</div>

										<div class="content with-padding padding-bottom-0">

											<div class="row">
												<div class="col">

													<div class="row justify-content-center">
														<div class="col-xl-8 justify-content-center">
															<div class="submit-field">
																<h5>First Name</h5>
																<div class="input-with-icon-left">
																	<i class="icon-feather-user"></i>
																	<input type="text" name="firstName" class="with-border" onInput={this.handelInputChange} defaultValue={firstName}/>
																</div>
															</div>
														</div>
													</div>

													<div class="row justify-content-center">
														<div class="col-xl-8 col-md-offset-3">
															<div class="submit-field">
																<h5>Last Name</h5>
																<div class="input-with-icon-left">
																	<i class="icon-feather-user"></i>
																	<input type="text" name="lastName" class="with-border" onInput={this.handelInputChange} defaultValue={lastName}/>
																</div>
															</div>
														</div>
													</div>

													<div class="row justify-content-center">
														<div class="col-xl-8 col-md-offset-3">
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
								<div class="col-xl-12">
									<div class="dashboard-box margin-top-20">

										{/* <!-- Headline --> */}
										<div class="headline">
											<h3><i class="fa fa-building-o" aria-hidden="true"></i> My Company</h3>
										</div>

										<div class="content with-padding padding-bottom-0">

											<div class="row">
												<div class="col">

													<div class="row justify-content-center">
														<div class="col-xl-8 justify-content-center">
															<div class="submit-field">
																<h5>Company Name</h5>
																<input type="text" name="company" class="with-border" onInput={this.handelInputChange} defaultValue={company}/>
															</div>
														</div>
													</div>

													<div class="row justify-content-center">
														<div class="col-xl-8 col-md-offset-3">
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
								<div class="col-xl-12">
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
															<h5>Tagline</h5>
															<input type="text" name="tagline" class="with-border" onInput={this.handelInputChange} defaultValue={tagline}></input>
														</div>
													</div>

													<div class="col-xl-6">
														<div class="submit-field">
															<h5>Nationality</h5>
															<select class="selectpicker" name="nationality" data-size="5" title="Select Your Nationality" data-live-search="true" onChange={this.handelInputChange}>
																<option selected value={nationality}>{nationality}</option>
																{countries.map((eachCountry) => {
																	return <option value={eachCountry.name}>{eachCountry.name}</option>
																})}
															</select>
														</div>
													</div>

												</div>
											</li>
										</ul>
										</div>
									</div>
								</div>

								{/* <!-- Dashboard Box --> */}
								<div class="col-xl-12">
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

								<div class="col-xl-12">
									<span  class="button  button-sliding-icon ripple-effect  margin-top-30" onClick={this.handelProfileSubmit}>Save Changes <i class="fa fa-check" aria-hidden="true"></i></span>
								</div>

							</div>
							<div class="dashboard-footer-spacer"></div>
						</div>
					</div>
				{/* <Footer />  */}
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
) (AdminProfile));