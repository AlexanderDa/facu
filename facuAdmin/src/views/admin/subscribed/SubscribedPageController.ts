import Vue from 'vue'
import Component from 'vue-class-component'
import pdf from '@/util/PdfDefinition'
// @ts-ignore
import pdfmake from 'pdfmake/build/pdfmake'
// @ts-ignore
import pdffont from 'pdfmake/build/vfs_fonts'
pdfmake.vfs = pdffont.pdfMake.vfs
@Component({ name: 'SubscribedPage' })
export default class SubscribedPageController extends Vue {
  /*********************************************************
     *                      Attributes                       *
     *********************************************************/

  private headers: any[] = []
  private search: string = ''
  private activity: any = {}
  private modelList: any[] = []

  /*********************************************************
   *                     Initializable                     *
   *********************************************************/

  created () {
    this.initialize()
    this.headers = [
      { text: 'Imagen', value: 'user', sortable: false },
      { text: 'Nombre', value: 'user.fullName' },
      { text: 'Fecha de inscripción', value: 'subscriptionDate' },
      { text: 'Correo', value: 'user.emailAddress', sortable: false },
      { text: 'Puntuación', value: 'score', align: 'center' }
    ]
  }

  /*********************************************************
   *                    API Services                       *
   *********************************************************/

  private async initialize () {
    // @ts-ignore
    await Vue.http.get(`/api/v1/score/from/activity/${this.$route.params.activityId}`)
      .then((res: any) => {
        this.activity = res.body.activity
        this.modelList = res.body.subscribed
      })
      .catch(() => { this.$store.commit('errorAlert', { msg: 'No se pueden cargar los datos.' }) })
  }

  /*********************************************************
   *                      Functions                        *
   *********************************************************/
  get activityName (): string {
    let name: string = ''
    if (this.activity.name) { name = this.activity.name.toUpperCase() }
    return name
  }
  private print (): void {
    let content: any[] = []
    // header of the table
    content.push([
      { text: '#', style: 'thead' },
      { text: 'Apellidos', style: 'thead' },
      { text: 'Nombres', style: 'thead' },
      { text: 'Email', style: 'thead' },
      { text: 'Teléfono', style: 'thead' }
    ])

    this.modelList.forEach((element: any, index: number) => {
      content.push([
        { text: (index + 1), style: 'tcell' },
        { text: element.user.lastName, style: 'tcell' },
        { text: element.user.firstName, style: 'tcell' },
        { text: element.user.emailAddress, style: 'tcell' },
        { text: element.user.telephone, style: 'tcell' }
      ])
    })

    const table: any = {
      widths: ['auto', '*', '*', '*', '*'],
      body: content
    }

    var docDefinition = {
      content: [
        pdf.header('lista de inscritos', this.activity.name),
        {
          layout: pdf.tableLayouts,
          style: 'infoLabel',
          margin: [0, 25],
          table
        }
      ],
      styles: pdf.styles
    }
    // @ts-ignore
    pdfMake.createPdf(docDefinition).download(`lista de asistentes.pdf`)
  }
}
