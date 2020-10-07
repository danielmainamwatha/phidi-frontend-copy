/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import logo from '../images/PHIDI_LOGO2.png';
import {Link} from 'react-router-dom';

const AuthHeader =() => (
    <header id="header-container" class="fullwidth">
        <div id="header">
            <div class="container">
                <div class="left-side">
                    <div id="logo">
                    <Link to={'/'}>
                        <a>
                            <img src={logo} alt="PHIDI"></img>
                        </a>
                    </Link>
                        
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>
    </header>
    );

export default AuthHeader;