<script>
import po from '../../src/assets/scripts/po'; //directory to po.js

export default {
    data(){
        return{
            pos:[],  //for po in pos {{po.[var name]}}
            page:1,
            error: ''
        };
    },
    async created() {
        try {
            const data = await po.report(this.po_id);
            this.pos = data.map(pos => ({
                ...pos,
                createdAt: new Date(pos.createdAt)
            })) 
        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        async get_pending() {
            try {
                const data = await po.report(this.page);
                this.pos = data.map(pos => ({
                    ...pos,
                    createdAt: new Date(pos.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
        async get_submits() {
            try {
                const data = await po.report(this.page);
                this.pos = data.map(pos => ({
                    ...pos,
                    createdAt: new Date(pos.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        },
        async find() {
            try {
                const data = await po.report(this.po_id);
                this.pos = data.map(pos => ({
                    ...pos,
                    createdAt: new Date(pos.createdAt)
            })) 
            } catch (err) {
                this.error = err.message;
            }
        }
    }
    
}
</script>