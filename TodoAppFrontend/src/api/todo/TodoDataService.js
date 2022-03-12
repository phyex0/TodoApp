import axios from "axios";

const API_URI = "http://localhost:8080/jpa";

class TodoDataService {
  retriveAllTodos(username) {
    console.log("retrive all todos");
    return axios.get(`${API_URI}/users/${username}/todos`);
  }

  deleteTodo(username, id) {
    console.log("delete");
    return axios.delete(`${API_URI}/users/${username}/todos/${id}`);
  }

  retriveTodo(username, id) {
    console.log("retrive Todo");

    return axios.get(`${API_URI}/users/${username}/todos/${id}`);
  }

  updateTodo(username, id, todo) {
    console.log("retrive Todo");
    return axios.put(`${API_URI}/users/${username}/todos/${id}`, todo);
  }

  createTodo(username, todo) {
    console.log("retrive Todo");
    return axios.post(`${API_URI}/users/${username}/todos/`, todo);
  }
}

export default new TodoDataService();
