<template>
  <v-app>
    <v-app-bar app color="#f5f5f5" elevation="0">
      <v-btn text color="primary" @click="siguientePapeleta" v-if="papeletas.length>1">
        <v-icon left>keyboard_arrow_left</v-icon>Papeleta anterior
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="ml-0 pl-4 text-center">
        <v-skeleton-loader
          v-if="iniciandoData"
          ref="skeleton"
          :boilerplate="false"
          type="button"
          :tile="false"
          id="btn-titulo"
        ></v-skeleton-loader>
        <span v-else class="hidden-sm-and-down">
          <h2>{{papeletaActual.titulo}}</h2>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="siguientePapeleta" v-if="papeletas.length>1">
        Siguiente papeleta
        <v-icon right>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container class="pa-12 grey lighten-4" fluid fill-height v-if="iniciandoData">
        <v-row class="fill-height" justify="center">
          <v-col cols="12">
            <div class="text-center" style="padding-top:20px;">
              <v-skeleton-loader ref="skeleton" :boilerplate="false" type="button" :tile="false"></v-skeleton-loader>
            </div>
          </v-col>
          <v-col cols="8">
            <v-card height="100%">
              <v-card-text>
                <v-row justify="space-around">
                  <v-col v-for="i in 4" :key="i" cols="auto">
                    <v-skeleton-loader
                      ref="skeleton"
                      :boilerplate="false"
                      type="text"
                      :tile="false"
                    ></v-skeleton-loader>
                    <v-skeleton-loader
                      ref="skeleton"
                      :boilerplate="false"
                      type="image"
                      :tile="false"
                      height="200"
                      width="200"
                    ></v-skeleton-loader>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="4">
            <v-card height="100%">
              <v-card-text>
                <v-skeleton-loader
                  id="panel-opciones"
                  ref="skeleton"
                  :boilerplate="false"
                  type="article"
                  :tile="false"
                  v-for="i in 3"
                  v-bind:key="i"
                ></v-skeleton-loader>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
      <v-carousel cycle :hide-delimiters="true" :show-arrows="false" height="100%" v-else>
        <v-carousel-item v-for="(papeleta, i) in papeletas" :key="i">
          <v-container class="pa-12 grey lighten-4" fluid fill-height v-if="!papeleta.marcada">
            <v-row align="start">
              <v-col cols="12">
                <v-row align="start">
                  <v-col cols="12">
                    <div class="text-center" style="padding-top:20px;">
                      <v-btn color="primary" @click="votar" rounded elevation="24" large>
                        <v-icon left>done</v-icon>Votar
                      </v-btn>
                    </div>
                  </v-col>
                  <v-col cols="8">
                    <v-card min-height="530" color="#fff" elevation="12">
                      <v-card-title class="justify-center" style="color:black;">Candidatos</v-card-title>
                      <v-card-text>
                        <v-row justify="space-around">
                          <v-col v-for="opcion in papeleta.opciones" :key="opcion.id" cols="auto">
                            <h4 class="text-center" style="color:black;">{{opcion.nombre}}</h4>
                            <v-card
                              :elevation="3"
                              height="200"
                              width="200"
                              style="margin:0px auto;position:relative;"
                              @click="seleccionarContendiente(opcion)"
                            >
                              <v-img
                                :src="`http://localhost:8082/descargar/${opcion.nombreFoto}`"
                                width="100%"
                                height="100%"
                              ></v-img>
                              <v-img
                                id="img-equis"
                                :src="equis"
                                width="100%"
                                height="100%"
                                style="position: absolute;top: 0px;"
                                v-if="verEquis && opcion.valor==opcionSelecionada.valor"
                              ></v-img>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-col>
                  <v-col cols="4">
                    <v-card
                      max-height="530"
                      min-height="530"
                      style="overflow-y:auto;"
                      color="#fff"
                      elevation="12"
                    >
                      <v-card-title class="justify-center" style="color:black;">{{tituloWiki}}</v-card-title>
                      <v-card-text>
                        <div v-show="verEquis" style="color:black;">
                          <h3>{{opcionSelecionada.wiki.titulo}}</h3>
                          <div v-html="`${opcionSelecionada.wiki.descripcion}`"></div>
                        </div>
                        <div v-show="!verEquis" style="color:black;">
                          <p>Esta es una papeleta de votación donde se muestran las diferentes propuestas de elección.</p>
                          <p>Indicaciones:</p>
                          <v-list color="#fff">
                            <v-list-item>
                              <v-list-item-icon>
                                <v-icon style="color:black;">check</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <p
                                  style="color:black;"
                                >Puede hacer clic sobre una propuesta de elección para seleccionarla.</p>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-icon>
                                <v-icon style="color:black;">check</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <p
                                  style="color:black;"
                                >Una vez seleccionada la propuesta se mostrará en este panel una breve descripción sobre esta.</p>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-icon>
                                <v-icon style="color:black;">check</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <p
                                  style="color:black;"
                                >Puede cambiar su elección haciendo clic nuevamente sobre otra propuesta. Esto lo puede realizar para ver la descripción de cada una de las opciones contendientes.</p>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item>
                              <v-list-item-icon>
                                <v-icon style="color:black;">check</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <p style="color:black;">
                                  Una vez esté seguro sobre su elección deberá hacer clic sobre el botón
                                  <b>"Votar"</b>. Una vez confirmada la votación esta ya no podrá ser modificada.
                                </p>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
          <v-container fluid class="pa-12 grey lighten-4" fill-height v-if="papeleta.marcada">
            <v-row align="start" justify="center">
              <v-card outlined>
                <v-card-title class="justify-center">Voto ya emitido para esta elección</v-card-title>
                <v-card-text>
                  <v-row justify="center">
                    <v-col cols="12">
                      <h3 class="text-center">Usted votó por</h3>
                    </v-col>
                    <v-col cols="12">
                      <v-card outlined color="#fff">
                        <v-card-title class="justify-center">{{papeleta.opcionSeleccionada.nombre}}</v-card-title>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12">
                              <v-img
                                :src="`http://localhost:8082/descargar/${papeleta.opcionSeleccionada.foto}`"
                                style="margin: 0px auto;"
                                width="200"
                                height="250"
                              ></v-img>
                            </v-col>
                            <v-col cols="12">
                              <p
                                style="width:50%;margin:0px auto;"
                              >{{papeleta.opcionSeleccionada.wiki.descripcion}}</p>
                            </v-col>
                          </v-row>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-row>
          </v-container>
        </v-carousel-item>
      </v-carousel>
    </v-main>
    <v-dialog v-model="cargando" persistent width="300">
      <v-card color="success" dark>
        <v-card-text>
          <h4>Cargando...</h4>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogConfirmarVoto" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Confirmar voto</v-card-title>
        <v-card-text>
          <p style="font-size:16px;">
            ¿Está seguro de votar por el candidato
            <b>{{opcionSelecionada.nombre}}</b>?.
          </p>
          <p style="font-size:16px;">Una vez enviado el voto, este ya no podrá ser modificado.</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="enviarVoto">Aceptar</v-btn>
          <v-btn color="default darken-1" text @click="dialogConfirmarVoto = false">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogInformacion" persistent max-width="350">
      <v-card>
        <v-card-title class="headline">No se puede enviar el voto</v-card-title>
        <v-card-text>Debe seleccionar un candidato para poder envar el voto.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="dialogInformacion = false">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import foto from "../assets/logo-conna-transparente.png";
import equisVoto from "../assets/equisVoto.png";
import Servicios from "../servicios/consultas";

const serv = new Servicios();

export default {
  mounted() {
    this.cargaInicial().then(() => {
      this.cargando = false;
      this.iniciandoData=false;
    });
  },
  beforeMount() {},
  data() {
    return {
      cargando: true,
      iniciandoData: true,
      indexPapeletaActual: 0,
      papeletas: [],
      papeletaActual: {},
      equis: equisVoto,
      verEquis: false,
      tituloWiki: "Indicaciones",
      dialogConfirmarVoto: false,
      dialogInformacion: false,
      opcionSelecionada: {
        wiki: {
          titulo: null,
          descripcion: null
        }
      },
      votacion:null
    };
  },
  methods: {
    async cargaInicial() {
      let usuario = JSON.parse(localStorage.getItem("usuario"));
      let respuesta = await serv.getVotacion(usuario.votacion).then(r => {
        this.votacion = r.data;
        this.papeletas = this.votacion.papeletas;
        this.papeletaActual = this.votacion.papeletas[0];
      });
    },
    seleccionarContendiente(opcion) {
      this.opcionSelecionada = opcion;
      this.verEquis = true;
      this.tituloWiki = "Candidato";
    },
    votar() {
      if (
        this.opcionSelecionada.valor != undefined
          ? this.opcionSelecionada.valor > 0
          : false
      ) {
        this.dialogConfirmarVoto = true;
      } else {
        this.dialogInformacion = true;
      }
    },
    siguientePapeleta() {
      this.indexPapeletaActual++;
      this.papeletaActual = this.papeletas[this.indexPapeletaActual];
      this.opcionSelecionada = {
        wiki: {
          titulo: null,
          descripcion: null
        }
      };
      this.verEquis = false;
      this.tituloWiki = "Indicaciones";
    },
    enviarVoto() {
      //alert(this.opcionSelecionada.valor);
      let usuario = JSON.parse(localStorage.getItem("usuario"));
      serv.enviarVoto(this.votacion.id,this.votacion.token,this.papeletaActual.id,this.opcionSelecionada.valor,usuario.usuario)
      //alert(t);
      /*
      this.dialogConfirmarVoto = false;
      this.papeletas[this.indexPapeletaActual].marcada = true;
      this.papeletas[
        this.indexPapeletaActual
      ].opcionSeleccionada = this.opcionSelecionada;
      this.papeletaActual = this.papeletas[this.indexPapeletaActual];
      this.papeletaActual.opcionSeleccionada = this.opcionSelecionada;
      */
    }
  }
};
</script>
<style >
.v-skeleton-loader__button {
  margin: 0 auto;
  width: 110px;
}

.v-toolbar__title {
  width: 100%;
}

#btn-titulo .v-skeleton-loader__button {
  width: 100%;
}
</style>