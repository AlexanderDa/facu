import Vue from 'vue'
import Component from 'vue-class-component'
import swal from 'sweetalert'
@Component({ name: 'ActivityPage' })
export default class ActivityPageController extends Vue {
  /*********************************************************
   *                      Attributes                       *
   *********************************************************/
  private headers: any[] = []
  private dialog: boolean = false
  private search: string = ''
  private event: any = {}
  private professionals: any = {}
  private modelList: any[] = []
  private editedIndex: number = -1
  private editedItem: any = {
    event: 0,
    activityDate: '',
    startTime: ''
  }

  /*********************************************************
   *                     Initializable                     *
   *********************************************************/

  created () {
    this.initialize()
    this.initProfessionals()
    this.headers = [
      { text: 'Nombre', value: 'name', align: 'left' },
      { text: 'Lugar', value: 'place' },
      { text: 'Fecha', value: 'activityDate' },
      { text: 'Hora de Inicio', value: 'startTime' },
      { text: 'Actions', value: 'action', sortable: false, align: 'center' }
    ]
  }

  /*********************************************************
   *                    API Services                       *
   *********************************************************/
  private async initProfessionals () {
    // @ts-ignore
    await Vue.http.get(`/api/v1/professionals`)
      .then((res: any) => {
        this.professionals = res.body
      })
      .catch(() => this.$router.push({ name: 'EventPage' }))
  }

  private async initialize () {
    // @ts-ignore
    await Vue.http.get(`/api/v1/event/${this.$route.params.eventId}`)
      .then((res: any) => {
        this.modelList = res.body.activities
        this.event = res.body
        this.event.activities = undefined
      })
      .catch(() => this.$router.push({ name: 'EventPage' }))
  }

  private async createItem () {
    // @ts-ignore
    await Vue.http.post('/api/v1/activity', this.editedItem)
      .then((res: any) => {
        this.modelList.push(res.body)
        this.$store.commit('successAlert', { msg: 'Elemento guardado con éxito.' })
      })
      .catch(() => { this.$store.commit('errorAlert', { msg: 'El registro no se pudo guardar.' }) })
  }

  private async updateItem () {
    // @ts-ignore
    await Vue.http.put(`/api/v1/activity/${this.editedItem.id}`, this.editedItem)
      .then((res: any) => {
        Object.assign(this.modelList[this.editedIndex], res.body)
        this.$store.commit('successAlert', { msg: 'Elemento actualizado con éxito.' })
      })
      .catch(() => { this.$store.commit('errorAlert', { msg: 'El registro no se pudo actualizar.' }) })
  }

  private async deleteItem (item: any) {
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
          await Vue.http.delete(`/api/v1/activity/${item.id}`)
            .then((res: any) => {
              this.modelList.splice(index, 1)
              this.$store.commit('successAlert', { msg: 'Elemento eliminado con éxito.' })
            })
            .catch(() => { this.$store.commit('errorAlert', { msg: 'El registro no se pudo eliminar.' }) })
        }
      })
  }

  submit () {
    if (this.editedIndex > -1) {
      this.updateItem()
    } else {
      this.createItem()
    }
    this.close()
  }

  /*********************************************************
   *                        Functions                      *
   *********************************************************/

  private newItem () {
    this.dialog = true
    this.editedItem.event = this.$route.params.eventId
    this.editedItem.activityDate = this.event.eventDate.substring(0, 10)
    this.editedItem.startTime = this.event.eventDate.substring(11, 16)
  }

  toEditItem (item: any) {
    this.editedIndex = this.modelList.indexOf(item)
    this.editedItem = Object.assign({}, item)
    this.dialog = true
  }

  close () {
    this.dialog = false
    setTimeout(() => {
      this.editedItem = {
        event: this.$route.params.eventId,
        activityDate: '',
        startTime: ''
      }
      this.editedIndex = -1
    }, 300)
  }
}
