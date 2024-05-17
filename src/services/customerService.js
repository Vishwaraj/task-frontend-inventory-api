import axios from "axios";

export class CustomerService {
  static url = "http://localhost:9000";

  static async getCustomers() {
    try {
      const token = localStorage.getItem("Token");
      console.log("from service", token);
      if (!token || token == "undefined") {
        throw new Error("Token expired.");
      }
      let response = await axios.get(`${CustomerService.url}/customers`, {
        headers: {
          Token: token,
        },
      });

      return response?.data?.data;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  static async addCustomer(val) {
    try {
      const token = localStorage.getItem("Token");
      if (!token || token == "undefined") {
        throw new Error("Token expired.");
      }
      let response = await axios.post(`${CustomerService.url}/customers`, val, {
        headers: {
          Token: token,
        },
      });

      if (response.status === 201) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  static async getSingleCustomer(id) {
    try {
      const token = localStorage.getItem("Token");

      if (!token || token == "undefined") {
        throw new Error("Token expired.");
      }

      let response = await axios.get(`${CustomerService.url}/customers/${id}`, {
        headers: {
          Token: token,
        },
      });

      if (response.status === 200) {
        return {
          id: response?.data?.data?.id,
          name: response?.data?.data?.name,
          email: response?.data?.data?.email,
          address: response?.data?.data?.address,
          hp: response?.data?.data?.hp,
        };
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }

  static async deleteCustomer(id) {
    try {
      const token = localStorage.getItem("Token");
      if (!token || token == "undefined") {
        throw new Error("Token expired.");
      }
      let response = await axios.delete(
        `${CustomerService.url}/customers/${id}`,
        {
          headers: {
            Token: token,
          },
        }
      );

      console.log(response);
      return true;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  static async updateCustomer(val, id) {
    try {
      const token = localStorage.getItem("Token");
      if (!token || token == "undefined") {
        throw new Error("Token expired.");
      }
      let response = await axios.put(
        `${CustomerService.url}/customers/${id}`,
        val,
        {
          headers: {
            Token: token,
          },
        }
      );

      console.log(response.status);

      if (response.status === 200) {
        return response?.data;
      }
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
