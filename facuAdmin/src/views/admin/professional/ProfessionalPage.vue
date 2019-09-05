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
          <v-toolbar-title>PROFESIONALES</v-toolbar-title>
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
        <v-avatar color="grey">
          <v-img v-if="item.image" :src="item.image" />
          <v-icon v-else large dark>account_circle</v-icon>
        </v-avatar>
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
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs12 md5 class="text-center">
                      <v-badge color="transparent" bottom>
                        <template v-slot:badge>
                          <v-btn icon color="secondary" @click="pickFile">
                            <v-icon>camera_alt</v-icon>
                          </v-btn>
                        </template>
                        <v-avatar size="150">
                          <v-img v-if="imageData" :src="imageData" aspect-ratio="1.75"></v-img>
                          <v-img
                            v-else-if="editedItem.image"
                            :src="editedItem.image"
                            aspect-ratio="1.75"
                          ></v-img>
                          <v-img v-else src="@/assets/user.svg" aspect-ratio="1.75"></v-img>
                          <input
                            type="file"
                            style="display: none"
                            ref="image"
                            accept="image/*"
                            @change="onFilePicked"
                          />
                        </v-avatar>
                      </v-badge>
                    </v-flex>
                    <v-flex xs12 md7>
                      <v-flex xs12>
                        <v-text-field
                          label="Apellidos"
                          v-model.trim="editedItem.lastName"
                          required
                        />
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field label="Nombres" v-model.trim="editedItem.firstName" required />
                      </v-flex>
                    </v-flex>
                  </v-layout>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    label="Educación superior"
                    v-model.trim="editedItem.education"
                    required
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Título universitario"
                    v-model.trim="editedItem.collegeDegree"
                  />
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Especialización" v-model.trim="editedItem.specialization" />
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Años de experiencia"
                    v-model.trim="editedItem.experience"
                    type="number"
                    min="0"
                    max="75"
                  />
                </v-flex>
                <v-flex xs12>
                  <WorkPage
                    :professional="editedItem.id"
                    :clear="clearWorks"
                    v-model.trim="editedItem.works"
                  />
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
import ProfessionalPageController from "./ProfessionalPageController";

export default ProfessionalPageController;
</script>
