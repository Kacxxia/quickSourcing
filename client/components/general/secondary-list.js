import React from 'react';
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
const SecondaryList = ({list}) => {
    return (
            <List >
                <Subheader ><h1 style={{margin: 0}}>子级</h1></Subheader>
                {list.map(el => 
                    <ListItem primaryText={el.names[0].content} />
                )}
            </List>
    );
};

export default SecondaryList;