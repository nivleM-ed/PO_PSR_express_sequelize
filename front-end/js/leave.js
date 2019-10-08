import axios from "axios";

const url = "http://localhost:3000/leave/"; //for production use localhost:3000

class leave {
  static show_all_leave() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}all`, { withCredentials: true });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_own_leave() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}`, { withCredentials: true });
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
          `${url}`,
          {
            id
          },
          { withCredentials: true }
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
          `${url}add_leave`,
          {
            date_from,
            date_to,
            reason
          },
          { withCredentials: true }
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
          `${url}${leave_id}/upd_leave`,
          {
            date_from,
            date_to,
            reason
          },
          { withCredentials: true }
        );
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
        const res = await axios.post(`${url}${leave_id}/upd`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default leave;
