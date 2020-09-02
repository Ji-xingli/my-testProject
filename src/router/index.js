import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)


import Home from '../views/Home.vue'



const routes = [{
    path: '/',
    name: 'Home',
    component: Home
}, {
    path:'/about',
    name:'About',
    component:()=>import('@/views/About.vue')
}]
const router = new VueRouter({
    routes
})

export default router