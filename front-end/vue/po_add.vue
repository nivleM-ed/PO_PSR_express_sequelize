<script>
import user from '../../src/assets/scripts/po'; //directory to po.js

export default {
    data(){
        return{
            po_no: '',
            date: '',
            po_ref:'',
            due:'',
            ship:'',
            psr:'',
            cca:'',
            pay:'',
            address:'',
            desc:'', //must be in json format
            error: ''
        };
    },
    async created() {

    },
    methods: {
        async po_add() {
            try {
                const po = await po.po_add(this.po_no, this.date, this.po_ref, this.due, this.ship, this.psr, this.cca, this.pay, this.address, this.address, this.desc);
                console.log(po); //can be ignored
                //add redirect to other page here
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>