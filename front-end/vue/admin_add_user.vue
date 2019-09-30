<script>
import admin from '../../src/assets/scripts/admin'; //directory to admin.js

export default {
    data(){
        return{
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            error: ''
        };
    },
    async created() {

    },
    methods: {
        async new_user() {
            try {
                const user = await admin.new_user(this.username, this.password, this.firstname, this.lastname);
                console.log(user); //can be ignored
                //add redirect to other page here
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>