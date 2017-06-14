import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

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
            <nav>
                <div className="nav-wrapper yellow lighten-2 grey-text text-darken-3" style={navStyle}>
                    <Link to="/" className="brand-logo">Logo</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {this.renderIconBar().map((value, i) => {
                            return <li key={i} >{value}</li>
                        })}
                    </ul>
                </div>
            </nav>
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