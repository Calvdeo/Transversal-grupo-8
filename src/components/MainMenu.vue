<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronDown, Menu, X } from 'lucide-vue-next'
import logoCabecera from '@/assets/logo/logoooo.png'

const isMenuOpen = ref(false)
const isActividadesOpen = ref(false)

const openMenu = () => {
  isMenuOpen.value = true
}

const closeMenu = () => {
  isMenuOpen.value = false
  isActividadesOpen.value = false
}

const toggleActividades = () => {
  isActividadesOpen.value = !isActividadesOpen.value
}
</script>

<template>
  <header class="fixed top-0 left-0 z-50 w-full bg-white border-b border-zinc-200">
    <nav class="flex items-center justify-between px-6 py-4">
      <RouterLink
        to="/"
        class="header-brand"
      >
        <img :src="logoCabecera" alt="Esclat" class="header-brand__img">
      </RouterLink>

      <button
        class="flex items-center gap-2 rounded-full border border-black px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white"
        @click="openMenu"
      >
        <Menu class="h-5 w-5" />
        Menú
      </button>
    </nav>
  </header>

  <div
    v-if="isMenuOpen"
    class="fixed inset-0 z-40 bg-black/40"
    @click="closeMenu"
  ></div>

  <aside
    v-if="isMenuOpen"
    class="fixed right-0 top-0 z-50 flex h-full w-[85%] max-w-sm flex-col bg-zinc-950 px-8 py-8 text-white"
  >
    <button
      class="mb-10 self-end"
      @click="closeMenu"
    >
      <X class="h-7 w-7" />
    </button>

    <nav class="flex flex-col gap-6 text-2xl font-bold">
      <RouterLink to="/" @click="closeMenu">
        Inicio
      </RouterLink>

      <div class="flex flex-col gap-3">
        <button
          class="flex items-center justify-between text-left"
          @click="toggleActividades"
        >
          Actividades
          <ChevronDown
            class="h-5 w-5 transition"
            :class="isActividadesOpen ? 'rotate-180' : ''"
          />
        </button>

        <RouterLink
          v-if="isActividadesOpen"
          to="/actividades/proyecciones"
          class="pl-4 text-lg font-medium text-zinc-300 transition hover:text-white"
          @click="closeMenu"
        >
          Proyecciones
        </RouterLink>

        <RouterLink
          v-if="isActividadesOpen"
          to="/actividades/talleres"
          class="pl-4 text-lg font-medium text-zinc-300 transition hover:text-white"
          @click="closeMenu"
        >
          Talleres
        </RouterLink>

        <RouterLink
          v-if="isActividadesOpen"
          to="/actividades/conversaciones"
          class="pl-4 text-lg font-medium text-zinc-300 transition hover:text-white"
          @click="closeMenu"
        >
          Conversaciones
        </RouterLink>
      </div>

      <RouterLink to="/artistas" @click="closeMenu">
        Artistas
      </RouterLink>

      <RouterLink to="/info" @click="closeMenu">
        Información
      </RouterLink>

      <RouterLink to="/contacto" @click="closeMenu">
        Contacto
      </RouterLink>

      <RouterLink to="/entradas" @click="closeMenu">
        Entradas
      </RouterLink>
    </nav>
  </aside>
</template>

<style scoped>
.header-brand {
  display: inline-flex;
  align-items: center;
}

.header-brand__img {
  width: clamp(112px, 9vw, 156px);
  height: auto;
  display: block;
}
</style>
