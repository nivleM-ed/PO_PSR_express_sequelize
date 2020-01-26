export default class userClass {
    constructor() {
        var id = null;
        var username = null;
        var firstname = null;
        var lastname = null;
        var password = null;
        var email = null;
        var department = null;
        var contact_no = null;
        var address_1 = null;
        var address_2 = null;
        var address_3 = null;
        var address_4 = null;
        var acct_t = false;
        var t1 = false;
        var t2 = false;
        var t3 = false;
        var t4 = false;
        var is_admin = false;
        var total_page = 0;
        var in_page = 0;
        var in_param_1 = null;
        var in_param_2 = null;
        var in_param_3 = null;
        var in_param_4 = null;
        var in_param_5 = null;
    }
    get id() {
        return this._id;
    }
    set id(in_id) {
        this._id = in_id;
    }

    get username() {
        return this._username;
    }
    set username(in_username) {
        this._username = in_username;
    }

    get firstname() {
        return this._firstname;
    }
    set firstname(in_firstname) {
        this._firstname = in_firstname;
    }

    get lastname() {
        return this._lastname;
    }
    set lastname(in_lastname) {
        this._lastname = in_lastname;
    }

    get password() {
        return this._password;
    }
    set password(in_password) {
        this._password = in_password;
    }

    get email() {
        return this._email;
    }
    set email(in_email) {
        this._email = in_email;
    }

    get department() {
        return this._department;
    }
    set department(in_department) {
        this._department = in_department;
    }

    get contact_no() {
        return this._contact_no;
    }
    set contact_no(in_contact_no) {
        this._contact_no = in_contact_no;
    }

    get address_1() {
        return this._address_1;
    }
    set address_1(in_address_1) {
        this._address_1 = in_address_1;
    }

    get address_2() {
        return this._address_2;
    }
    set address_2(in_address_2) {
        this._address_2 = in_address_2;
    }

    get address_3() {
        return this._address_3;
    }
    set address_3(in_address_3) {
        this._address_3 = in_address_3;
    }

    get address_4() {
        return this._address_4;
    }
    set address_4(in_address_4) {
        this._address_4 = in_address_4;
    }

    get acct_t() {
        return this._acct_t;
    }
    set acct_t(in_acct_t) {
        this._acct_t = in_acct_t;
    }

    get t1() {
        return this._t1;
    }
    set t1(in_t1) {
        this._t1 = in_t1;
    }

    get t2() {
        return this._t2;
    }
    set t2(in_t2) {
        this._t2 = in_t2;
    }

    get t3() {
        return this._t3;
    }
    set t3(in_t3) {
        this._t3 = in_t3;
    }

    get t4() {
        return this._t4;
    }
    set t4(in_t4) {
        this._t4 = in_t4;
    }

    get is_admin() {
        return this._is_admin;
    }
    set is_admin(in_is_admin) {
        this._is_admin = in_is_admin;
    }

    get total_page() {
        return this._total_page;
    }
    set total_page(in_total_page) {
        this._total_page = in_total_page;
    }

    get in_page() {
        return this._in_page;
    }
    set in_page(in_in_page) {
        this._in_page = in_in_page;
    }

    get in_param_1() {
        return this._in_param_1;
    }
    set in_param_1(in_in_param_1) {
        this._in_param_1 = in_in_param_1;
    }

    get in_param_2() {
        return this._in_param_2;
    }
    set in_param_2(in_in_param_2) {
        this._in_param_2 = in_in_param_2;
    }

    get in_param_3() {
        return this._in_param_3;
    }
    set in_param_3(in_in_param_3) {
        this._in_param_3 = in_in_param_3;
    }

    get in_param_4() {
        return this._in_param_4;
    }
    set in_param_4(in_in_param_4) {
        this._in_param_4 = in_in_param_4;
    }

    get in_param_5() {
        return this._in_param_5;
    }
    set in_param_5(in_in_param_5) {
        this._in_param_5 = in_in_param_5;
    }


    //methods
    toJson() {
        let temp = JSON.stringify(this);
        return JSON.parse(temp);
    }

    //set next page
    nextPage() {
        this.in_page = this.in_page + 1;
        if(this.in_page > this.total_page) {
            this.in_page = this.total_page;
        }
        return this.in_page;
    }

    //set prev page
    prevPage() {
        this.in_page = this.in_page - 1;
        if(this.in_page <= 0) {
            this.in_page = 1;
        }
        return this.in_page;
    }
}