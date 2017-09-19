import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import Drawer from 'material-ui/Drawer'

import AuthSignComponent from './auth-sign'

import { authSign, signOut } from '../../actions/auth'
import { openNavAvatarMenu, closeNavAvatarMenu, goDashboard } from '../../actions/user'
import { toggleDrawer, goHome, goEntities } from '../../actions/main'

const Navbar = ({
    authenticated, 
    onAuthSign, 
    avatar, 
    email, 
    _id,
    onOpenMenu, 
    onCloseMenu,
    menuOpening,
    menuTarget,
    onSignOut,
    onGoDashboard,
    onToggleDrawer,
    drawerStatus,
    onGoHome,
    onGoEntities
}) => {
        return (
            <div className='h-100'>
                {renderAppBar(authenticated, onAuthSign, email, avatar, onOpenMenu, onToggleDrawer)}
                <AuthSignComponent />
                <Popover 
                    open={menuOpening}
                    anchorEl={menuTarget}
                    onRequestClose={onCloseMenu}
                >
                    <Menu>
                        <MenuItem primaryText='主页' onClick={() => onGoDashboard(_id)}/>
                        <Divider inset={true} />
                        <MenuItem primaryText='注销' onClick={onSignOut}/>
                    </Menu>
                </Popover>
                <Drawer
                    open={drawerStatus}
                    docked={false}
                    onRequestChange={() => onToggleDrawer()}
                >
                    <MenuItem onClick={onGoHome}>首页</MenuItem>
                    <MenuItem onClick={onGoEntities}>实体集</MenuItem>
                </Drawer>
            </div>
        );
}
export default connect((state) => {
    return {
        authenticated: state.auth.authenticated,
        email: state.user.email,
        avatar: state.user.avatar,
        _id: state.user._id,
        menuTarget: state.user.menu.anchorTarget,
        menuOpening: state.user.menu.open,
        drawerStatus: state.entities.drawerStatus
    }
}, dispatch => {
    return {
        onAuthSign: () => dispatch(authSign()),
        onOpenMenu: (e) => dispatch(openNavAvatarMenu(e)),
        onCloseMenu: () => dispatch(closeNavAvatarMenu()),
        onSignOut: () => { 
            dispatch(closeNavAvatarMenu())
            setTimeout(function() {
                dispatch(signOut())
            }, 100);
        },
        onGoDashboard: (id) => {
            dispatch(closeNavAvatarMenu())
            setTimeout(function() {
                dispatch(goDashboard(id))
            }, 100);
        },
        onToggleDrawer: () => dispatch(toggleDrawer()),
        onGoHome: () => {
            dispatch(goHome())
        },
        onGoEntities: () => {
            dispatch(goEntities())
        }
    }
})(Navbar);

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    onAuthSign: PropTypes.func.isRequired,
    onOpenMenu: PropTypes.func.isRequired,
    onCloseMenu: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    menuTarget: PropTypes.object,
    menuOpening: PropTypes.bool.isRequired,
    onGoDashboard: PropTypes.func.isRequired,
    onToggleDrawer: PropTypes.func.isRequired,
    drawerStatus: PropTypes.bool.isRequired,
    onGoHome: PropTypes.func.isRequired,
    onGoEntities: PropTypes.func.isRequired
}

function renderAppBar(authenticated, onAuthSign, email, avatar, onOpenMenu, onToggleDrawer) {
    let attributes = {
        title: <Link to='/' style={{textDecoration: 'none', color: 'white'}}>quickSourcing</Link>,
        iconElementRight: <FlatButton
                                label='登录'
                                labelStyle={{color: '#FFFFFF'}}
                                onTouchTap={onAuthSign}
                          />,
        className: 'align-items-center ',
        style: {
            height: '100%'
        },
        iconStyleRight: {marginTop: 0},
        onLeftIconButtonTouchTap: onToggleDrawer
    }
    if (authenticated) {
        attributes.iconElementRight = <Avatar src={avatar} style={{cursor: 'pointer'}} onClick={onOpenMenu}/>
    }
    return <AppBar {...attributes} />
}