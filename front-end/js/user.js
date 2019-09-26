import axios from "axios";

const url = "http://192.168.193.236:3000/"; //for production use localhost:3000

class user {
  static login(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}login`, {
          username,
          password
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static logout() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}logout`);
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default user;
