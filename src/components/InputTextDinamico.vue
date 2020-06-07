<template>
  <ul style="list-style: none;padding:0px;">
    <li v-for="(input, index) in listaInputs" v-bind:key="index">
      <ValidationProvider v-slot="{ errors }" :name="`${nombreCampo}-${index+1}`" :rules="reglas">
        <template v-if="mascara==null">
          <v-text-field
            :prepend-inner-icon="prependIcon"
            :label="`${label} ${index+1}`"
            v-model="input.valor"
            :error-messages="errors"
          >
            <template v-slot:append-outer v-if="index>0">
              <v-icon @click="eliminarInput(index)">clear</v-icon>
            </template>
          </v-text-field>
          <slot name="extra" v-bind="{index,input}">
          </slot>
        </template>
        <template v-else-if="mascara!=null">
          <v-text-field
            :prepend-inner-icon="prependIcon"
            :label="`${label} ${index+1}`"
            v-model="input.valor"
            :error-messages="errors"
            v-mask="mascara"
          >
            <template v-slot:append-outer v-if="index>0">
              <v-icon @click="eliminarInput(index)">clear</v-icon>
            </template>
          </v-text-field>
          <slot name="extra" v-bind="{index}">
          </slot>
        </template>
      </ValidationProvider>
      <v-btn
        text
        x-small
        color="primary"
        @click="agregarInput"
        v-if="index+1==listaInputs.length"
      >{{textoBtnAgregar}}</v-btn>
    </li>
  </ul>
</template>
<script>
export default {
  name: "InputTextDinamico",
  mounted() {
    this.$emit("update:lista", this.listaInputs);
  },
  props: {
    prependIcon: {
      type: String,
      default() {
        return "";
      }
    },
    label: {
      type: String,
      default() {
        return "Parametro";
      }
    },
    textoBtnAgregar: {
      type: String,
      default() {
        return "Agregar";
      }
    },
    nombreCampo: {
      type: String,
      default() {
        return "Input";
      }
    },
    reglas: {
      type: Object,
      default() {
        return null;
      }
    },
    mascara: {
      type: String,
      default() {
        return null;
      }
    },
    inputs: {
      type: Array,
      default() {
        return [{ valor: null }];
      }
    }
  },
  data() {
    return {
      //listaInputs: [{ valor: null }],
    };
  },
  methods: {
    eliminarInput(index) {
      this.listaInputs.splice(index, 1);
    },
    agregarInput() {
      this.listaInputs.push({ valor: null });
    }
  },
  computed: {
    listaInputs() {
      return this.inputs;
    }
  },
  watch: {
    listaInputs(valor) {
      this.$emit("update:lista", valor);
    }
  }
};
</script>