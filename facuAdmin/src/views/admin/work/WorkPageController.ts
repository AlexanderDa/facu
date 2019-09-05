import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch, Emit } from 'vue-property-decorator'
import swal from 'sweetalert';
@Component({ name: 'WorkPage' })
export default class WorkPageController extends Vue {

    /*********************************************************
     *                      Attributes                       *
     *********************************************************/
    @Prop() public professional!: number;
    @Prop() public clear!: any;
    private headers: any[] = []
    private dialog: boolean = false
    private modelList: any[] = []
    private editedIndex: number = -1
    private editedItem: any = {}


    /*********************************************************
     *                     Initializable                     *
     *********************************************************/

    created() {
        this.initialize()
        this.headers = [
            { text: 'Nombre', value: 'name', align: 'left' },
            { text: 'Actions', value: 'action', sortable: false, align: 'right' },
        ]
    }


    /*********************************************************
     *                    API Services                       *
     *********************************************************/

    @Watch('professional')
    private async initialize() {
        this.modelList = []
        if (this.professional) {
            // @ts-ignore
            await Vue.http.get(`/api/v1/works/${this.professional}`)
                .then((res: any) => {
                    this.modelList = res.body
                })
        }


    }


    private async createItem() {
        if (this.professional) {
            // @ts-ignore
            await Vue.http.post('/api/v1/work', {
                professional: this.professional,
                name: this.editedItem.name
            })
                .then((res: any) => {
                    this.modelList.push(res.body)
                })
                .catch((err: any) => console.log(err))
        } else {
            this.modelList.push(this.editedItem)
            this.emitNews()
        }
    }


    private async updateItem() {
        if (this.editedItem.id) {
            // @ts-ignore
            await Vue.http.put(`/api/v1/work/${this.editedItem.id}`, this.editedItem)
                .then((res: any) => {
                    Object.assign(this.modelList[this.editedIndex], res.body)
                })
                .catch((err: any) => console.log(err))
        } else {
            Object.assign(this.modelList[this.editedIndex], this.editedItem)
            this.emitNews()
        }
    }


    private async deleteItem(item: any) {
        const index = this.modelList.indexOf(item)
        if (item.id) {
            // delete from server
            // @ts-ignore
            swal({
                title: '¿Estás seguro?',
                text: 'Una vez eliminado, no podrá recuperar este registro!',
                icon: 'warning',
                buttons: true,
                dangerMode: true
            })
                .then(async (willDelete: boolean) => {
                    if (willDelete) {
                        // @ts-ignore
                        await Vue.http.delete(`/api/v1/work/${item.id}`)
                            .then((res: any) => {
                                this.modelList.splice(index, 1)
                            })
                            .catch((err: any) => console.log(err))
                    }
                })
        } else {
            // delete from local
            this.modelList.splice(index, 1)
            this.emitNews()
        }

    }

    submit() {
        if (this.editedIndex > -1) {
            this.updateItem()
        } else {
            this.createItem();
        }
        this.close()
    }

    /*********************************************************
     *                          Emit                         *
     *********************************************************/
    @Watch('clear')
    private clearList() {
        this.modelList = []
    }
    /*********************************************************
     *                          Emit                         *
     *********************************************************/


    @Emit('input')
    public emitNews() {
        let list: any = []
        this.modelList.forEach(work => {
            if (!work.id)
                list.push(work)
        });
        return list
    }

    /*********************************************************
     *                        Functions                      *
     *********************************************************/

    toEditItem(item: any) {
        this.editedIndex = this.modelList.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
    }


    close() {
        this.dialog = false
        setTimeout(() => {
            this.editedItem = {}
            this.editedIndex = -1
        }, 300)
    }

}
