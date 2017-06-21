import React from 'react';

const CardPanel = ({content, color, textColor}) => {
    return (
            <div className={`card-panel ${color} h-100 d-flex`}>
                <span className={`${textColor} d-flex align-items-center`}>{content}</span>
            </div>
    );
};

export default CardPanel;