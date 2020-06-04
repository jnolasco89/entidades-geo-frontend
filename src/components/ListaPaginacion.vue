<template>
  <v-card :color="config.color" outlined>
    <v-card-title>{{config.titulo}}</v-card-title>
    <v-card-subtitle>
      <slot name="subtitulo"></slot>
    </v-card-subtitle>
    <v-card-text>
      <v-list>
        <template v-if="items.length==0">
          <v-list-item>
            <v-list-item-content>
              <v-alert color="grey lighten-3" style="text-align:center;">Sin datos que mostrar</v-alert>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-else>
          <v-row justify="center">
            <template v-if="verFilaEncabezados">
              <v-col
                v-for="(encabezado,indexEncabezado) in config.encabezados"
                :key="`titulos-${indexEncabezado}-${encabezado.nombre}`"
                :xs="encabezado.anchos.xs"
                :sm="encabezado.anchos.sm"
                :md="encabezado.anchos.md"
                :lg="encabezado.anchos.lg"
                :xl="encabezado.anchos.xl"
              >{{encabezado.texto}}</v-col>
            </template>
          </v-row>
          <v-list-item v-for="(item,indexFila) in items" :key="`item-paginacion-${indexFila}`">
            
            <v-list-item-avatar v-if="config.itemAvatar.ver">
              <v-icon color="indigo">{{config.itemAvatar.icono}}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <hr />
              <v-row no-gutters class="fila-paginacion">
                <v-col
                  v-for="(encabezado,indexEncabezado) in config.encabezados"
                  :key="`${indexFila}-${indexEncabezado}-${encabezado.nombre}`"
                  :cols="encabezado.anchos.xs"
                  :sm="encabezado.anchos.sm"
                  :md="encabezado.anchos.md"
                  :lg="encabezado.anchos.lg"
                  :xl="encabezado.anchos.xl"
                >
                 <span v-if="!verFilaEncabezados">{{encabezado.texto}}<br></span>
                  <slot :name="encabezado.nombre" v-bind="{item,encabezado,indexFila}"></slot>
                </v-col>
              </v-row>
            </v-list-item-content>
            <!--
            <v-list-item-action v-if="config.itemAccion.ver">
              <slot name="acciones" v-bind:item="item"></slot>
            </v-list-item-action>
            -->
          </v-list-item>
        </template>
      </v-list>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  props: {
    config: {
      type: Object,
      default() {
        return {
          titulo: "Sedes entidad",
          color: null,
          encabezados: [],
          itemAvatar: {
            ver: false,
            icono: null
          },
          itemAccion: {
            ver: false
          }
        };
      }
    },
    items: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    verFilaEncabezados() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return false;
        case "sm":
          return false;
        case "md":
          return true;
        case "lg":
          return true;
        case "xl":
          return true;
      }
    }
  }
};
</script>
<style>
.fila-paginacion .col {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>