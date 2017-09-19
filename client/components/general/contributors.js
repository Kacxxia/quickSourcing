import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Avatar from 'material-ui/Avatar'
const Contributors = ({list}) => {
    return (
        <div>
            {renderContributors(list)}
        </div>
    );
};

export default Contributors;

function renderContributors(list) {
    return list.map((contributor, i) => {
        return <Link to={`/profiles/${contributor._id}`} key={i}>
                    <Avatar src={contributor.avatar} />
                </Link>
    })
}

Contributors.propTypes = {
    list: PropTypes.array.isRequired
}