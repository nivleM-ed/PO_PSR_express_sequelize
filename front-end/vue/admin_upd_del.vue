<script>
import admin from '../../src/assets/scripts/admin'; //directory to admin.js

export default {
    data(){
        return{
            id: this.$route.query.id,  //vue-router - to get user_id
            username: '',
            firstname: '',
            lastname: '',
            t1: '',
            t2: '',
            t3: '',
            error: ''
        };
    },
    async created() {
        try {
            const user = await admin.user(this.id);
            this.username = user.username;
            this.firstname = user.firstname;
            this.lastname = user.lastname;
            this.t1 = user.t1;
            this.t2 = user.t2;
            this.t3 = user.t3;
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        async upd_tier() {
            try {
                const user = await admin.upd_tier(this.username, this.password, this.firstname, this.lastname, this.t1, this.t2, this.t3);
                this.username = user.username;
                this.firstname = user.firstname;
                this.lastname = user.lastname;
                this.t1 = user.t1;
                this.t2 = user.t2;
                this.t3 = user.t3;
            } catch (err) {
                this.error = err.message;
            }
        },
        async del_user() {
            try {
                const user = await admin.del_user();
                console.log(user);
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>