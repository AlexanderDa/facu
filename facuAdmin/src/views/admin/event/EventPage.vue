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
        <v-btn :disabled="item.wasNotificated" @click="emitNonification(item)" icon>
          <v-icon small v-if="!item.wasNotificated">notifications_active</v-icon>
          <v-icon small v-else>notifications_off</v-icon>
        </v-btn>
        <v-btn @click="printQr(item)" icon>
          <v-icon small>developer_mode</v-icon>
        </v-btn>
         <v-btn @click="toEditItem(item)" icon>
          <v-icon small>edit</v-icon>
        </v-btn>
        <v-btn @click="$router.push({ name: 'ActivityPage', params: { eventId: item.id } })" icon>
          <v-icon small>library_add</v-icon>
        </v-btn>
        <v-btn @click="deleteItem(item)" icon>
          <v-icon small>delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
      <form @submit.prevent="submit()">
        <v-card>
          <v-toolbar dark color="secondary">
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
                <v-flex xs12 md5>
                  <v-layout column>
                    <v-flex xs12 @click="pickFile" class="v-card">
                      <v-img v-if="imageData" :src="imageData" aspect-ratio="1.75"></v-img>
                      <v-img
                        v-else-if="editedItem.image"
                        :src="editedItem.image"
                        aspect-ratio="1.75"
                      ></v-img>
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
                        <qrcode :value="editedItem.id" :options="{ width: 200 }"></qrcode>
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
                        label="Lugar del evento"
                        v-model.trim="editedItem.place"
                        required
                      />
                    </v-flex>
                    <v-flex xs12>
                      <v-text-field
                        label="Fecha del eveto"
                        v-model.trim="editedItem.eventDate"
                        return-masked-value
                        v-mask="['####-##-##','####-##-## #:##','####-##-## ##:##']"
                        placeholder="2020-02-20 20:20"
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
import EventPageController from './EventPageController'

export default EventPageController
</script>
