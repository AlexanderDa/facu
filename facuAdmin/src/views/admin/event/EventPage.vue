<template>
  <div>
    <div style="display:none">
      <button v-shortkey="[ 'alt', 'n']" @shortkey="dialog=!dialog"></button>
      <button v-shortkey="[ 'alt', 'r']" @shortkey="initialize()"></button>
      <button v-shortkey="[ 'esc']" @shortkey="close()"></button>
    </div>

    <v-data-table
      :headers="headers"
      :items="modelList"
      :search="search"
      hide-default-footer
      sort-desc
      sort-by="eventDate"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>EVENTOS</v-toolbar-title>
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

          <v-btn color="primary" icon @click="dialog=!dialog">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
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
        <v-icon small class="mr-2" @click="toEditItem(item)">edit</v-icon>
        <v-icon small @click="deleteItem(item)">delete</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" fullscreem max-width="700" persistent>
      <form @submit.prevent="submit()">
        <v-card>
          <v-toolbar dark color="secondary">
            <v-btn icon dark @click="close()">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>{{(editedIndex===-1)?'Nuevo':'Editar'}}</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-toolbar-items>
              <v-btn dark text type="submit">Guardar</v-btn>
            </v-toolbar-items>
          </v-toolbar>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
              <v-flex xs12 md5>
                <v-layout column>
                  <v-flex xs12 @click="pickFile" class="v-card">
                    <v-img v-if="imageData" :src="imageData" aspect-ratio="1.75"></v-img>
                    <v-img v-else-if="editedItem.image" :src="editedItem.image" aspect-ratio="1.75"></v-img>
                    <v-img v-else src="@/assets/noimg.svg" aspect-ratio="1.75"></v-img>
                    <input
                      type="file"
                      style="display: none"
                      ref="image"
                      accept="image/*"
                      @change="onFilePicked"
                    />
                  </v-flex>
                  <v-flex xs12 v-if="editedIndex>-1">
                    <v-card-title class="pa-0">
                      <v-spacer></v-spacer>
                      <qrcode :value="editedItem.id" :options="{ width: 150 }"></qrcode>
                      <v-spacer></v-spacer>
                    </v-card-title>
                    <v-card-actions class="pa-0">
                      <v-spacer></v-spacer>Código generado
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12 md7>
                <v-layout row wrap class="ml-4">
                  <v-flex xs12>
                    <v-text-field
                      label="Nombre del evento"
                      v-model.trim="editedItem.name"
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      label="Fecha del eveto"
                      v-model.trim="editedItem.eventDate"
                      return-masked-value
                      mask="####-##-## ##:##"
                      @input="()=>{}"
                      placeholder="Año-mes-día hora:min"
                      required
                    />
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      label="Descripcion del evento"
                      v-model.trim="editedItem.description"
                    />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </form>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import EventPageController from "./EventPageController";

export default EventPageController;
</script>
