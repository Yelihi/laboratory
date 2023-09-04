import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../LoginForm";

describe("LoginForm", () => {
  it("Label과 Input 그리고 버튼이 제대로 렌더링 되어야 함", () => {
    //Arrange
    render(<LoginForm />);

    const nameLabel = screen.getByText(/이름/i);
    const inputNameElement = screen.getByTestId("name");

    const passwordLabel = screen.getByText(/비밀번호/i);
    const inputPasswordElement = screen.getByTestId("password");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");
    //Act

    //Assert
    expect(nameLabel).toBeInTheDocument();
    expect(inputNameElement).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(inputPasswordElement).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("이름을 입력하고 비밀번호를 입력하고 약관에 동의한 다음 버튼을 클릭하면 Alert 창으로 입력한 값이 출력되어야 함", () => {
    // window 를 접근할 수 없어서 비슷한걸 만들자.
    const alertMock = jest.fn();
    window.alert = alertMock;
    //Arrange
    render(<LoginForm />);
    const inputNameElement = screen.getByTestId("name");
    const inputPasswordElement = screen.getByTestId("password");

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    //Act
    fireEvent.change(inputNameElement, { target: { value: "wonik" } });
    fireEvent.change(inputPasswordElement, { target: { value: "wonik1234" } });
    fireEvent.click(checkbox);
    fireEvent.click(button);

    //Assert
    expect(alertMock).toHaveBeenCalledWith("name wonik");
  });
  it("에러가 있는 경우엔 alert 창이 출력되지 말아야 함", () => {
    const alertMock = jest.fn();
    window.alert = alertMock;
    //Arrange
    render(<LoginForm />);
    const inputNameElement = screen.getByTestId("name");
    const buttonElement = screen.getByRole("button");

    //Act
    fireEvent.change(inputNameElement, { target: { value: "j" } });
    fireEvent.click(buttonElement);

    //Assert
    expect(alertMock).not.toHaveBeenCalled();
  });

  it("이름은 2자 미만 입력하면 에러가 출력되어야 함", () => {
    //Arrange
    render(<LoginForm />);
    const inputNameElement = screen.getByTestId("name");
    //Act
    fireEvent.change(inputNameElement, { target: { value: "a" } });
    //Assert
    expect(screen.getByText("2자 이상 입력해주세요")).toBeInTheDocument();
  });
  it("이름을 6자 초과 입력하면 에러가 출력되어야 함", () => {
    //Arrange
    render(<LoginForm />);
    const inputNameElement = screen.getByTestId("name");
    //Act
    fireEvent.change(inputNameElement, { target: { value: "aaaaaaa" } });
    //Assert
    expect(screen.getByText("6자 이하 입력해주세요")).toBeInTheDocument();
  });
  it("패스워드는 6자 이상, 12자 이하 입력되어야 함", () => {
    //Arrange
    render(<LoginForm />);
    const inputPasswordElement = screen.getByTestId("password");
    //Act
    fireEvent.change(inputPasswordElement, { target: { value: "1234545" } });
    //Assert
    expect(screen.queryByText("6자 이상 입력해주세요")).toBeNull();
    expect(screen.queryByText("12자 이하 입력해주세요")).toBeNull();
  });
  it("패스워드는 6자 미만 입력하면 에러가 출력되어야 함", () => {
    //Arrange
    render(<LoginForm />);
    const inputPasswordElement = screen.getByTestId("password");
    //Act
    fireEvent.change(inputPasswordElement, { target: { value: "1235" } });
    //Assert
    expect(screen.getByText("6자 이상 입력해주세요")).toBeInTheDocument();
  });
  it("패스워드는 12자 초과 입력하면 에러가 출력되어야 함", () => {
    //Arrange
    render(<LoginForm />);
    const inputPasswordElement = screen.getByTestId("password");
    //Act
    fireEvent.change(inputPasswordElement, {
      target: { value: "1234567891234" },
    });
    //Assert
    expect(screen.queryByText("12자 이하 입력해주세요")).toBeInTheDocument();
  });
  it("약관에 동의하지 않으면 에러가 출력되어야 함", () => {
    //Arrange
    render(<LoginForm />);
    const checkbox = screen.getByRole("checkbox");
    //Act
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    //Assert
    expect(screen.getByText("반드시 체크해주세요")).toBeInTheDocument();
  });
});
