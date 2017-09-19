import React from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Card, CardActions, CardText } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import { arraySplit } from '../../utils'
import { cardClick } from '../../actions/main'
const BriefIntroCard = ({
    entity,
    onCardClick
}) => {

    let tags = entity.tags.filter((tag, index) => {
        return index < 2
    })

    return (
        <Card className="col-12 col-sm-3" 
            onClick={() => onCardClick(entity)} 
            style={{cursor: 'pointer'}}
            title={arraySplit(entity.tags, ',')}
            >
            <CardText><h3>{entity.name}</h3></CardText>
            <CardActions>
                {tags.map((tag, i) =>{
                    if (entity.tags.length > 2 && i == 1) {
                        tag = tag + '...'
                    }
                    return <Chip style={{borderRadius: `2px`, display: 'inline-block'}} key={i} >{tag}</Chip>}
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
