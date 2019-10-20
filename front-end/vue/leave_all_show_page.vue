//ONLY showing all leave - t2/t3

<script>
import leave from '../../src/assets/scripts/leave'; //directory to leave.js

export default {
    data(){
        return{
            leaves: [], //do for leave in leaves
            error: '',
            page: 1,
            total_page: '',
        };
    },
    async created() {
        try {
            const data = await psr.show_leave_page(this.page);
            
            const leave1 = data.result[0]
            this.total_page = data.result[1]

            this.leaves = leave1.map(leaves => ({
                ...leaves
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