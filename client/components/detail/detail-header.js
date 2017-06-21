import React from 'react';
import { connect } from 'react-redux'

import BreadCrumbs from '../general/bread-crumbs'
import ToolBar from './tool-bar'
const DetailHeader = () => {
    return (
        <div className='row h-100' style={{marginBottom: 0}}>
            <div className='col-8 col-sm-8 h-100' >
                <BreadCrumbs />
            </div>
            <div className='col-4 col-sm-4 h-100'>
                <ToolBar />
            </div>
        </div>
    );
};

export default connect()(DetailHeader);