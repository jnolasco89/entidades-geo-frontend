<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>{{textoFormulario}}</v-card-title>
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
      <lista-paginacion :datos="contactos" :config="configLista">
        <template slot="contenido" slot-scope="propiedades">
          <div v-if="propiedades.item.encabezado.index==0">
            <v-list-item-content>
              <h4 style="font-weight: 400;">{{propiedades.item.data.nombreCompleto}}</h4>
              <v-list-item-subtitle>{{propiedades.item.data.cargo}}</v-list-item-subtitle>
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
          <div v-if="propiedades.item.encabezado.index==2">
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
  </v-row>
</template>
<script>
import InputTextDinamico from "../components/InputTextDinamico";
import ListaPaginacion from "../components/ListaPaginacion";

export default {
  components: {
    InputTextDinamico,
    ListaPaginacion
  },
  data() {
    return {
      prueba: null,
      agregandoContacto: true,
      textosControles: ["Agregar Contacto", "Editar Contacto"],
      configLista: {
        titulo: "Lista de contactos",
        encabezados: [
          { texto: "Datos personales", ancho: 5 },
          { texto: "Telefono(s)", ancho: 2 },
          { texto: "Fax(es)", ancho: 5 }
        ],
        itemAvatar: {
          ver: true,
          icono: "person"
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
          if (this.guardarContacto) {
            let nombreCompleto = this.crearNombreCompleto();
            this.contactoActual.nombreCompleto = nombreCompleto;
            this.contactos.push(this.contactoActual);
            this.resetContactoActual();
            this.$refs.formDatosContacto.reset();
          } else {
            alert("editar");
          }
        }
      });
    },
    limpiarFormnulario() {
      this.resetContactoActual();
      this.$refs.formDatosContacto.reset();
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
        (this.contactoActual.segundoNombre = !null
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
  }
};
</script>