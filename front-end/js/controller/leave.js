import axios from "axios";
import { CONST } from './const';
const url = CONST.CONST_URL.concat('leave/');

class leave {
  static show_all_leave() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}all_leave`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_leave_page(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}all/${leaveObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_pending_page(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}pending_leave/${leaveObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_own_leave(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}own/${leaveObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static report(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `${url}${leaveObj._id}`, {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static add_leave(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}add_leave`, {
            leaveObj
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

  static upd_leave(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${leaveObj._id}/upd_leave`, {
            leaveObj
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

  static del_req_leave(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${leaveObj._id}/delreq_leave`,{
          leaveObj
        }, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static del_leave(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}${leaveObj._id}/del_leave`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static approve_leave(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${leaveObj._id}/approve`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static decline_leave(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${leaveObj._id}/decline`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  //in_param_1 = in_str
  //in_param_2 = in_date
  static leave_search(leaveObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}/search`, {
            leaveObj
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

}



export default leave;