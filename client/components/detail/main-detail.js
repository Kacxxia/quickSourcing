import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import DetailIntro from './detail-intro'
import DetailResource from './detail-resource'
const MainDetail = ({
    showResources
}) => {
    if (showResources) return <DetailResource />
    return <DetailIntro />
};

export default connect((state) => {
    return {
        showResources: state.detail.showResources
    }
})(MainDetail);

MainDetail.propTypes = {
    showResources: PropTypes.bool.isRequired
}