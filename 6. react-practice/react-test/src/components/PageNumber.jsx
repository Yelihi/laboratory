import React from "react";

export default function PageNumber({
  pageNumberTestId,
  currentPage,
  number,
  clickPageNumber,
}) {
  return (
    <li key={number}>
      <span
        data-testid={pageNumberTestId}
        className={currentPage === number ? "active" : undefined}
        onClick={clickPageNumber}
      >
        {number}
      </span>
    </li>
  );
}
