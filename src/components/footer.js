/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { useHistory} from "react-router-dom";

import logo from '../images/PHIDI_LOGO2.png';

const Footer = () => {

    const history = useHistory();
    history.listen((location, action) => {
        if (location.pathname === '/profile') {
            window.location.reload();
        }
    });
    
    return (

    <div id="footer">

    {/* <!-- Footer Top Section --> */}
    <div class="footer-top-section">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">

                    {/* <!-- Footer Rows Container --> */}
                    <div class="footer-rows-container">

                        {/* <!-- Left Side --> */}
                        <div class="footer-rows-left">
                            <div class="footer-row">
                                <div class="footer-row-inner footer-logo">
                                    <img src={logo} alt=""/>
                                </div>
                            </div>
                        </div>

                        {/* <!-- Right Side --> */}
                        <div class="footer-rows-right">

                            {/* <!-- Social Icons --> */}
                            <div class="footer-row">
                                <div class="footer-row-inner">
                                    <ul class="footer-social-links">
                                        <li>
                                            <a href="#" title="Facebook" data-tippy-placement="bottom" data-tippy-theme="light">
                                                <i class="fa fa-facebook-official" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Twitter" data-tippy-placement="bottom" data-tippy-theme="light">
                                                <i class="fa fa-twitter" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" title="Google Plus" data-tippy-placement="bottom" data-tippy-theme="light">
                                                <i class="fa fa-google" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="https://www.linkedin.com/company/phidi-inc/" title="LinkedIn" data-tippy-placement="bottom" data-tippy-theme="light" >
                                                <i class="fa fa-linkedin" aria-hidden="true"></i>
                                            </a>
                                        </li>
                                    </ul>
                                    <div class="clearfix"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                    {/* <!-- Footer Rows Container / End --> */}
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Footer Copyrights --> */}
    <div class="footer-bottom-section">
        <div class="container">
            <div class="row">
                <div class="col-xl-12">
                    © 2019 <strong>PHIDI</strong>. All Rights Reserved.
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Footer Copyrights / End --> */}

</div>
); 
    }
export default Footer;