<template>
  <v-dialog v-model="verModal" max-width="50%" persistent>
    <v-card>
      <v-card-title class="headline" primary-title>Agregar entidades</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <ValidationObserver ref="observer" v-slot="{ validate, reset }">
              <form>
                <ValidationProvider v-slot="{ errors }" name="archivo" rules="required">
                  <v-file-input
                    v-model="archivo"
                    :error-messages="errors"
                    label="Seleccione un archivo"
                    accept=".xlsx"
                    required
                  ></v-file-input>
                </ValidationProvider>

                <div class="text-center" v-show="verCargandoArchivo">
                  Subiendo archivo...
                  <v-progress-linear color="secondary" indeterminate rounded height="6"></v-progress-linear>
                </div>
                <v-btn color="primary" style="margin-top:10px;" @click="subirArchivo">
                  <v-icon left>arrow_upward</v-icon>Subir
                </v-btn>
              </form>
            </ValidationObserver>
          </v-col>
        </v-row>
        <v-divider class="mx-4"></v-divider>
        <v-row>
          <v-col cols="12">
            <v-card outlined v-show="!verDatosLeidos">
              <v-card-title>Reglas de lectura</v-card-title>
              <v-card-text>
                Para que se realice correctamente la lectura del archivo seguir las siguientes reglas:
                <v-list>
                  <v-list-item-group>
                    <v-list-item v-for="(regla,indice) in reglasLectura" :key="indice" inactive>
                      <v-list-item-icon>
                        <v-icon>done</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>{{regla}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-card>
            <v-card outlined v-show="verDatosLeidos">
              <v-card-title>Datos leidos</v-card-title>
              <v-card-text>
                Se leyeron
                <b>{{datosLeidos.length}}</b> datos del documento.
                <v-data-table :headers="encabezados" :items="datosLeidos" hide-default-footer>
                  <template v-slot:no-data>
                    <v-btn color="primary">Sin datos</v-btn>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="cerrarModalLeerDocumento">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
    props:{
        verModal:{
            type:Boolean,
            default(){
                return false;
            }
        }
    },
  data() {
    return {
      coordenadas: null,
      archivo: null,
      datosLeidos: [],
      verDatosLeidos: false,
      verCargandoArchivo: false,
      reglasLectura: [
        "Unicamente se podrán procesar archivos de Excel (.xlsx, xls)",
        "Se leera solamente la primer hoja del libro de excel",
        "La estructura obligatoria de los datos deberá ser la siguiente:"
      ],
      encabezados: [
        { text: "Nombre", align: "start", sortable: "false", value: "nombre" },
        {
          text: "Longitud",
          align: "start",
          sortable: "false",
          value: "longitud"
        },
        {
          text: "Latitud",
          align: "start",
          sortable: "false",
          value: "latitud"
        }
      ]
    };
  },
  methods: {
    subirArchivo() {
      let self = this;
      this.$refs.observer.validate().then(esValido => {
        if (esValido) {
          this.verCargandoArchivo = true;
          serv
            .subirArchivo(this.archivo)
            .then(respuesta => {
              let datos = respuesta.data;
              self.datosLeidos = respuesta.data;

              self.verDatosLeidos = true;
              this.archivo = null;
              this.$refs.observer.reset();
            })
            .catch(error => {})
            .finally(() => {
              this.verCargandoArchivo = false;
            });
        }
      });
    },
    cerrarModalLeerDocumento() {
      this.verModal = false;
      this.$refs.observer.reset();
      this.archivo = null;
      this.verDatosLeidos = false;
    }
  },
  computed: {
    encabezadosConActions() {
      let encabezadosConActions = [
        ...this.encabezados,
        { text: "Acciones", sortable: "false", value: "actions" }
      ];
      return encabezadosConActions;
    }
  }
};
</script>