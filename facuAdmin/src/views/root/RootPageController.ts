import Vue from 'vue';
import Component from 'vue-class-component';

@Component({ name: 'RootPage' })
export default class RootPageController extends Vue {
    created() {
        if (localStorage.getItem('isLogged') === 'true') {
            this.$router.push({ name: 'MainAdminPage' })
        } else {
            this.$router.push({ name: 'LoginPage' })
        }
    }
}
