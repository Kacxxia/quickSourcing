import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'

import Detail from './main/detail'
import Entities from './main/entities'
import Home from './main/home'
import NotFound from './main/not-found'
import Navbar from './main/navbar'
import Footer from './main/footer'
import ModalContent from './main/create-entity-modal/modal-content'
import ErrorDiv from './main/error-div'
import NeedAuthPopover from './general/need-auth-popover'
import DashboardBox from './user/dashboard-box'

import { autoLogIn } from '../actions/auth'
import { getTagsAndEntities, clearInfo } from '../actions/main'

class App extends Component {
    componentDidMount() {
        this.props.onAutoLogIn()
        this.props.onGetTagsAndEntities()
    }
    render() {
        return (
            <div style={{height: `100%`}} >
                <div style={{height: `10%`}}><Navbar /></div>
                <div style={{height: `80%`}}>
                    <Switch>
                        <Route path='/' exact component={Home} />
                        <Route path='/entities' exact component={Entities} />
                        <Route path='/entities/:id' component={Detail} />
                        <Route path='/profiles/:id' component={DashboardBox} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </div>
                <div style={{height: `10%`}}>
                    <Footer/>
                </div>
                <Dialog
                    id='dialog'
                    title="创建"
                    modal={true}
                    open={this.props.isCreateModalOpen}
                    onRequestClose={this.props.onClearInfo}
                    style={{ top: `-9rem`}}
                    autoScrollBodyContent={true}
                >
                    <ModalContent />
                </Dialog>
                <ErrorDiv />
                <NeedAuthPopover />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        isCreateModalOpen: state.entities.add.isModalOpen
    }
}, (dispatch) => {
    return {
        onClearInfo: () => dispatch(clearInfo()),
        onAutoLogIn: () =>  dispatch(autoLogIn(dispatch)),
        onGetTagsAndEntities: () => dispatch(getTagsAndEntities(dispatch))
    }
})(App);

App.propTypes = {
    onAutoLogIn: PropTypes.func.isRequired,
    onGetTagsAndEntities: PropTypes.func.isRequired,
    isCreateModalOpen: PropTypes.bool.isRequired,
    onClearInfo: PropTypes.func.isRequired
}