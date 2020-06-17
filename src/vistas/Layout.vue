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
        <v-list-item link v-for="(modulo,index) in modulos" v-bind:key="`modulo-${index}`" @click="cargarModulo(modulo)">
          <v-list-item-action>
            <v-icon>{{modulo.icono}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{modulo.nombreModulo}}</v-list-item-title>
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
      <v-btn icon @click="cerrarSesion">
        <v-icon>power_settings_new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid class="pa-12 grey lighten-4" fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12">
            <!--<admin-votaciones></admin-votaciones>-->
            <router-view></router-view>
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
    </v-main>

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
/*
import DatosEntidad from "../components/DatosEntidad";
import AdminSedes from "../components/AdministradorSedes";
import AdminUsuarios from "../components/AdministradorUsuarios";
*/
import logoConna from "../assets/logo-conna-transparente-sin-texto.png";
import { store } from "../servicios/store";
import Servicios from "../servicios/consultas";

const serv=new Servicios();

export default {
  name: "Layout",
  components: {
    /*
    DatosEntidad,
    AdminSedes,
    AdminUsuarios
    */
  },
  mounted() {
    let dataUsuario = JSON.parse(localStorage.getItem("usuario"));
    this.nombreUsuario = dataUsuario.nombreCorto;
    this.modulos=dataUsuario.accesos;
    this.$router.push({name:dataUsuario.accesos[0].ruta});
  },
  data() {
    return {
      tabs: null,
      logoConna: logoConna,
      nombreUsuario: null,
      verModalCargando: store.state.cargando,
      storeState: store.state,
      modulos: []
    };
  },
  methods:{
    cargarModulo(modulo){
      this.$router.push({ name: modulo.ruta});
    },
    cerrarSesion(){
      let t=localStorage.getItem('t');
      serv.cerrarSesion(t).then(()=>{
        localStorage.removeItem('t');
        localStorage.removeItem('usuario');
        this.$router.replace({name:'Login'});
      });
    }
  },
  watch: {
    "storeState.cargando"(valor) {
      this.verModalCargando = this.storeState.cargando;
    }
  }
};
</script>
