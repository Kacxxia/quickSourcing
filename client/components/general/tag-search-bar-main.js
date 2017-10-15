import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { deleteChip, updateTagInput, updateTagSearch, searchEntities, deleteSearchRecord} from '../../actions/main'
import { CLIENT_ROOT_URL } from '../../actions/index'

import TagSearchBar from './tag-search-bar'
const TagSearchBarMain = ({
    dataResource,
    inputTags,
    tagSearchText,
    onDeleteChip,
    onUpdateTagSearch,
    onUpdateTagInput,
    changeLocationIfHome,
    searchByTag,
    onDeleteSearchRecord
}) => {
    return (
        <TagSearchBar 
            dataResource={dataResource}
            inputTags={inputTags}
            tagSearchText={tagSearchText}
            onDeleteChip={onDeleteChip}
            onUpdateTagSearch={onUpdateTagSearch}
            onUpdateTagInput={onUpdateTagInput}
            changeLocationIfHome={changeLocationIfHome}
            searchByTag={searchByTag} 
            doSearchOnUpdate={true}
            onDeleteSearchRecord={onDeleteSearchRecord}
        />
    );
};

export default connect((state) => {
    return ({
        dataResource: state.searchResource.tags,
        inputTags: state.searchResource.inputTags,
        tagSearchText: state.searchResource.tagSearchText
    })}
,(dispatch) => {
    return {
        onDeleteChip: (name) => dispatch(deleteChip(name)),
        onUpdateTagSearch: (value) => dispatch(updateTagSearch(value)),
        onUpdateTagInput: (value) => dispatch(updateTagInput(value)),
        changeLocationIfHome: () => {
            if(window.location.href === `${CLIENT_ROOT_URL}/`) {
                dispatch(push('/entities'))
            }
        },
        searchByTag: (tag) => dispatch(searchEntities(tag)),
        onDeleteSearchRecord: (tag) => dispatch(deleteSearchRecord(tag))
    }
})(TagSearchBarMain);


TagSearchBarMain.propTypes = {
    dataResource: PropTypes.array.isRequired,
    inputTags: PropTypes.array.isRequired,
    tagSearchText: PropTypes.string.isRequired,
    changeLocationIfHome: PropTypes.func.isRequired,
    searchByTag: PropTypes.func.isRequired,
    onDeleteChip: PropTypes.func.isRequired,
    onUpdateTagSearch: PropTypes.func.isRequired,
    onUpdateTagInput: PropTypes.func.isRequired,
}