<template>
  <v-app>
    <v-container fluid class="pa-12 grey lighten-4">
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-img :src="logo" alt="Logo conna" width="100" style="margin:0 auto;"></v-img>
          <h1 style="text-align:center;">Directorio de entidades inscritas</h1>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" lg="11">
          <v-card outlined>
            <v-card-text>
              <v-row justify="center" align="center">
                <v-col cols="12" lg="6">
                  <v-text-field
                    label="Nombre entidad"
                    v-model="textoFiltro"
                    style="margin-top: 4px;"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" lg="6">
                  <v-select
                    label="Tipologia"
                    multiple
                    chips
                    :items="tipologias"
                    item-text="nombre"
                    v-model="tipologiasFiltro"
                    return-object
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <div class="text-center">
                    <v-btn color="primary" @click="filtrarEntidades">
                      <v-icon left>search</v-icon>Buscar
                    </v-btn>
                    <v-btn color="primary" @click="mostrarTodo">
                      <v-icon left>list</v-icon>Mostrar todo
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" v-show="cargando">
        <v-col cols="12" lg="11">
          <template v-for="n in 10">
            <v-skeleton-loader
              ref="skeleton"
              :boilerplate="false"
              type="article"
              height="150"
              :tile="false"
              class="mx-auto"
              v-bind:key="`article-${n}`"
            ></v-skeleton-loader>
            <hr v-bind:key="`hr-${n}`" />
          </template>
        </v-col>
      </v-row>
      <v-row align="center" justify="center" v-show="!cargando">
        <v-col cols="12" lg="11">
          <lista-paginacion :config="configListaEntidades" :items="entidaeds2">
            <template slot="subtitulo">{{msjSubtituloLista}}</template>
            <template slot="datosGenerales" slot-scope="datos">
              <v-card outlined color="#fff">
                <v-card-text>
                  <v-row justify="space-between">
                    <v-col cols="3">
                      <v-avatar color="indigo">
                        <span class="white--text headline">I</span>
                      </v-avatar>
                    </v-col>
                    <v-col cols="9">
                      <h2 style="color:black;">{{datos.item.nombre}}</h2>
                    </v-col>
                  </v-row>

                  <!--
                    <h4 style="color:grey;margin-top:10px;">{{datos.item.representanteLegal}}</h4>
                    <h5>Representante legal</h5>
                  -->
                </v-card-text>
              </v-card>
            </template>
            <template slot="tipologia" slot-scope="datos">
              <v-chip-group column active-class="primary--text">
                <v-chip
                  class="ma-2"
                  v-for="(tipo,index) in datos.item.tipologia"
                  :key="`${index}-${tipo.id}`"
                >{{tipo.nombre}}</v-chip>
              </v-chip-group>
            </template>
            <template slot="sedes" slot-scope="datos">
              <v-list disabled>
                <v-list-item-group>
                  <v-list-item
                    v-for="(sede, index) in datos.item.sedes"
                    :key="`${index}-${sede.departamento.DepartamentoID}-${sede.municipio.MunicipioID}`"
                  >
                    <v-list-item-icon>
                      <v-icon color="indigo">place</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{sede.municipio.MunicipioLbl}},&nbsp;{{sede.departamento.DepartamentoLbl}}</v-list-item-title>
                      <v-list-item-subtitle v-if="sede.tipo.id==1">Central</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </template>
            <template slot="acciones" slot-scope="datos">
              <v-row>
                <v-col cols="6" sm="3" md="12">
                  <v-btn class="ma-2" text color="primary" @click="verDetallesEntidad(datos.item)">
                    <v-icon left>info</v-icon>Detalles
                  </v-btn>
                </v-col>
                <v-col cols="6" sm="3" md="12">
                  <v-btn class="ma-2" text color="primary" @click="generarReporte(datos.item.id)">
                    <v-icon left>picture_as_pdf</v-icon>Reporte
                  </v-btn>
                </v-col>
              </v-row>
            </template>
          </lista-paginacion>
          <v-row justify="center" align="center">
            <v-col cols="12" v-show="cargarMasEntidades">
              <v-progress-linear indeterminate color="success" class="mb-0"></v-progress-linear>
            </v-col>
            <v-col cols="12">
              <div class="text-center" v-show="!entidadesFiltradas">
                <v-alert type="success" v-show="yaNoHayMasDatos">No hay nada más que mostrar</v-alert>
                <v-btn
                  text
                  color="primary"
                  v-show="!yaNoHayMasDatos"
                  @click="cargarEntidades"
                  :disabled="cargarMasEntidades"
                >
                  Cargar más entidades&nbsp;
                  <v-icon>add</v-icon>
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog v-model="verModalCargando" persistent width="300">
      <v-card color="success" dark>
        <v-card-text>
          <h4>Generando reporte...</h4>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="verModal" :width="tamanioModal" scrollable>
      <v-card>
        <v-card-title
          class="headline primary dark"
          style="color:white;"
          primary-title
        >Detalles entidad</v-card-title>
        <v-divider></v-divider>
        <v-card-text id="dialog-detalles-content">
          <v-row>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title>Datos generales</v-card-title>
                <v-card-text>
                  <v-row justify="start">
                    <v-col cols="12">
                      <span>Nombre</span>
                      <br />
                      <p class="label">{{entidadActual.nombre}}</p>
                    </v-col>
                    <!--
                    <v-col cols="12">
                      <span>Representante legal</span>
                      <br />
                      <p class="label">{{entidadActual.representanteLegal}}</p>
                    </v-col>
                    -->
                    <v-col cols="12">
                      <span>Tipologia</span>
                      <br />
                      <v-chip
                        class="ma-2"
                        v-for="(tipo,index) in entidadActual.tipologia"
                        :key="`${index}-${tipo.id}`"
                      >{{tipo.nombre}}</v-chip>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
            <v-col cols="12">
              <lista-sedes-entidad :sedes="entidadActual.sedes"></lista-sedes-entidad>
            </v-col>
            <v-col cols="12">
              <mapa :config="configMapa" :coordenadas="{longitud:-89.838993,latitud:13.929196}"></mapa>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-3">
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="cerrarDetallesEntidad">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="cargando" persistent width="300">
      <v-card color="success" dark>
        <v-card-text>
          <h4>Cargando...</h4>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import ListaPaginacion from "../components/ListaPaginacion";
import ListaSedesEntidad from "../components/ListaSedesEntidad";
import Consultas from "../servicios/consultas";
import logoConna from "../assets/logo-conna-transparente-sin-texto.png";
import Mapa from "../components/Mapa";

const serv = new Consultas();

export default {
  components: {
    ListaPaginacion,
    ListaSedesEntidad,
    Mapa
  },
  mounted() {
    this.cargaInicial();
  },
  data() {
    return {
      verModal: false,
      verModalCargando: false,
      entidadesFiltradas: false,
      logo: logoConna,
      cargando: true,
      cargarMasEntidades: false,
      yaNoHayMasDatos: false,
      msjSubtituloLista: "",
      configMapa: {
        alto: "600px",
        eventoClick: {
          habilitado: false
        },
        autocomplete: {
          habilitado: false
        }
      },
      entidadActual: {
        nombre: null,
        representanteLegal: null,
        tipologia: [],
        sedes: []
      },
      configListaEntidades: {
        titulo: "Entidades",
        color: null,
        encabezados: [
          {
            nombre: "datosGenerales",
            texto: "Datos generales",
            anchos: { xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }
          },
          {
            nombre: "tipologia",
            texto: "Tipología",
            anchos: { xs: 12, sm: 12, md: 3, lg: 3, xl: 3 }
          },
          {
            nombre: "sedes",
            texto: "Sedes",
            anchos: { xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }
          },
          {
            nombre: "acciones",
            texto: "Acciones",
            anchos: { xs: 12, sm: 12, md: 2, lg: 2, xl: 2 }
          }
        ],
        itemAvatar: {
          ver: false
        }
      },
      tipologias: [],
      tipologiasFiltro: [],
      textoFiltro: null,
      entidaeds2: []
    };
  },
  methods: {
    mostrarTodo() {
      this.cargando = true;
      serv.getPaginacionEntidades(1).then(r => {
        this.entidaeds2 = r.data.documentos;
        this.msjSubtituloLista = `Mostrando ${this.entidaeds2.length} de ${r.data.totalDocumentos}`;
        this.entidadesFiltradas = false;
        this.cargando = false;
        this.tipologiasFiltro=[];
        this.textoFiltro=null;
      });
    },
    filtrarEntidades() {
      this.cargando = true;
      if (
        this.tipologiasFiltro.length > 0 ||
        (this.textoFiltro != null ? this.textoFiltro.length > 0 : false)
      ) {
        serv
          .filtrarEntidades(this.textoFiltro, this.tipologiasFiltro)
          .then(res => {
            this.entidaeds2 = res.data;
            this.cargando = false;
            this.entidadesFiltradas = true;
            this.msjSubtituloLista = `Se encontraron ${res.data.length} coincidencias para la búsqueda`;
          });
      } else {
        serv.getPaginacionEntidades(1).then(r => {
          this.entidaeds2 = r.data.documentos;
          this.msjSubtituloLista = `Mostrando ${this.entidaeds2.length} de ${r.data.totalDocumentos}`;
          this.entidadesFiltradas = false;
          this.cargando = false;
        });
      }
    },
    cargarEntidades() {
      if (!this.cargarMasEntidades) {
        this.cargarMasEntidades = true;
        serv
          .getPaginacionEntidades(
            this.entidaeds2[this.entidaeds2.length - 1].id
          )
          .then(r => {
            if (r.data.documentos.length > 0) {
              this.entidaeds2 = [...this.entidaeds2, ...r.data.documentos];
              this.msjSubtituloLista = `Mostrando ${this.entidaeds2.length} de ${r.data.totalDocumentos}`;
            } else {
              this.yaNoHayMasDatos = true;
            }

            this.cargarMasEntidades = false;
          });
      }
    },
    verDetallesEntidad(entidad) {
      this.entidadActual = entidad;
      this.verModal = true;
    },
    cerrarDetallesEntidad() {
      this.verModal = false;
      //Se usa setTimeout para evitar que se vea subir el scroll cuando se cierra el modal.
      setTimeout(() => {
        document.getElementById("dialog-detalles-content").scrollTop = 0;
      }, 50);
    },
    generarReporte(id) {
      this.verModalCargando = true;
      serv.getReporteEntidad(id).then(respuesta => {
        const url = window.URL.createObjectURL(new Blob([respuesta.data]));

        let archivo = new Blob([respuesta.data], { type: "application/pdf" });
        let archivoURL = window.URL.createObjectURL(archivo);
        this.verModalCargando = false;
        window.open(archivoURL);
      });
    },
    async cargaInicial() {
      let self = this;
      await serv.getCatalogo("tipologias").then(r => {
        self.tipologias = r.data;
      });

      await serv.getPaginacionEntidades(1).then(r => {
        self.entidaeds2 = r.data.documentos;
        this.msjSubtituloLista = `Mostrando ${this.entidaeds2.length} de ${r.data.totalDocumentos}`;
      });

      this.cargando = false;
    }
  },
  computed: {
    tamanioModal() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "100%";
        case "sm":
          return "100%";
        case "md":
          return "100%";
        case "lg":
          return "75%";
        case "xl":
          return "75%";
      }
    }
  }
};
</script>
<style>
p.label {
  color: black;
  font-size: 16px;
}
.fila-contacto > div {
  padding-top: 2px;
  padding-bottom: 2px;
}
</style>