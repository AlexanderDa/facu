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
  public created(): void {
    // @ts-ignore
    this.$io.socket.on("new-event", function(event) {
      console.log(`Event created: ${event.name}`);
      if ("Notification" in window) {
        let ask = Notification.requestPermission();
        ask.then((permission = "granted") => {
          if (permission === "granted") {
            let msg = new Notification("Nuevo evento", {
              body: `${event.name}.\n${event.description}`,
              icon: `${event.image}`
            });
          }
        });
      }
    });
  }
}
</script>
