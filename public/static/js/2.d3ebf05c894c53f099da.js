webpackJsonp([2],{"5zde":function(t,a,e){e("zQR9"),e("qyJz"),t.exports=e("FeBl").Array.from},Gu7T:function(t,a,e){"use strict";a.__esModule=!0;var s,o=e("c/Tr"),i=(s=o)&&s.__esModule?s:{default:s};a.default=function(t){if(Array.isArray(t)){for(var a=0,e=Array(t.length);a<t.length;a++)e[a]=t[a];return e}return(0,i.default)(t)}},Y6xo:function(t,a){},"c/Tr":function(t,a,e){t.exports={default:e("5zde"),__esModule:!0}},fBQ2:function(t,a,e){"use strict";var s=e("evD5"),o=e("X8DO");t.exports=function(t,a,e){a in t?s.f(t,a,o(0,e)):t[a]=e}},pDFB:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("Xxa5"),o=e.n(s),i=e("exGp"),r=e.n(i),n=e("Gu7T"),l=e.n(n),c=e("lwxB"),d=e("bq2E"),v=e("qaY0"),u=e("6HU8"),g=e.n(u),m=e("whc6"),p=new v.a,f={components:{ListaPaginacion:c.default,ListaSedesEntidad:d.default,Mapa:m.default},mounted:function(){this.cargaInicial()},data:function(){return{verModal:!1,verModalCargando:!1,entidadesFiltradas:!1,logo:g.a,cargando:!0,cargarMasEntidades:!1,yaNoHayMasDatos:!1,msjSubtituloLista:"",configMapa:{alto:"600px",eventoClick:{habilitado:!1},autocomplete:{habilitado:!1}},entidadActual:{nombre:null,representanteLegal:null,tipologia:[],sedes:[]},configListaEntidades:{titulo:"Entidades",color:null,encabezados:[{nombre:"datosGenerales",texto:"Datos generales",anchos:{xs:12,sm:12,md:3,lg:3,xl:3}},{nombre:"tipologia",texto:"Tipología",anchos:{xs:12,sm:12,md:3,lg:3,xl:3}},{nombre:"sedes",texto:"Sedes",anchos:{xs:12,sm:12,md:4,lg:4,xl:4}},{nombre:"acciones",texto:"Acciones",anchos:{xs:12,sm:12,md:2,lg:2,xl:2}}],itemAvatar:{ver:!1}},tipologias:[],tipologiasFiltro:[],textoFiltro:null,entidaeds2:[]}},methods:{mostrarTodo:function(){var t=this;this.cargando=!0,p.getPaginacionEntidades(1).then(function(a){t.entidaeds2=a.data.documentos,t.msjSubtituloLista="Mostrando "+t.entidaeds2.length+" de "+a.data.totalDocumentos,t.entidadesFiltradas=!1,t.cargando=!1})},filtrarEntidades:function(){var t=this;this.cargando=!0,this.tipologiasFiltro.length>0||null!=this.textoFiltro&&this.textoFiltro.length>0?p.filtrarEntidades(this.textoFiltro,this.tipologiasFiltro).then(function(a){t.entidaeds2=a.data,t.cargando=!1,t.entidadesFiltradas=!0,t.msjSubtituloLista="Se encontraron "+a.data.length+" coincidencias para la búsqueda"}):p.getPaginacionEntidades(1).then(function(a){t.entidaeds2=a.data.documentos,t.msjSubtituloLista="Mostrando "+t.entidaeds2.length+" de "+a.data.totalDocumentos,t.entidadesFiltradas=!1,t.cargando=!1})},cargarEntidades:function(){var t=this;this.cargarMasEntidades||(this.cargarMasEntidades=!0,p.getPaginacionEntidades(this.entidaeds2[this.entidaeds2.length-1].id).then(function(a){a.data.documentos.length>0?(t.entidaeds2=[].concat(l()(t.entidaeds2),l()(a.data.documentos)),t.msjSubtituloLista="Mostrando "+t.entidaeds2.length+" de "+a.data.totalDocumentos):t.yaNoHayMasDatos=!0,t.cargarMasEntidades=!1}))},verDetallesEntidad:function(t){this.entidadActual=t,this.verModal=!0},cerrarDetallesEntidad:function(){this.verModal=!1,setTimeout(function(){document.getElementById("dialog-detalles-content").scrollTop=0},50)},generarReporte:function(t){var a=this;this.verModalCargando=!0,p.getReporteEntidad(t).then(function(t){window.URL.createObjectURL(new Blob([t.data]));var e=new Blob([t.data],{type:"application/pdf"}),s=window.URL.createObjectURL(e);a.verModalCargando=!1,window.open(s)})},cargaInicial:function(){var t=this;return r()(o.a.mark(function a(){var e;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return e=t,a.next=3,p.getCatalogo("tipologias").then(function(t){e.tipologias=t.data});case 3:return a.next=5,p.getPaginacionEntidades(1).then(function(a){e.entidaeds2=a.data.documentos,t.msjSubtituloLista="Mostrando "+t.entidaeds2.length+" de "+a.data.totalDocumentos});case 5:t.cargando=!1;case 6:case"end":return a.stop()}},a,t)}))()}},computed:{tamanioModal:function(){switch(this.$vuetify.breakpoint.name){case"xs":case"sm":case"md":return"100%";case"lg":case"xl":return"75%"}}}},h={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-app",[e("v-container",{staticClass:"pa-12 grey lighten-4",attrs:{fluid:""}},[e("v-row",{attrs:{justify:"center",align:"center"}},[e("v-col",{attrs:{cols:"12"}},[e("v-img",{staticStyle:{margin:"0 auto"},attrs:{src:t.logo,alt:"Logo conna",width:"100"}}),t._v(" "),e("h1",{staticStyle:{"text-align":"center"}},[t._v("Directorio de entidades inscritas")])],1)],1),t._v(" "),e("v-row",{attrs:{align:"center",justify:"center"}},[e("v-col",{attrs:{cols:"12",lg:"11"}},[e("v-card",{attrs:{outlined:""}},[e("v-card-text",[e("v-row",{attrs:{justify:"center",align:"center"}},[e("v-col",{attrs:{cols:"12",lg:"6"}},[e("v-text-field",{staticStyle:{"margin-top":"4px"},attrs:{label:"Nombre entidad"},model:{value:t.textoFiltro,callback:function(a){t.textoFiltro=a},expression:"textoFiltro"}})],1),t._v(" "),e("v-col",{attrs:{cols:"12",lg:"6"}},[e("v-select",{attrs:{label:"Tipologia",multiple:"",chips:"",items:t.tipologias,"item-text":"nombre","return-object":"",dense:""},model:{value:t.tipologiasFiltro,callback:function(a){t.tipologiasFiltro=a},expression:"tipologiasFiltro"}})],1),t._v(" "),e("v-col",{attrs:{cols:"12"}},[e("div",{staticClass:"text-center"},[e("v-btn",{attrs:{color:"primary"},on:{click:t.filtrarEntidades}},[e("v-icon",{attrs:{left:""}},[t._v("search")]),t._v("Buscar\n                  ")],1),t._v(" "),e("v-btn",{attrs:{color:"primary"},on:{click:t.mostrarTodo}},[e("v-icon",{attrs:{left:""}},[t._v("list")]),t._v("Mostrar todo\n                  ")],1)],1)])],1)],1)],1)],1)],1),t._v(" "),e("v-row",{directives:[{name:"show",rawName:"v-show",value:t.cargando,expression:"cargando"}],attrs:{align:"center",justify:"center"}},[e("v-col",{attrs:{cols:"12",lg:"11"}},[t._l(10,function(a){return[e("v-skeleton-loader",{key:"article-"+a,ref:"skeleton",refInFor:!0,staticClass:"mx-auto",attrs:{boilerplate:!1,type:"article",height:"150",tile:!1}}),t._v(" "),e("hr",{key:"hr-"+a})]})],2)],1),t._v(" "),e("v-row",{directives:[{name:"show",rawName:"v-show",value:!t.cargando,expression:"!cargando"}],attrs:{align:"center",justify:"center"}},[e("v-col",{attrs:{cols:"12",lg:"11"}},[e("lista-paginacion",{attrs:{config:t.configListaEntidades,items:t.entidaeds2},scopedSlots:t._u([{key:"datosGenerales",fn:function(a){return[e("v-card",{attrs:{outlined:"",color:"#fff"}},[e("v-card-text",[e("v-row",{attrs:{justify:"space-between"}},[e("v-col",{attrs:{cols:"3"}},[e("v-avatar",{attrs:{color:"indigo"}},[e("span",{staticClass:"white--text headline"},[t._v("I")])])],1),t._v(" "),e("v-col",{attrs:{cols:"9"}},[e("h2",{staticStyle:{color:"black"}},[t._v(t._s(a.item.nombre))])])],1)],1)],1)]}},{key:"tipologia",fn:function(a){return[e("v-chip-group",{attrs:{column:"","active-class":"primary--text"}},t._l(a.item.tipologia,function(a,s){return e("v-chip",{key:s+"-"+a.id,staticClass:"ma-2"},[t._v(t._s(a.nombre))])}),1)]}},{key:"sedes",fn:function(a){return[e("v-list",{attrs:{disabled:""}},[e("v-list-item-group",t._l(a.item.sedes,function(a,s){return e("v-list-item",{key:s+"-"+a.departamento.DepartamentoID+"-"+a.municipio.MunicipioID},[e("v-list-item-icon",[e("v-icon",{attrs:{color:"indigo"}},[t._v("place")])],1),t._v(" "),e("v-list-item-content",[e("v-list-item-title",[t._v(t._s(a.municipio.MunicipioLbl)+", "+t._s(a.departamento.DepartamentoLbl))]),t._v(" "),1==a.tipo.id?e("v-list-item-subtitle",[t._v("Central")]):t._e()],1)],1)}),1)],1)]}},{key:"acciones",fn:function(a){return[e("v-row",[e("v-col",{attrs:{cols:"6",sm:"3",md:"12"}},[e("v-btn",{staticClass:"ma-2",attrs:{text:"",color:"primary"},on:{click:function(e){return t.verDetallesEntidad(a.item)}}},[e("v-icon",{attrs:{left:""}},[t._v("info")]),t._v("Detalles\n                ")],1)],1),t._v(" "),e("v-col",{attrs:{cols:"6",sm:"3",md:"12"}},[e("v-btn",{staticClass:"ma-2",attrs:{text:"",color:"primary"},on:{click:function(e){return t.generarReporte(a.item.id)}}},[e("v-icon",{attrs:{left:""}},[t._v("picture_as_pdf")]),t._v("Reporte\n                ")],1)],1)],1)]}}])},[e("template",{slot:"subtitulo"},[t._v(t._s(t.msjSubtituloLista))])],2),t._v(" "),e("v-row",{attrs:{justify:"center",align:"center"}},[e("v-col",{directives:[{name:"show",rawName:"v-show",value:t.cargarMasEntidades,expression:"cargarMasEntidades"}],attrs:{cols:"12"}},[e("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"success"}})],1),t._v(" "),e("v-col",{attrs:{cols:"12"}},[e("div",{directives:[{name:"show",rawName:"v-show",value:!t.entidadesFiltradas,expression:"!entidadesFiltradas"}],staticClass:"text-center"},[e("v-alert",{directives:[{name:"show",rawName:"v-show",value:t.yaNoHayMasDatos,expression:"yaNoHayMasDatos"}],attrs:{type:"success"}},[t._v("No hay nada más que mostrar")]),t._v(" "),e("v-btn",{directives:[{name:"show",rawName:"v-show",value:!t.yaNoHayMasDatos,expression:"!yaNoHayMasDatos"}],attrs:{text:"",color:"primary",disabled:t.cargarMasEntidades},on:{click:t.cargarEntidades}},[t._v("\n                Cargar más entidades \n                "),e("v-icon",[t._v("add")])],1)],1)])],1)],1)],1)],1),t._v(" "),e("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.verModalCargando,callback:function(a){t.verModalCargando=a},expression:"verModalCargando"}},[e("v-card",{attrs:{color:"success",dark:""}},[e("v-card-text",[e("h4",[t._v("Generando reporte...")]),t._v(" "),e("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1),t._v(" "),e("v-dialog",{attrs:{width:t.tamanioModal,scrollable:""},model:{value:t.verModal,callback:function(a){t.verModal=a},expression:"verModal"}},[e("v-card",[e("v-card-title",{staticClass:"headline primary dark",staticStyle:{color:"white"},attrs:{"primary-title":""}},[t._v("Detalles entidad")]),t._v(" "),e("v-divider"),t._v(" "),e("v-card-text",{attrs:{id:"dialog-detalles-content"}},[e("v-row",[e("v-col",{attrs:{cols:"12"}},[e("v-card",{attrs:{outlined:""}},[e("v-card-title",[t._v("Datos generales")]),t._v(" "),e("v-card-text",[e("v-row",{attrs:{justify:"start"}},[e("v-col",{attrs:{cols:"12"}},[e("span",[t._v("Nombre")]),t._v(" "),e("br"),t._v(" "),e("p",{staticClass:"label"},[t._v(t._s(t.entidadActual.nombre))])]),t._v(" "),e("v-col",{attrs:{cols:"12"}},[e("span",[t._v("Tipologia")]),t._v(" "),e("br"),t._v(" "),t._l(t.entidadActual.tipologia,function(a,s){return e("v-chip",{key:s+"-"+a.id,staticClass:"ma-2"},[t._v(t._s(a.nombre))])})],2)],1)],1)],1)],1),t._v(" "),e("v-col",{attrs:{cols:"12"}},[e("lista-sedes-entidad",{attrs:{sedes:t.entidadActual.sedes}})],1),t._v(" "),e("v-col",{attrs:{cols:"12"}},[e("mapa",{attrs:{config:t.configMapa,coordenadas:{longitud:-89.838993,latitud:13.929196}}})],1)],1)],1),t._v(" "),e("v-divider"),t._v(" "),e("v-card-actions",{staticClass:"grey lighten-3"},[e("v-spacer"),t._v(" "),e("v-btn",{attrs:{color:"primary darken-1",text:""},on:{click:t.cerrarDetallesEntidad}},[t._v("Cerrar")])],1)],1)],1),t._v(" "),e("v-dialog",{attrs:{persistent:"",width:"300"},model:{value:t.cargando,callback:function(a){t.cargando=a},expression:"cargando"}},[e("v-card",{attrs:{color:"success",dark:""}},[e("v-card-text",[e("h4",[t._v("Cargando...")]),t._v(" "),e("v-progress-linear",{staticClass:"mb-0",attrs:{indeterminate:"",color:"white"}})],1)],1)],1)],1)},staticRenderFns:[]};var _=e("VU/8")(f,h,!1,function(t){e("Y6xo")},null,null);a.default=_.exports},qyJz:function(t,a,e){"use strict";var s=e("+ZMJ"),o=e("kM2E"),i=e("sB3e"),r=e("msXi"),n=e("Mhyx"),l=e("QRG4"),c=e("fBQ2"),d=e("3fs2");o(o.S+o.F*!e("dY0y")(function(t){Array.from(t)}),"Array",{from:function(t){var a,e,o,v,u=i(t),g="function"==typeof this?this:Array,m=arguments.length,p=m>1?arguments[1]:void 0,f=void 0!==p,h=0,_=d(u);if(f&&(p=s(p,m>2?arguments[2]:void 0,2)),void 0==_||g==Array&&n(_))for(e=new g(a=l(u.length));a>h;h++)c(e,h,f?p(u[h],h):u[h]);else for(v=_.call(u),e=new g;!(o=v.next()).done;h++)c(e,h,f?r(v,p,[o.value,h],!0):o.value);return e.length=h,e}})}});
//# sourceMappingURL=2.d3ebf05c894c53f099da.js.map