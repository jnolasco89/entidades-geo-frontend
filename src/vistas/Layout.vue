<template>
  <v-app>
    <v-navigation-drawer clipped app overflow>
      <div style="text-align:center;padding-top:10px;">
        <img
          width="75"
          height="50"
          style="display: inline-block;"
          :src="logoConna"
          alt="Logo Conna"
        />
      </div>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>supervisor_account</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Usuarios</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>assignment_turned_in</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Registro entidades</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="true" app color="primary darken-2" dark>
      <v-toolbar-title>Registro de entidades</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text>
        <v-icon>person</v-icon>
        &nbsp;
        {{nombreUsuario}}
      </v-btn>
      <v-btn icon>
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container fluid class="pa-12 grey lighten-4" fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <admin-votaciones></admin-votaciones>
          </v-col>
        </v-row>
        <!--
        <v-row align="center" justify="center">
          <v-col cols="12">
            <admin-usuarios></admin-usuarios>
          </v-col>
        </v-row>
        -->
        <!--
        <v-row align="center" justify="center">
          <v-col cols="12">
            <datos-entidad></datos-entidad>
          </v-col>
          <v-col cols="12">
            <admin-sedes></admin-sedes>
          </v-col>
        </v-row>
        -->
      </v-container>
    </v-content>

    <v-dialog v-model="verModalCargando" persistent width="300">
      <v-card color="success" dark>
        <v-card-text>
          <h4>Cargando...</h4>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import DatosEntidad from "../components/DatosEntidad";
import AdminSedes from "../components/AdministradorSedes";
import AdminUsuarios from "../components/AdministradorUsuarios";
import AdminVotaciones from "../components/AdministradorVotaciones";
import logoConna from "../assets/logo-conna-transparente-sin-texto.png";
import { store } from "../servicios/store";

export default {
  name: "Layout",
  components: {
    DatosEntidad,
    AdminSedes,
    AdminUsuarios,
    AdminVotaciones
  },
  data() {
    return {
      tabs: null,
      logoConna: logoConna,
      nombreUsuario: "Nombre Usuario",
      verModalCargando: store.state.cargando,
      storeState: store.state
    };
  },
  watch: {
    "storeState.cargando"(valor) {
      this.verModalCargando = this.storeState.cargando;
    }
  }
};
</script>
