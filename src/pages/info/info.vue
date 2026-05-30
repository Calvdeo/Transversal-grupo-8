<script setup lang="ts">
import mapaFestival from '@/assets/mapa/mapa1.JPG'
</script>

<template>
  <main class="info-page">
    <section class="info-intro">
      <div class="max-w-3xl">
        <p class="mb-4 text-sm uppercase tracking-[0.3em] text-zinc-500">
          ESCLAT FESTIVAL
        </p>

        <h1 class="text-5xl font-bold leading-tight tracking-tight text-black md:text-7xl">
          Esclat es un festival dirigido a público joven que combina música en directo con talleres, conversaciones y otras propuestas vinculadas a la creación contemporánea.
        </h1>
      </div>
    </section>

    <section class="info-mapa">
      <h2>Mapa del festival</h2>

      <img
        :src="mapaFestival"
        alt="Mapa de espacios de ESCLAT"
        class="mapa-imagen"
      >
    </section>
  </main>
</template>

<style scoped>
.info-page {
  min-height: 100vh;
  background: #ffffff;
}

.info-intro {
  max-width: 1024px;
  margin: 0 auto;
  padding: 8rem 1.5rem 4rem;
}

.info-mapa {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 8rem;
}

.info-mapa h2 {
  margin-bottom: 2rem;
  color: #0040f2;
  font-size: clamp(3rem, 8vw, 8rem);
  line-height: 0.85;
  font-weight: 700;
}

.mapa-imagen {
  width: 100%;
  display: block;
}
</style>