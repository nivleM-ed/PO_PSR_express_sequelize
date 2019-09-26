<script>
import user from '../../src/assets/scripts/leave'; //directory to leave.js

export default {
    data(){
        return{
            id: this.$route.query.id,  //vue-router - to get leave_id
            date_from: '',
            date_to: '',
            reason: '',
            status: '',
            error: ''
        };
    },
    async created() {
        try {
            const leave = await leave.report(this.id);
            this.date_from = leave.date_from;
            this.date_to = leave.date_to;
            this.reason = leave.reason;
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async upd_leave() {
            try {
                const leave = await leave.upd_leave(this.leave_id, this.date_from, this.date_to, this.reason);
                this.date_from = leave.date_from;
                this.date_to = leave.date_to;
                this.reason = leave.reason;
                this.status = leave.status;
            } catch (err) {
                this.error = err.message;
            }
        },
        async del_leave() {
            try {
                const leave = await leave.del_leave();
                console.log(leave);
            } catch (err) {
                this.error = err.message;
            }
        },
        async approve_leave() {
            try {
                const leave = await leave.approve_leave();
                this.status = leave.status;
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>