// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import SimpleBar from 'simplebar-react';

import logoSm from '../assets/images/logo_sm.png';
import logoDark from '../assets/images/logo-dark.png';
import logoDarkSm from '../assets/images/logo_sm_dark.png';
import logo from '../assets/images/logo.png';
import helpBoxImage from '../assets/images/help-icon.svg';
import profileImg from '../assets/images/users/avatar-1.jpg';

import AppMenu from './AppMenu';
import { getLoggedInUser } from '../helpers/authUtils';
import { connect } from 'react-redux';

type SideBarContentProps = {
    menuClickHandler?: {},
    isLight: boolean,
    hideUserProfile: boolean,
};
const SideBarContent = ({ hideUserProfile, isLight, menuClickHandler ,profile}: SideBarContentProps) => {
    const user = getLoggedInUser();

    return (
        <React.Fragment>

            {!hideUserProfile && (
                <div className="leftbar-user">
                    <Link to="/">
                    {profile && 
                        <img src={profile} alt="" height="42" className="rounded-circle shadow-sm" /> 
                    }
                        <span className="leftbar-user-name">{user.fullname}</span>
                    </Link>
                </div>
            )}

            <AppMenu menuClickHandler={menuClickHandler} />

            {/* <div className="help-box text-white text-center">
                <Link to="/" className="float-right close-btn text-white">
                    <i className="mdi mdi-close" />
                </Link>

              
            </div> */}
            {/* <div className="clearfix" /> */}
        </React.Fragment>
    );
};

type LeftSidebarProps = {
    menuClickHandler?: {},
    hideLogo?: boolean,
    hideUserProfile?: boolean,
    isLight?: boolean,
    isCondensed: boolean,
};

class LeftSidebar extends Component<LeftSidebarProps> {
    menuNodeRef: any;

    constructor(props: LeftSidebarProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.handleOtherClick = this.handleOtherClick.bind(this);
    }

    /**
     * Bind event
     */
    componentDidMount = () => {
        document.addEventListener('mousedown', this.handleOtherClick, false);
    };

    /**
     * Bind event
     */
    componentWillUnmount = () => {
        document.removeEventListener('mousedown', this.handleOtherClick, false);
    };

    /**
     * Handle the click anywhere in doc
     */
    handleOtherClick = (e: any) => {
        if (this.menuNodeRef.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    /**
     * Handle click
     * @param {*} e
     * @param {*} item
     */
    /*:: handleClick: () => void */
    handleClick(e: {}) {
        console.log(e);
    }

    render() {
        const isCondensed = this.props.isCondensed || false;
        const isLight = this.props.isLight || false;
        const hideLogo = this.props.hideLogo || false;
        const hideUserProfile = this.props.hideUserProfile || false;

        return (
            <React.Fragment>
                <div className="left-side-menu" ref={node => (this.menuNodeRef = node)} >
                    {!hideLogo && (<React.Fragment>
                        <Link to="/" className="logo text-center logo-light">
                            <span className="logo-lg">
                                <img src={isLight ? logoDark : logo} alt="logo" height="40" />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="40" />
                            </span>
                        </Link>

                        <Link to="/" className="logo text-center logo-dark">
                            <span className="logo-lg">
                                <img src={isLight ? logoDark : logo} alt="logo" height="40" />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? logoSm : logoDarkSm} alt="logo" height="40" />
                            </span>
                        </Link>
                    </React.Fragment>
                    )}

                    {!isCondensed && (
                        <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                            <SideBarContent
                                menuClickHandler={this.handleClick}
                                isLight={isLight}
                                hideUserProfile={hideUserProfile}
                                profile={getLoggedInUser().profile_pic}
                            />
                        </SimpleBar>
                    )}
                    {isCondensed && (
                        <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} 
                        profile={getLoggedInUser().profile_pic}
                        />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {

    return {
        user: state.User,
       
    }
};
export default connect(
    mapStateToProps,
    {  }
)(LeftSidebar)

