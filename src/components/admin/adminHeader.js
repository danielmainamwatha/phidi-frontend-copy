/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import OutsideClickHandler from 'react-outside-click-handler';

import Logo from './../../images/PHIDI_LOGO2.png';
import Avatar from './../../images/user-avatar-placeholder.png';

const AdminHeader = () => {

    
    let history = useHistory();
    const localStorage = window.localStorage;
    const user = localStorage.getItem('user');
    const historyPathname = history.location.pathname;
    const [showDropdown, setShowDropdown] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const logoutUser = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        history.push("/")
    }

    

    const handleHamburgerClick = () => {
        setShowMenu(true);
    }

    return(
        <>
        <header style={{zIndex: showMenu? 1 : null}} id="header-container" class="fullwidth">

        {/* <!-- Header --> */}
        <div id="header">
            <div class="container">

                {/* <!-- Left Side Content --> */}
                <div class="left-side">

                    {/* <!-- Logo --> */}
                    <div id="logo">
                            <img src={Logo} alt="PHIDI"></img>
                    </div>

                    {/* <!-- Main Navigation --> */}
                    <nav id="navigation">
                        <ul id="responsive">

                            <li><Link to={'/admin/users'}> { historyPathname === '/homepage' ? <span style={{borderBottom: '1px solid #ffffff', paddingBottom: '3px'}}>Users</span> : <span>Users</span> } </Link>
                            </li>

                            <li><Link to={'/admin/messages'}>{ historyPathname === '/job-posts' ? <span style={{borderBottom: '1px solid #ffffff', paddingBottom: '3px'}}>Messages</span> : <span>Messages</span> } </Link>
                            </li>

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

                    <span onClick={handleHamburgerClick} class="mmenu-trigger">
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
        <OutsideClickHandler onOutsideClick={() => setShowMenu(false)}>
            <nav style={{zIndex: 999, visibility: `${showMenu ? 'visible': 'hidden'}`, opacity: `${showMenu ? 1 : 0}`}} class="mmenu-init mm-menu mm-offcanvas mm-opened" id="mm-0">
                <div class="mm-panels">
                    <div class="mm-panel mm-hasnavbar mm-opened" id="mm-1">
                        <div style={{width:'100%', padding: '0px'}} class="mm-navbar">
                            <a class="mm-title">
                                Menu
                            </a>
                            <ul class="mm-listview">
                                <li style={{textAlign: 'left'}}><Link to={'/admin/users'}> { historyPathname === '/homepage' ? <span style={{borderBottom: '1px solid #ffffff', paddingBottom: '3px'}}>Users</span> : <span>Users</span> } </Link></li>
                                <li style={{textAlign: 'left'}}><Link to={'/admin/messages'}>{ historyPathname === '/job-posts' ? <span style={{borderBottom: '1px solid #ffffff', paddingBottom: '3px'}}>Messages</span> : <span>Messages</span> } </Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </OutsideClickHandler>
     </>
    );
}

export default AdminHeader;