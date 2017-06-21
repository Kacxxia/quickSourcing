import React, { Component }from 'react';
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import PropTypes from 'prop-types'
import { intersection } from 'underscore'

import TagSearchBarMain from '../general/tag-search-bar-main'
import NameSearchBar from '../general/name-search-bar'
import Pagination from '../general/pagination'
import EntityList from '../entities/entity-list'

import { nextPage, prevPage, specificPage, updateTagFilter } from '../../actions/main'
class Entities extends Component {
    render(){
        const maxDisplay = 8
        let filteredList = [...this.props.filteredEntities]
        const length = Math.ceil(filteredList.length/maxDisplay)
        let displayEntities = filteredList.splice(maxDisplay * (this.props.currentPage-1), maxDisplay)

        return (
            <div className='h-100 overflow-adjust px-1' >
                <div style={{height: `auto`}}><TagSearchBarMain/></div>
                <div style={{height: `7%`}}><NameSearchBar /></div>
                <div style={{height: `68%`, marginTop: `1rem`}} className='overflow-adjust'>
                    <EntityList 
                        filteredList={displayEntities}
                        initialTags={this.props.inputTags}
                    /></div>
                <div style={{height: `7%`}}>
                    <Pagination 
                        length={length} 
                        currentPage={this.props.currentPage}
                        onNextPage={this.props.onNextPage}
                        onPrevPage={this.props.onPrevPage}
                        onSpecPage={this.props.onSpecPage}
                    />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Entities);

const isSearchingSelector = state => state.search.entities.isSearching
const searchResultSelector = state => state.search.entities.result
const searchTextSelector = state => state.search.entities.text
const currentPageSelector = state => state.entities.currentPage
const tagFilterSelector = state => state.searchResource.tagFilter
const nameFilterSelector = state => state.searchResource.nameFilter
const entitiesSelector = state => state.searchResource.entities
const inputTagsSelector = state => state.searchResource.inputTags
const filteredEntitiesSelector = createSelector(
    tagFilterSelector,
    nameFilterSelector,
    entitiesSelector,
    (tagIds, nameFilter, entities) => {
        const tagFilteredEntitiesIds = tagIds.reduce((acc, tagId) => {
            acc = intersection(tagId.id, acc)
            return acc
        }, Object.keys(entities))
        console.log(tagFilteredEntitiesIds)

        const tagFilteredEntities = tagFilteredEntitiesIds.map(id => entities[id])
        console.log(tagFilteredEntities)
        const nameFilteredEntities = tagFilteredEntities.filter(entity => {
            return entity.names.some(name => name.content.includes(nameFilter))
        })
        console.log(nameFilteredEntities)

        return nameFilteredEntities
    }
)

function mapStateToProps(state) {
    return {
        filteredEntities: filteredEntitiesSelector(state),
        currentPage: currentPageSelector(state),
        searchText: searchTextSelector(state),
        searchResult: searchResultSelector(state),
        isSearching: isSearchingSelector(state),
        nameFilter: nameFilterSelector(state),
        inputTags: inputTagsSelector(state)
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onNextPage: () => dispatch(nextPage()),
        onPrevPage: () => dispatch(prevPage()),
        onSpecPage: (page) => dispatch(specificPage(page)),
        onUpdateTagId: (tag, id) => dispatch(updateTagFilter(tag, id))
    }
}

Entities.propTypes = {
    filteredEntities: PropTypes.array.isRequired,
    searchText: PropTypes.string.isRequired,
    searchResult: PropTypes.array.isRequired,
    isSearching: PropTypes.bool.isRequired,
    nameFilter: PropTypes.string.isRequired,
    inputTags: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    onSpecPage: PropTypes.func.isRequired,
    onUpdateTagId: PropTypes.func.isRequired
}


