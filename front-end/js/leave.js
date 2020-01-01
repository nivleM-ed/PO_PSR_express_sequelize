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

  static show_leave_page(page) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}all/${page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_pending_page(page) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}pending_leave/${page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_own_leave(page) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}own/${page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static report(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(
          `${url}${id}`, {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static add_leave(date_from, date_to, reason) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}add_leave`, {
            date_from,
            date_to,
            reason
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

  static upd_leave(leave_id, date_to, date_from, reason) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${leave_id}/upd_leave`, {
            date_from,
            date_to,
            reason
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

  static del_req_leave(leave_id, del_reason) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${leave_id}/delreq_leave`,{
          del_reason
        }, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static del_leave(leave_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}${leave_id}/del_leave`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static approve_leave(leave_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${leave_id}/approve`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static decline_leave(leave_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}${leave_id}/decline`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static leave_search(
    in_str,
    in_date,
    in_page
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}/search`, {
            in_str,
            in_date,
            in_page
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