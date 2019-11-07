<script>
import po from '../../src/assets/scripts/po'; //directory to po.js

export default {
    data(){
        return{
            po_id: this.$route.query.id, //vue-router /?id=[something]
            po_no: '',
            date: '',
            po_ref:'',
            due:'',
            ship:'',
            psr:'',
            cca:'',
            pay:'',
            address:'',
            desc:'',
            createdAt:'',
            updatedAt:'',
            status_t1:'',
            status_t2:'',
            error: ''
        };
    },
    async created() {
        try {
            const po = await po.report(this.po_id);
            this.po_id = po.id;
            this.po_ref = po.po_ref;
            this.due = po.delv_due;
            this.ship = po.ship_mode;
            this.psr = po.psr_no;
            this.cca = po.cca_no;
            this.pay = po.pay_mode;
            this.address = po.address;
            this.desc = po.po_desc;
            this.createdAt = po.createdAt;
            this.updatedAt = po.updatedAt;
            this.status_t1 = po.status_t1;
            this.status_t2 = po.status_t2;
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        async po_upd() {
            try {
                await po.po_del(this.po_ref,this.due, this.ship, this.psr, this.cca, this.pay, this.address, this.address, this.desc);

                const po = await po.report(this.po_id)
                this.po_id = po.id;
                this.po_ref = po.po_ref;
                this.due = po.delv_due;
                this.ship = po.ship_mode;
                this.psr = po.psr_no;
                this.cca = po.cca_no;
                this.pay = po.pay_mode;
                this.address = po.address;
                this.desc = po.po_desc;
                this.createdAt = po.createdAt;
                this.updatedAt = po.updatedAt;
            } catch (err) {
                this.error = err.message;
            }
        },
        //request to delete
        async po_delete_request() {
            try {
                const data = await po.po_del_req(this.po_id);
                console.log(data);
            } catch(err) {
                this.error = err.message;
            }
        },
        //approve delete
        async po_del() {
            try {
                const data = await po.po_del(this.po_id);
                console.log(data); //can be ignored
                //add redirect to other page here
            } catch (err) {
                this.error = err.message;
            }
        },
        //decline delete request
        async po_decline_delete_request() {
            try {
                const data = await po.po_decline_del(this.po_id);
                console.log(data);
            } catch(err) {
                this.error = err.message;
            }
        },
        async po_stat_1() {
            try {
                const data = await po.po_stat_1(this.po_id);
                this.status_t1 = po.status_t1;
                console.log(data); //can be ignored
            } catch (err) {
                this.error = err.message;
            }
        },
        async po_stat_2() {
            try {
                const data = await po.po_stat_2(this.po_id);
                this.status_t2 = po.status_t1;
                console.log(data); //can be ignored
            } catch (err) {
                this.error = err.message;
            }
        },
        async decline_po() {
            try {
                const data = await po.po_decline(this.po_id);
                console.log(data); //can be ignored
            } catch (err) {
                this.error = err.message;
            }
        }

    }
    
}
</script>