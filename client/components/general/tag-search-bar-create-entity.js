import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { deleteChipCreateEntity, updateTagInputCreateEntity, updateTagSearchCreateEntity} from '../../actions/main'

import TagSearchBar from './tag-search-bar'
const TagSearchBarCreateEntity = ({
    dataResource,
    inputTagsCreateEntity,
    tagSearchTextCreateEntity,
    onDeleteChipCreateEntity,
    onUpdateTagSearchCreateEntity,
    onUpdateTagInputCreateEntity,
    changeLocationIfHomeCreateEntity,
    searchByTagCreateEntity
}) => {
    return (
        <TagSearchBar 
            dataResource={dataResource}
            inputTags={inputTagsCreateEntity}
            tagSearchText={tagSearchTextCreateEntity}
            onDeleteChip={onDeleteChipCreateEntity}
            onUpdateTagSearch={onUpdateTagSearchCreateEntity}
            onUpdateTagInput={onUpdateTagInputCreateEntity}
            changeLocationIfHome={changeLocationIfHomeCreateEntity}
            searchByTag={searchByTagCreateEntity} />
    );
};

export default connect((state) => {
    return ({
        dataResource: state.searchResource.tags,
        inputTagsCreateEntity: state.entities.inputTags,
        tagSearchTextCreateEntity: state.entities.tagSearchText
    })}
,(dispatch) => {
    return {
        onDeleteChipCreateEntity: (name) => dispatch(deleteChipCreateEntity(name)),
        onUpdateTagSearchCreateEntity: (value) => 
            dispatch(updateTagSearchCreateEntity(value)),
        onUpdateTagInputCreateEntity: (value) => 
            dispatch(updateTagInputCreateEntity(value)),
        changeLocationIfHomeCreateEntity: () => { },
        searchByTagCreateEntity: () => {}
    }
})(TagSearchBarCreateEntity);


TagSearchBarCreateEntity.propTypes = {
    dataResource: PropTypes.array.isRequired,
    inputTagsCreateEntity: PropTypes.array.isRequired,
    tagSearchTextCreateEntity: PropTypes.string.isRequired,
    changeLocationIfHomeCreateEntity: PropTypes.func.isRequired,
    searchByTagCreateEntity: PropTypes.func.isRequired,
    onDeleteChipCreateEntity: PropTypes.func.isRequired,
    onUpdateTagSearchCreateEntity: PropTypes.func.isRequired,
    onUpdateTagInputCreateEntity: PropTypes.func.isRequired,
}