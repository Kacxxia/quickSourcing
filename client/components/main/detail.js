import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import DetailHeader from '../detail/detail-header'
import MainDetail from '../detail/main-detail'
import DetailTitle from '../detail/detail-title'
import Waiting from '../general/waiting'
import { breadBackOne, getDetail, breadGo, clickSubordinate, clearDetail } from '../../actions/detail'
class Detail extends Component {
    componentWillMount() {
        this.props.onClearDetail()
    }
    componentWillUpdate(nextProps) {
        if (this.props.match.params.id !== nextProps.match.params.id){
            this.props.onClearDetail()
            this.props.getSubordinate(nextProps.match.params.id)
            this.props.onGetDetail(nextProps.match.params.id)
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.status === 1 && prevProps.status === 2){
            this.props.onBreadGo(this.props.entity.name)
        }
    }
    componentDidMount() {
        this.props.onGetDetail(this.props.match.params.id)
        this.props.getSubordinate(this.props.match.params.id)
        window.onpopstate = () => {
            if(this.props.isUserClickBackButton){
                this.props.onBreadBackOne()
            }
        }
    }
    render() {

        if (this.props.status === 1){
            return (
                <div className="d-flex flex-column overflow-adjust h-100">
                    <div style={{height: `10%`}}>
                        <DetailHeader editStatus={this.props.editStatus}/>
                    </div>
                    <div style={{height: `15%`}}>
                        <DetailTitle 
                        entity={this.props.entity} 
                        editStatus={this.props.editStatus}/>
                    </div>
                    <div style={{height: `70%`}}>
                        <MainDetail 
                        entity={this.props.entity} 
                        match={this.props.match} editStatus={this.props.editStatus}/>
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
        status: state.detail.getStatus,
        isUserClickBackButton: state.detail.canUserClickBackButton,
        editStatus: state.detail.editStatus
    }
}, (dispatch) => {
    return {
        onGetDetail: (id) => dispatch(getDetail(id)),
        onBreadBackOne: () => { 
            dispatch(breadBackOne())
        },
        onBreadGo: (name) => dispatch(breadGo(name)),
        getSubordinate: (id) => dispatch(clickSubordinate(id)),
        onClearDetail: () => dispatch(clearDetail())
    }
})(Detail);

Detail.propTypes = {
    entity: PropTypes.object.isRequired,
    status: PropTypes.number.isRequired,
    onGetDetail: PropTypes.func.isRequired,
    onBreadBackOne: PropTypes.func.isRequired,
    onBreadGo: PropTypes.func.isRequired,
    getSubordinate: PropTypes.func.isRequired,
    editStatus: PropTypes.number.isRequired,
    onClearDetail: PropTypes.func.isRequired,
    match: PropTypes.object.isRequired,
    isUserClickBackButton: PropTypes.bool.isRequired
}