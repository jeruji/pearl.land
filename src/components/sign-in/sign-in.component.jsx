import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {
        email: "",
        password: "",
      },
    };
  }

  validateForm = () => {
    const errors = {};
    Object.keys(this.state).forEach((fieldName) => {
      errors[fieldName] = this.validate(fieldName, this.state[fieldName]);
    });

    this.setState({ errors });
  };

  validate = (fieldName, value) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (fieldName === "email") {
      if (!re.test(value)) {
        return "Please Check Your Email Address";
      } else {
        return "";
      }
    } else if (fieldName === "password") {
      if (
        value.length < 8 ||
        value === "" ||
        value === null ||
        value === undefined
      ) {
        return "You Have To Enter At Least 8 Digits";
      }
    }
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.validateForm();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: "", password: "" });
    } catch (error) {
      console.log(error);
    }
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account?</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            error={this.state.errors.email}
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            error={this.state.errors.password}
          />
          <div className="buttons">
            <CustomButton type="submit">Sign in</CustomButton>
            <CustomButton
              type="button"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              {" "}
              Sign in with Google{" "}
            </CustomButton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
