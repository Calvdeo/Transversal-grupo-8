<script setup lang="ts">
import mapaFestival from '@/assets/mapa/mapa1.jpg'
</script>

<template>
  <main class="info-page">
    <section class="info-intro">
      <h1>Qué es esclat</h1>

      <div class="info-columnas">
        <p>
          Esclat es un festival que combina música en directo con talleres,
          conversaciones y proyecciones audiovisuales. Estas propuestas no se
          plantean como contenidos de ocio aislados, sino que están unificadas
          por un marco de pensamiento crítico.
        </p>

        <p>
          Este enfoque transversal utiliza las diferentes disciplinas para
          analizar las realidades sociales contemporáneas desde un enfoque
          cultural y artístico.
        </p>
      </div>
    </section>

    <section class="info-mapa">
      <h2>Mapa del festival</h2>

      <div class="mapa-wrapper">
        <img
          :src="mapaFestival"
          alt="Mapa de espacios de ESCLAT"
          class="mapa-imagen"
        >

        <div class="mapa-leyenda">
          <div><span>1</span> La Polivalent</div>
          <div><span>2</span> Factoria</div>
          <div><span>3</span> Visual Room</div>
          <div><span>4</span> Sala de Exposiciones</div>
          <div><span>5</span> Patio 1</div>
          <div><span>6</span> Patio 2</div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.info-page {
  min-height: 100vh;
  background: #ffffff;
  color: #0040f2;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
}

.info-intro {
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 8rem 1.5rem 4rem;
}

.info-intro h1 {
  margin: 0 0 2rem;
  color: #0040f2;
  font-size: clamp(3.4rem, 9vw, 8rem);
  line-height: 0.9;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-decoration: none;
}

.info-columnas {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
}

.info-columnas p {
  margin: 0;
  color: #0040f2;
  font-size: clamp(1.5rem, 2.7vw, 2.6rem);
  line-height: 1.12;
  text-decoration: none;
}

.info-mapa {
  width: 100%;
  padding: 2rem 0 8rem;
}

.info-mapa h2 {
  width: min(100%, 1180px);
  margin: 0 0 2rem;
  padding: 0 1.5rem;
  text-align: left;
  color: #0040f2;
  font-size: clamp(3rem, 8vw, 8rem);
  line-height: 0.85;
  font-weight: 700;
}

.mapa-wrapper {
  display: grid;
  grid-template-columns: minmax(0, 820px) 280px;
  gap: 48px;
  align-items: start;
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 0 1.5rem;
  justify-content: center;
}

.mapa-imagen {
  width: 100%;
  max-width: 820px;
  display: block;
}

.mapa-leyenda {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 2rem;
  color: #0040f2;
  font-size: 22px;
  font-weight: 500;
}

.mapa-leyenda div {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mapa-leyenda span {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  background: #0040f2;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
}

@media (max-width: 900px) {
  .info-intro {
    padding-top: 7rem;
  }

  .info-columnas {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .mapa-wrapper {
    grid-template-columns: 1fr;
    padding-right: 0;
  }

  .mapa-leyenda {
    padding: 0 1.5rem;
  }
}
</style>
