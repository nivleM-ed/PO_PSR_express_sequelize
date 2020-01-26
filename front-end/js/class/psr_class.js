export default class psrClass {
    constructor() {
        var id = null;
        var psr_no = null;
        var purchase_class = null;
        var purchase_typ = null;
        var purchase_just = null;
        var cost_typ = null;
        var date_req = null;
        var project_title = null;
        var vessel_code = null;
        var delv = null;
        var psr_desc = null;
        var decline_reason = null;
        var total_page = 0;
        var in_page = 0;
        var in_param_1 = null;
        var in_param_2 = null;
        var in_param_3 = null;
        var in_param_4 = null;
        var in_param_5 = null;
        var in_param_6 = null;
    }
    get id() {
        return this._id;
    }
    set id(in_id) {
        this._id = in_id;
    }

    get psr_no() {
        return this._psr_no;
    }
    set psr_no(in_psr_no) {
        this._psr_no = in_psr_no;
    }

    get purchase_class() {
        return this._purchase_class;
    }
    set purchase_class(in_purchase_class) {
        this._purchase_class = in_purchase_class;
    }

    get purchase_typ() {
        return this._purchase_typ;
    }
    set purchase_typ(in_purchase_typ) {
        this._purchase_typ = in_purchase_typ;
    }

    get purchase_just() {
        return this._purchase_just;
    }
    set purchase_just(in_purchase_just) {
        this._purchase_just = in_purchase_just;
    }

    get cost_typ() {
        return this._cost_typ;
    }
    set cost_typ(in_cost_typ) {
        this._cost_typ = in_cost_typ;
    }

    get date_req() {
        return this._date_req;
    }
    set date_req(in_date_req) {
        this._date_req = in_date_req;
    }

    get project_title() {
        return this._project_title;
    }
    set project_title(in_project_title) {
        this._project_title = in_project_title;
    }

    get vessel_code() {
        return this._vessel_code;
    }
    set vessel_code(in_vessel_code) {
        this._vessel_code = in_vessel_code;
    }

    get delv() {
        return this._delv;
    }
    set delv(in_delv) {
        this._delv = in_delv;
    }

    get psr_desc() {
        return this._psr_desc;
    }
    set psr_desc(in_psr_desc) {
        this._psr_desc = in_psr_desc;
    }

    get decline_reason() {
        return this._decline_reason;
    }
    set decline_reason(in_decline_reason) {
        this._decline_reason = in_decline_reason;
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

    get in_param_6() {
        return this._in_param_6;
    }
    set in_param_6(in_in_param_6) {
        this._in_param_6 = in_in_param_6;
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
