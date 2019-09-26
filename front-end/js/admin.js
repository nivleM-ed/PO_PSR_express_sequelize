import axios from "axios";

const url = "http://192.168.193.236:3000/admin/"; //for production use localhost:3000

class admin {
    static get_all_user() { 
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(`${url}get_all`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static new_user(username, password, firstname, lastname) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}new_user`, {
                    username,
                    password,
                    firstname,
                    lastname
                });
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static get_user(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}${id}`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static del_user(id) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.delete(`${url}${id}/del_user`);
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static upd_tier(t1, t2, t3) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.post(`${url}${id}/upd_tier`, {
                    t1,
                    t2,
                    t3
                });
                resolve(res.data);
            } catch (err) {
                reject(err);
            }
        });
    }

}


export default admin;