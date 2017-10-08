import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import TextField from 'material-ui/TextField'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import LevelList from './level-list'
import NameSearchBar from '../general/name-search-bar'

import { 
    editIntro, 
    editTagAdd, 
    editTagRemove,
    editTagAddStart,
    editTagRemoveStart,
    editTagAddCancel,
    editTagRemoveCancel,
    editTagAddChange,
    editTagAddFilterChange
 } from '../../actions/detail'

const DetailIntro = ({
    entity, 
    match, 
    editStatus,
    allTags,
    onEditIntro, 
    onEditTagAdd, 
    onEditTagRemove,
    onEditTagAddStart,
    onEditTagRemoveStart,
    onEditTagAddCancel,
    onEditTagRemoveCancel,
    onEditTagAddChange,
    tagAddingNames,
    tagRemovingIndex,
    onEditTagAddFilterChange,
    addTagNameFilterValue
}) => {
    return (
        <div className="h-100 container-fluid">
            <div className='row h-100'>
                <div className="h-100 col-12 col-sm-3" >
                    <Paper style={{height: `50%`, overflowX:'auto'}} className='d-flex align-items-center px-1' >
                        {renderIntro(editStatus, entity.introduction, onEditIntro)}
                    </Paper>
                    <div className='d-flex flex-wrap' style={{margin: `1rem 0`,padding: `2px 0.5rem`}}>
                        
                        {renderTags(editStatus, entity.tags, onEditTagAddStart, onEditTagRemoveStart)}
                    </div>
                </div>
                <div  className="col-12 col-sm-9">
                    <LevelList  matchId={match.params.id}/>
                </div>
            </div>
            {renderEditTagDialog(editStatus, onEditTagRemove, onEditTagRemoveCancel, onEditTagAdd, onEditTagAddCancel, onEditTagAddChange, allTags, tagAddingNames, tagRemovingIndex, onEditTagAddFilterChange, addTagNameFilterValue)}
        </div>
    );
};

export default connect(state => {
    return {
        allTags: state.searchResource.tags,
        tagAddingNames: state.detail.tagEdit.tagAddingNames,
        tagRemovingIndex: state.detail.tagEdit.tagRemovingIndex,
        addTagNameFilterValue: state.detail.tagEdit.addTagNameFilterValue
    }
}
, dispatch => {
    return {
        onEditIntro: (text) => dispatch(editIntro(text)),
        onEditTagAdd: (name) => dispatch(editTagAdd(name)),
        onEditTagRemove: (names) => dispatch(editTagRemove(names)),
        onEditTagAddStart: () => dispatch(editTagAddStart()),
        onEditTagRemoveStart: (index) => dispatch(editTagRemoveStart(index)),
        onEditTagAddCancel: () => dispatch(editTagAddCancel()),
        onEditTagRemoveCancel: () => dispatch(editTagRemoveCancel()),
        onEditTagAddChange: (tags) => dispatch(editTagAddChange(tags)),
        onEditTagAddFilterChange: (text) => dispatch(editTagAddFilterChange(text))
    }
})(DetailIntro);

DetailIntro.propTypes = {
    entity: PropTypes.object.isRequired, 
    match: PropTypes.object.isRequired, 
    editStatus: PropTypes.number.isRequired,
    allTags: PropTypes.array.isRequired,
    onEditIntro: PropTypes.func.isRequired, 
    onEditTagAdd: PropTypes.func.isRequired, 
    onEditTagRemove: PropTypes.func.isRequired,
    onEditTagAddStart: PropTypes.func.isRequired,
    onEditTagRemoveStart: PropTypes.func.isRequired,
    onEditTagAddCancel: PropTypes.func.isRequired,
    onEditTagRemoveCancel: PropTypes.func.isRequired,
    onEditTagAddChange: PropTypes.func.isRequired,
    tagAddingNames: PropTypes.array.isRequired,
    tagRemovingIndex: PropTypes.number.isRequired,
    onEditTagAddFilterChange: PropTypes.func.isRequired,
    addTagNameFilterValue: PropTypes.string.isRequired
}

function introJudge(intro) {
    if(intro){
        return intro
    } else {
        return '暂无介绍'
    }
}

function renderIntro(editStatus, content, onEditIntro) {
    if (!editStatus) {
        return <span>{introJudge(content)}</span>
    }
        return <TextField multiLine={true}
                        value={content}
                        onChange={(e, text) => onEditIntro(text)}
                        id='entityIntroInput'
                        />
}

function renderTags(editStatus, tags, onEditTagAddStart, onEditTagRemoveStart) {
    let attributes = {
        style: {
            margin: '2px'
        }
    }
    let arr = tags.map((tag, i) => {
        let att = attributes
        if (editStatus) {
            att = Object.assign({}, attributes, { onRequestDelete: () => 
                onEditTagRemoveStart(i)
            })
        }
        return <Chip key={i} {...att} >{tag}</Chip>
    })

    if (editStatus) {
        arr.push(<FloatingActionButton 
                        mini={true}
                        onClick={onEditTagAddStart}
                        key='addTag'    
                >
                    <ContentAdd />
                </FloatingActionButton>
        )
    }

    return arr
}

function renderEditTagDialog(editStatus, onEditTagRemove, onEditTagRemoveCancel, onEditTagAdd, onEditTagAddCancel, onEditTagChange, allTags, tagAddingNames, tagRemovingIndex, onEditTagAddFilterChange,addTagNameFilterValue) {
    if (editStatus === 3) {
        return <Dialog
                    open={true}
                    actions={[
                        <RaisedButton 
                            label='取消'
                            onClick={onEditTagRemoveCancel}
                        />,
                        <RaisedButton
                            label='确定'
                            onClick={() => {
                                onEditTagRemove(tagRemovingIndex)
                                onEditTagRemoveCancel()
                            }}
                            style={{marginLeft: '1rem'}}
                            secondary={true}
                        />
                    ]}
                    onRequestClose={onEditTagRemoveCancel}
                >
                    确定要删除此标签吗？
                </Dialog>
    } else if (editStatus === 4) {
        allTags = allTags.filter(tag => {
            return tag.includes(addTagNameFilterValue)
        })
        return <Dialog
                    modal={true}
                    title='添加标签'
                    open={true}
                    actions={[
                        <RaisedButton 
                            label='取消'
                            onClick={onEditTagAddCancel}
                        />,
                        <RaisedButton
                            label='确定'
                            onClick={() => {
                                onEditTagAdd(tagAddingNames)
                                onEditTagAddCancel()
                                }
                            }
                            style={{marginLeft: '1rem'}}
                            secondary={true}
                        />
                    ]}
                    onRequestClose={onEditTagAddCancel}
                >
                    <NameSearchBar nameFilterValue={addTagNameFilterValue} onUpdateNameFilter={onEditTagAddFilterChange}/>
                    <Menu
                        value={tagAddingNames}
                        multiple={true}
                        onChange={(e, values) => {
                            onEditTagChange(values)
                        }}
                    >
                        {

                            allTags.map((tag) => {
                            return <MenuItem
                                        key={tag}
                                        checked={
                                        tagAddingNames.indexOf(tag) !== -1
                                        }
                                        insetChildren={true}
                                        value={tag}
                                        primaryText={tag}
                                    />
                        
                        })
                        }
                    </Menu>
                </Dialog>
    } else {
        return null
    }
}