import React from 'react';

const NameSearchBar = () => {
    const iconStyle = {
            position: "absolute",
            right: 0,
            bottom: "25%"
        }
    const inputStyle = {
        margin: 0,
        border: `none`,
        boxShadow: 'none',
        padding: `0 1rem`
    }
    const cardStyle = {
        display: 'inline-block'
    }
    return (
        <div className='center-align'>
            <div className="card" style={cardStyle}>
                <input id="search" placeholder='按名称过滤结果' style={inputStyle}/>
            </div>
        </div>
    );
};

export default NameSearchBar;