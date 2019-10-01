export default {
  header: function (title: string, subtitle?: string) {
    return {
      layout: 'noBorders',
      table: {
        headerRows: 1,
        widths: ['*'],
        body: [
          [{
            text: `UNIVERSIDAD NACIONAL DE CHIMBORAZO
                      SISTEMAS Y COMPUTACIÓN
                       ${title.toUpperCase()}${(subtitle) ? '\n' + subtitle.toUpperCase() : ''}`,
            style: 'docHeader'
          }]
        ]
      }
    }
  },

  tableLayouts: {
    hLineWidth (i: number, node: any) {
      return (i === 0 || i === node.table.body.length) ? 1 : 1
    },
    vLineWidth (i: number, node: any) {
      return (i === 0 || i === node.table.widths.length) ? 1 : 1
    },
    hLineColor (i: number, node: any) {
      return (i === 0 || i === node.table.body.length) ? '#bdbdbd' : '#bdbdbd'
    },
    vLineColor (i: number, node: any) {
      return (i === 0 || i === node.table.widths.length) ? '#bdbdbd' : '#bdbdbd'
    }
  },

  styles: {
    invoiceHeader: {
      fontSize: 14,
      color: '#000000',
      alignment: 'center',
      bold: true,
      margin: 2
    },
    docHeader: {
      fontSize: 12,
      color: 'white',
      fillColor: '#00B9D1',
      alignment: 'center',
      bold: true,
      margin: 2
    },
    titleLabel: {
      bold: true,
      color: '#666666'
    },
    footer: {
      fontSize: 10,
      color: '#000000',
      alignment: 'center'
    },
    infoLabel: {
      fontSize: 10,
      margin: [0, 5]
    },
    thead: {
      alignment: 'center',
      color: '#000000',
      bold: true,
      margin: [0, 2],
      fontSize: 10
    },
    tcell: {
      margin: [0, 3],
      fontSize: 10
    }
  }
}
