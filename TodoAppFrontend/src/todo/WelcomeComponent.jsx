import React, { Component } from "react";
import { Link } from "react-router-dom";
import HelloWorld from "../api/todo/HelloWorld.js";

class WelcomeComponent extends Component {
  constructor(props) {
    super(props);
    this.getMessage = this.getMessage.bind(this);
    this.handleSuccesfull = this.handleSuccesfull.bind(this);
    this.handleError = this.handleError.bind(this);
    this.state = { welcomeMessage: "" };
  }

  render() {
    return (
      <>
        <h1>Welcome!</h1>
        <div className="container">
          Welcome {this.props.params.name}. You can maange your todos
          <Link to="/todos"> here</Link>
        </div>

        <div className="container">
          Hit the button to get customized welcome message
          <div>
            <button onClick={this.getMessage} className="btn btn-success">
              Get Message
            </button>
          </div>
          <div className="container">{this.state.welcomeMessage}</div>
        </div>
      </>
    );
  }

  getMessage() {
    HelloWorld.executeHelloWorldService(this.props.params.name)
      .then((response) => this.handleSuccesfull(response))
      .catch(() => this.setState({ welcomeMessage: "Error" }));
  }

  handleSuccesfull(response) {
    this.setState({ welcomeMessage: response.data.message });
  }

  handleError(error) {
    console.log("erorr");
    //console.log(error.response.data.message);
    this.setState({ welcomeMessage: "Error" });
  }
}

export default WelcomeComponent;
