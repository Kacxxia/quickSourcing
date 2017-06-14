import React from 'react';

const Pagination = ({
    length,
    currentPage
}) => {
    let displayPages = chooseDisplayPages()
    let leftClass = '', 
        rightClass = ''

    if(currentPage == 1) { leftClass += ' disabled'}
    if(currentPage == displayPages) { rightClass += ' disabled'}

    let pages = []
    
    computePages(pages, currentPage, length, displayPages)

    const containerStyle = {
        margin: 0
    }
    return (
        <ul className="pagination center-align" style={containerStyle}>
            <li className={leftClass}>
                <a><i className="material-icons">chevron_left</i></a>
            </li>
            {show(pages, currentPage)}
            <li className={rightClass}>
                <a><i className="material-icons">chevron_right</i></a>
            </li>
        </ul>
    );
};

export default Pagination;

function show(pages, currentPage) {
    return pages.map((page, index) => {
        let liClass = ''
        if(page === currentPage) {
            liClass += ' active'
        } else {
            liClass += ' waves-effect'
        }
        return <li key={index} className={liClass}><a>{page}</a></li>
    })
}

function computePages(pages, currentPage, length, displayPages) { 
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