/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState}  from 'react';
import { useFormik } from 'formik';
import { useToasts } from 'react-toast-notifications';
import { useHistory} from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

import {yupLoginObj} from '../../helpers/validation';
import AuthHeader from './../../components/authHeader';
import Footer from './../../components/footer';
import AdminService from '../../services/adminService';

const Login = (props) => {
    const { addToast } = useToasts();
    let history = useHistory();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yupLoginObj,
        onSubmit: async values => {
            setLoading(true)
            const response = await AdminService.loginAdmin(values);
            if (response.status === 200) {
                setLoading(false)
                window.localStorage.setItem('token',response.data.token);
                window.localStorage.setItem('user', response.data.user);
                window.localStorage.setItem('userId', response.data.id);

                return setTimeout(
                    () => {
                        return history.push('/admin/users');
                    }, 500);

            } else {
                setLoading(false)
                return addToast(response.data.message, {
                    appearance: 'error',
                    autoDismiss: false,
                });
            }
        },
    });

    return(
        <>
        <div id="wrapper">
            <AuthHeader/>
            <div style={{minHeight: '75vh'}} class="container">
                <div class="row margin-top-5 margin-bottom-100">
                <div class="col-xl-5 offset-xl-3  margin-bottom-100">
                    <div class="login-register-page">
                        {/* <!-- Welcome Text --> */}
                        <div class="welcome-text">
                            <h3>Welcome Admin</h3>
                        </div>

                        {/* <!-- Form --> */}
                        <form method="post" id="login-form" autoComplete="off" onSubmit={formik.handleSubmit}>
                            {formik.touched.email && formik.errors.email ? 
                                <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.email}</span>
                                : null}
                            <div class="input-with-icon-left">
                                <i class="icon-material-baseline-mail-outline"></i>
                                <input type="text" class="input-text with-border" name="email" id="emailaddress" placeholder="Email Address" {...formik.getFieldProps('email')}/>
                            </div>

                            {formik.touched.password && formik.errors.password ? 
                                <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.password}</span>
                                : null}
                            <div class="input-with-icon-left">
                                <i class="icon-material-outline-lock"></i>
                                <input type="password" class="input-text with-border" name="password" id="password" placeholder="Password" {...formik.getFieldProps('password')}/>
                            </div>

                            {loading ? 
                            <button class="button full-width button-sliding-icon ripple-effect " type="submit"> 
                                <Loader
                                type="Puff"
                                color="#00BFFF"
                                height={15}
                                width={15} /> 
                            </button> 
                                :
                            <button class="button full-width button-sliding-icon ripple-effect margin-top-10" type="submit"> Log In <i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                        }

                        </form>
                    </div>

                </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Login;