import React from 'react';

import { getRandomColor } from '../../utils'
const Tag = ({content}) => {
    const colorClass = getRandomColor(content.length)
    return (
        <div className={`chip`}>
            <b>{content}</b>
        </div>
    );
};

export default Tag;