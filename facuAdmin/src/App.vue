<template>
  <div>
    <vue-progress-bar/>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component({ name: 'App' })
export default class MainAdminPageController extends Vue {
  public created (): void {
    // @ts-ignore
    this.$io.socket.on('new-event', function (event) {
      if ('Notification' in window) {
        let ask = Notification.requestPermission()
        ask.then((permission = 'granted') => {
          if (permission === 'granted') {
            let msg = new Notification('Nuevo evento', {
              body: `${event.name}.\n${event.description}`,
              icon: `${event.image}`
            })
          }
        })
      }
    })
  }
}
</script>
