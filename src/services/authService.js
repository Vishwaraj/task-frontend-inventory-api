import axios from "axios";
import { jwtDecode } from "jwt-decode";

export class AuthService {
  static url = "http://localhost:9000";
  static async login(username, pass) {
    console.log(username, pass);
    try {
      const response = await axios.post(`${AuthService.url}/login`, {
        username: username,
        password: pass,
      });

      if (response.status === 200) {
        console.log(response?.data?.data?.token);
        localStorage.setItem("Token", response?.data?.data?.token);
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  static logout() {
    localStorage.removeItem("Token");
    return true;
  }

  static authCheck() {
    let token = localStorage.getItem("Token");

    const isTokenExpired = (token) => {
      try {
        const decoded = jwtDecode(token);
        return decoded.exp < Date.now() / 1000;
      } catch (error) {
        return false;
      }
    };

    if (token) {
      if (isTokenExpired(token)) {
        localStorage.removeItem("Token");
        return false;
      } else {
        return true;
      }
    }

    if (!token || token == "undefined") {
      return false;
    } else {
      return true;
    }
  }
}
