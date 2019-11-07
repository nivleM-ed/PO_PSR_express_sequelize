<script>
import psr from '../../src/assets/scripts/psr'; //directory to psr.js

export default {
    data(){
        return{
            psr_id : this.$route.query.id, //vue-router /?id=[something]
            psr_no : '',
            date : '',
            psr_data : '',
            pur_class : '',
            pur_typ : '',
            pur_just : '',
            date_req : '',
            p_title : '',
            vessel_cd : '',
            delv : '',
            desc : '', 
            createdAt :'',
            updatedAt :'',
            status_t1 :'',
            status_t2 :'',
            error : ''
        };
    },
    async created() {
        try {
            const psr = await psr.report(this.psr_id);
            this.psr_id = psr.id,
            this.psr_data = psr_data,
            this.pur_class = pur_class,
            this.pur_typ = pur_typ,
            this.pur_just = pur_just,
            this.date_req = date_req,
            this.p_title = p_title,
            this.vessel_cd = vessel_cd,
            this.delv = delv,
            this.desc = desc, 
            this.createdAt = createdAt,
            this.updatedAt = updatedAt,
            this.status_t1 = status_t1,
            this.status_t2 = status_t2,
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        async psr_upd() {
            try {
                await psr.psr_del(this.psr_no, this.date, this.psr_data, this.pur_class, this.pur_typ, this.pur_just, this.date_req, this.p_title, this.vessel_cd, this.delv, this.desc);

                const po = await po.report(this.psr_id)
                this.psr_id = psr.id,
                this.psr_data = psr_data,
                this.pur_class = pur_class,
                this.pur_typ = pur_typ,
                this.pur_just = pur_just,
                this.date_req = date_req,
                this.p_title = p_title,
                this.vessel_cd = vessel_cd,
                this.delv = delv,
                this.desc = desc, 
                this.createdAt = createdAt,
                this.updatedAt = updatedAt
            } catch (err) {
                this.error = err.message;
            }
        },
        //request to delete
        async psr_delete_request() {
            try {
                const data = await psr.psr_del_req(this.psr_id);
                console.log(data);
            } catch(err) {
                this.error = err.message;
            }
        },
        //approve delete
        async psr_del() {
            try {
                const psr = await psr.psr_del(this.psr_id);
                console.log(psr); //can be ignored
                //add redirect to other page here
            } catch (err) {
                this.error = err.message;
            }
        },
        //decline delete request
        async psr_decline_delete_request() {
            try {
                const data = await psr.psr_decline_del(this.psr_id);
                console.log(data);
            } catch(err) {
                this.error = err.message;
            }
        },
        async psr_stat_1() {
            try {
                const psr = await psr.psr_stat_1(this.psr_id);
                this.status_t1 = psr.status_t1;
                console.log(psr); //can be ignored
            } catch (err) {
                this.error = err.message;
            }
        },
        async psr_stat_2() {
            try {
                const psr = await psr.psr_stat_2(this.psr_id);
                this.status_t2 = psr.status_t1;
                console.log(psr); //can be ignored
            } catch (err) {
                this.error = err.message;
            }
        },
        async decline_psr() {
            try {
                const data = await psr.psr_decline(this.psr_id);
                console.log(data); //can be ignored
            } catch (err) {
                this.error = err.message;
            }
        }

    }
    
}
</script>