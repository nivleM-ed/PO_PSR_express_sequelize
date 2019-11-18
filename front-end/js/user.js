import axios from "axios";
import { CONST } from './const';
const url = CONST.CONST_URL;

class user {

  static login(username, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}login`, {
            username,
            password
          }, {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static check_logged() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}check_logged`, {
          withCredentials: true
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
        const res = await axios.post(`${url}logout`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static reset_password(id, ori_password, new_password, repeat_password) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${id}/reset_password`,
          {
            ori_password,
            new_password,
            repeat_password
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


export default user;