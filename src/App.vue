<script setup lang="ts">
import { RouterView } from 'vue-router'
import MainMenu from '@/components/MainMenu.vue'
</script>

<template>
  <MainMenu />

  <main class="pt-24">
    <RouterView />
  </main>
</template>

<style scoped>
</style>