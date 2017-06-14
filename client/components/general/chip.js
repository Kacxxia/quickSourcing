import React from 'react';

const Chip = ({
    content,
    rounded
}) => {
    let chipStyle = {}
    if (!rounded) {
        chipStyle['borderRadius'] = `2px`
    }
    return (
        <div className='chip z-depth-1' style={chipStyle}>
            {content}
        </div>
    );
};
export default Chip;