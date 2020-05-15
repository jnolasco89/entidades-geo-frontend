<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>{{textoFormulario}}</v-card-title>
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
      <lista-paginacion :datos="sedes" :config="configLista">
        <template slot="contenido" slot-scope="propiedades">
          <div v-if="propiedades.item.encabezado.index==0">
            <v-list-item-content>
              <h4 style="font-weight: 400;">{{propiedades.item.data.direccion}}</h4>
              <v-list-item-subtitle>{{propiedades.item.data.municipio.MunicipioLbl}}, {{propiedades.item.data.departamento.DepartamentoLbl}}</v-list-item-subtitle>
              <v-list-item-subtitle>Longitud: {{propiedades.item.data.coordenadas.longitud}}</v-list-item-subtitle>
              <v-list-item-subtitle>Latitud: {{propiedades.item.data.coordenadas.latitud}}</v-list-item-subtitle>
            </v-list-item-content>
          </div>
          <div v-else-if="propiedades.item.encabezado.index==1">
            <v-list dense style="padding: 0px;">
              <v-list-item
                v-for="(telefono,index) in propiedades.item.data.telefonos"
                :key="`${index}-${telefono.valor}`"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon color="indigo">mdi-phone</v-icon>
                    {{telefono.valor}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div v-else-if="propiedades.item.encabezado.index==2">
            <v-list dense style="padding: 0px;">
              <v-list-item
                v-for="(fax,index) in propiedades.item.data.faxes"
                :key="`${index}-${fax.valor}`"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon color="indigo">local_printshop</v-icon>
                    {{fax.valor}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <div v-if="propiedades.item.encabezado.index==3">
            <v-list dense style="padding: 0px;">
              <v-list-item
                v-for="(correo,index) in propiedades.item.data.correos"
                :key="`${index}-${correo.valor}`"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <v-icon color="indigo">mdi-email</v-icon>
                    {{correo.valor}}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </template>
      </lista-paginacion>
    </v-col>
    <v-col cols="12">
      <mapa v-bind:coordenadasPunto.sync="sedeActual.coordenadas"></mapa>
    </v-col>
  </v-row>
</template>
<script>
import InputTextDinamico from "../components/InputTextDinamico";
import ListaPaginacion from "../components/ListaPaginacion";
import Mapa from "../components/Mapa";
import Servicios from "../servicios/consultas";
import {store} from "../servicios/store";

const serv = new Servicios();

export default {
  components: {
    InputTextDinamico,
    ListaPaginacion,
    Mapa
  },
  mounted() {
    this.departamentos = serv.getDepartamentos();
  },
  data() {
    return {
      storeState:store.state,
      departamentos: [],
      municipios: [],
      agregandoSede: true,
      textosControles: ["Agregar Sede", "Editar Sede"],
      configLista: {
        titulo: "Lista de sedes",
        encabezados: [
          { texto: "Datos sede", ancho: 3 },
          { texto: "Telefono(s)", ancho: 2 },
          { texto: "Fax(es)", ancho: 2 },
          { texto: "Correo(s)", ancho: 5 }
        ],
        itemAvatar: {
          ver: true,
          icono: "place"
        }
      },
      sedes: [],
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
            this.sedes.push(this.sedeActual);
            this.resetSedeActual();
            this.$refs.formDatosSede.reset();
          } else {
            alert("editar");
          }
        }
      });
    },
    limpiarFormnulario() {
      this.resetSedeActual();
      this.$refs.formDatosSede.reset();
    },
    resetSedeActual() {
      this.sedeActual = {
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
      };
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
  watch:{
    'storeState.ejecutarValidacion'(){
      console.log("Cambio storeState.ejecutarValidacion");
    }
  }
};
</script>