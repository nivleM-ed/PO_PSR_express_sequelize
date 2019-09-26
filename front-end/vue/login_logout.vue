<script>
import user from '../../src/assets/scripts/user'; //directory to user.js

export default {
    data(){
        return{
            username: '',
            password: '',
            error: '',
        };
    },
    async created() {

    },
    methods: {
        async login() {
            try {
                const login = await user.login(this.username, this.password);
                console.log(login); //can be ignored
                //add redirect to other page here
            } catch (err) {
                this.error = err.message;
            }
        },
        async logout() {
            try {
                const login = await user.logout();
                console.log(logout); //can be ignored
                //add redirect to other page here
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>