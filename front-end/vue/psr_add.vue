<script>
import user from '../../src/assets/scripts/psr'; //directory to psr.js

export default {
    data(){
        return{
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
            desc : '', //must be in json format
            error: ''
        };
    },
    async created() {

    },
    methods: {
        async psr_add() {
            try {
                const psr = await psr.psr_add(this.psr_no, this.date, this.psr_data, this.pur_class, this.pur_typ, this.pur_just, this.date_req, this.p_title, this.vessel_cd, this.delv, this.desc);
                console.log(psr); //can be ignored
                //add redirect to other page here
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>