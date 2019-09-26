import axios from "axios";

const url = "http://192.168.193.236:3000/psr"; //for production use localhost:3000

class psr {
    static show_psr_all() { //only for dev purposes
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static show_psr_page(page) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}all/${page}`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static find(psr_no) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}search/${psr_no}`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static get_submits() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}submits`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });

    }

    static get_pending() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}pending`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static po_add(psr_no, date, psr_data, pur_class, pur_typ, pur_just, date_req, p_title, vessel_cd, delv, desc) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}add_po`, {
                    //psr_no,
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
                });
                resolve(res.data);
            } catch(err) {
                reject(err);
            }
        });
    }

    static po_del(psr_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.delete(`${url}del/${psr_id}`);
                resolve(res.data);
            } catch(err) {
                reject(err);
            }
        });
    }

    static report(psr_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}${psr_id}`);
                resolve(res.data);
            } catch(err) {
                reject(err);
            }
        });
    }

    static po_upd(psr_no, date, psr_data, pur_class, pur_typ, pur_just, date_req, p_title, vessel_cd, delv, desc) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}${po_id}/upd_po`, {
                    //psr_no,
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
                });
                resolve(res.data);
            } catch(err) {
                reject(err);
            }
        });
    }

    static po_stat_1(psr_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}${psr_id}/pending`, {
                    date_pending: Date.now()
                });
                resolve(res.data);
            } catch(err) {
                reject(err);
            }
        });
    }

    static po_stat_2(psr_id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}${psr_id}/approve`, {
                    date_approve: Date.now()
                });
                resolve(res.data);
            } catch(err) {
                reject(err);
            }
        });
    }
}


export default psr;