import Vue from 'vue'
import Component from 'vue-class-component'
import swal from 'sweetalert'
@Component({ name: 'UserPage' })
export default class UserPageController extends Vue {
  /*********************************************************
     *                      Attributes                       *
     *********************************************************/

    private headers: any[] = []
    private search: string = ''
    private modelList: any[] = []

    /*********************************************************
     *                     Initializable                     *
     *********************************************************/

    created () {
      this.initialize()
      this.headers = [
        { text: 'Imagen', value: 'image', sortable: false },
        { text: 'Nombre', value: 'fullName' },
        { text: 'Correo', value: 'emailAddress', sortable: false },
        { text: 'Teléfono', value: 'telephone', sortable: false }
      ]
    }

    /*********************************************************
     *                    API Services                       *
     *********************************************************/

    private async initialize () {
      // @ts-ignore
      await Vue.http.get('/api/v1/users')
        .then((res: any) => {
          this.modelList = res.body
        })
        .catch((err: any) => console.log(err))
    }
}
