import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DetailHeader from '../detail/detail-header'
import MainDetail from '../detail/main-detail'
import DetailTitle from '../detail/detail-title'
import Waiting from '../general/waiting'
import { breadBackOne, getDetail } from '../../actions/detail'
class Detail extends Component {
    componentDidMount() {
        this.props.onGetDetail(this.props.match.params.id)
        window.onpopstate = () => {
            this.props.onBreadBackOne()
        }
    }
    render() {

        if (this.props.status === 1){
            return (
                <div className="d-flex flex-column overflow-adjust h-100">
                    <div style={{height: `10%`}}>
                        <DetailHeader />
                    </div>
                    <div style={{height: `15%`}}>
                        <DetailTitle entity={this.props.entity}/>
                    </div>
                    <div style={{height: `70%`}}>
                        <MainDetail entity={this.props.entity}/>
                    </div>
                </div>
            );
        } 
        else if (this.props.status === 2)
            return <Waiting />
        return <h1> failed to get</h1>
    }
}

export default connect((state) => {
    return {
        entity: state.detail.entity,
        status: state.detail.getStatus
    }
}, (dispatch) => {
    return {
        onGetDetail: (id) => dispatch(getDetail(id)),
        onBreadBackOne: () => dispatch(breadBackOne())
    }
})(Detail);

Detail.propTypes = {
    entity: PropTypes.object.isRequired,
    status: PropTypes.number.isRequired,
    onGetDetail: PropTypes.func.isRequired,
    onBreadBackOne: PropTypes.func.isRequired
}