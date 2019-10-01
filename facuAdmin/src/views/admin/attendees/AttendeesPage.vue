<template>
  <div>
    <div style="display:none">
      <button v-shortkey="[ 'alt', 'r']" @shortkey="initialize()"></button>
    </div>
    <v-data-table
      :headers="headers"
      :items="modelList"
      :search="search"
      hide-default-footer
      sort-by="user.fullName"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>ASISTENCIAS</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            solo
            v-model="search"
            label="Buscar"
            append-icon="search"
            hide-details
            clearable
          ></v-text-field>
          <v-spacer></v-spacer>

          <v-btn color="primary" icon @click="print()">
            <v-icon>print</v-icon>
          </v-btn>
          <v-btn color="primary" icon @click="initialize()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
        <v-toolbar flat dense color="white">
          <v-spacer/>
          <v-toolbar-title class="subtitle-1" v-text="eventName"></v-toolbar-title>
          <v-spacer/>
        </v-toolbar>
      </template>
      <template v-slot:item.user="{ item }">
        <v-avatar color="grey">
          <v-img v-if="item.user.image" :src="item.user.image" />
          <v-icon v-else large dark>account_circle</v-icon>
        </v-avatar>
      </template>
      <template v-slot:item.score="{ item }">
        <v-rating :value="item.score" readonly></v-rating>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import AttendeesPageController from './AttendeesPageController'

export default AttendeesPageController
</script>
