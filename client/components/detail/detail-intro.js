import React from 'react';

const DetailIntro = () => {
    return (
        <div className="d-flex h-100">
            <div className="d-flex flex-column" style={{flexGrow: 1}}>
                <div style={{flexBasis: `60%`}}>
                    DetailIntro
                </div>
                <div style={{flexBasis: `40%`}}>
                    tags
                </div>
            </div>
            <div style={{flexGrow: 4}} >
                children
            </div>
        </div>
    );
};

export default DetailIntro;