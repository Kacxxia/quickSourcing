import React from 'react';
import FlatButton from 'material-ui/FlatButton'
const ToolBar = () => {
    return (
        <div  className='d-flex justify-content-end'>
            <FlatButton 
                disabled={true}
                label='编辑'
            />
        </div>
        
    );
};

export default ToolBar;