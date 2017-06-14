import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSearchAction } from 'redux-search'
import { addChip, deleteChip, updateTagID} from '../../actions/main'
class TagSearchBar extends Component {
    componentDidUpdate(prevProps) {
        const that = this
        if(prevProps.searchResult !== that.props.searchResult) {
            updateTagID(that.props.dispatch, that.props.searchResult)
        }
        $(document).ready(() => {
            $('.chips-autocomplete').material_chip({
                data: convertTagList(that.props.initialTags),
                placeholder: '+Tag',
                secondaryPlaceholder: 'Enter a tag',
                autocompleteOptions: {
                    data: that.props.tagObj,
                    limit: 3,
                    minLength: 1
                }
            })
        });
    }
    componentDidMount() {
        const that = this
        $(document).ready(() => {
            $('.chips-autocomplete').material_chip({
                data: convertTagList(that.props.initialTags),
                placeholder: '+Tag',
                secondaryPlaceholder: 'Enter a tag',
                autocompleteOptions: {
                    data: that.props.tagObj,
                    limit: 3,
                    minLength: 1
                }
            })
        });
        $('.chips').on('chip.add', function(e, chip){
            addChip(that.props.dispatch, chip)
        });
        $('.chips').on('chip.delete', function(e, chip){
            deleteChip(that.props.dispatch, chip)
        });
    }
    render() {
        const iconStyle = {
            position: "absolute",
            right: 0,
            bottom: "25%"
        }
        return (
        <div  className="center-align" style={{position: 'relative'}}>
            <div className="chips-autocomplete left-align chips" 
                style={{margin: 0}}></div>
            <span className='material-icons' 
            style={iconStyle}>
                search
            </span>
        </div>
    );
    }
}

export default connect((state) => {
    const tags = state.searchResource.tags
    const tagObj = tags.reduce((acc, tag) => {
        acc[tag] = null
        return acc
    }, {})
    return ({
        tagObj: tagObj,
        searchResult: state.search.entities.result,
        updateTagStatus: state.searchResource.updateTagStatus,
        initialTags: state.searchResource.inputTags
    })}
)(TagSearchBar);


TagSearchBar.propTypes = {
    tagObj: PropTypes.object.isRequired
}

function convertTagList(tags) {
    let result
    result = tags.reduce((acc, tag) => {
        acc.push({tag: tag})
        return acc
    }, [])
    return result
}