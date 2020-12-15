/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import Loader from 'react-loader-spinner';

import {changeShowPopupBool, fetchProfile} from './../redux/action-creator';
import AuthHeader from './../components/authHeader';
import Footer from './../components/footer';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class Loading extends Component {
    state = {
    }

    componentDidMount() {
        const {fetchProfile, changeShowPopupBool} = this.props;
        fetchProfile();
        changeShowPopupBool(true);
    }

    static getDerivedStateFromProps (nextProps, prevState) {
        if (nextProps !== prevState){
			return {...nextProps};
        }
    }

    checkProfileFilled = () => {
        const {profile} = this.state;
        if (profile) {
            if (profile && profile.profilefilled !== true) {
                return (<div class="order-confirmation-page">
                            <h3 class="margin-top-30">Advancing to the next step will require you to fill your profile details.</h3>
                            <Link to={{
                                    pathname: "/profile",
                                    state: { 
                                        currentPageLink: '/homepage'
                                    }
                                }}><button class="button button-sliding-icon ripple-effect margin-top-30">Fill Profile Details <i class="icon-material-outline-arrow-right-alt" aria-hidden="true"></i></button></Link>
                        </div>)
            } else {
                return this.props.history.push('/homepage');
            }

        } else {
            return (<div class="order-confirmation-page">
                            <div>
                            <Loader
                                    type="Puff"
                                    color="#2a41e8"
                                    height={100}
                                    width={100}
                            
                                />
                            </div>
                    </div>)
        }
    }

    render () {
        return (
            <>
            <div id="wrapper">
                <AuthHeader/>
                <div style={{minHeight: '70vh'}} class="container">
                    <div class="row">
                        <div class="col-md-12 margin-top-50">
                            {this.checkProfileFilled()}
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
            </>
        );
    }
}

const mapDispatchToProps = {
    changeShowPopupBool,
    fetchProfile

}

const mapStateToProps = ({profileStoreState}) => ({
    ...profileStoreState,
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
) (Loading));