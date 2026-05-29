<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { ChevronDown, X } from 'lucide-vue-next'

import logoCabecera from '@/assets/logo/logoazul.png'
import texturaMenu from '@/assets/texturas/peques-04.png'

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
  <header class="header-global">
    <nav class="header-nav">
      <RouterLink to="/" class="header-brand">
        <img :src="logoCabecera" alt="Esclat" class="header-brand__img">
      </RouterLink>

      <button
        class="menu-texture-button"
        aria-label="Abrir menú"
        @click="openMenu"
      >
        <img :src="texturaMenu" alt="" class="menu-texture-img">
      </button>
    </nav>
  </header>

  <div
    v-if="isMenuOpen"
    class="menu-overlay"
    @click="closeMenu"
  ></div>

  <aside
    v-if="isMenuOpen"
    class="menu-panel"
  >
    <button
      class="menu-close"
      aria-label="Cerrar menú"
      @click="closeMenu"
    >
      <X class="h-10 w-10" />
    </button>

    <nav class="menu-links">
      <RouterLink to="/" @click="closeMenu">
        Inicio
      </RouterLink>

      <div class="menu-group">
        <button
          class="menu-group-button"
          @click="toggleActividades"
        >
          Actividades
          <ChevronDown
            class="h-6 w-6 transition"
            :class="isActividadesOpen ? 'rotate-180' : ''"
          />
        </button>

        <div v-if="isActividadesOpen" class="submenu-links">
          <RouterLink to="/actividades/proyecciones" @click="closeMenu">
            Proyecciones
          </RouterLink>

          <RouterLink to="/actividades/talleres" @click="closeMenu">
            Talleres
          </RouterLink>

          <RouterLink to="/actividades/conversaciones" @click="closeMenu">
            Conversaciones
          </RouterLink>
        </div>
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
.header-global {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 110px;
  background: var(--esclat-theme-color, #0040f2);
}

.header-nav {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;
}

.header-brand {
  display: inline-flex;
  align-items: center;
}

.header-brand__img {
  width: clamp(130px, 14vw, 220px);
  height: auto;
  display: block;
  filter: brightness(0) invert(1);
}

.menu-texture-button {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.menu-texture-img {
  width: clamp(110px, 13vw, 190px);
  height: auto;
  display: block;
  filter: brightness(0) invert(1);
  transition: transform 160ms ease;
}

.menu-texture-button:hover .menu-texture-img {
  transform: rotate(-5deg) scale(1.05);
}

.menu-overlay {
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.35);
}

.menu-panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1200;
  height: 100vh;
  width: min(430px, 88vw);
  background: var(--esclat-theme-color, #0040f2);
  color: white;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
}

.menu-close {
  align-self: flex-end;
  border: none;
  background: transparent;
  color: white;
  cursor: pointer;
  margin-bottom: 2rem;
}

.menu-links {
  display: flex;
  flex-direction: column;
  gap: 1.45rem;
  font-size: 2.3rem;
  font-weight: 700;
  line-height: 1;
}

.menu-links a {
  color: white;
  text-decoration: none;
}

.menu-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.menu-group-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border: none;
  background: transparent;
  color: white;
  font: inherit;
  cursor: pointer;
  text-align: left;
}

.submenu-links {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  padding-left: 1rem;
  font-size: 1.35rem;
  font-weight: 500;
}

.submenu-links a {
  opacity: 0.85;
}

.submenu-links a:hover,
.menu-links a:hover,
.menu-group-button:hover {
  opacity: 0.7;
}
</style>
