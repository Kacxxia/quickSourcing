import React from 'react';

import Contributors from '../general/contributors'
const DetailTitle = ({entity}) => {
    return (
        <div className='container-fluid'>
            <div className='row'>
                <h1 className='col-8 col-sm-8' style={{margin: 0}}>{entity.names[0].content}</h1>
                <div className='col-4 col-sm-4 d-flex justify-content-end align-items-end' >
                    <div className=''>
                        <Contributors list={entity.contributors}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailTitle;