import React from "react";
import Pagination from "../Pagenation";
import { screen, render, fireEvent } from "@testing-library/react";

const PAGE_NUMBER_TEST_ID = "page-number";

const renderPageNumbers = (totalItems = 9, itemsPerPage = 3) => {
  render(
    <Pagination
      totalItems={totalItems}
      itemsPerPage={itemsPerPage}
      pageNumberTestId={PAGE_NUMBER_TEST_ID}
    />
  );

  const nextButton = screen.getByText(/next/i);
  const prevButton = screen.getByText(/previous/i);

  return {
    nextButton,
    prevButton,
  };
};

describe("Pagenation", () => {
  it("Pagination 이 렌더링 된다", () => {
    //Arrange
    const { prevButton, nextButton } = renderPageNumbers(9, 3);
    const pageNumber = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

    //Assert
    expect(pageNumber.length).toBe(3);

    // 좀 더 자세하게 테스트 하려면
    pageNumber.forEach((number, i) => {
      expect(number).toHaveTextContent(`${i + 1}`);
    });

    // 초기 상태는 prevbutton 이 disabled 되어 있어야 한다.
    expect(prevButton).toBeInTheDocument();
    expect(prevButton).toHaveClass("disabled");

    // 반대로 nextbutton 은 클릭할 수 있어야 한다.
    expect(nextButton).toBeInTheDocument();
    expect(nextButton).not.toHaveClass("disabled");
  });

  it("첫번째 페이지에서는 이전 페이지로 돌아갈 수 없음", () => {
    //Arrange
    const { prevButton } = renderPageNumbers(9, 3);

    //Act
    fireEvent.click(prevButton);

    //Assert
    expect(prevButton).toHaveClass("disabled");
  });

  it("중간 페이지에서는 이전, 다음 페이지로 이동할 수 있음", () => {
    //Arrange
    const { prevButton, nextButton } = renderPageNumbers(9, 3);

    //Act
    fireEvent.click(nextButton);

    //Assert
    expect(nextButton).not.toHaveClass("disabled");
    expect(prevButton).not.toHaveClass("disabled");
  });

  it("마지막 페이지에서는 다음 버튼을 클릭했을 때 다음 페이지로 이동할 수 없음", () => {
    //Arrange
    const { prevButton, nextButton } = renderPageNumbers(9, 3);

    //Act
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);
    fireEvent.click(nextButton);

    //Assert
    expect(nextButton).toHaveClass("disabled");
    expect(prevButton).not.toHaveClass("disabled");
  });

  it("페이지내이션 숫자를 누르면 그 숫자 페이지로 이동 함", () => {
    //Arrange
    renderPageNumbers();
    const pageNumbers = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

    //Act
    fireEvent.click(pageNumbers[0]);

    //Assert
    expect(pageNumbers[0]).toHaveClass("active");
  });

  it("페이지내이션 마지막 숫자를 누르면 다음페이지로 이동하지 못함", () => {
    //Arrange
    const { nextButton } = renderPageNumbers();
    const pageNumbers = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

    //Act
    fireEvent.click(pageNumbers[pageNumbers.length - 1]);

    //Assert
    expect(nextButton).toHaveClass("disabled");
  });

  it("페이지내이션 첫번째 숫자를 누르면 이전페이지로 이동하지 못함", () => {
    //Arrange
    const { prevButton } = renderPageNumbers();
    const pageNumbers = screen.getAllByTestId(PAGE_NUMBER_TEST_ID);

    //Act
    fireEvent.click(pageNumbers[0]);

    //Assert
    expect(prevButton).toHaveClass("disabled");
  });
});
