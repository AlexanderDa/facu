<template>
  <router-view />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
@Component({ name: "App" })
export default class MainAdminPageController extends Vue {
  async beforeMount() {
    //@ts-ignore
    await Vue.http
      .get("/api/v1/account/me")
      .then(async (res: any) => {
        await localStorage.setItem("isLogged", `${res.body.isLogged}`);
      })
      .catch(
        async (err: any) => await localStorage.setItem("isLogged", "false")
      );
  }
}
</script>
