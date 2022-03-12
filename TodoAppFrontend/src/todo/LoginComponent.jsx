import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService.js";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Burak",
      password: "",
      loginStatus: -1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.loginClicked = this.loginClicked.bind(this);
  }

  handleChange(event) {
    console.log(event.target.name);
    console.log(event.target.value);

    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  loginClicked() {
    //Burak - ekmek

    // AuthenticationService.executeBasicAuth(
    //   this.state.username,
    //   this.state.password
    // )
    //   .then(() => {
    //     AuthenticationService.registerSuccessfulLogin(
    //       this.state.username,
    //       this.state.password
    //     );
    //     this.props.navigate("/welcome/" + this.state.username);
    //     this.setState({ loginStatus: 1 });
    //   })
    //   .catch(() => {
    //     this.setState({ loginStatus: 0 });
    //   });

    AuthenticationService.executeJWTAuth(
      this.state.username,
      this.state.password
    )
      .then((response) => {
        AuthenticationService.registerSuccessfulLoginForJWT(
          this.state.username,
          response.data.token
        );
        this.props.navigate("/welcome/" + this.state.username);
        this.setState({ loginStatus: 1 });
      })
      .catch(() => {
        this.setState({ loginStatus: 0 });
      });
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <div className="container"></div>
        <ShowState loginStatus={this.state.loginStatus}></ShowState>
        <div>
          User Name:{" "}
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          Password:{" "}
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <button className="btn btn=successful" onClick={this.loginClicked}>
            Login
          </button>
        </div>
      </div>
    );
  }
}

function ShowState(props) {
  if (props.loginStatus === 1) return <div>Success</div>;
  else if (props.loginStatus === 0)
    return <div className="alert alert-warning">Failed</div>;
  return null;
}

export default LoginComponent;
