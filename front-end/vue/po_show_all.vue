
<script>
import po from '../../src/assets/scripts/po'; //directory to po.js

export default {
    data(){
        return{
            pos: [], //do for po in pos
            error: ''
        };
    },
    async created() {
        try {
            const data = await po.show_all_po();
            this.pos = data.map(po => ({
                ...po
            })) 
        } catch (err) {
            this.error = err.message;
        }
    },
    methods: {
        
    }
    
}
</script>