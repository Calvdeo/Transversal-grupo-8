import Home from "@/pages/home/Home.vue";
import actividades from "@/pages/actividades/actividades.vue";
import conversaciones from "@/pages/actividades/conversaciones.vue";
import proyecciones from "@/pages/actividades/proyecciones.vue";
import talleres from "@/pages/actividades/talleres.vue";
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
      path: '/actividades',
      name: 'actividades',
      component: actividades
    },
    {
      path: '/actividades/proyecciones',
      name: 'actividades-proyecciones',
      component: proyecciones
    },
    {
      path: '/actividades/talleres',
      name: 'actividades-talleres',
      component: talleres
    },
    {
      path: '/actividades/conversaciones',
      name: 'actividades-conversaciones',
      component: conversaciones
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
