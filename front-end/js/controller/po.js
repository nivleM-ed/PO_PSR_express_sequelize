import axios from "axios";
import { CONST } from './const';
const url = CONST.CONST_URL.concat('po/');

class po {

  static show_po_page(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}all/${poObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static show_own_po_page(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}own_po/${poObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  // static show_all_po() {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       const res = await axios.get(`${url}all_po`, {
  //         withCredentials: true
  //       });
  //       resolve(res.data);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }

  static find(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}search/${poObj._po_no}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_submits(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}submits/${poObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_pending(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}pending/${poObj._in_page}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static get_del_req(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}req_del_po/${poObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_add(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}add_po`, {
            poObj
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

  static po_del_req(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}req_del_po/${poObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_del(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.delete(`${url}app_del/${poObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_decline_del(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(`${url}dec_del/${poObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static report(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(`${url}${poObj._id}`, {
          withCredentials: true
        });
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_upd(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${poObj._id}/upd_po`, {
            poObj
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

  static po_stat_1(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${poObj._id}/pending`, {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_stat_2(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${poObj._id}/approve`, {
            withCredentials: true
          }
        );
        resolve(res.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static po_decline(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}${poObj._id}/decline`, {
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
  static po_search(poObj) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.post(
          `${url}/search`, {
            poObj
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

export default po;