import React from 'react';

const IconData = ({node, data}) => {
    return (
        <div className='d-flex align-items-center'>
            {node}
            {data}
        </div>
    );
};

export default IconData;