import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'AccountPage' })
export default class AccountPageController extends Vue {
  /*********************************************************
   *                      Attributes                       *
   *********************************************************/
  private me: any = {}
  private password: any = {
    newPassError: null,
    repeatedPassError: null,
    diffPassError: null,
    smallPassword: null
  }

  // Image preview
  private imageData: any = null
  private imageFile: any = null
  /*********************************************************
  *                    API Services                       *
  *********************************************************/

  private created () {
    this.initialize()
  }

  private async initialize () {
    // @ts-ignore
    await Vue.http.get('/api/v1/account/me')
      .then((res: any) => {
        this.me = res.body.me
      })
      .catch(() => { this.$router.back() })
  }

  private async changeAvatar () {
    if (this.imageFile !== null) {
      var formData = new FormData()
      formData.append('image', this.imageFile)
      // @ts-ignore
      await Vue.http.put('/file/image/user', formData)
    }
  }

  private async updateProfile () {
    // @ts-ignore
    await Vue.http.put('/api/v1/account/update/profile', this.me)
      .then((res: any) => {
        this.me = res.body
        this.$store.commit('successAlert', { msg: 'Información actualizada' })
      })
      .catch(() => { this.$store.commit('errorAlert', { msg: 'Información sin actualizar.' }) })
    this.changeAvatar()
  }

  private async changePass () {
    let isValid: boolean = false

    this.password.newPassError = (this.password.new === undefined)
    this.password.repeatedPassError = (this.password.repeated === undefined)
    this.password.diffPassError = (this.password.new !== this.password.repeated)

    if (this.password.new === this.password.repeated) {
      if (this.password.new === this.password.repeated) {
        this.password.smallPassword = (this.password.new.length < 8 && this.password.repeated.length < 8)
      }
    }

    isValid = (
      (this.password.new !== undefined || this.password.new !== '') &&
      (this.password.repeated !== undefined || this.password.repeated !== '') &&
      this.password.repeated === this.password.new &&
      this.password.new.length >= 8 && this.password.repeated.length >= 8
    )
    if (isValid) {
      // @ts-ignore
      await Vue.http.put('/api/v1/account/update/password', {
        password: this.password.new
      })
        .then(() => { this.$store.commit('successAlert', { msg: 'Contraseña actualizada' }) })
        .catch(() => { this.$store.commit('errorAlert', { msg: 'Contaseña sin actualizar.' }) })
    }
  }

  /*********************************************************
  *                      Image Preview                    *
  *********************************************************/

  // when a image is selected
  pickFile () {
    // @ts-ignore
    this.$refs.image.click()
  }

  async onFilePicked (event: any) {
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
