<script setup lang="ts">
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const COLORES_TEMA = [
  '#0040f2',
  '#fe8507',
  '#fc0299',
  '#05d181'
] as const
const CLAVE_INDICE_TEMA = 'esclat-theme-index'
const COLOR_POR_RUTA: Record<string, string> = {
  '/artistas': '#0040f2',
  '/actividades/talleres': '#fc0299',
  '/actividades/proyecciones': '#fe8507',
  '/actividades/conversaciones': '#05d181'
}

const route = useRoute()

function obtenerIndiceTemaGuardado() {
  let indice = -1

  try {
    const guardado =
      window.localStorage.getItem(CLAVE_INDICE_TEMA)

    if (guardado !== null) {
      const numero = Number.parseInt(guardado, 10)

      if (Number.isFinite(numero)) {
        indice = numero
      }
    }
  } catch {
    indice = -1
  }

  return indice
}

function aplicarColorHeader(color: string) {
  document.documentElement.style.setProperty(
    '--esclat-theme-color',
    color
  )
}

function aplicarColorGlobal(
  ruta: string,
  avanzarSecuencia: boolean
) {
  if (typeof window === 'undefined') return

  const colorFijo = COLOR_POR_RUTA[ruta]

  if (colorFijo) {
    aplicarColorHeader(colorFijo)
    return
  }

  let indiceTema = obtenerIndiceTemaGuardado()

  if (avanzarSecuencia) {
    indiceTema =
      (indiceTema + 1 + COLORES_TEMA.length) %
      COLORES_TEMA.length

    try {
      window.localStorage.setItem(
        CLAVE_INDICE_TEMA,
        String(indiceTema)
      )
    } catch {
      // noop
    }
  }

  const colorSecuencial =
    COLORES_TEMA[indiceTema] ?? COLORES_TEMA[0]
  aplicarColorHeader(colorSecuencial)
}

aplicarColorGlobal(route.path, true)

watch(
  () => route.path,
  (rutaNueva) => {
    aplicarColorGlobal(rutaNueva, false)
  }
)
</script>

<template>
  <MainMenu />

  <main class="pt-24">
    <RouterView />
  </main>

  <SiteFooter />
</template>

<style scoped>
</style>
