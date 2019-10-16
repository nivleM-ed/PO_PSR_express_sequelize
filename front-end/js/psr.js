import axios from "axios";

// const url = "http://localhost:3000/psr/"; //for production use localhost:3000
const url = "http://192.168.193.236/psr/";

class psr {
  static show_psr_all() {
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

  static show_psr_page(page) {
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

  static find(psr_no) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}search/${psr_no}`, {
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

  static po_add(
    psr_no,
    date,
    psr_data,
    pur_class,
    pur_typ,
    pur_just,
    date_req,
    p_title,
    vessel_cd,
    delv,
    desc
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}add_po`,
          {
            psr_no,
            date,
            psr_data,
            pur_class,
            pur_typ,
            pur_just,
            date_req,
            p_title,
            vessel_cd,
            delv,
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

  static po_del(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}del/${psr_id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static report(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${psr_id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_upd(
    psr_id,
    psr_no,
    date,
    psr_data,
    pur_class,
    pur_typ,
    pur_just,
    date_req,
    p_title,
    vessel_cd,
    delv,
    desc
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psr_id}/upd_psr`,
          {
            psr_no,
            date,
            psr_data,
            pur_class,
            pur_typ,
            pur_just,
            date_req,
            p_title,
            vessel_cd,
            delv,
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

  static po_stat_1(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psr_id}/pending`,
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

  static po_stat_2(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psr_id}/approve`,
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

export default psr;
