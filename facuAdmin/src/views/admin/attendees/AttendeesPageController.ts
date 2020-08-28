import Vue from 'vue'
import Component from 'vue-class-component'
import pdf from '@/util/PdfDefinition'
// @ts-ignore
import pdfmake from 'pdfmake/build/pdfmake'
// @ts-ignore
import pdffont from 'pdfmake/build/vfs_fonts'
pdfmake.vfs = pdffont.pdfMake.vfs
@Component({ name: 'AttendeesPage' })
export default class AttendeesPageController extends Vue {
  /*********************************************************
     *                      Attributes                       *
     *********************************************************/

  private headers: any[] = []
  private search: string = ''
  private event: any = {}
  private modelList: any[] = []

  /*********************************************************
   *                     Initializable                     *
   *********************************************************/

  created () {
    this.initialize()
    this.headers = [
      { text: 'Imagen', value: 'user', sortable: false },
      { text: 'Nombre', value: 'user.fullName' },
      { text: 'Correo', value: 'user.emailAddress', sortable: false },
      { text: 'Puntuación', value: 'score', align: 'center' }
    ]
  }

  /*********************************************************
   *                    API Services                       *
   *********************************************************/

  private async initialize () {
    // @ts-ignore
    await Vue.http.get(`/api/v1/assistant/from/event/${this.$route.params.eventId}`)
      .then((res: any) => {
        this.event = res.body.event
        this.modelList = res.body.assistants
      })
      .catch(() => { this.$store.commit('errorAlert', { msg: 'No se pueden cargar los datos.' }) })
  }

  /*********************************************************
   *                      Functions                        *
   *********************************************************/
  get eventName (): string {
    let name: string = ''
    if (this.event.name) { name = this.event.name.toUpperCase() }
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
        pdf.header('lista de asistencia', this.event.name),
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
