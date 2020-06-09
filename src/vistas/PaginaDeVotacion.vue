<template>
  <v-app>
    <v-app-bar absolute color="#f5f5f5" elevation="0">
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-toolbar-title>
        <h1 style="text-align:center;">{{papeletaActual.titulo}}</h1>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="siguientePapeleta">
        Siguiente papeleta
        <v-icon right>keyboard_arrow_right</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container fluid class="pa-12 grey lighten-4" fill-height v-if="!papeletaActual.marcada">
        <v-row>
          <v-col cols="12">
            <div class="text-center" style="padding-top:20px;">
              <v-btn color="primary" @click="votar">
                <v-icon left>done</v-icon>Votar
              </v-btn>
            </div>
          </v-col>
          <v-col cols="8">
            <v-card outlined min-height="530">
              <v-card-title class="justify-center">Candidatos</v-card-title>
              <v-card-text>
                <v-row justify="space-around">
                  <v-col
                    v-for="opcion in papeletaActual.opciones"
                    :key="opcion.id"
                    cols="auto"
                  >
                    <h4 class="text-center">{{opcion.nombre}}</h4>
                    <v-card
                      :elevation="3"
                      height="200"
                      width="200"
                      style="margin:0px auto;position:relative;"
                      @click="seleccionarContendiente(opcion)"
                    >
                      <v-img :src="`http://localhost:8082/descargar/${opcion.nombreFoto}`" width="100%" height="100%"></v-img>
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
            <v-card outlined max-height="530" min-height="530" style="overflow-y:auto;">
              <v-card-title class="justify-center">{{tituloWiki}}</v-card-title>
              <v-card-text >
                <div v-show="verEquis">
                  <h3>{{opcionSelecionada.wiki.titulo}}</h3>
                  <p>{{opcionSelecionada.wiki.descripcion}}</p>
                </div>
                <div v-show="!verEquis">
                  <p>Esta es una papeleta de votación donde se muestran las diferentes propuestas de elección.</p>
                  <p>Indicaciones:</p>
                  <v-list>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>check</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <p>Puede hacer clic sobre una propuesta de elección para seleccionarla.</p>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>check</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <p>Una vez seleccionada la propuesta se mostrará en este panel una breve descripción sobre esta.</p>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>check</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <p>Puede cambiar su elección haciendo clic nuevamente sobre otra propuesta. Esto lo puede realizar para ver la descripción de cada una de las opciones contendientes.</p>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon>
                        <v-icon>check</v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <p>
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
      </v-container>
      <v-container fluid class="pa-12 grey lighten-4" fill-height v-if="papeletaActual.marcada">
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
                    <v-card-title
                      class="justify-center"
                    >{{papeletaActual.opcionSeleccionada.nombre}}</v-card-title>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <v-img
                            :src="papeletaActual.opcionSeleccionada.foto"
                            style="margin: 0px auto;"
                            width="200"
                            height="250"
                          ></v-img>
                        </v-col>
                        <v-col cols="12">
                          <p
                            style="width:50%;margin:0px auto;"
                          >{{papeletaActual.opcionSeleccionada.wiki.descripcion}}</p>
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
    </v-content>

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

const serv=new Servicios();

export default {
  mounted(){
    serv.getVotacion('Z7qTArO4AZNocboJ4KM5').then(r=>{
      let votacion=r.data;
      this.papeletaActual=votacion.papeletas[0];
    });
  },
  beforeMount() {
    this.papeletaActual = this.papeletas[0];
  },
  data() {
    return {
      indexPapeletaActual: 0,
      papeletas: [
        {
          id: 1,
          titulo: "Elección de Alcaldes periodo 2020 - 2022",
          marcada: false,
          opcionSeleccionada: null,
          opcionMarcada: null,
          opcionesVotacion: [
            {
              id: 1,
              nombre: "José Edgardo Edgardo Nolasco Rordriguez",
              foto: foto,
              wiki: {
                titulo: "Titulo wiki",
                descripcion:
                  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
              }
            },
            {
              id: 2,
              nombre: "José Edgardo Edgardo Nolasco Rordriguez",
              foto: foto,
              wiki: {
                titulo: "Titulo wiki",
                descripcion:
                  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
              }
            },
            {
              id: 3,
              nombre: "José Edgardo Edgardo Nolasco Rordriguez",
              foto: foto,
              wiki: {
                titulo: "Titulo wiki",
                descripcion:
                  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
              }
            },
            {
              id: 4,
              nombre: "José Edgardo Edgardo Nolasco Rordriguez",
              foto: foto,
              wiki: {
                titulo: "Titulo wiki",
                descripcion:
                  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
              }
            },
            {
              id: 5,
              nombre: "José Edgardo Edgardo Nolasco Rordriguez",
              foto: foto,
              wiki: {
                titulo: "Titulo wiki",
                descripcion:
                  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
              }
            }
          ]
        },
        {
          id: 1,
          titulo: "Elección de Alcaldes periodo 2020 - 2022",
          marcada: false,
          opcionSeleccionada: null,
          opcionMarcada: null,
          opcionesVotacion: [
            {
              id: 1,
              nombre: "José Edgardo Edgardo Nolasco Rordriguez",
              foto: foto,
              wiki: {
                titulo: "Titulo wiki",
                descripcion:
                  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
              }
            },
            {
              id: 2,
              nombre: "José Edgardo Edgardo Nolasco Rordriguez",
              foto: foto,
              wiki: {
                titulo: "Titulo wiki",
                descripcion:
                  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
              }
            },
            {
              id: 3,
              nombre: "José Edgardo Edgardo Nolasco Rordriguez",
              foto: foto,
              wiki: {
                titulo: "Titulo wiki",
                descripcion:
                  "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas Letraset, las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum."
              }
            }
          ]
        }
      ],
      papeletaActual: null,
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
      }
    };
  },
  methods: {
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
      this.opcionSelecionada ={
        wiki: {
          titulo: null,
          descripcion: null
        }
      };
      this.verEquis= false;
      this.tituloWiki= "Indicaciones";

    },
    enviarVoto() {
      this.dialogConfirmarVoto = false;
      this.papeletas[this.indexPapeletaActual].marcada = true;
      this.papeletas[
        this.indexPapeletaActual
      ].opcionSeleccionada = this.opcionSelecionada;
    }
  }
};
</script>