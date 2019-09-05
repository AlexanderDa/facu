<template>
  <div>
    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="grey lighten-4" flat tile>
            <v-toolbar flat color="white">
              <v-toolbar-title>TRABAJOS</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-btn color="primary" icon @click="dialog=true">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="modelList"
              hide-default-footer
              hide-default-header
              sort-desc
              sort-by="eventDate"
              class="elevation-1"
            >
              <template v-slot:item.image="{ item }">
                <v-avatar tile>
                  <v-img :src="item.image" />
                </v-avatar>
              </template>
              <template v-slot:item.wasNotificated="{ item }">
                <v-chip v-if="item.wasNotificated" color="success" dark>Notificado</v-chip>
                <v-chip v-else color="warning" dark>Sin Notificar</v-chip>
              </template>
              <template v-slot:item.action="{ item }">
                <v-btn @click="toEditItem(item)" icon>
                  <v-icon small>edit</v-icon>
                </v-btn>
                <v-btn @click="deleteItem(item)" icon>
                  <v-icon small>delete</v-icon>
                </v-btn>
              </template>
            </v-data-table>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-dialog v-model="dialog" scrollable max-width="500px" persistent>
      <form @submit.prevent="submit()">
        <v-card>
          <v-toolbar dark dense color="secondary">
            <v-toolbar-title>{{(editedIndex===-1)?'Nuevo':'Editar'}}</v-toolbar-title>
            <v-spacer />
            <v-btn icon dark @click="close()">
              <v-icon>close</v-icon>
            </v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-card-text>
            <v-container grid-list-sm class="pa-4">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-textarea label="Nombre" v-model.trim="editedItem.name" required />
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer />
            <v-btn type="submit" color="secondary">
              <v-icon>save</v-icon>Guardar
            </v-btn>
          </v-card-actions>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import WorkPageController from "./WorkPageController";

export default WorkPageController;
</script>
