<script>
import psr from '../../src/assets/scripts/psr'; //directory to psr.js

export default {
    data(){
        return{
            psrs:[],  //for psr in psrs {{psr.[var name]}}
            page:1,
            error: ''
        };
    },
    async created() {
        try {
        const data = await psr.get_del_req(this.page);
        
        const psrs1 = data.result[0]
            this.total_page = data.result[1]
            this.psrs = psrs1.map(psrs => ({
                ...pos
            }))

        } catch(err) {
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