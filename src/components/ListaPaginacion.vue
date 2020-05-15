<template>
  <v-card outlined>
    <v-card-title>{{config.titulo}}</v-card-title>
    <v-card-text>
      <v-list dense>
        <template v-if="datos.length==0">
          <v-list-item>
            <v-list-item-content>
              <v-alert type="info">
                Sin datos que mostrar
              </v-alert>
            </v-list-item-content>
          </v-list-item>
        </template>
        <template v-for="(dato, index) in datos" v-else-if="datos.length>0">
          <v-divider :key="`divider-${index}`" inset="inset"></v-divider>
          <v-list-item :key="`listitem-${index}`">
            <v-list-item-avatar v-if="config.itemAvatar.ver">
              <v-icon>{{config.itemAvatar.icono}}</v-icon>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-row no-gutters>
                <v-col
                  :cols="encabezado.ancho"
                  v-for="(encabezado, index) in config.encabezados"
                  :key="`columna-${encabezado.valor}-${index}`"
                >
                  <v-list-item-title>{{encabezado.texto}}</v-list-item-title>
                  <v-list-item-content>
                    <slot
                      name="contenido"
                      v-bind:item="{encabezado:{index:index,texto:encabezado.texto},data:dato}"
                    >{{dato}}</slot>
                  </v-list-item-content>
                </v-col>
              </v-row>
            </v-list-item-content>
            <v-divider vertical></v-divider>
            <v-list-item-action>
              <v-btn icon>
                <v-icon>edit</v-icon>
              </v-btn>
            </v-list-item-action>
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
          titulo: "Lista",
          encabezados: [
            { texto: "Datos personales", valor: "datosPersonales", ancho: 5 },
            { texto: "Telefono(s)", valor: "telefonos", ancho: 2 },
            { texto: "Correo(s)", valor: "correos", ancho: 5 }
          ],
          itemAvatar: {
            ver: true,
            icono: "person"
          }
        };
      }
    },
    datos: {
      type: Array,
      default() {
        return [];
      }
    },
    methods: {
      editarItem: function() {
        alert("clic");
        //alert(JSON.stringify(item));
        //this.$emit('editarItem',item);
      }
    }
  }
};
</script>