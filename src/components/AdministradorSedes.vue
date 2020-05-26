<template>
  <v-card outlined color="#fff">
    <v-card-title>Agregar Sede</v-card-title>
    <v-card-text>
      <v-tabs v-model="tabs">
        <v-tab>Datos Generales</v-tab>
        <v-tab>Contactos</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tabs">
        <v-tab-item>
          <datos-sede></datos-sede>
        </v-tab-item>
        <v-tab-item>
          <contactos-sede></contactos-sede>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>
<script>
import DatosSede from "../components/DatosSede";
import ContactosSede from "../components/ContactosSede";

export default {
    components:{
        DatosSede,
        ContactosSede
    },
    data(){
        return {
            tabs:null,
            resetTodo:false
        }
    }
};
</script>