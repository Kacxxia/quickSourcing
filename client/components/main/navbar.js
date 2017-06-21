import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'

class Navbar extends Component {
    renderIconBar() {
        if (!this.props.authenticated) {
            return ['登陆']
        } else {
            return ['头像']
        }
    }
    render() {
        const navStyle = {
            padding: `0 1rem`
        }
        return (
            <AppBar title="quickSourcing" iconClassNameRight="muidocs-icon-navigation-expand-more"
            />
        );
    }
}

export default connect((state) => {
    return {
        authenticated: state.auth.authenticated
    }
})(Navbar);

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
}