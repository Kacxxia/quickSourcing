import React, { Component } from 'react';
import { connect } from 'react-redux'


import TagSearchBarMain from '../general/tag-search-bar-main'

class Home extends Component {
    render() {
        const homeStyle = {
            padding: `2rem 2rem`,
            verticalAlign: 'middle',
            height: `calc(100% - 4rem)`
        }
        const homeClass = 'd-flex flex-column justify-content-center align-items-center'
        return (
            <div className={homeClass} style={homeStyle}>
                    <h1  style={{height: `10%`, margin: 0}}>
                        quickSourcing
                    </h1>
                    <div style={{height: `10%`, width: '80%'}} >
                        <TagSearchBarMain />
                    </div>
            </div>
        );
    }
}

export default Home;