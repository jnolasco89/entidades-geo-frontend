import VueRouter from 'vue-router';
import Vue from 'vue';

Vue.use(VueRouter);

function cargaLazyVista(vista) {
    return () => import(`./vistas/${vista}.vue`);
}

function cargaLazyComponent(componente) {
    return () => import(`./components/${componente}.vue`);
}


let router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: cargaLazyVista('Login')
        },
        {
            path: '/votacion',
            name: 'Votacion',
            component: cargaLazyVista('PaginaDeVotacion')
        },
        {
            path: '/home',
            name: 'Home',
            component: cargaLazyVista('Layout'),
            meta:{
                requiereAutenticacion:true
            }
        },
        {
            path: '/directorio-entidades',
            name: 'DirectorioEntidades',
            component: cargaLazyVista('DirectorioEntidades')
        },
    ]
});

router.beforeEach((to, from, next) => {
    if(to.matched.some(record=>record.meta.requiereAutenticacion)){
        console.log("Este component rquiere auto");
    }
    next();
});

export default router;
