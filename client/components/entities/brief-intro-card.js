import React from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardActions, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import { cardClick } from '../../actions/main'
const BriefIntroCard = ({
    entity,
    onCardClick
}) => {
    let names = entity.names.map((name) => {
        return name.content
    })
    let tags = entity.tags.filter((tag, index) => {
        return index < 3
    })
    return (
        <Card className="col-12 col-sm-3" 
            onClick={() => onCardClick(entity)} 
            style={{cursor: 'pointer'}}>
            <CardText><h3>{names[0]}</h3></CardText>
            <CardActions>
                {tags.map((tag, i) => 
                    <Chip style={{borderRadius: `2px`, display: 'inline-block'}} key={i} >{tag}</Chip> 
                )}
            </CardActions>
        </Card>
    );
};

export default connect(null, dispatch => {
    return {
        onCardClick: (entity) => { 
            // dispatch(cardClick(entity))
            dispatch(push(`/entities/${entity.id}`))
        }
    }
})(BriefIntroCard);
