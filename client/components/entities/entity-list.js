import React from 'react';

import BriefIntroCard from './brief-intro-card'

const EntityList = ({
    filteredList
}) => {
    if (filteredList.length === 0 ) {
        return <div> 无结果 </div>
    }
    let rows = [],
        row 
    filteredList.forEach((entity, index) => {
        if(index % 4 === 0) {
            row = {
                children: []
            }
            rows.push(row)
        }
        row.children.push(entity)        
    })
    let list = rows.map((row, i) => {
        return (<div className='row' key={`row${i}`}>
                    {row.children.map((entity, i) => {
                        return <div className='col m3 s12' key={`entity${i}`}><BriefIntroCard entity={entity}  /></div>
                    })}
        </div>)
    })
    return (
        <div>
            {list}
        </div>
    );
};

export default EntityList;