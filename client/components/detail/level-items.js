import React from 'react';
import { connect } from 'react-redux'
import { List, ListItem } from 'material-ui/List'
import { breadGo } from '../../actions/detail'
import { push } from 'react-router-redux'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'
const LevelItems = ({items, onEnterLevel, isSuperior}) => {
    return (
        <div style={{display: 'flex', overflowX: 'auto', overflowY: 'hidden'}}>
            {renderItems(items, onEnterLevel, isSuperior)}
        </div>
    );
};

export default connect(null, dispatch => {
    return {
        onEnterLevel: (name, id) => {
            dispatch(push(id))
        }
    }
})(LevelItems);

function renderItems(items, onEnterLevel, isSuperior){
    if(items.length === 0){
        return <div className="col-sm-3 col-6" style={{margin: '1rem'}}> 
                    <div> 无结果</div>
                </div>
    }
    return items.map((item, i) => {
        return <Paper key={`list${i}`} className="col-sm-3 col-6" style={{margin: '1rem', overflowY: 'auto'}} zDepth={2}>
                    <List   >
                        <Subheader>{styleTag(isSuperior, item.excludedTag)}</Subheader>
                        <Divider />
                        {item.entities.map((entity, i) => {
                            return <ListItem 
                                        key={`item${i}`}
                                        title={entity.name}
                                        style={{overflowX: 'hidden'}}
                                        onClick={() => onEnterLevel(entity.name, entity._id)}
                                        primaryText={entity.name}
                                    />
                        })}
                    </List>
                </Paper>
    })
}

function styleTag(isSuperior, tag) {
    if(isSuperior) {
        return <del>{tag}</del>
    }
        return <span>+{tag}</span>
}
