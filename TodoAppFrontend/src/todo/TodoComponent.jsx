import React, { Component } from "react";
import moment from "moment";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TodoDataService from "../api/todo/TodoDataService.js";
import AuthenticationService from "./AuthenticationService.js";

class TodoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.params.id,
      description: "",
      targetDate: moment(new Date()).format("YYYY-MM-DD"),
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  onSubmit(values) {
    let name = AuthenticationService.getLoggedUSer();

    if (this.state.id === -1) {
      TodoDataService.createTodo(name, {
        description: values.description,
        targetDate: values.targetDate,
      }).then(() => {
        this.props.navigate("/todos");
      });
    } else {
      TodoDataService.updateTodo(name, this.state.id, {
        id: this.state.id,
        description: values.description,
        targetDate: values.targetDate,
      })
        .then(() => {
          this.props.navigate("/todos");
        })
        .catch();
    }

    console.log("now printing id : " + this.state.id);
    console.log();
  }

  validate(values) {
    console.log(values);
    let error = {};

    if (!values.description) error.description = "Enter a value";
    return error;
  }

  componentDidMount() {
    let user = AuthenticationService.getLoggedUSer();

    TodoDataService.retriveTodo(user, this.state.id)
      .then((response) =>
        this.setState({
          description: response.data.descriptions,
          targetDate: moment(response.data.targetDate).format("YYYY-MM-DD"),
        })
      )
      .catch((error) => console.log(error));
  }

  render() {
    return (
      <div>
        <h1>TODO</h1>
        <div className="container">
          <Formik
            initialValues={{
              description: this.state.description,
              targetDate: this.state.targetDate,
            }}
            onSubmit={this.onSubmit}
            validate={this.validate}
            enableReinitialize={true}
          >
            {(props) => (
              <Form>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="alert alert-warning"
                />
                <fieldset className="form-group">
                  <label>Description</label>
                  <Field
                    className="form-control"
                    type="text"
                    name="description"
                  ></Field>
                </fieldset>

                <fieldset className="form-group">
                  <label>Target Date</label>
                  <Field
                    className="form-control"
                    type="date"
                    name="targetDate"
                  ></Field>
                </fieldset>
                <button className="btn btn-success" type="submit">
                  Save
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    );
  }
}

export default TodoComponent;
