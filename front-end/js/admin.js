import axios from "axios";

// const url = "http://localhost:3000/admin/"; //for production use localhost:3000
const url = "http://192.168.193.236/admin/";

class admin {
  static get_all_user() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}get_all`, { withCredentials: true });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static new_user(username, password, firstname, lastname) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}new_user`,
          {
            username,
            password,
            firstname,
            lastname
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_user(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${id}`, { withCredentials: true });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static del_user(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}${id}/del_user`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static upd_tier(t1, t2, t3, id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${id}/upd_tier`,
          {
            t1,
            t2,
            t3
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default admin;
