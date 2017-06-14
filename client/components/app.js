import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import Detail from './main/detail'
import Entities from './main/entities'
import Home from './main/home'
import NotFound from './main/not-found'
import Navbar from './main/navbar'
import Footer from './main/footer'
import { autoLogIn } from '../actions/auth'
import { getTagsAndEntities } from '../actions/main'

class App extends Component {
    componentDidMount() {
        autoLogIn(this.props.dispatch)
        getTagsAndEntities(this.props.dispatch)
    }
    render() {
        const containerStyle = {
            height: `100%`,
            display: 'flex'
        }
        return (
            <div style={containerStyle} className='flex-column'>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/entities' exact component={Entities} />
                    <Route path='/entities/:id' component={Detail} />

                    <Route path='*' component={NotFound} />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default connect()(App);