import Home from "@/pages/home/Home.vue";
import Programa from "@/pages/programa/programa.vue";
import artistas from "@/pages/artistas/artistas.vue";
import info from "@/pages/info/info.vue";
import contacto from "@/pages/contacto/contacto.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import Entradas from "@/pages/entradas/entradas.vue";



export const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/programa',
      name: 'programa',
      component: Programa
    },
    {
      path: '/artistas',
      name: 'artistas',
      component: artistas
    },
    {
      path: '/info',
      name: 'info',
      component: info
    },
    {
      path: '/contacto',
      name: 'contacto',
      component: contacto
    },
    {
      path: '/entradas',
      name: 'entradas',
      component: Entradas
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})
