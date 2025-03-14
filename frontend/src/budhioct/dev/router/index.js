import {createRouter, createWebHistory} from "vue-router";
import {useAuthStore} from "../stores/authStore.js";
import Pages from "../views/pages/Pages.vue";
import Home from "../views/pages/Home.vue";
import Nprogress from "nprogress";

const routes = [
    {
        path: '/',
        name: 'pages',
        component: Pages,
        children: [
            {
              path: '/',
              redirect: '/home'
            },
            {
              path: '/home',
              name: 'home',
              component: Home,
              meta: {requiresAuth: true}
            },
            {
                path: '/warung',
                name: 'warung',
                component: () => import('../views/pages/Warung.vue'),
                meta: {requiresAuth: true}
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/pages/auth/Login.vue'),
        meta: {guest: true},
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../views/pages/auth/Register.vue'),
        meta: {guest: true},
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();

    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        //console.info('Access denied: You must be logged in to access this page.');
        return next({name: 'login'});
    }

    if (to.meta.guest && authStore.isAuthenticated) {
        //console.info('Access denied: You are already logged in.');
        return next({name: 'home'});
    }

    Nprogress.start();
    next();

});

router.afterEach(() => {
    Nprogress.done();
});