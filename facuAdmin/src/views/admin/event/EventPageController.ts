import Vue from 'vue';
import Component from 'vue-class-component';
import swal from 'sweetalert';
@Component({ name: 'EventPage' })
export default class EventPageController extends Vue {

    /*************************************************/
    private headers: any = [

        { text: 'Imagen', value: 'image', sortable: false },
        { text: 'Nombre', value: 'name' },
        { text: 'Fecha del evento', value: 'eventDate' },
        { text: 'Evento notificado', value: 'wasNotificated' },
        { text: 'Actions', value: 'action', sortable: false },
    ]
    private dialog: boolean = false
    private search: string = ''
    private modelList: any[] = []
    private editedIndex: number = -1
    private editedItem: any = {}

    //Image preview
    private imageData: any = null
    private imageFile: any = null

    /*************************************************/

    /*************************************************/

    created() {
        this.initialize()
    }
    /*************************************************/

    private async initialize() {
        // @ts-ignore
        await Vue.http.get('/api/v1/events')
            .then((res: any) => {
                this.modelList = res.body
            })
            .catch((err: any) => console.log(err))
    }


    private async createItem() {
        var formData = new FormData();
        formData.append('name', this.editedItem.name);
        formData.append('eventDate', this.editedItem.eventDate);
        formData.append('description', this.editedItem.description);
        formData.append('image', this.imageFile);
        // @ts-ignore
        await Vue.http.post('/api/v1/event', formData)
            .then((res: any) => {
                this.modelList.push(res.body.newEvent)
            })
            .catch((err: any) => console.log(err))
    }


    private async updateItem() {
        var formData = new FormData();
        formData.append('name', this.editedItem.name);
        formData.append('eventDate', this.editedItem.eventDate);
        formData.append('description', this.editedItem.description);
        formData.append('image', this.imageFile);
        // @ts-ignore
        await Vue.http.put(`/api/v1/event/${this.editedItem.id}`, formData)
            .then((res: any) => {
                Object.assign(this.modelList[this.editedIndex], res.body.updatedEvent)
            })
            .catch((err: any) => console.log(err))
    }


    private async deleteItem(item: any) {
        const index = this.modelList.indexOf(item)
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
                    await Vue.http.delete(`/api/v1/event/${item.id}`)
                        .then((res: any) => {
                            this.modelList.splice(index, 1)
                        })
                        .catch((err: any) => console.log(err))
                }
            })
    }

    submit() {
        if (this.editedIndex > -1) {
            this.updateItem()
        } else {
            this.createItem();
        }
        this.close()
    }


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
            this.imageData = null
            this.imageFile = null
        }, 300)
    }



    /*************************************************/

    // when a image is selected
    pickFile() {
        // @ts-ignore
        this.$refs.image.click()
    }

    onFilePicked(event: any) {
        this.imageFile = event.target.files[0]

        const files = event.target.files
        if (this.imageFile !== undefined) {
            const fr = new FileReader()
            fr.readAsDataURL(files[0])
            fr.addEventListener('load', () => {
                this.imageData = fr.result
                this.imageFile = files[0] // this is an image file that can be sent to server...
            })
        } else {
            this.imageFile = ''
            this.imageData = ''
        }
    }

}
