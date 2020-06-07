<template>
  <v-row justify="center" align="start">
    <v-col cols="12">
      <h1 class="text-center">Crear votación</h1>
    </v-col>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>Datos generales</v-card-title>
        <v-card-text>
          <ValidationObserver ref="formDatosVotacion" v-slot="{ validate, reset }">
            <form @reset.prevent="reset">
              <v-row>
                <v-col cols="8">
                  <ValidationProvider v-slot="{errors}" name="Nombre votación" rules="required">
                    <v-text-field
                      label="Nombre votación"
                      v-model="nombreVotacion"
                      prepend-icon="rule"
                      :error-messages="errors"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="pickerFechaVencimiento"
                    v-model="verPickerFechaVencimiento"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <ValidationProvider
                        v-slot="{errors}"
                        name="Fecha de vencimiento"
                        rules="required|fecha-futura"
                      >
                        <v-text-field
                          v-model="fechaVencimientoFormateada"
                          label="Fecha de vencimiento"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="fechaVencimiento"
                      no-title
                      scrollable
                      @input="verPickerFechaVencimiento=false"
                      locale="es-419"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="pickerHoraVencimiento"
                    v-model="verPickerHoraVencimiento"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <ValidationProvider
                        v-slot="{errors}"
                        name="Fecha de vencimiento"
                        rules="required|hora-futura"
                      >
                        <v-text-field
                          v-model="horaVencimiento"
                          label="Hora de vencimiento"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-time-picker
                      v-if="verPickerHoraVencimiento"
                      v-model="horaVencimiento"
                      full-width
                      @click:minute="$refs.pickerHoraVencimiento.save(horaVencimiento)"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="verPickerHoraVencimiento = false">Cancel</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.pickerHoraVencimiento.save(horaVencimiento)"
                      >Aceptar</v-btn>
                    </v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </form>
          </ValidationObserver>
        </v-card-text>
        <v-card-actions>
          <div class="text-center" style="width:100%;">
            <v-alert
              type="error"
              v-show="verErroresVotacion"
            >Se encontraron errores en las papeletas.</v-alert>
            <v-btn class="ma-2" color="primary" @click="guardarVotacion">
              <v-icon left>check</v-icon>Guardar
            </v-btn>
            <v-btn class="ma-2" color="default">
              <v-icon left>clear</v-icon>Cancelar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>Papeletas</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-card
                outlined
                v-for="(papeleta, index) in papeletas"
                v-bind:key="`papeleta-${index}`"
                style="margin-top:10px;"
              >
                <v-card-title>{{index+1}}</v-card-title>
                <v-card-text>
                  <ValidationObserver ref="formDatosPapeleta" v-slot="{ validate, reset }">
                    <form @reset.prevent="reset">
                      <v-row justify="center">
                        <v-col cols="12" v-show="indicesAlertsPapeletasError[index]">
                          <v-alert type="error">Debe agregar dos o más opciones a la papeleta</v-alert>
                        </v-col>
                        <v-col cols="9">
                          <ValidationProvider
                            v-slot="{errors}"
                            name="Titulo papeleta"
                            rules="required"
                          >
                            <v-text-field
                              label="Titulo papeleta"
                              v-model="papeleta.titulo"
                              :error-messages="errors"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="9">
                          <h3>Opciones papeleta:</h3>
                          <v-card
                            outlined
                            color="#fff"
                            v-for="(opcion,indexOpcion) in papeleta.opciones"
                            v-bind:key="`opcion-${index}-${indexOpcion}`"
                          >
                            <h3>Opción&nbsp;{{indexOpcion+1}}</h3>
                            <v-btn
                              text
                              color="error"
                              v-if="indexOpcion>0"
                              @click="quitarOpcion(papeleta,indexOpcion)"
                            >
                              <v-icon left>delete</v-icon>
                              Quitar opción&nbsp;{{indexOpcion+1}}
                            </v-btn>
                            <v-card-text>
                              <v-row>
                                <v-col cols="12">
                                  <ValidationProvider
                                    v-slot="{errors}"
                                    :name="`Opción ${indexOpcion+1}`"
                                    rules="required"
                                  >
                                    <v-text-field
                                      :label="`Opción ${indexOpcion+1}`"
                                      :error-messages="errors"
                                      v-model="papeleta.opciones[indexOpcion].nombre"
                                    ></v-text-field>
                                  </ValidationProvider>
                                </v-col>
                                <v-col cols="9">
                                  <v-text-field
                                    :label="`Titulo wiki opción ${indexOpcion+1}`"
                                    v-model="papeleta.opciones[indexOpcion].wiki.titulo"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="3">
                                  <v-file-input
                                    accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera"
                                    v-model="papeleta.opciones[indexOpcion].foto"
                                    :label="`Foto opción ${indexOpcion+1}`"
                                  ></v-file-input>
                                </v-col>
                                <v-col cols="12">
                                  <v-textarea
                                    no-resize
                                    outlined
                                    :label="`Descripción wiki opción ${indexOpcion+1}`"
                                    v-model="papeleta.opciones[indexOpcion].wiki.descripcion"
                                    :placeholder="`Ingrese aquí una breve descripción del wiki para la opción ${indexOpcion+1}.`"
                                  ></v-textarea>
                                </v-col>
                              </v-row>
                            </v-card-text>
                          </v-card>
                          <v-btn text color="primary" @click="agregarOpcion(papeleta,index)">
                            <v-icon left>add</v-icon>Agregar otra opción
                          </v-btn>
                          <!--
                          <input-text-dinamico
                            prepend-icon="check"
                            label="Opción"
                            nombre-campo="Opcion"
                            :reglas="{required:true}"
                            texto-btn-agregar="Agregar otra opción"
                            :inputs="papeleta.opciones"
                            v-bind:lista.sync="papeleta.opciones"
                          >
                            <template slot="extra" slot-scope="datos">
                              <v-row>
                                <v-col cols="6">
                                  <v-file-input
                                    v-model="datos.input.foto"
                                    accept="image/png, image/jpeg, image/bmp"
                                    prepend-icon="mdi-camera"
                                    :label="`Foto opción ${datos.index+1}`"
                                  ></v-file-input>
                                </v-col>
                              </v-row>
                            </template>
                          </input-text-dinamico>
                          -->
                        </v-col>
                      </v-row>
                    </form>
                  </ValidationObserver>
                </v-card-text>
                <hr />
              </v-card>
            </v-col>
            <v-col cols="12">
              <div class="text-center">
                <v-btn class="ma-2" color="primary" @click="agregarPapeleta">
                  <v-icon left>add</v-icon>Agregar otra papeleta
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
import InputTextDinamico from "./InputTextDinamico";
import { extend } from "vee-validate";

export default {
  mounted() {
    extend("fecha-futura", value => {
      if (value != null) {
        let fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        let [dia, mes, anio] = value.split("/");
        let fechaFutura = new Date(`${anio}/${mes}/${dia}`);
        fechaFutura.setHours(0, 0, 0, 0);

        if (fechaFutura >= fechaActual) {
          return true;
        } else {
          return "La fecha de vencimiento debe ser mayor o igual a la fecha actual";
        }
      }
      return false;
    });

    extend("hora-futura", value => {
      //DOnde 0 es 24 horas.
      if (value != null) {
        let fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        let [dia, mes, anio] = this.fechaVencimientoFormateada.split("/");
        let fechaFutura = new Date(`${anio}/${mes}/${dia}`);
        fechaFutura.setHours(0, 0, 0, 0);

        if (fechaFutura.getTime() == fechaActual.getTime()) {
          fechaActual = new Date();
          let [horaFutura, minutosFuturos] = value.split(":");
          fechaFutura.setHours(horaFutura * 1, minutosFuturos * 1, 0, 0);

          let diferencia =
            (fechaFutura.getTime() - fechaActual.getTime()) / 60000;
          if (diferencia >= 60) {
            return true;
          } else {
            return "La hora de vencimiento debe ser mayor como mínimo una hora";
          }
        } else {
          return true;
        }
      }
    });
  },
  components: {
    InputTextDinamico
  },
  data() {
    return {
      nombreVotacion: null,
      fechaVencimiento: new Date().toISOString().substr(0, 10),
      fechaVencimientoFormateada: this.formatearFecha(
        new Date().toISOString().substr(0, 10)
      ),
      verPickerFechaVencimiento: false,
      verPickerHoraVencimiento: false,
      horaVencimiento: null,
      papeletas: [
        {
          titulo: null,
          opciones: [
            {
              valor: null,
              nombre: null,
              foto: null,
              wiki: { titulo: null, descripcio: null }
            }
          ]
        }
      ],
      indicesAlertsPapeletasError: [false],
      verErroresVotacion: false,
      erroresVotacion: null
    };
  },
  watch: {
    fechaVencimiento(val) {
      this.fechaVencimientoFormateada = this.formatearFecha(
        this.fechaVencimiento
      );
    }
  },
  methods: {
    formatearFecha(fecha) {
      if (!fecha) return null;
      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },
    agregarOpcion(papeleta, indexPapeleta) {
      papeleta.opciones.push({
        valor: null,
        nombre: null,
        foto: null,
        wiki: { titulo: null, descripcion: null }
      });
      this.indicesAlertsPapeletasError.push(false);
    },
    quitarOpcion(papeleta, indexOpcion) {
      papeleta.opciones.splice(indexOpcion, 1);
      this.indicesAlertsPapeletasError.splice(indexOpcion, 1);
    },
    agregarPapeleta() {
      this.papeletas.push({
        titulo: null,
        opciones: [
          {
            valor: null,
            nombre: null,
            foto: null,
            wiki: { titulo: null, descripcio: null }
          }
        ]
      });
      this.indicesAlertsPapeletasError.push(false);
    },
    async validarFormVotacion() {
      let esValido = await this.$refs.formDatosVotacion
        .validate()
        .then(esValido => {
          return esValido;
        });

      return esValido;
    },
    async validarPapeleta(papeleta) {
      let respuesta = await papeleta.validate().then(esValido => {
        return esValido;
      });

      return respuesta;
    },
    validarPapeletas() {
      let papeletas = this.$refs["formDatosPapeleta"];
      let errores = 0;

      papeletas.forEach((papeleta, index) => {
        if (this.papeletas[index].opciones.length < 2) {
          this.indicesAlertsPapeletasError[index] = true;
          errores++;
        } else {
          this.indicesAlertsPapeletasError[index] = false;
        }

        let esValida = this.validarPapeleta(papeleta);
        if (!esValida) {
          errores++;
        }
      });

      if (errores > 0) {
        this.verErroresVotacion = true;
        return false;
      }
      return true;
    },
    guardarVotacion() {
      let papeletasValidas = this.validarPapeletas();
      this.validarFormVotacion().then(formVotacionValido => {
        if (formVotacionValido && papeletasValidas) {
          let votación = {
            nombre: this.nombreVotacion,
            fechaVencimiento: this.fechaVencimientoFormateada,
            horaVencimiento: this.horaVencimiento,
            papeletas: this.papeletas
          };

          console.log(JSON.stringify(votación));
        }
      });
    }
  }
};
</script>