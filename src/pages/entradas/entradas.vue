<script setup lang="ts">
import { computed, ref } from 'vue'

import entradaAbono from '@/assets/entradas/entrada-1.jpg'
import entradaDia23 from '@/assets/entradas/entrada-2.jpg'
import entradaDia24 from '@/assets/entradas/entrada-3.jpg'
import entradaDia25 from '@/assets/entradas/entrada-4.jpg'

type Entrada = {
  id: number
  nombre: string
  precio: number
  imagen: string
  descripcion: string
  rotacion: string
  color: string
}

const entradas = ref<Entrada[]>([
  {
    id: 1,
    nombre: 'Abono general 3 días',
    precio: 75,
    imagen: entradaAbono,
    descripcion: 'Esta entrada incluye acceso a todas las actividades de los tres días.',
    rotacion: '-rotate-6',
    color: '#0040f2'
  },
  {
    id: 2,
    nombre: 'Entrada día 23.10.26',
    precio: 40,
    imagen: entradaDia23,
    descripcion: 'Esta entrada incluye acceso a todas las actividades del día 23.10.26.',
    rotacion: 'rotate-6',
    color: '#ff2f92'
  },
  {
    id: 3,
    nombre: 'Entrada día 24.10.26',
    precio: 40,
    imagen: entradaDia24,
    descripcion: 'Esta entrada incluye acceso a todas las actividades del día 24.10.26.',
    rotacion: 'rotate-3',
    color: '#1ea56a'
  },
  {
    id: 4,
    nombre: 'Entrada día 25.10.26',
    precio: 40,
    imagen: entradaDia25,
    descripcion: 'Esta entrada incluye acceso a todas las actividades del día 25.10.26.',
    rotacion: '-rotate-6',
    color: '#f26a00'
  }
])

const cantidades = ref<Record<number, number>>({
  1: 0,
  2: 0,
  3: 0,
  4: 0
})

const total = computed(() => {
  return entradas.value.reduce((suma, entrada) => {
    return suma + entrada.precio * (cantidades.value[entrada.id] ?? 0)
  }, 0)
})

const hayCompra = computed(() => total.value > 0)
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
          <div class="entrada-bloque">
            <img
              :src="entrada.imagen"
              :alt="entrada.nombre"
              class="entrada-imagen"
            >

            <select
              v-model.number="cantidades[entrada.id]"
              class="selector-cantidad"
            >
              <option :value="0">Cant.</option>
              <option
                v-for="numero in 6"
                :key="numero"
                :value="numero"
              >
                {{ numero }}
              </option>
            </select>
          </div>

          <p class="entrada-descripcion">
            {{ entrada.descripcion }}
          </p>
        </article>
      </div>

      <section class="resumen-compra">
        <div></div>

        <div
          v-if="hayCompra"
          class="precio"
        >
          <p>{{ total.toFixed(2) }}€</p>

          <button class="boton-comprar">
            Comprar
          </button>
        </div>
      </section>
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

.entrada-bloque {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.entrada-imagen {
  width: 100%;
  display: block;
}

.selector-cantidad {
  border: 1px solid currentColor;
  color: inherit;
  background: white;
  font-size: 14px;
  padding: 4px 6px;
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

.resumen-compra {
  margin: 90px auto 0;
  max-width: 760px;
  border-top: 8px solid #0040f2;
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: end;
}

.precio {
  text-align: right;
  font-size: 42px;
  line-height: 1;
}

.boton-comprar {
  margin-top: 16px;
  background: #0040f2;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 42px;
  font-weight: 700;
  cursor: pointer;
}
</style>