/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import Logo from './../images/PHIDI_LOGO2.png';
import Avatar from './../images/user-avatar-placeholder.png';

const Header = () => {
    
    let history = useHistory();
    const localStorage = window.localStorage;
    const user = localStorage.getItem('user');
    const historyPathname = history.location.pathname;
    const [showDropdown, setShowDropdown] = useState(false);

    const logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        history.push("/")
    }

    return(
        <>
        <header id="header-container" class="fullwidth">

        {/* <!-- Header --> */}
        <div id="header">
            <div class="container">

                {/* <!-- Left Side Content --> */}
                <div class="left-side">

                    {/* <!-- Logo --> */}
                    <div id="logo">
                        <Link to={'/homepage'}>
                            <img src={Logo} alt="PHIDI"></img>
                        </Link>
                    </div>

                    {/* <!-- Main Navigation --> */}
                    <nav id="navigation">
                        <ul id="responsive">

                            <li><Link to={'/homepage'}> { historyPathname === '/homepage' ? <span style={{borderBottom: '1px solid #ffffff', paddingBottom: '3px'}}>Search</span> : <span>Search</span> } </Link>
                            </li>

                            <li><Link to={'/job-posts'}>{ historyPathname === '/job-posts' ? <span style={{borderBottom: '1px solid #ffffff', paddingBottom: '3px'}}>Projects</span> : <span>Projects</span> } </Link>
                            </li>

                            <li><Link to={'/bids'}> { historyPathname === '/bids' ? <span style={{borderBottom: '1px solid #ffffff', paddingBottom: '3px'}}>Bids</span> : <span>Bids</span> } </Link></li>

                        </ul>
                    </nav>
                    <div className="clearfix"></div>
                    {/* <!-- Main Navigation / End --> */}
                </div>

                <div style={{background: '#303030'}} class="right-side">

                    <div style={{background: '#303030',}} class="header-widget">

                        <div class="header-notifications user-menu">
                            <div onClick={() => setShowDropdown(true)} class="header-notifications-trigger">
                                    <a style={{cursor: 'pointer' }}>
                                        {user} <i class='icon-material-outline-arrow-drop-down'></i>
                                    </a>
                            </div>
                            <OutsideClickHandler onOutsideClick={() => setShowDropdown(false)}>
                            <div style={{visibility: `${showDropdown ? 'visible': 'hidden'}`, opacity: `${showDropdown ? 1 : 0}`}} class="header-notifications-dropdown">
                                <div class="user-status">
                                    <div class="user-details">
                                        <div class="user-avatar"><img src={Avatar} alt=""/></div>
                                        <div class="user-name">
                                            {user}
                                        </div>
                                    </div>
                                </div>

                                <ul class="user-menu-small-nav">
                                    <li><Link to={'profile'}><i class="icon-material-outline-settings"></i> Profile</Link></li>
                                    <li style={{cursor: 'pointer' }} onClick={logoutUser}><i class="icon-material-outline-power-settings-new"></i> Logout</li>
                                </ul>
                            </div>
                            </OutsideClickHandler>
                        </div>
                    </div>

                    <span class="mmenu-trigger">
                        <button class="hamburger hamburger--collapse" type="button">
                            <span class="hamburger-box">
                                <span class="hamburger-inner"></span>
                            </span>
                        </button>
                    </span>

                </div>
            </div>
        </div>
    </header>
     <div class="clearfix"></div>
    {/* //  <!-- Header Container / End --> */}
     </>
    );
}

export default Header;