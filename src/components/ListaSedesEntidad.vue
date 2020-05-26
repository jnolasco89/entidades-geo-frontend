<template>
  <lista-paginacion :config="configLista" :items="sedes">
    <template slot="sede" slot-scope="datos">
      <v-card outlined color="#fff">
        <v-card-text>
          <v-row justify="center" no-gutters>
            <v-col cols="3">
              <v-icon color="indigo">place</v-icon>&nbsp;Direccion:
            </v-col>
            <v-col cols="9">
              <b>{{datos.item.direccion}}</b>
              <br />
              {{datos.item.municipio.MunicipioLbl}}, {{datos.item.departamento.DepartamentoLbl}}
              <template
                v-if="datos.item.coordenadas.longitud!=null && datos.item.coordenadas.latitud!=null"
              >
                <br />
                ({{datos.item.coordenadas.longitud}}, {{datos.item.coordenadas.latitud}})
              </template>
            </v-col>
            <v-col cols="3">
              <v-icon color="indigo">mdi-phone</v-icon>&nbsp;Telefono(s)
            </v-col>
            <v-col cols="9">
              <b>
                <ul style="list-style:none;padding:0px;">
                  <li
                    v-for="(telefono,index) in datos.item.telefonos"
                    :key="`${index}-${telefono.valor}`"
                  >{{telefono.valor}}</li>
                </ul>
              </b>
            </v-col>
            <v-col cols="3">
              <v-icon color="indigo">local_printshop</v-icon>&nbsp;Fax(es)
            </v-col>
            <v-col cols="9">
              <b>
                <ul style="list-style:none;padding:0px;">
                  <li
                    v-for="(fax,index) in datos.item.faxes"
                    :key="`${index}-${fax.valor}`"
                  >{{fax.valor}}</li>
                </ul>
              </b>
            </v-col>
            <v-col cols="3">
              <v-icon color="indigo">email</v-icon>&nbsp;Correo(s)
            </v-col>
            <v-col cols="9">
              <b>
                <ul style="list-style:none;padding:0px;">
                  <li
                    v-for="(correo,index) in datos.item.correos"
                    :key="`${index}-${correo.valor}`"
                  >{{correo.valor}}</li>
                </ul>
              </b>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
    <template slot="contactos" slot-scope="datos">
      <template v-if="datos.item.contactos.length==0">
        <v-row align="start" justify="start">
          <v-col cols="1">
            <v-icon color="indigo">person</v-icon>
          </v-col>
          <v-col cols="11">
            <h2>Sin contactos registrados</h2>
          </v-col>
        </v-row>
      </template>
      <template v-for="(contacto, index) in datos.item.contactos" v-else>
        <v-card outlined color="#fff" :key="`contacto-${index}-${contacto.nombreCompleto}`">
          <v-row align="start" justify="start">
            <v-col cols="1">
              <v-icon color="indigo">person</v-icon>
            </v-col>
            <v-col cols="11">
              <v-card-text
                style="padding-top:2px;padding-bottom:2px;padding-left:5px;padding-right:5px;"
              >
                <v-row align="start" justify="start" no-gutters style="padding:0px;">
                  <v-col cols="3">Nombre</v-col>
                  <v-col cols="9">
                    <b>{{contacto.nombreCompleto}}</b>
                  </v-col>
                  <v-col cols="3">Cargo</v-col>
                  <v-col cols="9">
                    <b>{{contacto.cargo}}</b>
                  </v-col>
                  <v-col cols="3">Telefono(s)</v-col>
                  <v-col cols="9">
                    <b>
                      <ul style="list-style:none;padding:0px;">
                        <li
                          v-for="(telefono,index) in contacto.telefonos"
                          :key="`${index}-${telefono.valor}`"
                        >{{telefono.valor}}</li>
                      </ul>
                    </b>
                  </v-col>
                  <v-col cols="3">Correo(s)</v-col>
                  <v-col cols="9">
                    <b>
                      <ul style="list-style:none;padding:0px;">
                        <li
                          v-for="(correo,index) in contacto.correos"
                          :key="`${index}-${correo.valor}`"
                        >{{correo.valor}}</li>
                      </ul>
                    </b>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </template>
    <template slot="acciones" slot-scope="datos" v-if="verAcciones">
      <ul style="list-style:none;">
        <li>
          <v-btn class="ma-2" text color="primary" @click="editarSede(datos.item,datos.indexFila)">
            <v-icon left>edit</v-icon>Editar
          </v-btn>
        </li>
        <li>
          <v-btn
            class="ma-2"
            text
            color="primary"
            @click="eliminarSede(datos.item,datos.indexFila)"
          >
            <v-icon left>delete</v-icon>Eliminar
          </v-btn>
        </li>
      </ul>
    </template>
  </lista-paginacion>
</template>
<script>
import ListaPaginacion from "./ListaPaginacion";

export default {
  props: {
    sedes: {
      type: Array,
      default() {
        return [];
      }
    },
    verAcciones: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  components: {
    ListaPaginacion
  },
  methods: {
    editarSede(sede, index) {
      this.$emit("editarSede", sede, index);
    },
    eliminarSede(sede, index) {
      this.$emit("eliminarSede", sede, index);
    }
  },
  computed: {
    configLista() {
      let config = {
        titulo: "Sedes entidad",
        color: null,
        encabezados: [
          {
            nombre: "sede",
            texto: "Datos generales",
            anchos: { xs: 12, sm: 12, md: 6, lg: 6, xl: 6 }
          },
          {
            nombre: "contactos",
            texto: "Contacto(s)",
            anchos: { xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }
          }
        ],
        itemAvatar: {
          ver: false,
          icono: null
        },
        itemAccion: {
          ver: false
        }
      };

      if (this.verAcciones) {
        config.encabezados.push({
          nombre: "acciones",
          texto: "Acciones",
          anchos: { xs: 12, sm: 12, md: 2, lg: 2, xl: 2 }
        });
        config.itemAccion.ver = true;
      }

      return config;
    }
  }
};
</script>