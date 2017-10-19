import React from 'react';
import { List } from 'material-ui/List'
import Paper from 'material-ui/Paper'
const PaperList = ({list, similarClickFunc}) => {
    return (
        <div className='d-flex flex-wrap' style={{overflowX: 'auto', overflowY: 'hidden'}}>
            {list.map((item, i) => 
                <Paper 
                    onClick={() => similarClickFunc(item)}
                    key={i}
                    style={{margin: '0.5rem', overflowY: 'auto', padding: '1rem 0.5rem', fontSize: '1.5rem', cursor: 'pointer'}} 
                    zDepth={1}
                    
                >
                    {item.name}
                </Paper>
            )}
        </div>
    );
};

export default PaperList;