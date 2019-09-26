//ONLY showing own leave - t1

<script>
import user from '../../src/assets/scripts/leave'; //directory to leave.js

export default {
    data(){
        return{
            leaves: [], //do for leave in leaves
            error: ''
        };
    },
    async created() {
        try {
            const data = await leave.show_own_leave();
            this.leaves = data.map(leave => ({
                ...leave
            })) 
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        
    }
    
}
</script>