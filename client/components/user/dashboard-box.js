import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserProfile } from '../../actions/user'
import Dashboard from './dashboard'
class DashboardBox extends Component {
    constructor(props) {
        super(props)
        this.onGetUserProfile = this.props.onGetUserProfile
    }
    shouldComponentUpdate(nextProps) {
        return this.props.match.params.id !== nextProps.match.params.id
    }
    componentWillUpdate(nextProps) {
        this.onGetUserProfile(nextProps.match.params.id)
    }
    componentDidMount() {
        this.onGetUserProfile(this.props.match.params.id)
    }
    render() {
        return (
            <Dashboard urlId={this.props.match.params.id}/>
        )
    }
}

export default connect(state => {
    return {
        email: state.user.email
    }
}, dispatch => {
    return {
        onGetUserProfile: (id) => dispatch(getUserProfile(id))
    }
})(DashboardBox)

DashboardBox.propTypes = {
    match: PropTypes.object.isRequired,
    onGetUserProfile: PropTypes.func.isRequired,
}