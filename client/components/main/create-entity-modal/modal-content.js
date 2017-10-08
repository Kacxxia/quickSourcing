import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import AddResource from '../../general/add-resource'
import TagSearchBarCreateEntity from '../../general/tag-search-bar-create-entity'
import { addResource, removeResource, changeResource, changeName, clearInfo, postEntity } from '../../../actions/main'
const ModalContent =({
    onAddResource, 
    onRemoveResource,
    onResourceChange, 
    onChangeName,
    onClearInfo,
    onPostEntity, 
    resource,      
    entityName,
    tags
}) => {
    const buttonStyle={
        margin: 12
    }
    return (
            <div className='h-100 ' >
                <TextField 
                    floatingLabelShrinkStyle={{fontSize: `1rem`}}
                    floatingLabelText='名称'
                    fullWidth={true}
                    onChange={(e, value) => onChangeName(value)}
                    value={entityName}
                />
                <TagSearchBarCreateEntity  />
                <AddResource  
                    resource={resource} 
                    onRemoveResource={onRemoveResource}
                    onAddResource={onAddResource} 
                    onResourceChange={onResourceChange}/>  
                <RaisedButton 
                    label='取消' 
                    style={buttonStyle} 
                    onClick={() => onClearInfo(tags)}
                />
                <RaisedButton 
                    label='创建' 
                    style={buttonStyle} 
                    onClick={() => 
                        onPostEntity({entityName, tags, resource})
                    } 
                    disabled={!checkForm(entityName, tags, resource)}
                />      
            </div>
        );
};

export default connect((state) => {
    return {
        resource: state.entities.add,
        entityName: state.entities.entityName,
        postStatus: state.entities.postStatus,
        tags: state.entities.inputTags
    }
}, (dispatch) => {
    return {
        onAddResource: () => dispatch(addResource()),
        onRemoveResource: () => dispatch(removeResource()),
        onResourceChange: (id, value, prop) => dispatch(changeResource(id, value, prop)),
        onChangeName: (value) => dispatch(changeName(value)),
        onClearInfo: (inputTags) => dispatch(clearInfo(inputTags)),
        onPostEntity: (payload) => dispatch(postEntity(payload))
    } 
})(ModalContent);

ModalContent.propTypes = {
    onAddResource: PropTypes.func.isRequired,
    onRemoveResource: PropTypes.func.isRequired,
    onResourceChange: PropTypes.func.isRequired,
    onChangeName: PropTypes.func.isRequired,
    onClearInfo: PropTypes.func.isRequired,
    onPostEntity: PropTypes.func.isRequired,
    resource: PropTypes.object.isRequired,
    entityName: PropTypes.string.isRequired,
    postStatus: PropTypes.number.isRequired,
    tags: PropTypes.array.isRequired
}


function checkForm(name, tags, resourceObj) {
    const resources = Object.keys(resourceObj).filter(key => isNaN(parseInt(key, 10)))
    let resourceFlag = 1
    if (!resources.length) {
        resourceFlag = 1
    } else {
       if (resources.some((id) => {
            Object.keys(resourceObj[id]).some((prop => {
                return  resourceObj[id][prop] === ''
            }))
        })) {
            resourceFlag = 0
        }
    }

    return  name.length > 0 && tags.length > 0 && resourceFlag > 0
}