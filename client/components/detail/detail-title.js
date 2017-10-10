import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Contributors from '../general/contributors'
import TextField from 'material-ui/TextField'

import { editName } from '../../actions/detail'
const DetailTitle = ({entity, editStatus, onChangeName}) => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                {editComponent(editStatus, entity.name, onChangeName)}
                <div className='col-4 col-sm-4 d-flex justify-content-end align-items-end' >
                    <div className=''>
                        <Contributors list={entity.contributors}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default connect(null, dispatch => {
    return {
        onChangeName: (text) => dispatch(editName(text))
    }
})(DetailTitle);

function editComponent(editStatus, content, editHandler) {
    let attributes = {
        className: 'col-8 col-sm-8',
        style: {
            margin: 0,
            fontSize: '2rem',
            fontWeight: 'bold',
            cursor: editStatus ? 'text' : 'default',
            color: 'black'
        },
        inputStyle: {
            color: 'black',
            WebkitTextFillColor: 'black'         
        },
        disabled: !editStatus,
        value: content,
        underlineShow: editStatus != 0 ,
        id: 'entityName',
        onChange: editStatus ? (e, text) => { editHandler(text) } : null,
        underlineStyle: {
            bottom: '0.25rem'
        }
    }

    return <TextField {...attributes}/>
}

DetailTitle.propTypes = {
    entity: PropTypes.object.isRequired,
    editStatus: PropTypes.number.isRequired,
    onChangeName: PropTypes.func.isRequired
}