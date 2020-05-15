import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);

const opciones={
    theme: {
        themes: {
          light: {
            primary: '#9c27b0',
            secondary: '#03a9f4',
            accent: '#4caf50',
            error: '#ff5252',
            warning: '#fb8c00',
            info: '#8bc34a',
            success: '#2196f3'
          },
        },
      },
};

export default new Vuetify(opciones);
