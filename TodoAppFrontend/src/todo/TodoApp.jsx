import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthenticatedRoute from "./AuthenticatedRoute";
import LoginComponent from "./LoginComponent.jsx";
import ListToDoComponent from "./ListTodos.jsx";
import WelcomeComponent from "./WelcomeComponent.jsx";
import HeaderComponent from "./HeaderComponent.jsx";
import LogoutComponent from "./LogoutComponent.jsx";
import FooterComponent from "./FooterComponent.jsx";
import ErrorHandler from "./ErrorComponent";
import withNavigation from "./WithNavigation";
import withParams from "./WithParams";
import TodoComponent from "./TodoComponent";

class TodoApp extends Component {
  render() {
    const LoginWithNavigation = withNavigation(LoginComponent);
    const WelcomeComponentWithParam = withParams(WelcomeComponent);
    const HeaderComponentWithNavigation = withNavigation(HeaderComponent);
    const ListTodosWithNavigation = withNavigation(ListToDoComponent);
    const TodoComponenetWithNavigation = withParams(
      withNavigation(TodoComponent)
    );
    return (
      <div className="TodoApp">
        <Router>
          <HeaderComponentWithNavigation />
          <Routes>
            <Route path="/" element={<LoginWithNavigation />} />
            <Route path="/login" element={<LoginWithNavigation />} />
            <Route
              path="/welcome/:name"
              element={
                <AuthenticatedRoute>
                  <WelcomeComponentWithParam />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/todos/:id"
              element={
                <AuthenticatedRoute>
                  <TodoComponenetWithNavigation />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/todos"
              element={
                <AuthenticatedRoute>
                  <ListTodosWithNavigation />
                </AuthenticatedRoute>
              }
            />

            <Route
              path="/logout"
              element={
                <AuthenticatedRoute>
                  <LogoutComponent />
                </AuthenticatedRoute>
              }
            ></Route>
            <Route path="*" element={<ErrorHandler />}></Route>
          </Routes>
          <FooterComponent />
        </Router>
      </div>
    );
  }
}

export default TodoApp;
