<template>
  <div>
    <div style="display:none">
      <button v-shortkey="[ 'alt', 'n']" @shortkey="dialog=!dialog"></button>
      <button v-shortkey="[ 'alt', 'r']" @shortkey="initialize()"></button>
      <button v-shortkey="[ 'esc']" @shortkey="close()"></button>
    </div>

    <v-container grid-list-sm class="pa-4">
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-card>
            <v-img height="250" :src="event.image"></v-img>

            <v-card-title>{{event.name}}</v-card-title>
            <v-card-text>
              <div>{{event.description}}</div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>
              <v-list>
                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Fecha de publicación</v-list-item-title>
                    <v-list-item-subtitle>{{event.publishDate}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-list-item two-line>
                  <v-list-item-content>
                    <v-list-item-title>Fecha del evento</v-list-item-title>
                    <v-list-item-subtitle>{{event.eventDate}}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 md8>
          <v-card color="grey lighten-4" flat tile>
            <v-toolbar flat color="white">
              <v-toolbar-title>ACTIVIDADES</v-toolbar-title>
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

              <v-btn color="primary" icon @click="newItem()">
                <v-icon>add</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-table
              :headers="headers"
              :items="modelList"
              :search="search"
              hide-default-footer
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
                <v-flex xs12>
                  <v-text-field label="Nombre" v-model.trim="editedItem.name" required />
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Lugar" v-model.trim="editedItem.place" required />
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model.trim="editedItem.professional"
                    :items="professionals"
                    item-text="fullName"
                    item-value="id"
                    label="Profesional a cargo"
                    clearable
                    required
                  ></v-autocomplete>
                </v-flex>
                <v-flex xs6>
                  <v-text-field
                    label="Fecha"
                    v-model="editedItem.activityDate"
                    v-mask="'####-##-##'"
                    required
                  />
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    label="Hora de inicio"
                    v-model="editedItem.startTime"
                    v-mask="'##:##'"
                    required
                  />
                </v-flex>
                <v-flex xs3>
                  <v-text-field
                    label="Hora de cierre"
                    v-model.trim="editedItem.finishTime"
                    v-mask="'##:##'"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-autocomplete
                    v-model.trim="editedItem.type"
                    :items="['Conferencia','Taller']"
                    label="Tipo de actividad"
                    required
                  />
                </v-flex>
                <v-flex xs5>
                  <v-switch
                    v-model.trim="editedItem.requireInscription"
                    label="Require inscripcion"
                  ></v-switch>
                </v-flex>
                <v-flex xs7>
                  <v-text-field
                    label="Cupos disponibles"
                    v-model.trim="editedItem.quota"
                    :disabled="!editedItem.requireInscription"
                    :required="!editedItem.requireInscription"
                    type="number"
                    min="0"
                  />
                </v-flex>
              </v-layout>
              {{editedItem}}
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
import ActivityPageController from "./ActivityPageController";

export default ActivityPageController;
</script>
