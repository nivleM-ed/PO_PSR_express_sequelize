//ONLY showing all psr - t2/t3

<script>
import psr from '../../src/assets/scripts/psr'; //directory to psr.js

export default {
    data(){
        return{
            psrs: [], //do for psr in psrs
            error: ''
        };
    },
    async created() {
        try {
            const data = await psr.show_all_psr();
            this.psrs = data.map(psr => ({
                ...psr
            })) 
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        
    }
    
}
</script>