import Vue from 'vue';
import Component from 'vue-class-component';
// import UserService from '@/service/UserService'
// import UserService from '@/model/service/UserService'

@Component({ name: 'LoginPage' })
export default class LoginPage extends Vue {

  public username: string = '';
  public password: string = '';
  public error: boolean = false;
  public errorMsg: string = '';
  public loading: boolean = false

  public async login() {
    // @ts-ignore
    await Vue.http.post('/api/v1/account/login', {
      emailAddress: this.username,
      password: this.password
    })
      .then(async (res: any) => {
        if (res.body.isSuperAdmin === true) {
          this.$router.push({ name: 'MainAdminPage' })
          localStorage.setItem('isLogged', 'true');
        } else {
          this.error = true
          this.errorMsg = 'Usted no es "Super Usuario"'
          // @ts-ignore
          await Vue.http
            .put("/api/v1/account/logout")
            .then(async () => {
              await localStorage.setItem("isLogged", 'false');
            })
        }
      })
      .catch((err: any) => {
        this.error = true
        this.errorMsg = 'Usuario o contraseña incorrectos.'
      })

  }
}
