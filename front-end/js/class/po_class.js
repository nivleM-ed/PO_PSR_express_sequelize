export default class poObj {
    constructor() {
        var id = null;
        var po_no = null;
        var po_ref = null;
        var quotation = null;
        var delv_due = null;
        var ship_mode = null;
        var psr_id = null;
        var cca_no = null;
        var pay_mode = null;
        var address_1 = null;
        var address_2 = null;
        var address_3 = null;
        var address_4 = null;
        var po_desc = null;
        var cl_name = null;
        var cl_company = null;
        var decline_reason = null;
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

    get po_no() {
        return this._po_no;
    }
    set po_no(in_po_no) {
        this._po_no = in_po_no;
    }

    get po_ref() {
        return this._po_ref;
    }
    set po_ref(in_po_ref) {
        this._po_ref = in_po_ref;
    }

    get quotation() {
        return this._quotation;
    }
    set quotation(in_quotation) {
        this._quotation = in_quotation;
    }

    get delv_due() {
        return this._delv_due;
    }
    set delv_due(in_delv_due) {
        this._delv_due = in_delv_due;
    }

    get ship_mode() {
        return this._ship_mode;
    }
    set ship_mode(in_ship_mode) {
        this._ship_mode = in_ship_mode;
    }

    get psr_id() {
        return this._psr_id;
    }
    set psr_id(in_psr_id) {
        this._psr_id = in_psr_id;
    }

    get cca_no() {
        return this._cca_no;
    }
    set cca_no(in_cca_no) {
        this._cca_no = in_cca_no;
    }

    get pay_mode() {
        return this._pay_mode;
    }
    set pay_mode(in_pay_mode) {
        this._pay_mode = in_pay_mode;
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

    get po_desc() {
        return this._po_desc;
    }
    set po_desc(in_po_desc) {
        this._po_desc = in_po_desc;
    }

    get cl_name() {
        return this._cl_name;
    }
    set cl_name(in_cl_name) {
        this._cl_name = in_cl_name;
    }

    get cl_company() {
        return this._cl_company;
    }
    set cl_company(in_cl_company) {
        this._cl_company = in_cl_company;
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