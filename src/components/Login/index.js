import { Component } from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { TfiEmail } from "react-icons/tfi";
import { FaUserLarge } from "react-icons/fa6";
import { FaUnlockKeyhole } from "react-icons/fa6";

import "./index.css";


class Login extends Component {
  state = {
    email: "",
    name: "",
    password: "",
    showNameError: false,
    showEmailError: false,
    showPasswordError: false,
    showSubmitError: false,
    errorMesg: "",
  }; message

  onChangeUserName = (event) => {
    this.setState({ name: event.target.value });
  };
  onChangeEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  onChangePassword = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    history.replace("/home");
  };

  onSubmitFailure = (errorMesg) => {
    this.setState({ errorMesg, showSubmitError: true });
  };

  submitForm = async (event) => {
    event.preventDefault();
    const isValidName = this.validateName();
    const isValidEmail = this.validateEmail();
    const isValidPassword = this.validatePassword();
    this.setState({
      showNameError: !isValidName,
      showEmailError: !isValidEmail,
      showPasswordError: !isValidPassword,
    });

    const { name, email, password } = this.state;
    const userDetails = { name, email, password };
    const apiUrl = "https://randl-backend.onrender.com/api/login";
    
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    console.log("Sending request with data:", userDetails);
    const response = await fetch(apiUrl, options);
    console.log("Response:", response);

    const data = await response.json();
    console.log("Response data:", data);
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token);
    } else {
      this.onSubmitFailure(data.error_msg);
    }
  };

  validateName = () => {
    const { name } = this.state;
    return name !== "";
  };

  validateEmail = () => {
    const { email } = this.state;
    return email !== "";
  };

  validatePassword = () => {
    const { password } = this.state;
    return password !== "";
  };

  onBlurUserName = () => {
    const isValidName = this.validateName();
    this.setState({ showNameError: !isValidName });
  };
  onBlurEmail = () => {
    const isValidEmail = this.validateEmail();
    this.setState({ showEmailError: !isValidEmail });
  };
  onBlurPassword = () => {
    const isValidPassword = this.validatePassword();
    this.setState({ showPasswordError: !isValidPassword });
  };

  renderName = () => {
    const { name, showNameError } = this.state;

    return (
      <div>
        <div className={`email-input ${showNameError ? "error-field" : ""}`}>
          <FaUserLarge className="l-icon" />
          <input
            type="text"
            placeholder="User Name"
            value={name}
            className="input"
            onChange={this.onChangeUserName}
            onBlur={this.onBlurUserName}
          />
        </div>
        {showNameError && <p className="error-message">*Required</p>}
      </div>
    );
  };

  renderEmail = () => {
    const { email, showEmailError } = this.state;
    return (
      <div>
        <div className={`email-input ${showEmailError ? "error-field" : ""}`}>
          <TfiEmail className="l-icon" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            className="input"
            onChange={this.onChangeEmail}
            onBlur={this.onBlurEmail}
          />
        </div>
        {showEmailError && <p className="error-message">*Required</p>}
      </div>
    );
  };

  renderPassword = () => {
    const { password, showPasswordError } = this.state;
    return (
      <div>
        <div
          className={`email-input ${showPasswordError ? "error-field" : ""}`}
        >
          <FaUnlockKeyhole className="l-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className="input"
            onChange={this.onChangePassword}
            onBlur={this.onBlurPassword}
          />
        </div>
        {showPasswordError && <p className="error-message">*Required</p>}
      </div>
    );
  };

  render() {
    const { showSubmitError, errorMesg } = this.state;
    const token = Cookies.get("jwt_token");
    if (token !== undefined) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="container">
        <div className="top-heading">
          <h1 className="heading">Login</h1>
          <p className="underline"></p>
        </div>
        <form className="inputs" onSubmit={this.submitForm}>
          {this.renderName()}
          {this.renderEmail()}
          {this.renderPassword()}
          {showSubmitError && <p className="error-message">*{errorMesg}</p>}

          <p className="forgot-password">
            forgot password ? <Link to="#" >Click here</Link>
          </p>
          <p className="forgot-password">
            Don't have an account ? <Link to="/register">Create Account</Link>
          </p>
          <div className="submit-button">
            <button className="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
