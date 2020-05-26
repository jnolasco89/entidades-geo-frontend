import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

function cargaLazyVista(vista){
    return ()=> import(`./vistas/${vista}.vue`);
}

function cargaLazyComponent(componente){
    return ()=> import(`./components/${componente}.vue`);
}

export default new VueRouter({
    routes:[
        {
            path: '/',
            name: '/',
            component: cargaLazyVista('Layout')
        },
        {
            path: '/directorio-entidades',
            name: '/',
            component: cargaLazyVista('DirectorioEntidades')
        },
    ]
});

