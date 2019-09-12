import Vue from 'vue'
import Component from 'vue-class-component'

interface Route {
  icon?: string;
  title: string;
  routerName?: string;
}

interface Item {
  icon: string;
  title: string;
  routerName?: string;
  children?: Route[]
}
@Component({ name: 'MainAdminPage' })
export default class MainAdminPageController extends Vue {
  public drawer: boolean = true;

  public sideBarItems: Item[] = [
    { icon: 'event', title: 'Eventos', routerName: 'EventPage' },
    { icon: 'people', title: 'Profesionales', routerName: 'ProfessionalPage' },
    { icon: 'account_circle', title: 'Usuarios', routerName: 'UserPage' }

  ];

  public optionItems: Item[] = [
    { icon: 'logout', title: 'Salir', routerName: 'LoginPage' }
  ];

  public created (): void {
    // @ts-ignore
    this.$io.socket.post('/api/v1/socket/connect', '', function (resData: any, jwres: any) {
      // @ts-nocheck
      console.info(`connected ${resData}`)
    })
  }

  public changeView (routerName: string): void {
    if (routerName === 'LoginPage') {
      this.logout()
    }
    this.$router.push({ name: routerName })
  }

  private async logout () {
    // @ts-ignore
    await Vue.http
      .put('/api/v1/account/logout')
      .then(async (res: any) => {
        await localStorage.setItem('isLogged', 'false')
      })
  }
}
