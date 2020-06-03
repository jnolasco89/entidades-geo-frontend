<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Ingreso</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <ValidationObserver ref="formLogin" v-slot="{ validate, reset }">
                  <v-form @reset.prevent="reset">
                    <ValidationProvider v-slot="{ errors }" name="usuario" rules="required">
                      <v-text-field
                        label="Usuario"
                        name="usuario"
                        prepend-icon="person"
                        type="text"
                        v-model="usuario"
                        @keyup.enter="login"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                    <ValidationProvider v-slot="{ errors }" name="contraseña" rules="required">
                      <v-text-field
                        id="password"
                        label="Contraseña"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        v-model="password"
                        @keyup.enter="login"
                        :error-messages="errors"
                      ></v-text-field>
                    </ValidationProvider>
                  </v-form>
                </ValidationObserver>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Ingresar</v-btn>
              </v-card-actions>
            </v-card>
            <br />
            <v-alert :value="verError" type="error">{{msjError}}</v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-dialog v-model="cargando" persistent width="300">
      <v-card color="success" dark>
        <v-card-text>
          <h4>Autenticando...</h4>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import Consultas from "../servicios/consultas";

const serv = new Consultas();

export default {
  data() {
    return {
      usuario: null,
      password: null,
      cargando: false,
      verError: false,
      msjError: null
    };
  },
  methods: {
    login() {
      this.$refs.formLogin.validate().then(esValido => {
        if (esValido) {
          this.cargando = true;
          serv
            .login(this.usuario, this.password)
            .then(respuesta => {
              alert("COrrio");
              this.$router.replace({ name: "Home" });
            })
            .catch(error => {
              if (error.response == undefined || error.response == null) {
                this.verError = true;
                this.msjError = "No se puede conectar con el servidor";
              } else if (error.response.status == 401) {
                this.verError = true;
                this.msjError = error.response.data;
              } else {
                this.verError = true;
                this.msjError = "Ocurrió un error";
              }
            })
            .finally(() => {
              this.cargando = false;
            });
        }
      });
    }
  }
};
</script>