import axios from "axios";
import { CONST } from './const';
const url = CONST.CONST_URL.concat('psr/');

class psr {
  // static show_psr_all() {
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

  static show_own_psr_page(page) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}own_psr/${page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_all_psr() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}all_psr`, {
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

  static approved_np() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}approved_np`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_approved(page) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}approved/${page}`, {
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

  static get_del_req(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}req_del_psr/${psr_id}`, {
          withCredentials: true
                  });
                          resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_add(
    psr_data,
    pur_class,
    pur_typ,
    pur_just,
    date_req,
    p_title,
    vessel_cd,
    delv,
    desc,
    cost_typ
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}add_psr`, {
            psr_data,
            pur_class,
            pur_typ,
            pur_just,
            date_req,
            p_title,
            vessel_cd,
            delv,
            desc,
            cost_typ
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

  static psr_del_req(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}req_del_psr/${psr_id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_del(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}app_del/${psr_id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_decline_del(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}dec_del/${psr_id}`, {
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

  static psr_upd(
    psr_id,
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
          `${url}${psr_id}/upd_psr`, {
            psr_data,
            pur_class,
            pur_typ,
            pur_just,
            date_req,
            p_title,
            vessel_cd,
            delv,
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

  static psr_stat_1(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psr_id}/pending`, {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_stat_2(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psr_id}/approve`, {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_decline(psr_id) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psr_id}/decline`, {
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

export default psr;