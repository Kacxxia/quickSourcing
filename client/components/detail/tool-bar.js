import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import Block from 'material-ui/svg-icons/content/block'
import Done from 'material-ui/svg-icons/action/done'
const ToolBar = ({editStatus, onEditClick, onCancelClick, onSubmitClick}) => {
    if (!editStatus){
        return (
            <div  className='d-flex justify-content-end'>
                <RaisedButton 
                    label='编辑'
                    primary={true}
                    onTouchTap={onEditClick}
                />
            </div>
            
        );
    }
        return (
            <div  className='d-flex justify-content-end'>
                <RaisedButton 
                    icon={<Block color='red' />}
                    label='取消'
                    onTouchTap={onCancelClick}
                />
                <RaisedButton 
                    icon={<Done color='green' />}
                    label='完成'
                    onTouchTap={onSubmitClick}
                />
            </div>
            
        )
};

export default ToolBar;