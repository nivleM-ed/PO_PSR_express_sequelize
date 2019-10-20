<script>
import psr from '../../src/assets/scripts/psr'; //directory to psr.js

export default {
    data(){
        return{
            psrs:[],  //for psr in psrs {{psr.[var name]}}
            page: 1,
            error: '',
            total_page : '',
        };
    },
    async created() {
        try {
        const data = await psr.show_psr_page(this.page);
        
        const psrs1 = data.result[0]
            this.total_page = data.result[1]
            this.psrs = psrs1.map(psrs => ({
                ...psrs
            }))

        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        async get_pending() {
            try {
            const data = await psr.get_pending(this.page);
            const limit = 8;
            
            const psrs1 = data.result[0]
            this.total_page = data.result[1]
            this.psrs = psrs1.map(psrs => ({
                ...psrs
            }))
            
            } catch(err) {
                this.error = err.message;
            }
        },
        async get_submits() {
            try {
            const data = await psr.get_submits(this.page);
            const limit = 8;
            
            const psrs1 = data.result[0]
            const psrs1 = data.result[0]
            this.total_page = data.result[1]
            this.psrs = psrs1.map(psrs => ({
                ...psrs
            }))
            
            } catch(err) {
                this.error = err.message;
            }
        },
        async find() {
            try {
                const data = await psr.find(this.psr_no);
                this.psrs = data.map(psrs => ({
                    ...psrs,
                    createdAt: new Date(psrs.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
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