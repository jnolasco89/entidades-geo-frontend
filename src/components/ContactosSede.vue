<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-text>
          <ValidationObserver ref="formDatosContacto" v-slot="{ validate, reset }">
            <form @reset.prevent="reset">
              <v-row>
                <v-col cols="12">
                  <div class="overline mb-4">Nombre de persona de contacto</div>
                </v-col>
                <v-col cols="4">
                  <ValidationProvider v-slot="{ errors }" name="Primer Nombre" rules="required">
                    <v-text-field
                      label="Primer nombre"
                      v-model="contactoActual.primerNombre"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Segundo nombre" v-model="contactoActual.segundoNombre"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Tercer nombre" v-model="contactoActual.tercerNombre"></v-text-field>
                </v-col>
                <v-col cols="4">
                  <ValidationProvider v-slot="{errors}" name="Primer Apellido" rules="required">
                    <v-text-field
                      label="Primer apellido"
                      v-model="contactoActual.primerApellido"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <v-text-field label="Segundo apellido" v-model="contactoActual.segundoApellido"></v-text-field>
                </v-col>
                <v-col cols="12">
                  <div class="overline mb-4">Datos laborales</div>
                </v-col>
                <v-col cols="4">
                  <ValidationProvider v-slot="{errors}" name="Cargo" rules="required">
                    <v-text-field
                      label="Cargo"
                      v-model="contactoActual.cargo"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="4">
                  <input-text-dinamico
                    prepend-icon="alternate_email"
                    label="Correo electronico"
                    nombre-campo="Correo"
                    :reglas="{required:true, email:true}"
                    texto-btn-agregar="Agregar otro correo"
                    :inputs="contactoActual.correos"
                    v-bind:lista.sync="contactoActual.correos"
                  ></input-text-dinamico>
                </v-col>
                <v-col cols="4">
                  <input-text-dinamico
                    prepend-icon="phone"
                    label="Telefono"
                    nombre-campo="Telefono"
                    :reglas="{required:true, regex:/^(2|6|7)[0-9]{3}-[0-9]{4}$/}"
                    mascara="####-####"
                    texto-btn-agregar="Agregar otro telefono"
                    :inputs="contactoActual.telefonos"
                    v-bind:lista.sync="contactoActual.telefonos"
                  ></input-text-dinamico>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <div class="text-center">
                    <v-btn class="ma-2" color="primary" @click="guardarContacto">
                      <v-icon left>check</v-icon>
                      {{textoBtnFormulario}}
                    </v-btn>
                    <v-btn class="ma-2" color="default" @click="limpiarFormnulario">
                      <v-icon left>clear</v-icon>Cancelar
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </form>
          </ValidationObserver>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12">
      <lista-paginacion :config="configLista" :items="contactos">
        <template slot="datosPersonales" slot-scope="datos">
          <v-card-text
            style="padding-top:2px;padding-bottom:2px;padding-left:5px;padding-right:5px;"
          >
            <v-row align="start" justify="start" no-gutters style="padding:0px;">
              <v-col cols="3">Nombre</v-col>
              <v-col cols="9">
                <b>{{datos.item.nombreCompleto}}</b>
              </v-col>
              <v-col cols="3">Cargo</v-col>
              <v-col cols="9">
                <b>{{datos.item.cargo}}</b>
              </v-col>
            </v-row>
          </v-card-text>
        </template>
        <template slot="telefonos" slot-scope="datos">
          <v-row align="start" justify="start" no-gutters>
            <v-col cols="2">
              <v-icon color="indigo">mdi-phone</v-icon>
            </v-col>
            <v-col cols="10">
              <b>
                <ul style="list-style:none;padding:0px;">
                  <li
                    v-for="(telefono,index) in datos.item.telefonos"
                    :key="`${index}-${telefono.valor}`"
                    style="padding-top:2px;padding-bottom:2px;"
                  >{{telefono.valor}}</li>
                </ul>
              </b>
            </v-col>
          </v-row>
        </template>
        <template slot="correos" slot-scope="datos">
          <v-row align="start" justify="start" no-gutters>
            <v-col cols="2">
              <v-icon color="indigo">email</v-icon>
            </v-col>
            <v-col cols="10">
              <b>
                <ul style="list-style:none;padding:0px;">
                  <li
                    v-for="(correo,index) in datos.item.correos"
                    :key="`${index}-${correo.valor}`"
                    style="padding-top:2px;padding-bottom:2px;"
                  >{{correo.valor}}</li>
                </ul>
              </b>
            </v-col>
          </v-row>
        </template>
        <template slot="acciones" slot-scope="datos">
          <ul style="list-style:none;padding:0px;">
            <li>
              <v-btn
                class="ma-2"
                text
                color="primary"
                @click="editarContacto(datos.item,datos.indexFila)"
              >
                <v-icon left>edit</v-icon>Editar
              </v-btn>
            </li>
            <li>
              <v-btn
                class="ma-2"
                text
                color="primary"
                @click="eliminarContacto(datos.item,datos.indexFila)"
              >
                <v-icon left>delete</v-icon>Eliminar
              </v-btn>
            </li>
          </ul>
        </template>
      </lista-paginacion>
    </v-col>
  </v-row>
</template>
<script>
import InputTextDinamico from "../components/InputTextDinamico";
import ListaPaginacion from "../components/ListaPaginacion";
import { store } from "../servicios/store";

export default {
  components: {
    InputTextDinamico,
    ListaPaginacion
  },
  mounted() {
    this.contactos = this.storeState.sede.contactos;
  },
  data() {
    return {
      storeState: store.state,
      prueba: null,
      agregandoContacto: true,
      indiceContaco: null,
      textosControles: ["Agregar Contacto", "Editar Contacto"],
      configLista: {
        titulo: "Sedes entidad",
        color: "#fff",
        encabezados: [
          {
            nombre: "datosPersonales",
            texto: "Datos personales",
            anchos: { xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }
          },
          {
            nombre: "telefonos",
            texto: "Telefono(s)",
            anchos: { xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }
          },
          {
            nombre: "correos",
            texto: "Correo(s)",
            anchos: { xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }
          },
          {
            nombre: "acciones",
            texto: "Acciones",
            anchos: { xs: 12, sm: 12, md: 2, lg: 2, xl: 2 }
          }
        ],
        itemAvatar: {
          ver: true,
          icono: "person"
        },
        itemAccion: {
          ver: true
        }
      },
      contactoActual: {
        primerNombre: null,
        segundoNombre: null,
        tercerNombre: null,
        primerApellido: null,
        segundoApellido: null,
        cargo: null,
        correos: [{ valor: null }],
        telefonos: [{ valor: null }]
      },
      contactos: []
    };
  },
  methods: {
    guardarContacto() {
      this.$refs.formDatosContacto.validate().then(esValido => {
        if (esValido) {
          if (this.agregandoContacto) {
            let nombreCompleto = this.crearNombreCompleto();
            this.contactoActual.nombreCompleto = nombreCompleto;
            store.agregarContactoSede(this.contactoActual);
            //this.contactos.push(this.contactoActual);
            this.resetContactoActual();
            this.$refs.formDatosContacto.reset();
          } else {
            //Seteando los nuevos valores
            this.contactos[
              this.indiceContaco
            ].primerNombre = this.contactoActual.primerNombre;
            this.contactos[
              this.indiceContaco
            ].segundoNombre = this.contactoActual.segundoNombre;
            this.contactos[
              this.indiceContaco
            ].tercerNombre = this.contactoActual.tercerNombre;
            this.contactos[
              this.indiceContaco
            ].primerApellido = this.contactoActual.primerApellido;
            this.contactos[
              this.indiceContaco
            ].segundoApellido = this.contactoActual.segundoApellido;
            this.contactos[
              this.indiceContaco
            ].nombreCompleto = this.crearNombreCompleto();
            this.contactos[
              this.indiceContaco
            ].cargo = this.contactoActual.cargo;
            this.contactos[
              this.indiceContaco
            ].correos = this.contactoActual.correos;
            this.contactos[
              this.indiceContaco
            ].telefonos = this.contactoActual.telefonos;

            //Reseteando los demas campos
            this.resetContactoActual();
            this.agregandoContacto = true;
            this.indiceContaco = null;
            this.$refs.formDatosContacto.reset();
          }
        }
      });
    },
    limpiarFormnulario() {
      this.resetContactoActual();
      this.agregandoContacto = true;
      this.$refs.formDatosContacto.reset();
    },
    limpiarTodo() {
      this.limpiarFormnulario();
      this.contactos = [];
    },
    resetContactoActual() {
      this.contactoActual = {
        primerNombre: null,
        segundoNombre: null,
        tercerNombre: null,
        primerApellido: null,
        segundoApellido: null,
        cargo: null,
        correos: [{ valor: null }],
        telefonos: [{ valor: null }]
      };
    },
    crearNombreCompleto() {
      return (
        this.contactoActual.primerNombre +
        (this.contactoActual.segundoNombre != null
          ? " " + this.contactoActual.segundoNombre
          : "") +
        (this.contactoActual.tercerNombre != null
          ? " " + this.contactoActual.tercerNombre
          : "") +
        (this.contactoActual.primerApellido = !null
          ? " " + this.contactoActual.primerApellido
          : "") +
        (this.contactoActual.segundoApellido != null
          ? " " + this.contactoActual.segundoApellido
          : "")
      );
    },
    editarContacto(contacto, indexFila) {
      this.agregandoContacto = false;
      this.indiceContaco = indexFila;
      /*
      Se tiene que realizar un clon del objeto contenido en un indice del array porque si no se realiza entonces
      se esta trabajando con un objeto por referencia y no con un objeto por valor, y al momento de editar
      los cambios se muestran instantaneamente en el array.
      */
      let clonObjEnArray = JSON.parse(
        JSON.stringify(this.contactos[indexFila])
      );
      this.contactoActual = clonObjEnArray;
    },
    eliminarContacto(contacto, index) {
      store.eliminarContactoSede(index);
      //this.contactos.splice(index,1)
    }
  },
  computed: {
    textoFormulario() {
      return this.agregandoContacto
        ? this.textosControles[0]
        : this.textosControles[1];
    },
    textoBtnFormulario() {
      return this.agregandoContacto
        ? this.textosControles[0]
        : this.textosControles[1];
    }
  },
  watch: {
    "storeState.sede"(valor) {
      this.contactos=this.storeState.sede.contactos;
      /*
      this.contactos = JSON.parse(
        JSON.stringify(this.storeState.sede.contactos)
      );
      */
    }
  }
};
</script>