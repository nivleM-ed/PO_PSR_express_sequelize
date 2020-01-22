import axios from "axios";
import { CONST } from './const';
const url = CONST.CONST_URL;

class user {

  static login(userObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}login`, {
            userObj
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
          `${url}${userObj._id}/reset_password`,
          {
            userObj
            // ori_password - in_param_1
            // new_password - in_param_2
            // repeat_password - in_param_3
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