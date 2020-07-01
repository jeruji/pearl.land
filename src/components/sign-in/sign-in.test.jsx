import React from "react";
import SignIn from "./sign-in.component";
import Adapter from "enzyme-adapter-react-16";
import { shallow, configure } from "enzyme";
import { render, cleanup, fireEvent } from "@testing-library/react";

configure({ adapter: new Adapter() });
afterEach(cleanup);
describe("sign-in validator", () => {
  test("When email doesn't match regex, error should be 'Please Check Your Email Address'", () => {
    const email = "notmatch";
    const wrapper = shallow(<SignIn />);
    expect(wrapper.instance().validate("email", email)).toBe(
      "Please Check Your Email Address"
    );
  });
  test('When email does match regex, return should be ""', () => {
    const email = "test@email.com";
    const wrapper = shallow(<SignIn />);
    expect(wrapper.instance().validate("email", email)).toBe("");
  });
});
describe("sign-in submit", () => {
  test("When submit without filling fields should display errors", () => {
    const { getAllByText, getByText } = render(<SignIn />);

    const signInButton = getByText("Sign in");
    fireEvent.click(signInButton);

    const errorEmailSpan = getAllByText("Please Check Your Email Address");
    expect(errorEmailSpan.length).toBe(1);

    const errorPasswordSpan = getAllByText(
      "You Have To Enter At Least 8 Digits"
    );
    expect(errorPasswordSpan.length).toBe(1);
  });
  test("Renders", () => {
    const { container } = render(<SignIn />);
    expect(container).toMatchSnapshot();
  });
  test("When submit after filling in fields should submit okay", () => {
    const { container, getByText, getByLabelText } = render(<SignIn />);

    const emailField = getByLabelText("email");
    expect(emailField).not.toBeNull();
    fireEvent.change(emailField, {
      target: { value: "test@email.com" },
    });

    const passwordField = getByLabelText("password");
    expect(passwordField).not.toBeNull();
    fireEvent.change(passwordField, {
      target: { value: "inipasswordsaya" },
    });

    const signInButton = getByText("Sign in");
    fireEvent.click(signInButton);

    const errorSpan = container.querySelector("[data-testid='formErrors']");
    expect(errorSpan).toBeNull();
  });
});
