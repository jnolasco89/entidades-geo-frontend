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
            <admin-sedes></admin-sedes>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import DatosEntidad from '../components/DatosEntidad';
import AdminSedes from '../components/AdministradorSedes';

export default {
  name: "Layout",
  components: {
    DatosEntidad,
    AdminSedes
  },
  data(){
    return {
      tabs:null
    }
  }
};
</script>
