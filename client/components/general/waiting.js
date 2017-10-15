import React from 'react';
import CircularProgress from 'material-ui/CircularProgress'

const Waiting = () => {
    return (
        <div className="h-100 d-flex align-items-center justify-content-center ">
           <CircularProgress size={80} thickness={12} />
        </div>
    );
}

export default Waiting;