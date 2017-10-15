import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Dialog from 'material-ui/Dialog'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import NameSearchBar from './name-search-bar'
import { tagStoreChangeSearchValue, tagStoreChangeSelected} from '../../actions/common'
const TagStore = ({
    open,
    allTags,
    nameFilterValue,
    nameFilterOnUpdate,
    selectedTags,
    selectedTagsOnChange,
    onCancelAction,
    onSubmitAction
}) => {
    const actions=[
        <RaisedButton 
            label='取消'
            onTouchTap={onCancelAction}
        />,
        <RaisedButton
            label='确定'
            onTouchTap={() => onSubmitAction(selectedTags)}
            style={{marginLeft: '1rem'}}
            secondary={true}
        />
    ]
    return (
        <Dialog
            modal={true}
            title='标签库'
            open={open}
            actions={actions}
            onRequestClose={onCancelAction}
            bodyStyle={{overflowY: 'auto', overflowX: 'hidden'}}
        >   
            <NameSearchBar 
                nameFilterValue={nameFilterValue} 
                onUpdateNameFilter={nameFilterOnUpdate}
                style={{position: 'fixed', left: 0, right: 0, zIndex: 200}}
            />
            <Menu
                value={selectedTags}
                multiple={true}
                onChange={(e, tags) => selectedTagsOnChange(tags)}
                style={{marginTop: '3rem'}}
                disableAutoFocus={true}
            >
                {

                    allTags.filter(tag => tag.includes(nameFilterValue)).map((tag) => {
                    return <MenuItem
                                key={tag}
                                checked={
                                selectedTags.indexOf(tag) !== -1
                                }
                                insetChildren={true}
                                value={tag}
                                primaryText={tag}
                            />
                
                })
                }
            </Menu>
        </Dialog>
    );
};

export default connect(state => {
    return {
        open: state.common.tagStore.isOpen,
        allTags: state.common.tagStore.tags,
        nameFilterValue: state.common.tagStore.searchValue,
        selectedTags: state.common.tagStore.selectedTags
    }
}, dispatch => {
    return {
        nameFilterOnUpdate: (value) => dispatch(tagStoreChangeSearchValue(value)),
        selectedTagsOnChange: (tags) => dispatch(tagStoreChangeSelected(tags))
    }
})(TagStore);

TagStore.propTypes = {
    open: PropTypes.bool.isRequired,
    allTags: PropTypes.array.isRequired,
    nameFilterValue: PropTypes.string.isRequired,
    nameFilterOnUpdate: PropTypes.func.isRequired,
    selectedTags: PropTypes.array.isRequired,
    selectedTagsOnChange: PropTypes.func.isRequired,
    onCancelAction: PropTypes.func.isRequired,
    onSubmitAction: PropTypes.func.isRequired,
}