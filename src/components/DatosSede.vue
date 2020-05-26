<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-text>
          <ValidationObserver ref="formDatosSede" v-slot="{ validate, reset }">
            <v-form @reset.prevent="reset">
              <v-row>
                <v-col cols="6">
                  <ValidationProvider v-slot="{errors}" name="Departamento" rules="required">
                    <v-select
                      :items="departamentos"
                      label="Seleccione un departamento"
                      item-text="DepartamentoLbl"
                      item-value="DepartamentoID"
                      v-model="sedeActual.departamento"
                      return-object
                      :error-messages="errors"
                      @change="cargarMunicipios"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider v-slot="{errors}" name="Municipio" rules="required">
                    <v-select
                      :items="municipios"
                      label="Seleccione un municipio"
                      item-text="MunicipioLbl"
                      item-value="MUN_ID"
                      v-model="sedeActual.municipio"
                      no-data-text="Debe seleccionar un departamento"
                      return-object
                      :error-messages="errors"
                    ></v-select>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12">
                  <ValidationProvider v-slot="{errors}" name="Direccion" rules="required">
                    <v-textarea
                      auto-grow
                      label="Direccion"
                      rows="1"
                      v-model="sedeActual.direccion"
                      :error-messages="errors"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Longitud"
                    :rules="{regex:/^-?[1-9]{1}[0-9]{0,}.[0-9]{1,}$/}"
                  >
                    <v-text-field
                      label="Longitud"
                      v-model="sedeActual.coordenadas.longitud"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <ValidationProvider
                    v-slot="{ errors }"
                    name="Latitud"
                    :rules="{regex:/^-?[1-9]{1}[0-9]{0,}.[0-9]{1,}$/}"
                  >
                    <v-text-field
                      label="Latitud"
                      v-model="sedeActual.coordenadas.latitud"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <input-text-dinamico
                    prepend-icon="phone"
                    label="Telefono"
                    nombre-campo="Telefono"
                    :reglas="{required:true, regex:/^(2|6|7)[0-9]{3}-[0-9]{4}$/}"
                    mascara="####-####"
                    texto-btn-agregar="Agregar otro telefono"
                    :inputs="sedeActual.telefonos"
                    v-bind:lista.sync="sedeActual.telefonos"
                  ></input-text-dinamico>
                </v-col>
                <v-col cols="4">
                  <input-text-dinamico
                    prepend-icon="local_printshop"
                    label="Fax"
                    nombre-campo="Fax"
                    :reglas="{required:true}"
                    texto-btn-agregar="Agregar otro fax"
                    :inputs="sedeActual.faxes"
                    v-bind:lista.sync="sedeActual.faxes"
                  ></input-text-dinamico>
                </v-col>
                <v-col cols="4">
                  <input-text-dinamico
                    prepend-icon="alternate_email"
                    label="Correo electronico"
                    nombre-campo="Correo"
                    :reglas="{required:true, email:true}"
                    texto-btn-agregar="Agregar otro correo"
                    :inputs="sedeActual.correos"
                    v-bind:lista.sync="sedeActual.correos"
                  ></input-text-dinamico>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="text-center">
                    <v-btn class="ma-2" color="primary" @click="guardarSede">
                      <v-icon left>check</v-icon>
                      {{textoBtnFormulario}}
                    </v-btn>
                    <v-btn class="ma-2" color="default" @click="limpiarFormnulario">
                      <v-icon left>clear</v-icon>Cancelar
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <!--
      <mapa v-bind:coordenadasPunto.sync="sedeActual.coordenadas" :config="configMapa" :coordenadas="sedeActual.coordenadas"></mapa>
      -->
      <mapa :config="configMapa" :coordenadas="sedeActual.coordenadas"></mapa>
    </v-col>
  </v-row>
</template>
<script>
import InputTextDinamico from "../components/InputTextDinamico";
import Mapa from "../components/Mapa";
import Servicios from "../servicios/consultas";
import { store } from "../servicios/store";
import Vue from "vue";

const serv = new Servicios();
const eventBus = new Vue();

export default {
  components: {
    InputTextDinamico,
    Mapa
  },
  mounted() {
    this.sedeActual = store.state.sede;

    this.departamentos = serv.getDepartamentos();
  },
  data() {
    return {
      storeState: store.state,
      departamentos: [],
      municipios: [],
      agregandoSede: true,
      textosControles: ["Agregar Sede", "Editar Sede"],
      sedeActual: {
        departamento: null,
        municipio: null,
        direccion: null,
        coordenadas: {
          longitud: null,
          latitud: null
        },
        telefonos: [{ valor: null }],
        faxes: [{ valor: null }],
        correos: [{ valor: null }]
      },
      configMapa: {
        alto: "900px",
        eventBus: eventBus
      }
    };
  },
  methods: {
    cargarMunicipios() {
      this.municipios = serv.getMunicipios(
        this.sedeActual.departamento.DepartamentoID
      );
    },
    guardarSede() {
      this.$refs.formDatosSede.validate().then(esValido => {
        if (esValido) {
          if (this.agregandoSede) {
            //Para agregar una nueva sede
            //this.sedes.push(this.sedeActual);
            store.agregarSedeEntidad(
              JSON.parse(JSON.stringify(this.sedeActual))
            );
            this.resetSedeActual();
            this.$refs.formDatosSede.reset();
          } else {
            //Para editar una sede ya agregada
            store.setSedeEnArrayEntidad(
              store.state.indiceSede,
              JSON.parse(JSON.stringify(this.sedeActual))
            );

            this.resetSedeActual();
            this.$refs.formDatosSede.reset();
          }

          //Reseteando mapa
          eventBus.$emit("resetMapa");
        }
      });
    },
    limpiarFormnulario() {
      this.resetSedeActual();
      this.$refs.formDatosSede.reset();
    },
    resetSedeActual() {
      store.setSede({
        departamento: null,
        municipio: null,
        direccion: null,
        coordenadas: {
          longitud: null,
          latitud: null
        },
        telefonos: [{ valor: null }],
        faxes: [{ valor: null }],
        correos: [{ valor: null }],
        contactos: []
      });
      this.sedeActual = this.storeState.sede;
    }
  },
  computed: {
    textoFormulario() {
      return this.agregandoSede
        ? this.textosControles[0]
        : this.textosControles[1];
    },
    textoBtnFormulario() {
      return this.agregandoSede
        ? this.textosControles[0]
        : this.textosControles[1];
    }
  },
  watch: {
    "storeState.sede"(valor) {
      this.sedeActual = this.storeState.sede;

      if (
        this.sedeActual.departamento != null &&
        this.sedeActual.municipio != null
      ) {
        this.agregandoSede = false;
      } else {
        this.agregandoSede = true;
        this.$refs.formDatosSede.reset();
        eventBus.$emit("resetMapa");
      }
      //this.agregandoSede=false;
    }
  }
};
</script>