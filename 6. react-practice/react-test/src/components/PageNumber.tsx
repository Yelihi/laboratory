import React from "react";

type PageNumberProps = {
  pageNumberTestId?: string;
  currentPage: number;
  number: number;
  clickPageNumber: () => void;
};

export default function PageNumber({
  pageNumberTestId,
  currentPage,
  number,
  clickPageNumber,
}: PageNumberProps) {
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
