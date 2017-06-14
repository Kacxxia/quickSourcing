import React from 'react';

import Contributors from '../general/contributors'
const DetailTitle = ({entity}) => {
    return (
        <div className='row d-flex align-items-end'>
            <h1 className='col s6 m8' style={{margin: 0}}>DetailTitle</h1>
            <div className=' col s6 m4' ><div className='right'><Contributors /></div> </div>
        </div>
    );
};

export default DetailTitle;