<template>
  <v-app>
    <v-content>
      <v-container fluid class="pa-12 grey lighten-4">
        <v-row justify="center" align="center">
          <v-col cols="1">
            <v-img :src="logo" alt="Logo conna" width="80"></v-img>
          </v-col>
          <v-col cols="5">
            <h1>Directorio de entidades inscritas</h1>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="11">
            <v-card outlined>
              <v-card-text>
                <v-row justify="center" align="center">
                  <v-col cols="5">
                    <v-text-field label="Nombre entidad" style="margin-top: 4px;"></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-select
                      label="Tipologia"
                      multiple
                      chips
                      :items="tipologias"
                      item-text="nombre"
                      return-object
                    ></v-select>
                  </v-col>
                  <v-col cols="1">
                    <v-btn color="primary">
                      <v-icon left>search</v-icon>Buscar
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="11">
            <lista-paginacion :config="configListaEntidades" :items="entidades">
              <template slot="datosGenerales" slot-scope="datos">
                <v-card outlined color="#fff">
                  <v-card-text>
                    <h2 style="color:black;">{{datos.item.nombre}}</h2>
                    <h4 style="color:grey;margin-top:10px;">{{datos.item.representanteLegal}}</h4>
                    <h5>Representante legal</h5>
                  </v-card-text>
                </v-card>
              </template>
              <template slot="tipologia" slot-scope="datos">
                <v-chip
                  class="ma-2"
                  v-for="(tipo,index) in datos.item.tipologia"
                  :key="`${index}-${tipo.id}`"
                >{{tipo.nombre}}</v-chip>
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
                        <v-list-item-title>{{sede.municipio.MunicipioLbl}}, {{sede.departamento.DepartamentoLbl}}</v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </template>
              <template slot="acciones" slot-scope="datos">
                <ul style="list-style:none;">
                  <li>
                    <v-btn
                      class="ma-2"
                      text
                      color="primary"
                      @click="verDetallesEntidad(datos.item)"
                    >
                      <v-icon left>info</v-icon>Detalles
                    </v-btn>
                  </li>
                  <li>
                    <v-btn class="ma-2" text color="primary" @click="generarReporte(datos.item.id)">
                      <v-icon left>picture_as_pdf</v-icon>Reporte
                    </v-btn>
                  </li>
                </ul>
              </template>
            </lista-paginacion>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-dialog v-model="verModalCargando" persistent width="300">
      <v-card color="success" dark>
        <v-card-text>
          <h4>Generando reporte...</h4>
          <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="verModal" width="73%" scrollable>
      <v-card>
        <v-card-title
          class="headline primary dark"
          style="color:white;"
          primary-title
        >Detalles entidad</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
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
                    <v-col cols="12">
                      <span>Representante legal</span>
                      <br />
                      <p class="label">{{entidadActual.representanteLegal}}</p>
                    </v-col>
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
          </v-row>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="grey lighten-3">
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" text @click="cerrarDetallesEntidad">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>
<script>
import ListaPaginacion from "../components/ListaPaginacion";
import ListaSedesEntidad from "../components/ListaSedesEntidad";
import Consultas from "../servicios/consultas";
import logoConna from "../assets/logo-conna-transparente.png";

const serv = new Consultas();

export default {
  components: {
    ListaPaginacion,
    ListaSedesEntidad
  },
  mounted() {
    this.cargaInicial();
  },
  data() {
    return {
      verModal: false,
      verModalCargando: false,
      logo: logoConna,
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
      entidades: [
        {
          id: 1,
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 2, nombre: "Sensilibizacion" },
            { id: 3, nombre: "Sensilibizacion" },
            { id: 4, nombre: "Sensilibizacion" },
            { id: 5, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                },
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                },
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            },
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            },
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                },
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        },
        {
          id: 2,
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 4, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        },
        {
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 4, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        },
        {
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 4, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        },
        {
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 4, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        },
        {
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 4, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        },
        {
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 4, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        },
        {
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 4, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  cargo: "Tecnico III",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        },
        {
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 4, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        },
        {
          nombre: "Entidad numero 1 s.a de c.v",
          representanteLegal: "Jose Edgardo Nolasco Rodriguez",
          tipologia: [
            { id: 1, nombre: "Participacion" },
            { id: 4, nombre: "Sensilibizacion" }
          ],
          sedes: [
            {
              departamento: {
                DepartamentoLbl: "Ahuachapan",
                DepartamentoID: 1
              },
              municipio: {
                MunicipioLbl: "Ahuachapan",
                MunicipioID: 1
              },
              direccion: "Colonia Ivu 2a etapa pasaje No 11 Casa No 8",
              coordenadas: {
                longitud: null,
                latitud: null
              },
              telefonos: [{ valor: "7696-0081" }, { valor: "7696-0081" }],
              faxes: [{ valor: "7696-0081" }],
              correos: [{ valor: "josenolasco@gmail.com" }],
              contactos: [
                {
                  primerNombre: "Jose",
                  segundoNombre: "Edgardo",
                  tercerNombre: null,
                  primerApellido: "Nolasco",
                  segundoApellido: "Rodriguez",
                  nombreCompleto: "Jose Edgardo Nolasco ROdriguez",
                  cargo: "Tecnico III",
                  correos: [
                    { valor: "josenolasco@gmail.com" },
                    { valor: "josenolasco@gmail.com" }
                  ],
                  telefonos: [{ valor: "7696-0081" }]
                }
              ]
            }
          ]
        }
      ]
    };
  },
  methods: {
    verDetallesEntidad(entidad) {
      this.entidadActual = entidad;
      this.verModal = true;
    },
    cerrarDetallesEntidad() {
      this.verModal = false;
      this.entidadActual = {
        nombre: null,
        representanteLegal: null,
        tipologia: []
      };
      this.entidadActual.sedes = [];
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
        console.log(self.tipologias);
      });
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