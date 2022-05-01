import React from "react";
import { usePagination, DOTS } from "./usePagination";
import s from  './pagination.module.css';
import classNames from "classnames"
const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    if(currentPage !== lastPage) onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if(currentPage !== 1) onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classNames(s.conteiner, {[className]: className})}>
      {/* Left navigation arrow */}
      <li onClick={onPrevious} className={classNames(s.item, {disabled: currentPage===1})}>
        <div className={s.arrow_left}/>
      </li>
      {paginationRange.map((pageNumber) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className={s.item_dots}>&#8230;</li>;
        }

        // Render our Page Pills
        return <li onClick={() => onPageChange(pageNumber)}className={s.item}>{pageNumber}</li>;
      })}
      {/*  Right Navigation arrow */}
      <li onClick={onNext} className={s.item}>
        <div className={s.arrow_right}/>
      </li>
    </ul>
  );
};

export default Pagination;
