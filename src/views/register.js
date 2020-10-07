import React, {useState} from 'react';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';

import AuthService from './../services/authService';
import {yupRegObj} from '../helpers/validation';
import AuthHeader from './../components/authHeader';
import Footer from './../components/footer';

const Register = (props) => {
    const { addToast } = useToasts();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
    initialValues: {
        name: '',
        lastname: '',
        email: '',
        password: '',
        repeatPassword: '',
        termsAndConditions: false,
    },
    validationSchema: yupRegObj,
    onSubmit: async values => {
        setLoading(true)
        const response = await AuthService.registerUser(values);
        if (response.status === 201)  {
            setLoading(false)
            return addToast(response.data.message, {
                appearance: 'success',
                autoDismiss: false,
            });
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
            <AuthHeader/>
            <div style={{minHeight: '75vh'}} class="container">
            <div class="row margin-bottom-50">
            <div class="col-xl-5 offset-xl-3">
                <div class="login-register-page">
                    {/* <!-- Welcome Text --> */}
                    <div class="welcome-text">
                        <h3 style={{fontSize: '26px'}}>Let's create your account!</h3>
                        <span>Already have an account? <Link to={'/'}> Log In!</Link></span>
                    </div>

                    {/* <!-- Form --> */}
                    <form method="post" id="register-account-form" autoComplete="off" onSubmit={formik.handleSubmit}>{

                        formik.touched.name && formik.errors.name ? 
                            <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.name}</span>
                            : null}
                        <div class="input-with-icon-left">
                            <i class="icon-feather-user"></i>
                            <input type="text" class="input-text with-border" name="name" id="name" placeholder="Name" {...formik.getFieldProps('name')}/>
                        </div>

                        {formik.touched.lastname && formik.errors.lastname ? 
                        <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.lastname}</span>
                        : null}
                        <div class="input-with-icon-left">
                            <i class="icon-feather-user"></i>
                            <input type="text" class="input-text with-border" name="lastname" id="lastname" placeholder="Last Name" {...formik.getFieldProps('lastname')}/>
                        </div>

                        {formik.touched.email && formik.errors.email ? 
                        <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.email}</span>
                        : null}
                        <div class="input-with-icon-left">
                            <i class="icon-material-baseline-mail-outline"></i>
                            <input type="text" class="input-text with-border" name="email" id="email" placeholder="Email Address" {...formik.getFieldProps('email')}/>
                        </div>

                        {formik.touched.password && formik.errors.password ? 
                        <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.password}</span>
                        : null}
                        <div class="input-with-icon-left" title="Should be at least 8 characters long" data-tippy-placement="bottom">
                           <i class="icon-material-outline-lock"></i>
                            <input type="password" class="input-text with-border" name="password" id="password-register" placeholder="Password" {...formik.getFieldProps('password')}/>
                        </div>

                        {formik.touched.repeatPassword && formik.errors.repeatPassword ? 
                        <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.repeatPassword}</span>
                        : null}
                        <div class="input-with-icon-left">
                           <i class="icon-material-outline-lock"></i>
                            <input type="password" class="input-text with-border" name="repeatPassword" id="password-repeat-register" placeholder="Confirm Password" {...formik.getFieldProps('repeatPassword')}/>
                        </div>

                        {formik.touched.termsAndConditions && formik.errors.termsAndConditions ? 
                        <span style={{fontSize: '10px', color: 'red'}}>{formik.errors.termsAndConditions}</span>
                        : null}
                        <div style={{marginBottom: '10px'}} class="checkbox">
                            <input name='termsAndConditions' type="checkbox" {...formik.getFieldProps('termsAndConditions')} id="two-step"/>
                            <label for="two-step"><span class="checkbox-icon" ></span> <span style={{fontSize: '13px', color: 'grey'}}> I have read and agreed to Phidi's <Link>Terms And Conditions</Link>.</span></label>
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
                            <button class="button full-width button-sliding-icon ripple-effect " type="submit"> Register <i class="fa fa-long-arrow-right" aria-hidden="true"></i> </button> 
                        }

                    </form>
                </div>
                </div>
            </div>
            </div>
            <Footer/>
        </>
    );
}

export default Register;    