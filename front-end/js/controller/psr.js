import axios from "axios";
import {
  CONST
} from './const';
const url = CONST.CONST_URL.concat('psr/');

class psr {

  static show_psr_page(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}all/${psrObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_own_psr_page(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}own_psr/${psrObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // static show_all_psr() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = await axios.get(`${url}all_psr`, {
  //         withCredentials: true
  //       });
  //       resolve(res.data);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  static find(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}search/${psrObj._psr_no}`, {
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

  static get_approved(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}approved_psr/${psrObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_submits(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}submits/${psrObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_pending(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}pending/${psrObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_del_req(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}req_del_psr/${psrObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_add(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}add_psr`, {
          psrObj
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

  static psr_del_req(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}req_del_psr/${psrObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_del(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}app_del/${psrObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_decline_del(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}dec_del/${psrObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static report(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${psrObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_upd(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psrObj._id}/upd_psr`, {
          psrObj
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

  static psr_stat_1(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psrObj._id}/pending`, {
          withCredentials: true
        }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_stat_2(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psrObj._id}/approve`, {
          withCredentials: true
        }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static psr_decline(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${psrObj._id}/decline`, { psrObj }, {
          withCredentials: true
        }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  //in_param_1 = in_str 
  //in_param_2 = in_date 
  //in_param_3 = in_month
  //in_param_4 = in_year
  //in_param_5 = in_approve
  static psr_search(psrObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}search`, {
          psrObj
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

export default psr;