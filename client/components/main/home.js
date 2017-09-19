import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import RaisedButton from 'material-ui/RaisedButton'
import TagSearchBarMain from '../general/tag-search-bar-main'

import { push } from 'react-router-redux'

import { breadGoEntity } from '../../actions/detail'
class Home extends Component {
    componentDidMount(){
        this.props.onClearBread()
    }
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
                    <div style={{height: '10%', marginTop: `1rem`}} className='d-flex align-items-center justify-content-center'>
                        <RaisedButton 
                            label='查看全部'
                            primary={true}
                            onClick={this.props.onGoEntitiesPage}
                        />
                    </div>
            </div>
        );
    }
}

export default connect(null, dispatch => {
    return {
        onGoEntitiesPage: (e) => {
            e.stopPropagation()
            dispatch(push('/entities'))
        },
        onClearBread: () => dispatch(breadGoEntity())
    }
})(Home);

Home.propTypes = {
    onClearBread: PropTypes.func.isRequired,
    onGoEntitiesPage: PropTypes.func.isRequired
}