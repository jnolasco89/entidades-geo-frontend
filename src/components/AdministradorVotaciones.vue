<template>
  <v-row justify="center" align="start">
    <v-col cols="12">
      <h1 class="text-center">Crear votación</h1>
    </v-col>
    <v-col cols="12">
      <alert-time
        tipo="success"
        :mensaje="msjAlertSuccess"
        :tiempo="5000"
        :verAlert="verAlertSuccess"
        :ver.sync="verAlertSuccess"
      ></alert-time>
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
                    ref="pickerFechaInicio"
                    v-model="verPickerFechaInicio"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <ValidationProvider
                        v-slot="{errors}"
                        name="Fecha de inicio"
                        rules="required|fecha-inicial"
                      >
                        <v-text-field
                          v-model="fechaInicioFormateada"
                          label="Fecha de inicio"
                          prepend-icon="event"
                          readonly
                          v-on="on"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker
                      v-model="fechaInicio"
                      no-title
                      scrollable
                      @input="verPickerFechaInicio=false"
                      locale="es-419"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="6">
                  <v-menu
                    ref="pickerHoraInicio"
                    v-model="verPickerHoraInicio"
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
                        name="Fecha de inicio"
                        rules="required|hora-inicial"
                      >
                        <v-text-field
                          v-model="horaInicio"
                          label="Hora de inicio"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-time-picker
                      v-if="verPickerHoraInicio"
                      v-model="horaInicio"
                      full-width
                      @click:minute="$refs.pickerHoraInicio.save(horaInicio)"
                      scrollable
                    >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="verPickerHoraInicio = false">Cancel</v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.pickerHoraInicio.save(horaInicio)"
                      >Aceptar</v-btn>
                    </v-time-picker>
                  </v-menu>
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
                        rules="required|fecha-final"
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
                        rules="required|hora-final"
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
            <v-btn class="ma-2" color="default" @click="cancelarVotacion">
              <v-icon left>clear</v-icon>Cancelar
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-tabs v-model="tab" fixed-tabs slider-color="white">
        <v-tab href="#tab-papeletas">Papeletas</v-tab>
        <v-tab href="#tab-votantes">Votantes</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item value="tab-papeletas">
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
                    <v-card-title>
                      {{index+1}}&nbsp;
                      <v-btn
                        text
                        color="error"
                        @click="quitarPapeleta(papeleta,index)"
                        v-if="index>0"
                      >
                        <v-icon left>delete</v-icon>Quitar papeleta
                      </v-btn>
                    </v-card-title>
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
                                      <vue-editor
                                        :label="`Descripción wiki opción ${indexOpcion+1}`"
                                        v-model="papeleta.opciones[indexOpcion].wiki.descripcion"
                                        :placeholder="`Ingrese aquí una breve descripción del wiki para la opción ${indexOpcion+1}.`"
                                      ></vue-editor>
                                      <!--
                                      <v-textarea
                                        no-resize
                                        outlined
                                        :label="`Descripción wiki opción ${indexOpcion+1}`"
                                        v-model="papeleta.opciones[indexOpcion].wiki.descripcion"
                                        :placeholder="`Ingrese aquí una breve descripción del wiki para la opción ${indexOpcion+1}.`"
                                      ></v-textarea>
                                      -->
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
        </v-tab-item>
        <v-tab-item value="tab-votantes">
          <v-card outlined>
            <v-card-subtitle>Datos Votante</v-card-subtitle>
            <v-card-text>
              <ValidationObserver ref="formDatosVotante" v-slot="{ validate, reset }">
                <form @reset.prevent="reset" @keydown.enter="agregarVotante">
                  <v-row>
                    <v-col cols="6">
                      <ValidationProvider v-slot="{errors}" name="Nombre" rules="required">
                        <v-text-field
                          label="nombre"
                          ref="nombreVotante"
                          v-model="votanteActual.nombre"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="6">
                      <ValidationProvider v-slot="{errors}" name="Correo" rules="required|email">
                        <v-text-field
                          label="correo"
                          v-model="votanteActual.correo"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                    <v-col cols="6">
                      <ValidationProvider v-slot="{errors}" name="usuario" rules="required">
                        <v-text-field
                          label="usuario"
                          v-model="votanteActual.usuario"
                          :error-messages="errors"
                        ></v-text-field>
                      </ValidationProvider>
                    </v-col>
                  </v-row>
                </form>
              </ValidationObserver>
            </v-card-text>
            <v-card-actions>
              <div class="text-center" style="width:100%">
                <v-btn color="primary" @click="agregarVotante">
                  <v-icon left>check</v-icon>Agregar
                </v-btn>
                <v-btn color="default" @click="cancelarVotante">
                  <v-icon left>clear</v-icon>Cancelar
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
          <lista-paginacion :config="configListaVotantes" :items="votantes">
            <template slot="nombre" slot-scope="datos">{{datos.item.nombre}}</template>
            <template slot="usuario" slot-scope="datos">{{datos.item.usuario}}</template>
            <template slot="correo" slot-scope="datos">{{datos.item.correo}}</template>
            <template slot="acciones" slot-scope="datos">
              <v-btn class="ma-2" icon color="primary" @click="eliminarVotante(datos.indexFila)">
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn
                class="ma-2"
                icon
                color="primary"
                @click="editarVotante(datos.item, datos.indexFila)"
              >
                <v-icon>edit</v-icon>
              </v-btn>
            </template>
          </lista-paginacion>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>
<script>
import Servicios from "../servicios/consultas";
import { extend } from "vee-validate";
import AlertTime from "./AlertTime";
import ListaPaginacion from "./ListaPaginacion";
import { VueEditor } from "vue2-editor";

const serv = new Servicios();

export default {
  mounted() {
    extend("fecha-inicial", value => {
      if (value != null) {
        let fechaActual = new Date();
        fechaActual.setHours(0, 0, 0, 0);
        let [dia, mes, anio] = value.split("/");
        let fechaInicial = new Date(`${anio}/${mes}/${dia}`);
        fechaInicial.setHours(0, 0, 0, 0);

        if (fechaInicial.getTime() - fechaActual.getTime() >= 0) {
          return true;
        } else {
          return "La fecha de inicio debe ser mayor o igual a la fecha actual";
        }
      }
      return false;
    });

    extend("fecha-final", value => {
      let [anioI, mesI, diaI] = this.fechaInicio.split("-");
      let fechaInicial = new Date(`${anioI}/${mesI}/${diaI}`);
      fechaInicial.setHours(0, 0, 0, 0);
      let [diaF, mesF, anioF] = value.split("/");
      let fechaFinal = new Date(`${anioF}/${mesF}/${diaF}`);
      fechaFinal.setHours(0, 0, 0, 0);

      if (fechaFinal.getTime() - fechaInicial.getTime() >= 0) {
        return true;
      } else {
        return "La fecha de vencimiento debe ser mayor o igual a la fecha inicial";
      }

      return false;
    });

    extend("hora-inicial", value => {
      if (value != null) {
        let fechaYhoraActual = new Date();
        let [anioI, mesI, diaI] = this.fechaInicio.split("-");
        let fechaYhoraInicio = new Date(`${anioI}/${mesI}/${diaI}`);
        let [horaI, minutosI] = value.split(":");
        fechaYhoraInicio.setHours(horaI * 1, minutosI * 1, 0, 0);

        let diferencia =
          fechaYhoraInicio.getTime() - fechaYhoraActual.getTime();

        if (diferencia >= this.intervalo) {
          return true;
        } else {
          return "La hora de inicio debe ser como minimo una hora mayor a la hora actual";
        }
      }

      return false;
    });

    extend("hora-final", value => {
      if (value != null) {
        let [anioI, mesI, diaI] = this.fechaInicio.split("-");
        let [horaI, minutosI] = this.horaInicio.split(":");
        let fechaYhoraInicial = new Date(`${anioI}/${mesI}/${diaI}`);
        fechaYhoraInicial.setHours(horaI * 1, minutosI * 1, 0, 0);
        let [anioF, mesF, diaF] = this.fechaVencimiento.split("-");
        let [horaF, minutosF] = value.split(":");
        let fechaYhoraFinal = new Date(`${anioF}/${mesF}/${diaF}`);
        fechaYhoraFinal.setHours(horaF * 1, minutosF * 1, 0, 0);

        let diferencia =
          fechaYhoraFinal.getTime() - fechaYhoraInicial.getTime();
        let intervalo = 3600000;

        if (diferencia >= intervalo) {
          return true;
        } else {
          return "La hora de vencimiento debe ser como minimo una hora mayor a la hora de inicio";
        }
      }

      return false;
    });
  },
  components: {
    AlertTime,
    ListaPaginacion,
    VueEditor
  },
  data() {
    return {
      intervalo: 60 * 60 * 1000,
      indexVotante: null,
      nombreVotacion: null,
      fechaInicio: new Date().toISOString().substr(0, 10),
      fechaInicioFormateada: this.formatearFecha(
        new Date().toISOString().substr(0, 10)
      ),
      fechaVencimiento: new Date().toISOString().substr(0, 10),
      fechaVencimientoFormateada: this.formatearFecha(
        new Date().toISOString().substr(0, 10)
      ),
      verPickerFechaInicio: false,
      verPickerHoraInicio: false,
      verPickerFechaVencimiento: false,
      verPickerHoraVencimiento: false,
      horaInicio: null,
      horaVencimiento: null,
      msjAlertSuccess: null,
      verAlertSuccess: false,
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
      erroresVotacion: null,
      tab: null,
      configListaVotantes: {
        titulo: "Votantes",
        color: null,
        encabezados: [
          {
            nombre: "nombre",
            texto: "nombre",
            anchos: { xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }
          },
          {
            nombre: "usuario",
            texto: "Usuario",
            anchos: { xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }
          },
          {
            nombre: "correo",
            texto: "Correo",
            anchos: { xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }
          },
          {
            nombre: "acciones",
            texto: "Acciones",
            anchos: { xs: 12, sm: 12, md: 2, lg: 2, xl: 2 }
          }
        ],
        itemAvatar: {
          ver: false
        }
      },
      votantes: [],
      votanteActual: {
        nombre: null,
        correo: null,
        usuario: null
      }
    };
  },
  watch: {
    fechaVencimiento(val) {
      this.fechaVencimientoFormateada = this.formatearFecha(
        this.fechaVencimiento
      );
    },
    fechaInicio(val) {
      this.fechaInicioFormateada = this.formatearFecha(this.fechaInicio);
    }
  },
  methods: {
    cancelarVotacion() {
      this.verAlertSuccess = true;
    },
    formatearFecha(fecha) {
      if (!fecha) return null;
      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },
    agregarVotante() {
      this.$refs.formDatosVotante.validate().then(esValido => {
        if (esValido && this.indexVotante == null) {
          this.votantes.push(this.votanteActual);
        } else if (esValido && this.indexVotante != null) {
          if (this.votantes.length == 0) {
            this.votantes.push(this.votanteActual);
          } else {
            this.votantes[this.indexVotante].nombre = this.votanteActual.nombre;
            this.votantes[this.indexVotante].correo = this.votanteActual.correo;
            this.votantes[
              this.indexVotante
            ].usuario = this.votanteActual.usuario;
          }
        }

        this.votanteActual = {
          nombre: null,
          correo: null,
          usuario: null
        };
        this.indexVotante = null;
        this.$refs.formDatosVotante.reset();
        this.$nextTick(() => {
          this.$refs.nombreVotante.$el.focus();
        });
      });
    },
    eliminarVotante(index) {
      this.votantes.splice(index, 1);
    },
    cancelarVotante() {
      this.votanteActual = {
        nombre: null,
        correo: null,
        usuario: null
      };
      this.indexVotante = null;
    },
    editarVotante(votante, index) {
      this.votanteActual.nombre = votante.nombre;
      this.votanteActual.usuario = votante.usuario;
      this.votanteActual.correo = votante.correo;
      this.indexVotante = index;
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
    quitarPapeleta(papeleta, indexPapeleta) {
      this.papeletas.splice(indexPapeleta, 1);
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
            horaInicio: this.horaInicio,
            fechaInicio: this.fechaInicio,
            fechaVencimiento: this.fechaVencimientoFormateada,
            horaVencimiento: this.horaVencimiento,
            papeletas: this.papeletas,
            votantes: this.votantes
          };

          serv.agregarVotacion(votación).then(r => {
            this.msjAlertSuccess = `Se agregó la votación: "${this.nombreVotacion}"`;
            this.verAlertSuccess = true;
            //this.limpiarFormulario();
          });
        }
      });
    },
    limpiarFormulario() {
      this.tab = null;
      this.nombreVotacion = null;
      this.fechaInicio = new Date().toISOString().substr(0, 10);
      this.fechaInicioFormateada = this.formatearFecha(
        new Date().toISOString().substr(0, 10)
      );
      this.fechaVencimient = new Date().toISOString().substr(0, 10);
      this.fechaVencimientoFormateada = this.formatearFecha(
        new Date().toISOString().substr(0, 10)
      );
      this.verPickerFechaInicio = false;
      this.verPickerHoraInicio = false;
      this.verPickerFechaVencimiento = false;
      this.verPickerHoraVencimiento = false;
      this.horaInicio = null;
      this.horaVencimiento = null;
      this.papeletas = [
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
      ];
      this.indicesAlertsPapeletasError = [false];
      this.verErroresVotacion = false;
      this.erroresVotacion = null;
      this.$refs.formDatosVotacion.reset();
      this.votanteActual = {
        nombre: null,
        usuario: null,
        correo: null
      };
      this.votantes = [];
      let papeletas = this.$refs["formDatosPapeleta"];

      papeletas.forEach((papeleta, index) => {
        papeleta.reset();
      });
    }
  }
};
</script>