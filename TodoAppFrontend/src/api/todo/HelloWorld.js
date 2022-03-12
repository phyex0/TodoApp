import axios from "axios";

class HelloWorldService {
  executeHelloWorldService(username) {
    console.log("Executed");

    //return axios.get("http://localhost:8080/test");
    //return axios.get("http://localhost:8080/test-bean");
    return axios.get(`http://localhost:8080/test/path-variable/${username}`);
  }
}

export default new HelloWorldService();
