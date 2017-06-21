import React from 'react';

const IntroResourceBtn = ({
    handleClick,
    showResource
}) => {
    const buttonClass = 'btn-floating btn-large pulse'
    const button = showResource ? 
    <a className={`${buttonClass} red lighten-1`} 
        title='介绍' 
        href='#' 
        onClick={handleClick}
    >
        <i className="large material-icons">library_books</i>
    </a> : 
    <a className={`${buttonClass} light-green darken-4` } 
        title='资源' 
        href='#' 
        onClick={handleClick}
    >
        <i className="large material-icons">storage</i>
    </a>

    const containerStyle = {
        position: 'absolute',
        bottom: `1rem`,
        right: `1rem`
    }
    return <div style={containerStyle}>{button}</div>
    
};

export default IntroResourceBtn;