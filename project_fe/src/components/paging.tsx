import React from 'react';
import Pagination from 'react-js-pagination';
import './css/paging.css'

interface PagingProps {
    page: number;
    item_page: number;
    totalCnt: number;
    changePage: (page: number) => void;
}

const Paging: React.FC<PagingProps> = ({ page, item_page, totalCnt, changePage }) => {
    return (
        <>
            <Pagination 
                activePage={page}
                itemsCountPerPage={item_page}
                totalItemsCount={totalCnt}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={changePage}
                activeClass="active"
                itemClass="pageItem" 
            />
        </>
    );
};

export default Paging;
