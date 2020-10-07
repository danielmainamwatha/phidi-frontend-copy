/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux'; 
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import {fetchAdminUsers} from './../../redux/action-creator';
import AdminService from './../../services/adminService';
import AdminHeader from './../../components/admin/adminHeader';
import withToastNotificationHOC from './../../HOCs/notificationHOC';

class AdminUsers extends Component {
    state = {
		optionUserData: [],
		users: [],
		id: null,
		firstName: null,
		lastName: null,
	}
	
	componentDidMount() {
		this.fetchOptionUsers();
        const {fetchAdminUsers} = this.props;
        const {users} = this.props;
        this.setState({users});
		fetchAdminUsers();
	}

	static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState) {
			return { users: nextProps.users };
        }
	}
	
	fetchOptionUsers = async() => {
		const response = await AdminService.fetchAdminUsers();

		if (response && response.status === 200) {
			this.setState({optionUserData: response.data.users})
		} else {
            return this.props.addToast(response.data.message, {
                appearance: 'error',
                autoDismiss: false,
            });
		}
	}

	fetchFilteredUsers = (e) => {
		const {id, firstName, lastName} = this.state;
        const {fetchAdminUsers} = this.props;
		fetchAdminUsers(id, firstName, lastName);
	}

	handleIdChange = (newValue) => {
		const value = newValue === null ? newValue : newValue.value;
		this.setState({id: value})
	}

	handleFirstNameChange = (newValue) => {
		const value = newValue === null ? newValue : newValue.value;
		this.setState({firstName: value})
	}
	
	handleLastNameChange = (newValue) => {
		const value = newValue === null ? newValue : newValue.value;
		this.setState({lastName: value})
	}

	handelInputChange = (e) => {
		e.preventDefault();
		const name = e.target.name;
		const value = e.target.value;
		this.setState({[name]: value});
	}


	activateUser = async(id) => {
		const response = await AdminService.activateUser(id);
		if (response && response.status === 200) {
			const {fetchAdminUsers} = this.props;
			fetchAdminUsers();
			return this.props.addToast(response.data.message, {
				appearance: 'success',
				autoDismiss: true,
			});
		} else {
			return this.props.addToast(response.data.message, {
				appearance: 'error',
				autoDismiss: true,
			});
		}

	}

	deactivateUser = async(id) => {
		const response = await AdminService.deactivateUser(id);
		if (response && response.status === 200) {
			const {fetchAdminUsers} = this.props;
			fetchAdminUsers();
			return this.props.addToast(response.data.message, {
				appearance: 'success',
				autoDismiss: true,
			});
		} else {
			return this.props.addToast(response.data.message, {
				appearance: 'error',
				autoDismiss: true,
			});
		}
	}

    render () {
		const {users} = this.state;

		const idOptions = this.state.optionUserData.map((eachUser) => {
            return {value: eachUser.id, label: eachUser.id }
		});

		const firstNameOptions = this.state.optionUserData.map((eachUser) => {
            return {value: eachUser.firstName, label: eachUser.firstName }
		});

		const lastNameOptions = this.state.optionUserData.map((eachUser) => {
            return {value: eachUser.lastName, label: eachUser.lastName }
		});
		
		 const animatedComponents = makeAnimated();
        const selectStyles = { 
            menu: styles => ({ 
                ...styles, 
                zIndex: 1000,
				fontSize: '15px',
                border: 'none',
                boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            }),
            control: (styles) => ({
            ...styles,
            }),
		};
		

        return (
            <>
			<AdminHeader />
            <div style={{minHeight: '75vh'}} class="container margin-bottom-30">
                    <div class="row">
                    <div class="col-md-12">
						<h3>Filters</h3>
                        <div class="intro-banner-search-form margin-top-5">

                            <div class="intro-search-field with-autocomplete">
								  <Select 
									className="basic-single" 
									isClearable={true} 
									placeholder={<span>user id</span>}
									options={idOptions} 
									components={animatedComponents} 
									styles={selectStyles} 
									defaultValue={this.state.id}
									onChange={this.handleIdChange} />
                            </div>

                            <div class="intro-search-field">
								  <Select 
									className="basic-single" 
									isClearable={true} 
									options={firstNameOptions} 
									placeholder={<span>user first name</span>}
									components={animatedComponents} 
									styles={selectStyles} 
									defaultValue={this.state.firstName}
									onChange={this.handleFirstNameChange} />
                            </div>

							<div style={{marginLeft: '5px'}} class="intro-search-field"> 
								  <Select 
									className="basic-single" 
									isClearable={true} 
									placeholder={<span>user last name</span>}
									options={lastNameOptions} 
									components={animatedComponents} 
									styles={selectStyles} 
									defaultValue={this.state.categories}
									onChange={this.handleLastNameChange} />
                            </div>

                            {/* <!-- Button --> */}
                            <div class="intro-search-button">
                                <button class="button ripple-effect full-width " onClick={(e) => this.fetchFilteredUsers(e)}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>

					<div class="row margin-top-50">
						<div class="col-md-12 col-xl-12 col-md-12 ">
						<h3 class="margin-bottom-10">Users</h3>
							<table class="basic-table user-admin-table">
								<tr>
									<th>ID</th>
									<th>FULL NAME</th>
									<th>STATUS</th>
									<th>ACTION</th>
								</tr>
								{users ? 
								<>
								{users.map((eachUser) => {
									return(
										<tr>
											<td data-label="id">{eachUser.id}</td>
											<td data-label="full name">{eachUser.firstName}  {eachUser.lastName}</td>
											<td data-label="status">{eachUser.active ? <span style={{color: '#2a41e8'}}>active</span> : <span style={{color: 'red'}}>deactivated</span>}</td>
											{eachUser.active ? 
											<td><button onClick={() => this.deactivateUser(eachUser.id)} style={{background: 'grey'}} class="button full-width ripple-effect">deactivate</button></td> 
												: 
											<td><button onClick={() => this.activateUser(eachUser.id)} class="button full-width ripple-effect">activate</button></td> }
										</tr>)
								})}
								</>  
								: null}
							</table>
						</div>
					</div>

                </div>
            </>
        );
    }
}

const mapDispatchToProps = {
    fetchAdminUsers,
}

const mapStateToProps = ({adminUsersStoreState}) => ({
    ...adminUsersStoreState
});

export default withToastNotificationHOC(connect(
    mapStateToProps,
    mapDispatchToProps,
) (AdminUsers));