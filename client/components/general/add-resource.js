import React from 'react';
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'
import RemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline'
import SingleResourceInput from './single-resource-input'
const AddResource = ({
    resource, 
    onAddResource, 
    onResourceChange, 
    onRemoveResource
}) => {
        return (
            <div>
                <div className="d-flex align-items-center" style={{marginTop: `1rem`}}>
                    <div style={{marginRight: `1rem`}}>
                        资源
                    </div>
                    <FlatButton 
                        icon={<AddCircleOutline color='green'/>}
                        onTouchTap={() => onAddResource()}
                    />
                    <FlatButton 
                        icon={<RemoveCircleOutline color='red'/>}
                        onTouchTap={() => onRemoveResource()}
                        disabled={resource.resourceCount <= 0}
                    />
                </div>
                {listResourceInput(resource, onResourceChange)}
            </div>
        );
};

export default AddResource;

AddResource.propTypes = {
    resource: PropTypes.object.isRequired,
    onAddResource: PropTypes.func.isRequired,
    onResourceChange: PropTypes.func.isRequired,
    onRemoveResource: PropTypes.func.isRequired
}

function listResourceInput(resource, onResourceChange) {
    let list = []
    for (let i=0; i<resource.resourceCount; i++) {
        list.push(<SingleResourceInput key={i} id={i}
                    onResourceChange={onResourceChange}
                    resource={resource}
                    />)
    }
    return list
}