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
        const data = await po.show_po_page(this.page);
        
        const pos1 = data.result[0]
            this.total_page = data.result[1]
            this.pos = pos1.map(pos => ({
                ...pos
            }))

        } catch(err) {
            this.error = err.message;
        }
    },
    methods: {
        async get_pending() {
            try {
            const data = await po.get_submits(this.page);
            
            const pos1 = data.result[0]
                this.total_page = data.result[1]
                this.pos = pos1.map(pos => ({
                    ...pos
                }))

            } catch(err) {
                this.error = err.message;
            }
        },
        async get_submits() {
            try {
            const data = await po.get_pending(this.page);
            
            const pos1 = data.result[0]
                this.total_page = data.result[1]
                this.pos = pos1.map(pos => ({
                    ...pos
                }))

            } catch(err) {
                this.error = err.message;
            }
        },
        async find() {
            try {
                const data = await po.find(this.po_no);
                this.pos = data.map(pos => ({
                    ...pos,
                    createdAt: new Date(pos.createdAt)
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