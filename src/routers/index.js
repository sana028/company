import { createRouter, createWebHistory } from 'vue-router';
import userRegistrationStore from '../store/userRegistrationStore';

const routes = [
    {
       path:'/',
       name:'home',
       component:()=>import(/* webChunkName : home */'../forms/MainPage.vue')
    },
    {
        path:'/sign-up',
        name:'signUp',
        component:()=>import(/* webChunkName : signUp */'../forms/RegistrationForm.vue'),
    },
    {
        path:'/sign-in',
        name:'signIn',
        component:()=>import(/* webChunkName : signIn */'../forms/LogInForm.vue'),
    },
    {
        path:'/home/',
        name:'home',
        component:()=>import(/* webChunkName : home */'../components/home.vue'),
        props:true,
        children:[
            {
                path:'profile',
                name:'profile',
                component:()=>import(/* webChunkName : profile */'../base/profile.vue'),
                props:true
            },
            {
                path:'changePassword',
                name:'changePassword',
                component:()=>import(/* webChunkName : changePassword */'../base/changePassword.vue'),
                props:true
            },
            {
                path:'add',
                name:'add',
                component:()=>import(/* webChunkName : add */'../todo/Add.vue'),
                props:true
            },
            {
                path:'edit/:id',
                name:'edit',
                component:()=>import(/* webChunkName : edit */'../todo/Add.vue'),
            },
            {
                path:'delete/:id',
                name:'delete',
                component:()=>import(/* webChunkName : delete */'../todo/Delete.vue'),
            }
        ]
    }
]

const routers = createRouter({
    history: createWebHistory(),
    routes
});

routers.beforeEach((to, from, next) => {
    const store=userRegistrationStore();
    const isAuthenticated = store.uid;
    if ((to.name === 'signIn' || isAuthenticated ) ) {
        next();
    } else {
        next('/sign-In');
    }

})
export default routers;