<template>
  <v-app>
    <v-app-bar app color="primary darken-2" dark>
      <v-toolbar-title>Demo 1 - Entidades Georeferenciadas</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid class="pa-12" fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <datos-entidad></datos-entidad>
          </v-col>
          <v-col cols="12">
            <v-card outlined color="#fff">
              <v-card-title>Sedes entidad</v-card-title>
              <v-card-text>
                <v-tabs v-model="tabs">
                  <v-tab>Datos Generales</v-tab>
                  <v-tab>Contactos</v-tab>
                </v-tabs>
                <v-tabs-items v-model="tabs">
                  <v-tab-item>
                    <datos-generales-sede></datos-generales-sede>
                  </v-tab-item>
                  <v-tab-item>
                    <contactos-sede></contactos-sede>
                  </v-tab-item>
                </v-tabs-items>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import Mapa from "../components/Mapa";
import Servicios from "../servicios/consultas";
import InputTextDinamico from "../components/InputTextDinamico";
import ListaPaginacion from "../components/ListaPaginacion";
import DatosGeneralesSede from "../components/DatosGeneralesSede";
import ContactosSede from "../components/ContactosSede";
import DatosEntidad from "../components/DatosEntidad";

const serv = new Servicios();

export default {
  name: "Layout",
  components: {
    Mapa,
    InputTextDinamico,
    ListaPaginacion,
    DatosGeneralesSede,
    ContactosSede,
    DatosEntidad
  },
  data(){
    return {
      tabs:null
    }
  },
  methods: {
    prueba(){
    }
  },
  computed: {}
};
</script>