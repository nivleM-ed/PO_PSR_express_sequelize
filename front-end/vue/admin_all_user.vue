<script>
import admin from '../../src/assets/scripts/admin'; //directory to admin.js

export default {
    data(){
        return{
            users: [], //do for user in users
            error: ''
        };
    },
    async created() {
        try {
            const data = await admin.get_all_user();
            this.users = data.map(user => ({
                ...user
            })) 
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        
    }
    
}
</script>