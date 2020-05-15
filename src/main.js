// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import vuetify from './vuetifyConfig'
import {ValidationObserver, ValidationProvider, localize, extend} from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import es from 'vee-validate/dist/locale/es.json'
import { VueMaskDirective } from 'v-mask'
Vue.directive('mask', VueMaskDirective);

Vue.config.productionTip = false

// install rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize('es',es);
Vue.component('ValidationObserver',ValidationObserver);
Vue.component('ValidationProvider',ValidationProvider);

/* eslint-disable no-new */
new Vue({
  vuetify,

  render: h => h(App)
}).$mount('#app')
