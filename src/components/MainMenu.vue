<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { X } from 'lucide-vue-next'

import logoCabecera from '@/assets/logo/logosoloblanco.png'
import texturaMenu from '@/assets/texturas/peques-04.png'

const isMenuOpen = ref(false)

const openMenu = () => {
  isMenuOpen.value = true
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="header-global">
    <nav class="header-nav">
      <RouterLink to="/" class="header-brand">
        <img :src="logoCabecera" alt="Esclat" class="header-brand__img">
      </RouterLink>

      <button class="menu-texture-button" aria-label="Abrir menú" @click="openMenu">
        <img :src="texturaMenu" alt="" class="menu-texture-img">
      </button>
    </nav>
  </header>

  <Transition name="menu-overlay">
    <div v-if="isMenuOpen" class="menu-overlay" @click="closeMenu"></div>
  </Transition>

  <Transition name="menu-panel">
    <aside v-if="isMenuOpen" class="menu-panel">
      <button class="menu-close" aria-label="Cerrar menú" @click="closeMenu">
        <X class="menu-close-icon" />
      </button>

      <nav class="menu-links">
        <RouterLink to="/" class="menu-link menu-link-principal" @click="closeMenu">
          Inicio
        </RouterLink>

        <RouterLink to="/info" class="menu-link menu-link-secundario" @click="closeMenu">
          Info
        </RouterLink>

        <RouterLink to="/artistas" class="menu-link menu-link-secundario" @click="closeMenu">
          Artistas
        </RouterLink>

        <RouterLink to="/programa" class="menu-link menu-link-secundario" @click="closeMenu">
          Programa
        </RouterLink>

        <RouterLink to="/entradas" class="menu-link menu-link-destacado" @click="closeMenu">
          Entradas
        </RouterLink>
      </nav>

      <nav class="menu-links-bottom">
        <RouterLink
          to="/preguntas-frecuentes"
          class="menu-link menu-link-mini"
          @click="closeMenu"
        >
         FAQs
        </RouterLink>

        <RouterLink to="/contacto" class="menu-link menu-link-mini" @click="closeMenu">
          contacto
        </RouterLink>
      </nav>
    </aside>
  </Transition>
</template>

<style scoped>
.header-global {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 110px;
  background: var(--esclat-theme-color, #004fff);
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
  background: rgba(0, 0, 0, 0.2);
}

.menu-overlay-enter-active,
.menu-overlay-leave-active {
  transition: opacity 260ms ease;
}

.menu-overlay-enter-from,
.menu-overlay-leave-to {
  opacity: 0;
}

.menu-panel {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1200;
  height: 100vh;
  width: min(380px, 92vw);
  background: var(--esclat-theme-color, #004fff);
  color: white;
  border-left: 1px solid rgba(255, 255, 255, 0.34);
  border-top: 1px solid rgba(255, 255, 255, 0.34);
  padding: 1.35rem 1.25rem 1.2rem;
  display: flex;
  flex-direction: column;
}

.menu-panel-enter-active,
.menu-panel-leave-active {
  transition:
    opacity 320ms ease,
    transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}

.menu-panel-leave-active {
  transition-duration: 220ms;
}

.menu-panel-enter-from,
.menu-panel-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.menu-panel-enter-active .menu-link {
  animation: menu-link-appear 340ms ease both;
}

.menu-panel-enter-active .menu-link:nth-child(1) {
  animation-delay: 90ms;
}

.menu-panel-enter-active .menu-link:nth-child(2) {
  animation-delay: 125ms;
}

.menu-panel-enter-active .menu-link:nth-child(3) {
  animation-delay: 160ms;
}

.menu-panel-enter-active .menu-link:nth-child(4) {
  animation-delay: 195ms;
}

.menu-panel-enter-active .menu-link:nth-child(5) {
  animation-delay: 230ms;
}

@keyframes menu-link-appear {
  from {
    opacity: 0;
    transform: translateX(16px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .menu-overlay-enter-active,
  .menu-overlay-leave-active,
  .menu-panel-enter-active,
  .menu-panel-leave-active {
    transition: none;
  }

  .menu-panel-enter-active .menu-link {
    animation: none;
  }
}

.menu-close {
  align-self: flex-end;
  border: none;
  background: none;
  color: white;
  cursor: pointer;
  margin-bottom: 1.8rem;
  padding: 0;
}

.menu-close-icon {
  width: 42px;
  height: 42px;
}

.menu-links {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  margin-top: 0.35rem;
}

.menu-links-bottom {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.menu-link {
  color: white;
  text-decoration: none;
  line-height: 1;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
}

.menu-link-principal {
  font-size: clamp(1.65rem, 4.2vw, 2.4rem);
  font-weight: 600;
}

.menu-link-secundario {
  font-size: clamp(1.65rem, 4.2vw, 2.4rem);
  font-weight: 600;
}

.menu-link-destacado {
  font-size: clamp(2.2rem, 8.4vw, 4.2rem);
  font-weight: 700;
  margin-top: 0.85rem;
}

.menu-link-mini {
  font-size: clamp(1.05rem, 2.8vw, 1.35rem);
  font-weight: 500;
  letter-spacing: 0.01em;
}

.menu-link:hover {
  opacity: 0.7;
}
</style>
