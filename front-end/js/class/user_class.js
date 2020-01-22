export default class userObj {
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