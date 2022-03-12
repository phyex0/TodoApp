import React, { Component } from "react";
import TodoDataService from "../api/todo/TodoDataService.js";
import AuthenticationService from "../todo/AuthenticationService.js";
import moment from "moment";

class ListToDoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      message: null,
    };

    this.handleError = this.handleError.bind(this);
    this.handleSuccesfull = this.handleSuccesfull.bind(this);
    this.deleteButtonClicked = this.deleteButtonClicked.bind(this);
    this.updateButtonClick = this.updateButtonClick.bind(this);
    this.refreshTodos = this.refreshTodos.bind(this);
    this.todoAddClick = this.todoAddClick.bind(this);
  }

  componentDidMount() {
    this.refreshTodos();
  }

  refreshTodos() {
    let user = AuthenticationService.getLoggedUSer();
    TodoDataService.retriveAllTodos(user)
      .then((response) => this.handleSuccesfull(response))
      .catch((error) => this.handleError(error));
  }

  render() {
    return (
      <div>
        <h1>TODOS</h1>
        <div className="container">
          {this.state.message && (
            <div className="alert">{this.state.message}</div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>description</th>
                <th>Is done?</th>
                <th>Target Date</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.todos.map((todo) => (
                <tr key={todo.id}>
                  <td>{todo.description}</td>
                  <td>{todo.done.toString()}</td>
                  <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => this.updateButtonClick(todo.id)}
                    >
                      Update
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => this.deleteButtonClicked(todo.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row">
            <button className="btn btn-success" onClick={this.todoAddClick}>
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }

  todoAddClick() {
    this.props.navigate("/todos/-1");
  }

  handleError(error) {
    this.setState({ todos: [] });
  }

  handleSuccesfull(response) {
    this.setState({ todos: response.data });
  }

  deleteButtonClicked(id) {
    let user = AuthenticationService.getLoggedUSer();
    //console.log(id + " " + user);
    TodoDataService.deleteTodo(user, id)
      .then((response) => {
        this.setState({ message: `Delete todo ${id} is done!` });
        this.refreshTodos();
      })
      .catch();
  }

  updateButtonClick(id) {
    this.props.navigate(`/todos/${id}`);
  }
}

export default ListToDoComponent;
