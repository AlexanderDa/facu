import Vue from 'vue'
import Component from 'vue-class-component'
import swal from 'sweetalert'

import WorkPage from '@/views/admin/work/WorkPage.vue'
@Component({
  name: 'ProfessionalPage',
  components: { WorkPage }
})
export default class ProfessionalPageController extends Vue {
    /*********************************************************
     *                      Attributes                       *
     *********************************************************/
    private headers: any[] = []
    private dialog: boolean = false
    private search: string = ''
    private modelList: any[] = []
    private editedIndex: number = -1
    private editedItem: any = {}
    private clearWorks: boolean = false;

    // Image preview
    private imageData: any = null
    private imageFile: any = null

    /*********************************************************
     *                     Initializable                     *
     *********************************************************/

    created () {
      this.initialize()
      this.headers = [
        { text: 'Imagen', value: 'image', sortable: false },
        { text: 'Nombre Completo', value: 'fullName' },
        { text: 'Educación superior', value: 'education' },
        { text: 'Título universitario', value: 'collegeDegree' },
        { text: 'Especialización', value: 'specialization' },
        { text: 'Experiencia', value: 'experience' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ]
    }

    /*********************************************************
     *                    API Services                       *
     *********************************************************/

    private async initialize () {
      // @ts-ignore
      await Vue.http.get('/api/v1/professionals')
        .then((res: any) => {
          this.modelList = res.body
        })
        .catch((err: any) => console.log(err))
    }

    private async createItem () {
      // @ts-ignore
      await Vue.http.post('/api/v1/professional', this.formData())
        .then((res: any) => {
          this.modelList.push(res.body)
          if (this.editedItem.works) {
            const works = this.editedItem.works
            works.forEach(async (element: any) => {
              // @ts-ignore
              await Vue.http.post('/api/v1/work', {
                professional: res.body.id,
                name: element.name
              })
            })
          }
        })
        .catch((err: any) => console.log(err))
    }

    private async updateItem () {
      // @ts-ignore
      await Vue.http.put(`/api/v1/professional/${this.editedItem.id}`, this.formData())
        .then((res: any) => {
          Object.assign(this.modelList[this.editedIndex], res.body)
        })
        .catch((err: any) => console.log(err))
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
            await Vue.http.delete(`/api/v1/professional/${item.id}`)
              .then((res: any) => {
                this.modelList.splice(index, 1)
              })
              .catch((err: any) => console.log(err))
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
    private formData () {
      var formData = new FormData()
      formData.append('lastName', this.editedItem.lastName)
      formData.append('firstName', this.editedItem.firstName)
      if (this.editedItem.education) { formData.append('education', this.editedItem.education) }
      if (this.editedItem.collegeDegree) { formData.append('collegeDegree', this.editedItem.collegeDegree) }
      if (this.editedItem.specialization) { formData.append('specialization', this.editedItem.specialization) }
      if (this.editedItem.experience) { formData.append('experience', this.editedItem.experience) }
      if (this.imageFile !== null) { formData.append('image', this.imageFile) }
      return formData
    }

    toEditItem (item: any) {
      this.editedIndex = this.modelList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    }

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = {}
        this.editedIndex = -1
        this.clearWorks = !this.clearWorks
        this.imageData = null
        this.imageFile = null
      }, 300)
    }

    /*********************************************************
     *                      Image Preview                    *
     *********************************************************/

    // when a image is selected
    pickFile () {
      // @ts-ignore
      this.$refs.image.click()
    }

    onFilePicked (event: any) {
      this.imageFile = event.target.files[0]

      const files = event.target.files
      if (this.imageFile !== undefined) {
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.imageData = fr.result
          this.imageFile = files[0]
        })
      } else {
        this.imageFile = ''
        this.imageData = ''
      }
    }
}
