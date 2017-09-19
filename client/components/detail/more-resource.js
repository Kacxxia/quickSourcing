import React from 'react';
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Add from 'material-ui/svg-icons/content/add'

import { showDetailResource, addResource } from '../../actions/detail'
const MoreResource = ({list, onShowDetailResource, onAddResource}) => {
    const xxlist =  addScoreSymbol(list).slice(0),
        sortedList = sortList(xxlist),
        topList = sortedList.slice(0, 3),
        candidatedList = sortedList.slice(3, sortedList.length)
    const score = Symbol.for('score')
    for(let i of sortedList) {
        console.log(i[score])
    }
    return (
        <div>
            <h3>推荐资源</h3>
            <Divider />
            <div className='d-flex'>
                {renderTopList(topList, onShowDetailResource)}
            </div>
            <div className='d-flex align-items-center' style={{padding: '1.5rem 0'}}>
                <h3 style={{margin: 0}}>候选资源</h3>
                <FloatingActionButton 
                    onTouchTap={() => onAddResource()} 
                    mini={true}
                    zDepth={1}
                    style={{marginLeft: '1rem'}}
                >
                    <Add color='green'/>
                </FloatingActionButton>
            </div>
            <Divider />
            <div>
                {renderCandidatedList(candidatedList, onShowDetailResource)}
            </div>
        </div>
    );
};

export default connect(null, dispatch => {
    return {
        onShowDetailResource: (_id) => 
        dispatch(showDetailResource(_id)),
        onAddResource: () => {
            dispatch(addResource())
        },
    }
})(MoreResource);

function addScoreSymbol(list) {
    const score = Symbol('score')
    for (let i of list) {
        i[score] = i.priority * 100 + i.good - i.bad - i.outdated
    }
    return list
}


function swap(list, i, j) {
    let temp = list[i]
    list[i] = list[j]
    list[j] = temp
}

function sortList(list, left, right) {
    const score = Symbol.for('score')
    if (left < right) {
        let i = left, j = right
        const benchmark = list[Math.floor((left + right) / 2)]
        while(i <= j) {
            while ( list[i][score] < benchmark[score] )
                i++
            while ( list[j][score] > benchmark[score] )
                j--
            if ( i <= j ){ 
                swap(list, i, j)
                i++
                j--
            }
        }
        sortList(list, left, i-1)
        sortList(list, i, right)
    }
    return list
}

function renderTopList(list, onShowDetailResource) {
    return list.map((resource, i) => {
        return <Paper 
                        className='col-12 col-sm-4 d-flex align-items-center justify-content-center paper' 
                        key={i} 
                        onClick={() => onShowDetailResource(resource._id)}
                        style={{cursor: 'pointer', height: '3rem'}}
                    >
                {resource.name}
                </Paper>
    })
}

function renderCandidatedList(list, onShowDetailResource) {
    return list.map((resource, i) => {
        return <Paper 
                        className='col-12 col-sm-2 d-flex align-items-center justify-content-center paper' 
                        key={i} 
                        onClick={() => onShowDetailResource(resource._id)}
                        style={{cursor: 'pointer', height: '3rem'}}
                    >
                {resource.name}
                </Paper>
    })
}