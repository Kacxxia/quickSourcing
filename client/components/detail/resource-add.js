import React from 'react';
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'

import {
    addResourceChange
} from '../../actions/detail'
const ResourceAdd = ({
    name, 
    category, 
    href,
    onNameChange,
    onHrefChange,
    onCategoryChange
}) => {
    const buttonStyle = {
        margin: `12px`
    }
    return (
        <div>
            <div>
                <TextField 
                    onChange={(e, text) => onNameChange(text)} 
                    value={name}
                    floatingLabelText='资源名'
                    floatingLabelShrinkStyle={{fontSize: `1rem`}}
                    errorText={name === '' && 'required'}
                    fullWidth={true}
                    style={{marginTop: 0}}
                    />
                <SelectField onChange={(e, i, text) => onCategoryChange(text)}
                            floatingLabelText='资源类型'
                            value={category}
                            errorText={category === '' && 'required'}
                            floatingLabelFixed={false}
                            floatingLabelShrinkStyle={{fontSize: `1rem`}}
                            fullWidth={true}
                >
                    <MenuItem key={1} value='website' primaryText='网站' />
                    <MenuItem key={2} value='community' primaryText='社区' />
                    <MenuItem key={3} value='article' primaryText='文章' />
                    <MenuItem key={4} value='book' primaryText='书籍' />
                    <MenuItem key={5} value='other' primaryText='其它' />
                </SelectField>
                <TextField    
                    onChange={(e, text) =>onHrefChange(text)} 
                    value={href}
                    errorText={href === '' && 'required'}
                    floatingLabelText='资源链接'
                    fullWidth={true}
                    floatingLabelShrinkStyle={{fontSize: `1rem`}}
                />
        </div> 

        </div>
    );
};

export default connect(state => {
    return {
        category: state.detail.add.category,
        name: state.detail.add.name,
        href: state.detail.add.href,
    }
}, dispatch => {
    return {
        onNameChange: (text) => dispatch(addResourceChange('name', text)),
        onCategoryChange: (text) => 
            dispatch(addResourceChange('category', text)),
        onHrefChange: (text) => dispatch(addResourceChange('href', text))
    }
})(ResourceAdd);