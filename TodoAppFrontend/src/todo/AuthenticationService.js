import axios from "axios";

const API_URL = `http://localhost:8080`;
const SESSION_USERNAME = "authenticatedUser";

class AutenticationService {
  createBasicAuthtToken(username, password) {
    return `Basic ` + window.btoa(`${username}:${password}`);
  }

  createJWTToken(token) {
    return `Bearer ` + token;
  }

  executeBasicAuth(username, password) {
    return axios.get(`${API_URL}/basicauth`, {
      headers: {
        authorization: this.createBasicAuthtToken(username, password),
      },
    });
  }

  executeJWTAuth(username, password) {
    return axios.post(`${API_URL}/authenticate`, {
      username,
      password,
    });
  }

  registerSuccessfulLogin(username, password) {
    console.log(`Register Successfull`);
    sessionStorage.setItem(SESSION_USERNAME, username);
    this.setupAxiosInterceptors(this.createBasicAuthtToken(username, password));
  }

  registerSuccessfulLoginForJWT(username, token) {
    console.log(`Register Successfull`);
    sessionStorage.setItem(SESSION_USERNAME, username);
    this.setupAxiosInterceptors(this.createJWTToken(token));
  }

  logout() {
    sessionStorage.removeItem(SESSION_USERNAME);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(SESSION_USERNAME);

    if (user === null) return false;
    return true;
  }

  getLoggedUSer() {
    let user = sessionStorage.getItem(SESSION_USERNAME);
    if (user === null) return "";
    return user;
  }

  setupAxiosInterceptors(basicAuthHeaderString) {
    axios.interceptors.request.use((config) => {
      if (this.isUserLoggedIn())
        config.headers.authorization = basicAuthHeaderString;
      return config;
    });
  }
}

export default new AutenticationService();
