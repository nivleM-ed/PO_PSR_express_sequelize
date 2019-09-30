<script>
import leave from '../../src/assets/scripts/leave'; //directory to leave.js

export default {
    data(){
        return{
            date_from: '',
            date_to: '',
            reason: '',
            error: ''
        };
    },
    async created() {

    },
    methods: {
        async add_leave() {
            try {
                const leave = await leave.add_leave(this.date_from, this.date_to, this.reason);
                console.log(leave); //can be ignored
                //add redirect to other page here
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>