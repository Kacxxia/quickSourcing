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

import LevelList from './level-list'
import TagStore from '../general/tag-store'

import { 
    editIntro, 
    editTagAdd,
    editTagRemove,
    editTagAddStart,
    editTagRemoveStart,
    editTagAddCancel,
    editTagRemoveCancel,
 } from '../../actions/detail'

const DetailIntro = ({
    entity, 
    match,
    editStatus,
    onEditIntro, 
    onEditTagAdd, 
    onEditTagRemove,
    onEditTagAddStart,
    onEditTagRemoveStart,
    onEditTagAddCancel,
    onEditTagRemoveCancel,
    tagRemovingIndex
}) => {
    return (
        <div className="h-100 container-fluid">
            <div className='row h-100'>
                <div className="h-100 col-12 col-sm-3" >
                    <Paper style={{height: `50%`, overflowX:'auto'}} className='d-flex align-items-center px-1' >
                        <RenderIntro 
                            editStatus={editStatus}
                            content={entity.introduction}
                            onEditIntro={onEditIntro}
                        />
                    </Paper>        
                    <RenderTags 
                            editStatus={editStatus}
                            tags={entity.tags} 
                            onEditTagAddStart={onEditTagAddStart}
                            onEditTagRemoveStart={onEditTagRemoveStart}
                    />
                </div>
                <div  className="col-12 col-sm-9">
                    <LevelList  matchId={match.params.id}/>
                </div>
            </div>
                <RenderEditTagDialog
                    editStatus={editStatus}
                    tagRemovingIndex={tagRemovingIndex}
                    onEditTagRemove={onEditTagRemove}
                    onEditTagRemoveCancel={onEditTagRemoveCancel}
                    onEditTagAdd={onEditTagAdd}
                    onEditTagAddCancel={onEditTagAddCancel}
                />
        </div>
    );
};

export default connect(state => {
    return {
        tagRemovingIndex: state.detail.tagEdit.tagRemovingIndex,
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
        onEditTagRemoveCancel: () => dispatch(editTagRemoveCancel())
    }
})(DetailIntro);

DetailIntro.propTypes = {
    entity: PropTypes.object.isRequired, 
    match: PropTypes.object.isRequired, 
    editStatus: PropTypes.number.isRequired,
    onEditIntro: PropTypes.func.isRequired, 
    onEditTagAdd: PropTypes.func.isRequired, 
    onEditTagRemove: PropTypes.func.isRequired,
    onEditTagAddStart: PropTypes.func.isRequired,
    onEditTagRemoveStart: PropTypes.func.isRequired,
    onEditTagAddCancel: PropTypes.func.isRequired,
    onEditTagRemoveCancel: PropTypes.func.isRequired,
    tagRemovingIndex: PropTypes.number.isRequired
}

function introJudge(intro) {
    if(intro){
        return intro
    } else {
        return '暂无介绍'
    }
}

const RenderIntro = ({editStatus, content, onEditIntro}) => {
    if (!editStatus) return <span>{introJudge(content)}</span>
    
    return <TextField multiLine={true}
                value={content || '暂无介绍'}
                onChange={(e, text) => onEditIntro(text)}
                id='entityIntroInput'
                />
}
const RenderTags = ({editStatus, tags, onEditTagAddStart, onEditTagRemoveStart}) => {
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
                        onTouchTap={onEditTagAddStart}
                        key='addTag'    
                >
                    <ContentAdd />
                </FloatingActionButton>
        )
    }
    
    return <div className='d-flex flex-wrap' style={{margin: `1rem 0`,padding: `2px 0.5rem`}}>{arr}</div>
}

const RenderEditTagDialog =({
    editStatus, 
    onEditTagRemove, 
    onEditTagRemoveCancel, 
    onEditTagAdd, 
    onEditTagAddCancel, 
    tagRemovingIndex
}) => {
    if (editStatus === 3) {
        return <Dialog
                    open={true}
                    actions={[
                        <RaisedButton 
                            label='取消'
                            onTouchTap={onEditTagRemoveCancel}
                        />,
                        <RaisedButton
                            label='确定'
                            onTouchTap={() => {
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
        return (<TagStore 
                    onCancelAction={onEditTagAddCancel}
                    onSubmitAction={(tagAddingNames) => onEditTagAdd(tagAddingNames)}
                />)
    } else {
        return null
    }
}
