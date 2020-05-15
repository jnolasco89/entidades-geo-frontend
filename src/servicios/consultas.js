import Axios from '../axiosConfig';
import Geo from './DepMun';

export default class Servicios{
    async subirArchivo(archivo){
        let formData=new FormData();
        formData.append('documento',archivo);
        var response=await Axios.post('/subir-excel',formData,{headers:{'Content-Type':'multipart/form-data'}});
        return response;
    }

    async getAllEntidades(){
        var response=await Axios.get('/entidades');
        return response;
    }

    test(){
        alert("Llega a test");
    }

    getDepartamentos(){
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