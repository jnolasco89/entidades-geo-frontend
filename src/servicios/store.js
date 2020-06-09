export const store = {
    state: {
        ejecutarValidacion: false,
        entidad: {
            nombre: null,
            representanteLegal: null,
            tipologia: [],
            sedes: []
        },
        indiceSede:null,
        sede: {
            departamento: null,
            municipio: null,
            direccion: null,
            coordenadas: {
                longitud: null,
                latitud: null
            },
            telefonos: [{ valor: null }],
            faxes: [{ valor: null }],
            correos: [{ valor: null }],
            contactos: []
        },
        cargando:false
    },
    setCargando(valor){
        alert("llega a cargando");
        alert(valor);
        this.state.cargando=valor;
    },
    setEjecutarValidacion(valor) {
        this.state.ejecutarValidacion = valor;
    },
    agregarSedeEntidad(valor) {
        this.state.entidad.sedes.push(valor);
    },
    setSedeEnArrayEntidad(index,sede){
        this.state.entidad.sedes.splice(index, 1, sede);
    },
    setSede(valor) {
        this.state.sede = valor;
    },
    agregarContactoSede(valor) {
        this.state.sede.contactos.push(valor);
    },
    setContactosSede(valor) {
        this.state.sede.contactos = valor;
    },
    eliminarContactoSede(index){
        this.state.sede.contactos.splice(index,1);
    },
    eliminarSedeEntidad(index){
        this.state.entidad.sedes.splice(index,1);
    },
    setIndiceSede(valor){
        this.state.indiceSede=valor;
    },
    resetSede(){
        this.state.sede={
            departamento: null,
            municipio: null,
            direccion: null,
            coordenadas: {
                longitud: null,
                latitud: null
            },
            telefonos: [{ valor: null }],
            faxes: [{ valor: null }],
            correos: [{ valor: null }],
            contactos: []
        };
    }
}