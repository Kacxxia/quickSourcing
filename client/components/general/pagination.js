import React from 'react';
import PropTypes from 'prop-types'
import FlatButton from 'material-ui/FlatButton'
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left'
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right'

const Pagination = ({
    length,
    currentPage,
    onNextPage,
    onPrevPage,
    onSpecPage
}) => {
    let displayPages = chooseDisplayPages()
    let leftDisabled = false, 
        rightDisabled = false

    if(currentPage == 1) { leftDisabled = true}
    if(currentPage >= length) { rightDisabled = true}

    let pages = computePages(currentPage, length, displayPages)

    return (
        <div className="d-flex justify-content-center" >
            <FlatButton 
                icon={<ChevronLeft /> }
                onTouchTap={() => onPrevPage()}
                disabled={leftDisabled}
            />
            {pages.map((page) => {
                return <FlatButton 
                    onTouchTap={() => onSpecPage(page)} 
                    label={page}
                    primary={page === currentPage} 
                    key={page}/>
            })}
            <FlatButton 
                icon={<ChevronRight /> }
                onTouchTap={() => onNextPage()}
                disabled={rightDisabled}
            />
        </div>
    );
};

export default Pagination;

Pagination.propTypes = {
    length: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onNextPage: PropTypes.func.isRequired,
    onPrevPage: PropTypes.func.isRequired,
    onSpecPage: PropTypes.func.isRequired
}

function computePages(currentPage, length, displayPages) { 
    let pages = []
    const   half = (displayPages-1)/2,
       rest = length - currentPage
    if (length <= displayPages) {
        for (let i=0; i<length; i++) {
            pages.push(i+1)
        }
    } else {
        if (currentPage <= 5) {
            for (let i=0; i<displayPages; i++) {
                pages.push(i+1)
            }
        } else {
            if ( rest >= half) {
                for (let i=0; i<displayPages; i++) {
                    pages.push(currentPage - half + i)
                }
            } else {
                for (let i=0; i<displayPages; i++) {
                    pages.push(rest + 1 + i)
                }
            }
        }
    }
    return pages
}

function chooseDisplayPages() {
    const width = window.innerWidth
    if (width <= 280) {
        return 3
    }
    if (width <= 340 ) {
        return 5
    } 
    if (width <= 416) {
        return 7
    } 
        return 9
}