import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getSearchSelectors, createSearchAction } from 'redux-search'
import { createSelector } from 'reselect'

import TagSearchBar from '../general/tag-search-bar'
import NameSearchBar from '../general/name-search-bar'
import Pagination from '../general/pagination'
import EntityList from '../entities/entity-list'
class Entities extends Component {
    render() {
        const maxDisplay = 8
        let filteredList = [...this.props.filteredEntities]
        filteredList.shift()
        const length = Math.ceil(filteredList.length/maxDisplay)
        let currentPage = this.props.currentPage
        let displayEntities = filteredList.splice(maxDisplay * (currentPage-1), maxDisplay)
        const containerStyle = {
            overflow: 'auto',
            overflowX: 'hidden'
        }
        return (
            <div className='h-100 container d-flex flex-column pt-2 pd-4' style={containerStyle}>
                <div style={{flexBasis: `7%`}}><TagSearchBar/></div>
                <div style={{flexBasis: `7%`}}><NameSearchBar /></div>
                <div style={{flexBasis: `74%`}}><EntityList filteredList={displayEntities}/></div>
                <div style={{flexBasis: `12%`}}><Pagination length={length} currentPage={currentPage}/></div>
            </div>
        );
    }
}

export default connect((state) => {
    const filterTags = state.searchResource.tagFilter.tagsID
    const entities = state.searchResource.entities
    const filteredEntities = filterTags.reduce((acc, tag) => {
        acc.push(entities[tag])
        return acc
    }, [])
    return {
        filteredEntities: filteredEntities,
        currentPage: state.entities.currentPage
    }
})(Entities);


