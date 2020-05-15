<template>
  <v-card outlined color="#fff">
    <v-card-title>Datos Generales Entidad</v-card-title>
    <v-card-text>
      <ValidationObserver ref="formDatosEntidad" v-slot="{ validate, reset }">
        <v-form @reset.prevent="reset">
          <v-row>
            <v-col cols="7">
              <ValidationProvider v-slot="{ errors }" name="Nombre" rules="required">
                <v-text-field
                  v-model="entidad.nombre"
                  label="Nombre"
                  dense
                  :error-messages="errors"
                ></v-text-field>
              </ValidationProvider>
            </v-col>
            <v-col cols="5">
              <ValidationProvider v-slot="{ errors }" name="Representante legal" rules="required">
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
            <v-row>
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
          </v-row>
        </v-form>
      </ValidationObserver>
    </v-card-text>
  </v-card>
</template>
<script>
import {store} from "../servicios/store";

export default {
  data() {
    return {
      storeState:store.state,
      entidad: {
        nombre: "",
        representanteLegal: "",
        tipologia: []
      },
      tipologias: [
        { id: 1, nombre: "Participacion" },
        { id: 2, nombre: "Promocion" },
        { id: 3, nombre: "Difusion" },
        { id: 4, nombre: "Sensilibizacion" }
      ]
    };
  },
  methods: {
    guardarEntidad() {
      store.setEjecutarValidacion(true);
      /*
      this.$refs.formDatosEntidad.validate().then(esValido => {
        if (esValido) {
          console.log("guardar");
          
        }
      });
      */
    },
    limpiar() {
      this.$refs.formDatosEntidad.reset();
    }
  }
};
</script>