//ONLY showing own leave - t1

<script>
import user from '../../src/assets/scripts/leave'; //directory to leave.js

export default {
    data(){
        return{
            leaves: [], //do for leave in leaves
            error: '',
            page: 1,
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
        //create in vue:
        // if page == 1, hide previous button, show next button
        // if page == total_page, show previous button, show next button
        nextPage() {
            page += 1;
            if(page > total_page) {
                page = total_page;
            }
        },
        previousPage() {
            page -+ 1;
            if(page <= 0) {
                page = 1;
            }
        }
    }
    
}
</script>