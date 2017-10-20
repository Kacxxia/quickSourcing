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
            {computePages(currentPage, length, displayPages).map((page) => {
                return <FlatButton 
                    onTouchTap={() => onSpecPage(page)} 
                    label={page}
                    secondary={page === currentPage} 
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
    const halfDisplay = Math.floor(displayPages / 2)
    let leftEnd = currentPage - halfDisplay < 1 ? 1 : currentPage - halfDisplay
    let rightEnd = currentPage + halfDisplay > length ? length : currentPage + halfDisplay
    if (rightEnd - leftEnd + 1 < displayPages) {
        let need = displayPages - (rightEnd - leftEnd + 1)
        rightEnd = rightEnd + need > length ? length : rightEnd + need
        leftEnd = leftEnd - need < 1 ? 1 : leftEnd - need
    }
    for (let i = leftEnd; i <= rightEnd; i++) {
        pages.push(i)
    }
    return pages    
}

function chooseDisplayPages() {
    const width = window.innerWidth
    if (width <= 340 ) {
        return 1
    } 
    if (width <= 414) {
        return 3
    } 
        return 7
}