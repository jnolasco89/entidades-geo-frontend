<template>
  <v-row justify="center" align="start">
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>Datos generales</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="8">
              <v-text-field label="Nombre votación"></v-text-field>
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
      </v-card>
    </v-col>
    <v-col cols="12">
      <v-card outlined>
        <v-card-title>Papeletas</v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-card outlined>
                <v-card-text>
                  <v-row justify="center">
                    <v-col cols="9">
                      <v-text-field label="Titulo papeleta"></v-text-field>
                    </v-col>
                    <v-col cols="9">
                      <input-text-dinamico
                        prepend-icon="check"
                        label="Opción"
                        nombre-campo="Opcion"
                        :reglas="{required:true}"
                        texto-btn-agregar="Agregar otra opción"
                        :inputs="opciones"
                        v-bind:lista.sync="opciones"
                      ></input-text-dinamico>
                     
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <div class="text-center">
                <v-btn class="ma-2" color="primary">
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
      opciones: [{ valor: null }]
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
    }
  }
};
</script>