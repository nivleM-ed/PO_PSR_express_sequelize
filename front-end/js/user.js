import axios from "axios";

// const url = "http://localhost:3000/"; //for production use localhost:3000
const url = "http://192.168.193.236/";

class user {
  static login(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}login`,
          {
            username,
            password
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static logout() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}logout`, { withCredentials: true });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default user;
