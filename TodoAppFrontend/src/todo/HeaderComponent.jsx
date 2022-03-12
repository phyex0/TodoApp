import React, { Component } from "react";
import AuthenticationService from "./AuthenticationService";
import { Link } from "react-router-dom";

class HeaderComponent extends Component {
  render() {
    const loggedIn = AuthenticationService.isUserLoggedIn();
    console.log(loggedIn);
   
    return (
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <a href="https://github.com/phyex0" className="navbar-brand">
              Phyex
            </a>
          </div>
          <ul className="navbar-nav">
            {loggedIn && (
              <li className="nav-link">
                <Link to="/welcome/Burak">Home</Link>
              </li>
            )}
            {loggedIn && (
              <li className="nav-link">
                <Link to="/todos">Todos</Link>
              </li>
            )}
          </ul>

          <ul className="navbar-nav navbar-collapse justify-content-end">
            {!loggedIn && (
              <li className="nav-link">
                <Link to="/login">Login</Link>
              </li>
            )}
            {loggedIn && (
              <li className="nav-link">
                <Link to="/logout" onClick={AuthenticationService.logout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </header>
    );
  }
}

export default HeaderComponent;
