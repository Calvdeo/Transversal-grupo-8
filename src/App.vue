<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
import SiteFooter from '@/components/SiteFooter.vue'
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
