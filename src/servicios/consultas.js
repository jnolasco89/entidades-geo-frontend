import Axios from '../axiosConfig';
import Geo from './DepMun';

export default class Servicios {
    async subirArchivo(archivo) {
        let formData = new FormData();
        formData.append('documento', archivo);
        var response = await Axios.post('/subir-excel', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
        return response;
    }

    async validarToken(token, data) {
        let response = await Axios.post('/validar-token', data, {
            headers: {
                'Authorization': token
            }
        });
        return response;
    }

    async cerrarSesion(token) {
        let response = await Axios.post('/cerrar-sesion', {}, {
            headers: {
                'Authorization': token
            }
        });
        return response;
    }

    async getVotacion(id) {
        let response = await Axios.get('/votacion/' + id);
        return response;
    }

    async getAllEntidades() {
        var response = await Axios.get('/entidades');
        return response;
    }

    async filtrarEntidades(textoFiltro, tipologias) {
        var response = await Axios.post('/filtrar-entidades', {
            textoFiltro: textoFiltro,
            tipologias: tipologias
        });


        return response;
    }

    async getPaginacionEntidades(id) {
        var response = await Axios.get('/paginacion-entidades', {
            params: {
                id: id,
                cantidadPorPagina: 10
            }
        });
        return response;
    }

    async getReporteEntidad(id) {
        var response = await Axios.get('/reporte-entidad', {
            responseType: 'blob',
            params: {
                id: id
            }
        });
        return response;
    }

    async getCatalogo(catalogo) {
        var response = await Axios.get('/catalogo', {
            params: {
                catalogo: catalogo
            }
        });
        return response;
    }

    async loginHome(usuario, password) {
        var response = await Axios.post('/login-home', {
            usuario: usuario,
            password: password,
        });
        return response;
    }

    async loginVotacion(usuario, password, votacion) {
        var response = await Axios.post('/login-votacion', {
            usuario: usuario,
            password: password,
            votacion: votacion
        });
        return response;
    }

    async enviarVoto(idVotacion,tokenVotacion,idPapeleta,idOpcion, usuario) {
        let response= await Axios.post('/voto',{
            votacion:idVotacion,
            tokenVotacion:tokenVotacion,
            papeleta:idPapeleta,
            opcion:idOpcion,
            usuario:usuario
        });
        return response;
    }

    async agregarVotacion(votacion) {
        let fecha = new Date();
        let randdom = Math.floor(Math.random() * (10000 - 1)) + 1;
        let formData = new FormData();

        votacion.papeletas.forEach(papeleta => {
            papeleta.opciones.forEach(opcion => {
                if (opcion.foto != null) {
                    let nombreFoto = `vot-${fecha.getTime()}-${randdom}-${opcion.foto.name}`;
                    formData.append('imagenes', opcion.foto, nombreFoto);
                    opcion.nombreFoto = nombreFoto;
                }
            });
        });
        formData.append('datos', JSON.stringify(votacion));

        var respuesta = await Axios.post('/votacion', formData, {
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });
    }

    test() {
        alert("Llega a test");
    }

    getDepartamentos() {
        let deptos = [];
        Geo.Departamento.forEach(depto => {
            if (depto.DEP_ID * 1 > 0) {
                depto.DepartamentoID = depto.DepartamentoID * 1;
                deptos.push(depto);
            }
        });
        return deptos;
    }

    getMunicipios(idDepto) {
        let municipios = [
        ];

        if (idDepto * 1 > 0) {
            Geo.Municipio.forEach(mun => {
                if (mun.DEP_ID * 1 == idDepto * 1 && mun.MUN_ID * 1 > 0) {
                    mun.MUN_ID = mun.MUN_ID * 1;
                    municipios.push(mun);
                }
            });
        }

        return municipios;
    }
}