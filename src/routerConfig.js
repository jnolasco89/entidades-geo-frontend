import VueRouter from 'vue-router';
import Vue from 'vue';
import Servicios from './servicios/consultas';

const serv = new Servicios();

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
            path: '/login/:votacion',
            name: 'LoginVotacion',
            component: cargaLazyVista('Login')
        },
        {
            path: '/votacion',
            name: 'HojaVotacion',
            component: cargaLazyVista('PaginaDeVotacion'),
            meta: {
                requiereAutenticacion: true
            }
        },

        {
            path: '/home',
            name: 'Home',
            component: cargaLazyVista('Layout'),
            meta: {
                requiereAutenticacion: true
            },
            children: [
                {
                    path: '/admin-votaciones',
                    name: 'AdminVotaciones',
                    component: cargaLazyComponent('AdministradorVotaciones')
                }
            ]
        },
        {
            path: '/directorio-entidades',
            name: 'DirectorioEntidades',
            component: cargaLazyVista('DirectorioEntidades')
        },
    ]
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiereAutenticacion)) {
        let t = localStorage.getItem('t');
        if (t != undefined ? t != null : true) {
            let tipo = 1;
            if (to.name == 'HojaVotacion') {
                tipo = 2;
            }

            serv.validarToken(t, { tipo: tipo }).then(respuesta => {
                if (respuesta.data.estado) {
                    next();
                } else {
                    alert(tipo);
                    switch (tipo) {
                        case 1:
                            router.push({ name: 'Login' });
                            break;
                        case 2:
                            router.push({ name: 'LoginVotacion',params:{votacion:'AQUIDEBEIRELIDDELAVOTACION'} });
                            break;
                    }

                }
            }).catch(err => {
                if (err.response != undefined) {
                    switch (err.response.status) {
                        case 401:
                            router.push({ name: 'Login' });
                            break;
                    }
                }
            });
        } else {
            router.push({ name: 'Login' });
        }
    } else {
        next();
    }
});

export default router;
