<template>
  <v-row justify="center" align="start">
    <v-col cols="12">
      <h1 class="text-center">Crear votación</h1>
    </v-col>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>Datos generales</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-text-field label="Nombre votación" prepend-icon="rule"></v-text-field>
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
                  <v-text-field
                    v-model="fechaVencimientoFormateada"
                    label="Fecha de vencimiento"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="fechaVencimiento"
                  no-title
                  scrollable
                  @input="verPickerFechaVencimiento=false"
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
                  <v-text-field
                    v-model="horaVencimiento"
                    label="Hora de vencimiento"
                    prepend-icon="access_time"
                    readonly
                    v-on="on"
                  ></v-text-field>
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
        </v-card-text>
        <v-card-actions>
          <div class="text-center" style="width:100%;">
            <v-btn class="ma-2" color="primary">
              <v-icon left>check</v-icon>
              Guardar
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
                <v-card-text>
                  <v-row justify="center">
                    <v-col cols="9">
                      <v-text-field label="Titulo papeleta" v-model="papeleta.titulo"></v-text-field>
                    </v-col>
                    <v-col cols="9">
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
                    </v-col>
                  </v-row>
                </v-card-text>
                <hr>
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

export default {
  components: {
    InputTextDinamico
  },
  data() {
    return {
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
          opciones: [{ valor: null, foto: null }]
        }
      ]
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
    agregarPapeleta() {
      this.papeletas.push({
        titulo: null,
        opciones: [{ valor: null, foto: null }]
      });
    }
  }
};
</script>