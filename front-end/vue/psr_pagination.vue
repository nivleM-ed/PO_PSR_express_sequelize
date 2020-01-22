<script>
import psr from '../../src/assets/scripts/psr'; //directory to psr.js
import psrClass from '../js/class/psr_class'; //change to appropriate directory

export default {
    data(){
        return{
            psrs:[],  //for psr in psrs {{psr.[var name]}}
            page: 1,
            error: '',
            total_page : '',
            psrObj: new psrClass()
        };
    },
    async created() {
        try {
        const data = await psr.show_psr_page(this.psrObj.toJSON());
        
        const psrs1 = data.result[0]
            this.total_page = data.result[1]
            this.psrObj.total_page = data.result[1]
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
            const data = await psr.get_pending(this.psrObj.toJSON());
            
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
            const data = await psr.get_submits(this.psrObj.toJSON());
            
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
                const data = await psr.find(this.psrObj.toJSON());
                this.psrs = data.map(psrs => ({
                    ...psrs
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
        //create in vue:
        // if page == 1, hide previous button, show next button
        // if page == total_page, show previous button, show next button
        nextPage() {
            page = this.psrObj.nextPage();
        },
        previousPage() {
            page = this.psrObj.prevPage();
        }
    }
    
}
</script>