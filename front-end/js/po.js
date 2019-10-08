import axios from "axios";

const url = "http://localhost:3000/po"; //for production use localhost:3000

class po {
  static show_po_all() {
    //only for dev purposes
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}`, { withCredentials: true });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_po_page(page) {
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

  static find(po_no) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}search/${po_no}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_submits() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}submits`, { withCredentials: true });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_pending() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}pending`, { withCredentials: true });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_add(po_no, date, po_ref, due, ship, psr, cca, pay, address, desc) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}add_po`,
          {
            po_no,
            date,
            po_ref,
            due,
            ship,
            psr,
            cca,
            pay,
            address,
            desc
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_del(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}del/${po_id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static report(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${po_id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_upd(
    po_id,
    po_no,
    date,
    po_ref,
    due,
    ship,
    psr,
    cca,
    pay,
    address,
    desc
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${po_id}/upd_po`,
          {
            po_no,
            date,
            po_ref,
            due,
            ship,
            psr,
            cca,
            pay,
            address,
            desc
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_stat_1(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${po_id}/pending`,
          {
            date_pending: Date.now()
          },
          { withCredentials: true }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_stat_2(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${po_id}/approve`,
          {
            date_approve: Date.now()
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

export default po;
