<template>
  <div>
    <v-row align="start" justify="center">
      <v-col cols="12" lg="11">
        <v-card outlined>
          <v-card-text>
            <v-row justify="center" align="center">
              <v-col cols="12" lg="6">
                <v-text-field label="Nombre usuario"></v-text-field>
              </v-col>
              <v-col cols="12">
                <div class="text-center">
                  <v-btn color="primary">
                    <v-icon left>search</v-icon>Buscar
                  </v-btn>
                  <v-btn color="primary">
                    <v-icon left>list</v-icon>Mostrar todo
                  </v-btn>
                  <v-btn color="primary" @click="abrirModalUsuario">
                    <v-icon left>list</v-icon>Agregar user
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="center" justify="center">
      <v-col cols="12" lg="11">
        <lista-paginacion :config="configListaEntidades" :items="usuarios">
          <!--<template slot="subtitulo">{{msjSubtituloLista}}</template>-->
          <template slot="nombre" slot-scope="datos">
            <v-card outlined color="#fff">
              <v-card-text>
                <v-row justify="start">
                  <v-col cols="1">
                    <v-avatar size="36" color="indigo">
                      <span class="white--text headline">JN</span>
                    </v-avatar>
                  </v-col>
                  <v-col cols="11">
                    <h2 style="color:black;margin-top:8px;">{{datos.item.nombreCompleto}}</h2>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </template>
          <template slot="usuario" slot-scope="datos">
            <h2 style="color:black;margin-top:25px;">{{datos.item.usuario.nombre}}</h2>
          </template>
          <template slot="roles" slot-scope="datos">
            <v-chip-group column active-class="primary--text">
              <v-chip
                class="ma-2"
                v-for="(rol,index) in datos.item.usuario.roles"
                :key="`${index}-${rol.id}`"
              >{{rol.nombre}}</v-chip>
            </v-chip-group>
          </template>
          <template slot="acciones" slot-scope="datos">
            <v-row>
              <v-col cols="6" sm="3" md="4">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-2" icon color="primary" v-on="on">
                      <v-icon>create</v-icon>
                    </v-btn>
                  </template>
                  <span>Editar usuario</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6" sm="3" md="4">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-2" icon color="primary" v-on="on">
                      <v-icon>vpn_key</v-icon>
                    </v-btn>
                  </template>
                  <span>Cambiar contraseña</span>
                </v-tooltip>
              </v-col>
              <v-col cols="6" sm="3" md="4">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-2" icon color="primary" v-on="on">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Dar de baja</span>
                </v-tooltip>
              </v-col>
            </v-row>
          </template>
        </lista-paginacion>
        <!--
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
        -->
      </v-col>
    </v-row>

    <!--
    <v-dialog v-model="verModalCargando" persistent width="300">
      <v-card color="success" dark>
        <v-card-text>
          <h4>Generando reporte...</h4>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
    -->

    <v-dialog v-model="verModalUsuario" :width="tamanioModal" scrollable>
      <v-card>
        <v-card-title
          class="headline primary dark"
          style="color:white;"
          primary-title
        >{{tituloModalUsuario}}</v-card-title>
        <v-divider></v-divider>
        <v-card-text id="dialog-detalles-content">
          <v-row>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title>Datos personales</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col lg="4">
                      <v-text-field label="Primer nombre"></v-text-field>
                    </v-col>
                    <v-col lg="4">
                      <v-text-field label="Segundo nombre"></v-text-field>
                    </v-col>
                    <v-col lg="4">
                      <v-text-field label="Tercer nombre"></v-text-field>
                    </v-col>
                    <v-col lg="4">
                      <v-text-field label="Primer apellido"></v-text-field>
                    </v-col>
                    <v-col lg="4">
                      <v-text-field label="Segundo apellido"></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card outlined>
                <v-card-title>Datos cuenta</v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col lg="4">
                      <v-text-field label="Usuario"></v-text-field>
                    </v-col>
                    <v-col lg="4">
                      <v-text-field label="Contraseña"></v-text-field>
                    </v-col>
                    <v-col lg="4">
                      <v-text-field label="Confirmar contraseña"></v-text-field>
                    </v-col>
                    <v-col lg="4">
                      <v-select label="Rol" return-object dense></v-select>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-3">
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text>Agregar</v-btn>
          <v-btn color="default darken-1" text>Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
  mounted() {},
  data() {
    return {
      verModalUsuario: false,
      tituloModalUsuario: "Agregar usuario",
      configListaEntidades: {
        titulo: "Entidades",
        color: null,
        encabezados: [
          {
            nombre: "nombre",
            texto: "Nombre",
            anchos: { xs: 12, sm: 12, md: 3, lg: 6, xl: 5 }
          },
          {
            nombre: "usuario",
            texto: "Usuario",
            anchos: { xs: 12, sm: 12, md: 3, lg: 2, xl: 3 }
          },
          {
            nombre: "roles",
            texto: "Rol(es)",
            anchos: { xs: 12, sm: 12, md: 4, lg: 2, xl: 2 }
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
      usuarios: [
        {
          primerNombre: "Jose",
          segundoNombre: "Edgardo",
          primerApellido: "Nolasco",
          segundoApellido: "Rodriguez",
          nombreCompleto: "Jose Edgardo Nolasco Rodriguez",
          usuario: {
            nombre: "jnolasco",
            roles: [
              {
                id: 1,
                nombre: "Administrador"
              }
            ]
          }
        }
      ]
    };
  },
  methods: {
    abrirModalUsuario() {
      this.verModalUsuario = true;
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