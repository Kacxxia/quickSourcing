import React from 'react';
import CardList from '../general/card-list'
const RelatedEntities = ({onClickRelatedEntity, payload}) => {
    return (
        <div>
            <h2 style={{margin: '0 1rem 0 0'}}>类似</h2>
            <CardList
                list={payload}
                similarClickFunc={(item) => onClickRelatedEntity(item._id)}
            />
        </div>
    );
};

export default RelatedEntities;