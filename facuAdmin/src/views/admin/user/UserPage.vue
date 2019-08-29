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
      sort-by="fullName"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>USUARIOS</v-toolbar-title>
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

          <v-btn color="primary" icon @click="initialize()">
            <v-icon>refresh</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item.image="{ item }">
        <v-avatar>
          <v-img :src="item.image" />
        </v-avatar>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import UserPageController from "./UserPageController";

export default UserPageController;
</script>
