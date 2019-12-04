import axios from "axios";
import { CONST } from './const';
const url = CONST.CONST_URL.concat('po/');

class po {
  // static show_po_all() {
  //   //only for dev purposes
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = await axios.get(`${url}`, {
  //         withCredentials: true
  //       });
  //       resolve(res.data);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

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

  static show_own_po_page(page) {
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

  static show_all_po() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}all_po`, {
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

  static get_submits(page) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}submits/${page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_pending(page) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}pending/${page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_del_req(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}req_del_po/${po_id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_add(
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
          `${url}add_po`, {
            po_ref,
            due,
            ship,
            psr,
            cca,
            pay,
            address,
            desc
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

  static po_del_req(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}req_del_po/${po_id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_del(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}app_del/${po_id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_decline_del(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}dec_del/${po_id}`, {
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
          `${url}${po_id}/upd_po`, {
            po_ref,
            due,
            ship,
            psr,
            cca,
            pay,
            address,
            desc
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

  static po_stat_1(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${po_id}/pending`, {
            withCredentials: true
          }
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
          `${url}${po_id}/approve`, {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_decline(po_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${po_id}/decline`, {
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

export default po;