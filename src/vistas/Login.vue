<template>
  <v-app id="inspire">
    <v-main>
      <v-container
        class="fill-height"
        fluid
        :style="`background-image:url(${fondo});background-size: cover;`"
      >
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4" lg="5" xl="5">
            <v-card class="elevation-20" height="500">
              <v-row no-gutters align="center" class="fill-height">
                <v-col cols="3" class="fill-height">
                  <div class="gradiante" style="height:100%;position:relative">
                    <v-img :src="logoConna" style="position:absolute;top:50%;margin-top:-50%;"></v-img>
                  </div>
                </v-col>
                <v-col cols="9" class="text-center pl-0">
                  <ValidationObserver ref="formLogin" v-slot="{ validate, reset }">
                    <v-form @reset.prevent="reset">
                      <v-row justify="center">
                        <v-col cols="9">
                          <ValidationProvider v-slot="{ errors }" name="usuario" rules="required">
                            <v-text-field
                              label="Usuario"
                              name="usuario"
                              ref="txtUsuario"
                              prepend-icon="person"
                              type="text"
                              v-model="usuario"
                              @keyup.enter="login"
                              :error-messages="errors"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="9">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="contraseña"
                            rules="required"
                          >
                            <v-text-field
                              id="password"
                              label="Contraseña"
                              name="password"
                              prepend-icon="lock"
                              :type="verPassword ? 'text' : 'password'"
                              v-model="password"
                              @keyup.enter="login"
                              :error-messages="errors"
                              :append-icon="verPassword ? 'mdi-eye' : 'mdi-eye-off'"
                              @click:append="verPassword = !verPassword"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                        <v-col cols="12">
                          <div class="text-center" style="width:100%">
                            <v-btn color="primary" @click="login" rounded>
                              Ingresar
                              <v-icon right>arrow_forward</v-icon>
                            </v-btn>
                          </div>
                        </v-col>
                      </v-row>
                    </v-form>
                  </ValidationObserver>
                </v-col>
              </v-row>
              <!--
              <v-card-text style="border:solid 1px blue;" class="fill-height">
              
              
                <ValidationObserver ref="formLogin" v-slot="{ validate, reset }">
                  <v-form @reset.prevent="reset" style="border:solid 1px red;">
                    <v-row justify="center">
                      <v-col cols="9">
                        <ValidationProvider v-slot="{ errors }" name="usuario" rules="required">
                          <v-text-field
                            label="Usuario"
                            name="usuario"
                            ref="txtUsuario"
                            prepend-icon="person"
                            type="text"
                            v-model="usuario"
                            @keyup.enter="login"
                            :error-messages="errors"
                          ></v-text-field>
                        </ValidationProvider>
                      </v-col>
                      <v-col cols="9">
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
                      </v-col>
                      <v-col cols="12">
                        <div class="text-center" style="width:100%">
                          <v-btn color="secondary" @click="login" rounded>
                            Ingresar
                            <v-icon right>arrow_forward</v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-form>
                </ValidationObserver>
                
              </v-card-text>
              -->
            </v-card>
            <br />
            <v-alert :value="verError" type="error">{{msjError}}</v-alert>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

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
import imagenFondo from "../assets/fondoLogin4.jpg";
import logoConna from "../assets/logo-conna-transparente-sin-texto.png";

const serv = new Consultas();

export default {
  mounted() {
    this.$refs.txtUsuario.$el.focus();
  },
  data() {
    return {
      usuario: null,
      password: null,
      cargando: false,
      verError: false,
      msjError: null,
      fondo: imagenFondo,
      logoConna: logoConna,
      verPassword: false
    };
  },
  methods: {
    login() {
      this.$refs.formLogin.validate().then(esValido => {
        if (esValido) {
          let votacion = this.$route.params.votacion;
          this.cargando = true;
          if (votacion != undefined ? votacion != null : false) {
            serv
              .loginVotacion(this.usuario, this.password, votacion)
              .then(respuesta => {
                localStorage.setItem(
                  "usuario",
                  JSON.stringify(respuesta.data.usuario)
                );
                localStorage.setItem("t", respuesta.data.token);
                this.$router.replace({ name: "HojaVotacion" });
              })
              .catch(error => {
                console.log(error);
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
          } else {
            serv
              .loginHome(this.usuario, this.password)
              .then(respuesta => {
                localStorage.setItem(
                  "usuario",
                  JSON.stringify(respuesta.data.usuario)
                );
                localStorage.setItem("t", respuesta.data.token);
                this.$router.replace({ name: "Home" });
              })
              .catch(error => {
                console.log(error);
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
        }
      });
    }
  }
};
</script>
<style>
.gradiante {
  background-image: linear-gradient(
    141deg,
    #9fb8ad 0%,
    #1fc8db 51%,
    #2cb5e8 75%
  );
}
</style>