import React from "react";
import { fireEvent, screen, render } from "@testing-library/react";
import PageNumber from "../PageNumber";

const PAGE_NUMBER_TEST_ID = "page-number";

const renderPageNumberComponent = (number = 1, currentPage = 1) => {
  render(
    <PageNumber
      pageNumberTestId={PAGE_NUMBER_TEST_ID}
      number={number}
      currentPage={currentPage}
    />
  );

  const pageNumber = screen.getByTestId(PAGE_NUMBER_TEST_ID);

  return { pageNumber };
};

describe("PageNumber Component", () => {
  it("Component rendering", () => {
    const { pageNumber } = renderPageNumberComponent();

    expect(pageNumber).toHaveTextContent(1);
  });

  it("현재 페이지이면 형광처리", () => {
    const { pageNumber } = renderPageNumberComponent(2, 2);

    expect(pageNumber).toHaveClass("active");
  });

  it("현재 다른 페이지라면 형광처리하지 않음", () => {
    const { pageNumber } = renderPageNumberComponent(2, 3);

    expect(pageNumber).not.toHaveClass("active");
  });
});
