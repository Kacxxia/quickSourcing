import React from 'react';

import { getRandomColor } from '../../utils'
import Chip from '../general/chip'
const BriefIntroCard = ({
    entity
}) => {
    const colorClass = getRandomColor(entity.names[0].content.length * entity.tags[0].content.length)
    let names = entity.names.map((name) => {
        return name.content
    })
    let tags = entity.tags.filter((tag, index) => {
        return index < 3
    }).map((tag) => {
        return tag.content
    })
    const actionStyle = {
        padding: `2px 4px`
    }
    const contentStyle = {
        padding: `0.5rem 0.25rem`
    }
    return (
        <div className={'card' + colorClass}>
            <div className="card-content center-align" title={names.join('/')}>
            <h4>{names[0]}</h4></div>
            <div className="card-action" style={actionStyle}>{tags.map((tag, i) => {
                    return <Chip content={tag} key={i} rounded={false}/>
                })}
            </div>
        </div>
    );
};

export default BriefIntroCard;

