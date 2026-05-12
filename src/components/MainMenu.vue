<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Menu, X } from 'lucide-vue-next'

const isMenuOpen = ref(false)

const openMenu = () => {
  isMenuOpen.value = true
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 z-50 w-full bg-white border-b border-zinc-200">
    <nav class="flex items-center justify-between px-6 py-4">
      <RouterLink
        to="/"
        class="text-2xl font-bold tracking-tight"
      >
        ESCLAT
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

      <RouterLink to="/actividades" @click="closeMenu">
        Actividades
      </RouterLink>

      <RouterLink to="/artistas" @click="closeMenu">
        Artistas
      </RouterLink>

      <RouterLink to="/info" @click="closeMenu">
        Información
      </RouterLink>

      <RouterLink to="/contacto" @click="closeMenu">
        Contacto
      </RouterLink>
    </nav>
  </aside>
</template>
