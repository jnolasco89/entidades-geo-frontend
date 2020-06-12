<template>
  <v-alert :type="tipo" v-show="mostrar">{{mensaje}}</v-alert>
</template>
<script>
export default {
  props: {
    tipo: {
      type: String,
      default() {
        return "success";
      }
    },
    mensaje: {
      type: String,
      default() {
        return "Mensaje";
      }
    },
    tiempo: {
      type: Number,
      default() {
        return 1000;
      }
    },
    verAlert: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      mostrar: false
    };
  },
  watch: {
    verAlert(val) {
      if (val) {
        setTimeout(() => {
          this.mostrar = false;
          this.$emit('update:ver',false);
        }, this.tiempo);
      }
      this.mostrar = val;
    }
  }
};
</script>