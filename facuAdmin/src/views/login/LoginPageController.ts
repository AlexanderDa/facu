import Vue from 'vue';
import Component from 'vue-class-component';
// import UserService from '@/service/UserService'
// import UserService from '@/model/service/UserService'

@Component({ name: 'LoginPage' })
export default class LoginPage extends Vue {

  public username: string = '';
  public password: string = '';
  public error: boolean = false;
  public loading: boolean = false

  public async login() {
    //const user = await this.$store.dispatch('signIn', { emailAddress: this.username, password: this.password })
    //const users = await this.$store.dispatch('getAll')

  }

  setCookie(name: string, value: string, seconds: number) {
    // @ts-ignore
    const expires = seconds ? '; expires=' + new Date(new Date().getTime() + seconds * 1000).toGMTString() : ''
    document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/'
  }
}
