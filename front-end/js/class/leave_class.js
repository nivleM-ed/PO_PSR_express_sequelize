export default class leaveClass {
    constructor() {
        var id = null;
        var date_from = null;
        var date_to = null;
        var reason = null;
        var del_reason = null;
        var emergency_contact = null;
        var replace_id = null;
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

    get date_from() {
        return this._date_from;
    }
    set date_from(in_date_from) {
        this._date_from = in_date_from;
    }

    get date_to() {
        return this._date_to;
    }
    set date_to(in_date_to) {
        this._date_to = in_date_to;
    }

    get reason() {
        return this._reason;
    }
    set reason(in_reason) {
        this._reason = in_reason;
    }

    get del_reason() {
        return this._del_reason;
    }
    set del_reason(in_del_reason) {
        this._del_reason = in_del_reason;
    }

    get emergency_contact() {
        return this._emergency_contact;
    }
    set emergency_contact(in_emergency_contact) {
        this._emergency_contact = in_emergency_contact;
    }

    get replace_id() {
        return this._replace_id;
    }
    set replace_id(in_replace_id) {
        this._replace_id = in_replace_id;
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
    //change class into JSON file
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
