<template>
  <div id="app">
    <v-app id="inspire">
      <v-progress-linear
        color="primary"
        indeterminate
        height="3"
      />
      <v-content>
        <v-container
          fluid
          fill-height
        >
          <v-layout
            align-content-center
            justify-center
            fill-height
            wrap
          >
            <v-flex
              xs12
              subtitle-1
              text-center
              mb-5
            >
              <img
                width="150"
                src="@/assets/icon.svg"
              >
              <h1>FacuEvent</h1>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script lang="ts">
import RootPageController from './RootPageController'

export default RootPageController
</script>
