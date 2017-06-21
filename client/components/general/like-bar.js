import React from 'react';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down'
import ThumbUp from 'material-ui/svg-icons/action/thumb-up'
import Update from 'material-ui/svg-icons/action/update'
import IconData from './icon-data'
const LikeBar = ({resource}) => {
    return (
        <div className='d-flex justify-content-between'>
            <IconData node={<ThumbUp />} data={resource.good} />
            <IconData node={<ThumbDown />} data={resource.bad} />
            <IconData node={<Update />} data={resource.oudated} />
        </div>
    );
};

export default LikeBar;