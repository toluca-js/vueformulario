import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView'
import FormularioView from '../views/FormularioBase'
import TablaUsuarios from '../views/TablaUsuarios'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/formularioBase',
    name: 'FormularioBase',
    component: FormularioView
  },
  {
    path: '/datosUsuario',
    name: 'TablaUsuarios',
    component: TablaUsuarios
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
