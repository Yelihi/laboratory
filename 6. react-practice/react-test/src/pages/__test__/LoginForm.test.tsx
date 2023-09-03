import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../LoginForm";

describe("LoginForm", () => {
  it("Label과 Input 그리고 버튼이 제대로 렌더링 되어야 함", () => {
    //Arrange
    render(<LoginForm />);

    const nameLabel = screen.getByText(/이름/i);
    const inputElement = screen.getByRole("textbox");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");
    //Act

    //Assert
    expect(nameLabel).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("이름을 입력하고 약관에 동의한 다음 버튼을 클릭하면 Alert 창으로 입력한 값이 출력되어야 함", () => {
    // window 를 접근할 수 없어서 비슷한걸 만들자.
    const alertMock = jest.fn();
    window.alert = alertMock;
    //Arrange
    render(<LoginForm />);
    const inputElement = screen.getByRole("textbox");
    const checkboxElement = screen.getByRole("checkbox");
    const buttonElement = screen.getByRole("button");

    //Act
    fireEvent.change(inputElement, { target: { value: "wonik" } });
    fireEvent.click(checkboxElement);
    fireEvent.click(buttonElement);

    //Assert
    expect(alertMock).toHaveBeenCalledWith("name wonik");
  });
  it("약관에 동의하지 않으면 alert 창이 출력되지 말아야 함", () => {
    const alertMock = jest.fn();
    window.alert = alertMock;
    //Arrange
    render(<LoginForm />);
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button");

    //Act
    fireEvent.change(inputElement, { target: { value: "wonik" } });
    fireEvent.click(buttonElement);

    //Assert
    expect(alertMock).not.toHaveBeenCalledWith("name wonik");
  });
});
