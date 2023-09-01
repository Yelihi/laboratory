import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

import PageNumber from "./PageNumber";

export default function Pagination({
  totalItems,
  itemsPerPage,
  pageNumberTestId,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const clickPageNumber = (number) => () => {
    setCurrentPage(number);
  };

  return (
    <nav>
      <ul className='pagination' key='pagination'>
        <li key='left'>
          <Link
            to='#'
            onClick={handlePrevClick}
            className={currentPage === 1 ? "disabled" : undefined}
          >
            Previous
          </Link>
        </li>
        {pageNumbers.map((number) => (
          <PageNumber
            pageNumberTestId={pageNumberTestId}
            currentPage={currentPage}
            number={number}
            clickPageNumber={clickPageNumber(number)}
          />
        ))}
        <li key='right'>
          <Link
            to='#'
            onClick={handleNextClick}
            className={
              currentPage === pageNumbers.length ? "disabled" : undefined
            }
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}
