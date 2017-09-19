import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress'
class Waiting extends Component {
    render() {
        return (
            <div className="h-100 d-flex align-items-center justify-content-center ">
               <CircularProgress size={80} thickness={12} />
            </div>
        );
    }
}

export default Waiting;