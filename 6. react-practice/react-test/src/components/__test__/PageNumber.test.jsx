import React from "react";
import { screen, render } from "@testing-library/react";
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
    //Arrange
    const { pageNumber } = renderPageNumberComponent();

    //Assert
    expect(pageNumber).toHaveTextContent(1);
  });

  it("현재 페이지이면 형광처리", () => {
    //Arrange
    const { pageNumber } = renderPageNumberComponent(2, 2);

    //Assert
    expect(pageNumber).toHaveClass("active");
  });

  it("현재 다른 페이지라면 형광처리하지 않음", () => {
    //Arrange
    const { pageNumber } = renderPageNumberComponent(2, 3);

    //Assert
    expect(pageNumber).not.toHaveClass("active");
  });
});
