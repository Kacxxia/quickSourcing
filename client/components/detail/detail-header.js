import React from 'react';
import { connect } from 'react-redux'

import BreadCrumbs from '../general/bread-crumbs'
import ToolBar from './tool-bar'
const DetailHeader = ({locationList}) => {
    return (
        <div className='row'>
            <div className='col s8 m6' >
                <BreadCrumbs locationList={locationList}/>
            </div>
            <div className='col s4 m6'>
                <div className='right'><ToolBar /></div>
            </div>
        </div>
    );
};

export default connect()(DetailHeader);