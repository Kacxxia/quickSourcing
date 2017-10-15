import React from 'react';
import PropTypes from 'prop-types'

import Chip from 'material-ui/Chip'
import AutoComplete from 'material-ui/AutoComplete'

const TagSearchBar = ({
    dataResource,
    inputTags,
    tagSearchText,
    onDeleteChip,
    onUpdateTagSearch,
    onUpdateTagInput,
    changeLocationIfHome,
    searchByTag,
    doSearchOnUpdate,
    onDeleteSearchRecord
}) => {
    function renderChips(tags) {
        return tags.map((tag, i) => {
            return <Chip onRequestDelete={
                    () => {
                        onDeleteChip(tag)
                        if (doSearchOnUpdate) onDeleteSearchRecord(tag)
                    }
                    } 
                key={i}
                style={{margin: `1px`}}>{tag}</Chip>
        })
    }
    let autoCompleteInput
        return (
        <div  className='h-100 d-flex align-items-center ' style={{flexWrap: 'wrap'}}>
                {renderChips(inputTags)}
                <AutoComplete 
                    hintText='add tag'
                    searchText={tagSearchText}
                    onUpdateInput={(text) => {
                        onUpdateTagSearch(text)
                    }}
                    ref={(node) => autoCompleteInput = node}
                    onNewRequest={(req) => {
                        changeLocationIfHome()
                        autoCompleteInput.focus()
                        onUpdateTagInput(req)
                        if (doSearchOnUpdate) searchByTag(req)
                    }}
                    menuCloseDelay={0}
                    dataSource={dataResource}
                    fullWidth={true}
                    style={{display: 'inline-block'}}
                />
        </div>
    );
}

export default TagSearchBar


TagSearchBar.propTypes = {
    dataResource: PropTypes.array.isRequired,
    inputTags: PropTypes.array.isRequired,
    tagSearchText: PropTypes.string.isRequired,
    changeLocationIfHome: PropTypes.func.isRequired,
    searchByTag: PropTypes.func.isRequired,
    onDeleteChip: PropTypes.func.isRequired,
    onUpdateTagSearch: PropTypes.func.isRequired,
    onUpdateTagInput: PropTypes.func.isRequired,
}

