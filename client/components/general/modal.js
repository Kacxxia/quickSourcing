import React from 'react';

const Modal = ({
    id,
    content,
    footer
}) => {
    return (
        <div className="row" >
            <div id={id} className='modal col m6 s12' style={{left:0, right:0}}>
                {content}
                {footer}
            </div>
        </div>
    );
};

export default Modal;