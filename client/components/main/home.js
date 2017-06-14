import React, { Component } from 'react';
import { connect } from 'react-redux'
import TagSearchBar from '../general/tag-search-bar'
class Home extends Component {
    render() {
        const homeClass = 'd-flex flex-column justify-content-center h-100'
        const containerStyle = {
            position: 'relative',
            bottom: `4rem`
        }
        return (
            <div className={homeClass}>
                <div className="container" style={containerStyle}>
                    <h1 className='center-align' style={{height: `20%`}}>
                        LOGO
                    </h1>
                    <div style={{height: `10%`}} >
                        <TagSearchBar />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;