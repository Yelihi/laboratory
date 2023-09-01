import React from "react";

export default function PageNumber({ pageNumberTestId, currentPage, number }) {
  return (
    <li key={number}>
      <span
        data-testid={pageNumberTestId}
        className={currentPage === number ? "active" : undefined}
      >
        {number}
      </span>
    </li>
  );
}
