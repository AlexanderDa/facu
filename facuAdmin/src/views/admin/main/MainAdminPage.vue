<template>
  <div id="app">
    <v-app id="inspire">

      <v-alert
      style="z-index:999;position:absolute;top:10px;right:10px"
      v-model="$store.state.alert.show"
      :type="$store.state.alert.type"
      transition="scroll-x-reverse-transition"
      width="400"
      dismissible
      border="left"
    >
      <p v-if="$store.state.alert.title"><b>{{$store.state.alert.title}}</b></p>{{$store.state.alert.msg}}
    </v-alert>
      <v-navigation-drawer v-model="drawer" app clipped>
        <v-list dense>
          <v-list-item
            v-for="(item,index) in sideBarItems"
            :key="index"
            @click="changeView(item.routerName)"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="primary" dark clipped-left>
        <img src="@/assets/icon.svg" width="50px" />
        <v-btn icon @click="drawer=!drawer">
          <v-icon>menu</v-icon>
        </v-btn>
        <v-toolbar-title>Facu</v-toolbar-title>

        <v-spacer />

        <v-menu offset-y origin="top bottom" :nudge-bottom="10" transition="scale-transition">
          <template v-slot:activator="{ on }">
            <v-btn dark icon v-on="on">
              <v-icon>account_circle</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item
              v-for="(item, i) in optionItems"
              :key="i"
              @click="changeView(item.routerName)"
            >
              <v-list-tile-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content style="margin-left:20px">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
      <v-content>
        <router-view tag="v-container" fluid fill-height />
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import MainAdminPageController from './MainAdminPageController'

export default MainAdminPageController
</script>
