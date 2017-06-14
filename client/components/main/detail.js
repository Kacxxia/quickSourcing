import React, { Component } from 'react';

import DetailHeader from '../detail/detail-header'
import MainDetail from '../detail/main-detail'
import DetailTitle from '../detail/detail-title'
class Detail extends Component {
    render() {
        const containerStyle = {
            paddingBottom: `4rem`
        }
        return (
            <div className="h-100 d-flex flex-column" style={containerStyle}>
                <div style={{flexBasis: `10%`}}>
                    <DetailHeader locationList={['apple', 'juice', 'tag']} />
                </div>
                <div style={{flexBasis: `20%`}}>
                    <DetailTitle />
                </div>
                <div style={{flexBasis: `80%`}}>
                    <MainDetail />
                </div>
            </div>
        );
    }
}

export default Detail;