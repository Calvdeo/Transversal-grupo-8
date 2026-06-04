<script setup lang="ts">
import { watch } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import SiteFooter from '@/components/SiteFooter.vue'

const COLORES_TEMA = [
  '#004fff',
  '#fe8507',
  '#fc0299',
  '#05d181'
] as const
const PESOS_COLORES_TEMA = [4, 1, 1, 1] as const
const CLAVE_INDICE_TEMA = 'esclat-theme-index'
const COLOR_POR_RUTA: Record<string, string> = {
  '/artistas': '#004fff',
  '/programa': '#004fff'
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

function obtenerIndiceTemaPonderado() {
  const totalPesos = PESOS_COLORES_TEMA.reduce(
    (suma, peso) => suma + peso,
    0
  )
  let valor = Math.random() * totalPesos

  for (let indice = 0; indice < PESOS_COLORES_TEMA.length; indice += 1) {
    valor -= PESOS_COLORES_TEMA[indice] ?? 0

    if (valor < 0) {
      return indice
    }
  }

  return 0
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
    indiceTema = obtenerIndiceTemaPonderado()

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

  <main>
    <RouterView />
  </main>

  <SiteFooter />
</template>

<style scoped>
</style>
