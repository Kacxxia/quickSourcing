import React from 'react';

const BreadCrumbs = ({locationList}) => {
    return (
        <div  className='d-flex align-items-center black-text'>
            {locationList.map((bread, i) => {
                return <a className='breadcrumb' key={i} href="#">{bread}</a>
            })}
        </div>
    )
}
export default BreadCrumbs;