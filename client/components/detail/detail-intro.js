import React from 'react';

import Paper from 'material-ui/Paper'
import Chip from 'material-ui/Chip'
import Tag from '../general/tag'
import SecondaryList from '../general/secondary-list'
const DetailIntro = ({entity}) => {
    return (
        <div className="h-100 container-fluid">
            <div className='row h-100'>
                <div className="h-100 col-12 col-sm-3" >
                    <Paper style={{height: `50%`}} className='d-flex align-items-center px-1'>
                        {introJudge(entity.introduction)}
                    </Paper>
                    <div className='d-flex flex-wrap' style={{margin: `1rem 0`,padding: `2px 0.5rem`}}>
                        {entity.tags.map((tag, i) => {
                            return <Chip key={i} style={{margin: `2px`}}> {tag} </Chip>
                        })}
                    </div>
                </div>
                <div  className="col-12 col-sm-9">
                    <SecondaryList list={entity.children} />
                </div>
            </div>
        </div>
    );
};

export default DetailIntro;

function introJudge(intro) {
    if(intro[0]){
        return intro[0].content
    } else {
        return '暂无介绍'
    }
}