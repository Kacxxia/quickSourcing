import React from 'react';

const ModalFotter = ({
    leftContent,
    rightContent
}) => {
    return (
        <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">{rightContent}</a>
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">{leftContent}</a>
        </div>
    );
};

export default ModalFotter;