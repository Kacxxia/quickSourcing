import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import Waiting from '../general/waiting'
import LevelItems from './level-items'

import { clickSubordinate, clickSuperior } from '../../actions/detail'
const LevelList = ({
    matchId,
    showSubordinate,
    subordinatePayload,
    superiorPayload,
    fetchingSubordinate,
    fetchingSuperior,
    onSuperiorClick,
    onSubordinateClick
}) => {
    return (
            <List >
                <div className='d-flex'>
                    <Subheader style={{display: 'inline-block', width: 'auto', height: '100%', lineHeight: 'initial', marginRight: '1rem'}}>
                        <h1 style={{margin: 0, display: 'inline-block', height: '100%'}}>层次</h1></Subheader>
                    <RaisedButton 
                        primary={showSubordinate}
                        label='子级'
                        onClick={() => onSubordinateClick(matchId)}
                    />
                    <RaisedButton 
                        primary={!showSubordinate}
                        label='父级'
                        onClick={() => onSuperiorClick(matchId)}
                    />
                </div>
                {renderCategory(showSubordinate, fetchingSuperior, fetchingSubordinate, subordinatePayload, superiorPayload)}
            </List>
    );
};

LevelList.propTypes = {
    showSubordinate: PropTypes.bool.isRequired,
    subordinatePayload: PropTypes.array.isRequired,
    superiorPayload: PropTypes.array.isRequired,
    fetchingSubordinate: PropTypes.bool.isRequired,
    fetchingSuperior: PropTypes.bool.isRequired,
    onSuperiorClick: PropTypes.func.isRequired,
    onSubordinateClick: PropTypes.func.isRequired,
    matchId: PropTypes.string.isRequired
}

export default connect(state => {
    const subordinate = state.detail.subordinate
    const superior = state.detail.superior
    return {
        showSubordinate: state.detail.subordinate.show,
        subordinatePayload: state.detail.subordinate.payload,
        fetchingSubordinate: state.detail.subordinate.isFetching,
        superiorPayload: state.detail.superior.payload,
        fetchingSuperior: state.detail.superior.isFetching
    }
}, dispatch => {
    return {
        onSubordinateClick: (id) => dispatch(clickSubordinate(id)),
        onSuperiorClick: (id) => dispatch(clickSuperior(id))
    }
})(LevelList);

function renderCategory(showSubordinate, fetchingSuperior, fetchingSubordinate, subordinatePayload, superiorPayload) {
    if (showSubordinate) {
        if (fetchingSubordinate) {
            return <Waiting />
        }
        return <LevelItems items={subordinatePayload} isSuperior={false}/>
    }
    else {
        if (fetchingSuperior) {
            return <Waiting />
        }
        return <LevelItems items={superiorPayload} isSuperior={true}/>
    }
}