import React from 'react';
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
const SingleResourceInput = ({resource, id, onResourceChange}) => {


    function handleNameChange(e, value) {
        onResourceChange(id, value, 'name')
    }
    function handleCategoryChange(e, key, value) {
        onResourceChange(id, value, 'category')
    }
    function handleLinkChange(e) {
        onResourceChange(id, e.target.value, 'link')
    }
    function exist() {
        return resource[id] !== undefined
    }
    function chooseValue (prop){
        return exist() ? resource[id][prop] : ''
    }
    function isEmpty(prop) {
        return !exist() ? true : ( resource[id][prop] === '' )
    }

        return (
            <div>
                <TextField id="resourceName" 
                    onChange={handleNameChange} 
                    value={chooseValue('name')}
                    floatingLabelText='资源名'
                    floatingLabelShrinkStyle={{fontSize: `1rem`}}
                    errorText={isEmpty('name') && 'required'}
                    fullWidth={true}
                    style={{marginTop: 0}}
                    />
                <SelectField onChange={handleCategoryChange}
                            floatingLabelText='资源类型'
                            value={chooseValue('category')}
                            errorText={isEmpty('category') && 'required'}
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
                <TextField id="resourceLink"   
                    onChange={handleLinkChange} 
                    value={chooseValue('link')}
                    errorText={isEmpty('link') && 'required'}
                    floatingLabelText='资源链接'
                    fullWidth={true}
                    floatingLabelShrinkStyle={{fontSize: `1rem`}}
                />
                <Divider style={{backgroundColor: `black`, height: `3px`}}/>
        </div>
        );
}

export default SingleResourceInput


