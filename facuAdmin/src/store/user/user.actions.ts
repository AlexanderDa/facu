import Vue from 'vue'

export default {
  getAll(context: any) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      Vue.http
        .get('/api/v1/users')
        .then((res: any) => {
          context.commit('SET_USERS', res.body)
          console.log(res.body)
          resolve()
        })
        .catch((err: any) => reject(err))
    })
  },
  /*
    signUp(context: any, { name, password }) {
      return new Promise((resolve, reject) => {
        // @ts-ignore
        Vue.http
          .post('/api/v1/user/signup', { name, password })
          .then(() => {
            context.commit('RESET_USER')
            resolve()
          })
          .catch((err: any) => reject(err))
      })
    },*/

  signIn(context: any, { emailAddress, password }: any) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      Vue.http
        .post('/api/v1/user/login', {
          emailAddress,
          password
        })
        .then((res: any) => {
          //context.commit('SET_IS_USER_AUTHENTICATED', true)
          resolve(res.body)
        })
        .catch((err: any) => reject(err))
    })
  }

}
