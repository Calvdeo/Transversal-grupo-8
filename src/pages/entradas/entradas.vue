<script setup lang="ts">
import entradaAbono from '@/assets/entradas/entrada-1.jpg'
import entradaDia23 from '@/assets/entradas/entrada-2.jpg'
import entradaDia24 from '@/assets/entradas/entrada-3.jpg'
import entradaDia25 from '@/assets/entradas/entrada-4.jpg'

const entradas = [
  {
    id: 1,
    nombre: 'Abono general 3 días',
    imagen: entradaAbono,
    descripcion: 'Esta entrada incluye acceso a todas las actividades de los tres días.',
    rotacion: '-rotate-6',
    color: '#0040f2'
  },
  {
    id: 2,
    nombre: 'Entrada día 23.10.26',
    imagen: entradaDia23,
    descripcion: 'Esta entrada incluye acceso a todas las actividades del día 23.10.26.',
    rotacion: 'rotate-6',
    color: '#ff2f92'
  },
  {
    id: 3,
    nombre: 'Entrada día 24.10.26',
    imagen: entradaDia24,
    descripcion: 'Esta entrada incluye acceso a todas las actividades del día 24.10.26.',
    rotacion: 'rotate-3',
    color: '#1ea56a'
  },
  {
    id: 4,
    nombre: 'Entrada día 25.10.26',
    imagen: entradaDia25,
    descripcion: 'Esta entrada incluye acceso a todas las actividades del día 25.10.26.',
    rotacion: '-rotate-6',
    color: '#f26a00'
  }
]
</script>

<template>
  <main class="entradas-page">
    <section class="entradas-contenido">
      <h1 class="titulo">Entradas</h1>

      <div class="lista-entradas">
        <article
          v-for="entrada in entradas"
          :key="entrada.id"
          class="entrada-item"
          :class="entrada.rotacion"
          :style="{ color: entrada.color }"
        >
          <img
            :src="entrada.imagen"
            :alt="entrada.nombre"
            class="entrada-imagen"
          >

          <p class="entrada-descripcion">
            {{ entrada.descripcion }}
          </p>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.entradas-page {
  min-height: 100vh;
  background: white;
  color: #0040f2;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
}

.entradas-contenido {
  width: min(100%, 980px);
  margin: 0 auto;
  padding: 24px 24px 80px;
}

.titulo {
  font-size: clamp(72px, 16vw, 180px);
  line-height: 0.8;
  font-weight: 700;
  margin-bottom: 50px;
  width: 100vw;
  margin-left: calc(50% - 50vw);
}

.lista-entradas {
  display: flex;
  flex-direction: column;
  gap: 64px;
  align-items: center;
}

.entrada-item {
  width: min(620px, 86vw);
  transition: transform 180ms ease;
}

.entrada-item:hover {
  transform: rotate(0deg) scale(1.01);
  z-index: 5;
}

.entrada-imagen {
  width: 100%;
  display: block;
}

.entrada-descripcion {
  opacity: 0;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.2;
  transition: opacity 160ms ease;
}

.entrada-item:hover .entrada-descripcion {
  opacity: 1;
}
</style>