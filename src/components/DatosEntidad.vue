<template>
  <v-card outlined>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-card outlined color="#fff">
            <v-card-title>Datos Generales Entidad</v-card-title>
            <v-card-text>
              <ValidationObserver ref="formDatosEntidad" v-slot="{ validate, reset }">
                <v-form @reset.prevent="reset">
                  <v-row>
                    <v-col cols="12">
                      <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                        <v-text-field
                          v-model="entidad.nombre"
                          label="Nombre"
                          dense
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider
                        v-slot="{ errors }"
                        name="Representante legal"
                        rules="required"
                      >
                        <v-text-field
                          v-model="entidad.representanteLegal"
                          label="Representante legal"
                          dense
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="12">
                      <ValidationProvider v-slot="{ errors }" name="Tipologia" rules="required">
                        <v-select
                          v-model="entidad.tipologia"
                          :items="tipologias"
                          label="Tipologia entidad"
                          dense
                          multiple
                          chips
                          item-text="nombre"
                          item-value="id"
                          return-object
                          :error-messages="errors"
                        ></v-select>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </v-form>
              </ValidationObserver>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <lista-sedes-entidad
            :sedes="entidad.sedes"
            :ver-acciones="true"
            v-on:editarSede="editarSede"
            v-on:eliminarSede="eliminarSede"
          ></lista-sedes-entidad>
        </v-col>
        <v-col cols="12">
          <div class="text-center">
            <v-btn class="ma-2" color="primary" @click="guardarEntidad">
              <v-icon left>check</v-icon>Guardar entidad
            </v-btn>
            <v-btn class="ma-2" color="default" @click="limpiar">
              <v-icon left>clear</v-icon>Cancelar
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script>
import { store } from "../servicios/store";
import Servicios from "../servicios/consultas";
import ListaSedesEntidad from "../components/ListaSedesEntidad";

const serv = new Servicios();

export default {
  components: {
    ListaSedesEntidad
  },
  mounted() {
    this.entidad = store.state.entidad;
    this.cargaInicial();
  },
  data() {
    return {
      storeState: store.state,
      entidad: {
        nombre: null,
        representanteLegal: null,
        tipologia: [],
        sedes: []
      },
      tipologias: [],
      configLista2: {
        titulo: "Sedes entidad",
        color: "#fff",
        encabezados: [
          {
            nombre: "sede",
            texto: "Datos generales",
            anchos: { xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }
          },
          {
            nombre: "contactos",
            texto: "Contacto(s)",
            anchos: { xs: 12, sm: 12, md: 5, lg: 5, xl: 5 }
          },
          {
            nombre: "acciones",
            texto: "Acciones",
            anchos: { xs: 12, sm: 12, md: 2, lg: 2, xl: 2 }
          }
        ],
        itemAvatar: {
          ver: false,
          icono: null
        },
        itemAccion: {
          ver: false
        }
      }
    };
  },
  methods: {
    guardarEntidad() {
      //store.setEjecutarValidacion(true);
      this.$refs.formDatosEntidad.validate().then(esValido => {
        if (esValido) {
          console.log("guardar");
        }
      });
    },
    editarEntidad(entidad) {
      console.log("Entidad desde datosEntidad: " + JSON.stringify(entidad));
    },
    editarSede(sede, index) {
      let s = JSON.parse(JSON.stringify(sede));
      store.setSede(s);
      store.setIndiceSede(index);
    },
    eliminarSede(sede, index) {
      store.eliminarSedeEntidad(index);
      store.resetSede();
    },
    limpiar() {
      this.$refs.formDatosEntidad.reset();
    },
    async cargaInicial() {
      await serv.getCatalogo("tipologias").then(res => {
        this.tipologias = res.data;
      });
    }
  }
  /*
  watch: {
    "storeState.sede"(valor) {
      console.log("Cambio sedes");
      //this.sedeActual = this.storeState.entidad;
      //this.agregandoSede = false;
    }
  }
  */
};
</script>