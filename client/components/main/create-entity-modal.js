import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Modal from '../general/modal'
import ModalFooter from '../general/modal-footer'
import ModalContent from './create-entity-modal/modal-content'

import { onAddResourceClick, changeResource } from '../../actions/main'
class CreateEntityModal extends Component {
    render() {
        return (
            <Modal id="createEntityModal" 
                content={<ModalContent resource={this.props.resource}                 onAddClick={this.props.onAddClick}
                            onResourceChange={this.props.onResourceChange}/>
                } 
                footer={<ModalFooter leftContent='取消' rightContent='提交' />}>
            </Modal>
        )
    }
}

export default connect((state) => {
    return {
        resource: state.entities.add
    }
}, (dispatch) => {
    return {
        onAddClick: () => onAddResourceClick(dispatch),
        onResourceChange: (id, value, prop) => dispatch(changeResource(id, value, prop))
    }
})(CreateEntityModal);

function convertTagList(tags) {
    let result = []
    if(tags){
        result = tags.reduce((acc, tag) => {
            acc.push({tag: tag})
            return acc
        }, [])
    }
    return result
}

CreateEntityModal.propTypes = {
    resource: PropTypes.object.isRequired,
    onAddClick: PropTypes.func.isRequired,
    onResourceChange: PropTypes.func.isRequired,
}