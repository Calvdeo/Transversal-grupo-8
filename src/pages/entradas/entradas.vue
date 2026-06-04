<script setup lang="ts">
import { computed, ref } from 'vue'

import entradaAbono from '@/assets/entradas/entrada-1.jpg'
import entradaDia23 from '@/assets/entradas/entrada-2.jpg'
import entradaDia24 from '@/assets/entradas/entrada-3.jpg'
import entradaDia25 from '@/assets/entradas/entrada-4.jpg'
import graciasImagen from '@/assets/entradas/gracias.png'

type Entrada = {
  id: number
  nombre: string
  precio: number
  imagen: string
  descripcion: string
  rotacion: string
  color: string
}

const codigoPromocional = ref('')
const mostrarPantallaGracias = ref(false)

const entradas = ref<Entrada[]>([
  {
    id: 1,
    nombre: 'Abono general 3 días',
    precio: 75,
    imagen: entradaAbono,
    descripcion: 'Esta entrada incluye acceso a todas las actividades de los tres días.',
    rotacion: '-rotate-6',
    color: '#004fff'
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
    color: '#f26a00'
  },
  {
    id: 4,
    nombre: 'Entrada día 25.10.26',
    precio: 40,
    imagen: entradaDia25,
    descripcion: 'Esta entrada incluye acceso a todas las actividades del día 25.10.26.',
    rotacion: '-rotate-6',
    color: '#1ea56a'
  }
])

const cantidades = ref<Record<number, number>>({
  1: 0,
  2: 0,
  3: 0,
  4: 0
})

const subtotal = computed(() => {
  return entradas.value.reduce((suma, entrada) => {
    return suma + entrada.precio * (cantidades.value[entrada.id] ?? 0)
  }, 0)
})

const descuento = computed(() => {
  if (codigoPromocional.value.trim().toLowerCase() === 'esclat') {
    return subtotal.value * 0.25
  }

  return 0
})

const total = computed(() => {
  return subtotal.value - descuento.value
})

const hayCompra = computed(() => total.value > 0)

const entradasSeleccionadas = computed(() => {
  return entradas.value.filter((entrada) => {
    return (cantidades.value[entrada.id] ?? 0) > 0
  })
})

function descargarImagen(url: string, nombreArchivo: string) {
  const enlace = document.createElement('a')

  enlace.href = url
  enlace.download = nombreArchivo

  enlace.click()
}

function comprarEntradas() {
  entradasSeleccionadas.value.forEach((entrada) => {
    const cantidad = cantidades.value[entrada.id] ?? 0

    for (let i = 1; i <= cantidad; i++) {
      descargarImagen(
        entrada.imagen,
        `${entrada.nombre}-${i}.jpg`
      )
    }
  })

  cantidades.value = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
  }

  codigoPromocional.value = ''
  mostrarPantallaGracias.value = true
}

function cerrarPantallaGracias() {
  mostrarPantallaGracias.value = false
}
</script>

<template>
  <main class="entradas-page">
    <section
      class="cinta-descuento"
      aria-label="Aviso de descuento"
    >
      <div class="cinta-descuento-pista">
        <div class="cinta-descuento-grupo">
          <span>Con el código ESCLAT consigue un 25% de descuento en tus entradas.</span>
          <span>Con el código ESCLAT consigue un 25% de descuento en tus entradas.</span>
          <span>Con el código ESCLAT consigue un 25% de descuento en tus entradas.</span>
        </div>

        <div
          class="cinta-descuento-grupo"
          aria-hidden="true"
        >
          <span>Con el código ESCLAT consigue un 25% de descuento en tus entradas.</span>
          <span>Con el código ESCLAT consigue un 25% de descuento en tus entradas.</span>
          <span>Con el código ESCLAT consigue un 25% de descuento en tus entradas.</span>
        </div>
      </div>
    </section>

    <section class="entradas-contenido">
      <h1
        class="titulo"
      >
        Entradas
      </h1>

      <div class="lista-entradas">
        <article
          v-for="entrada in entradas"
          :key="entrada.id"
          class="entrada-item"
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
        <div class="codigo">
          <label for="codigo">Código promocional</label>

          <input
            id="codigo"
            v-model="codigoPromocional"
            type="text"
            placeholder="Código"
          >
        </div>

        <div
          v-if="hayCompra"
          class="precio"
        >
          <p
            v-if="descuento > 0"
            class="descuento"
          >
            Descuento aplicado: -{{ descuento.toFixed(2) }}€
          </p>

          <p>{{ total.toFixed(2) }}€</p>

          <button
            class="boton-comprar"
            @click="comprarEntradas"
          >
            Comprar
          </button>
        </div>
      </section>
    </section>

    <button
      v-if="mostrarPantallaGracias"
      type="button"
      class="pantalla-gracias"
      aria-label="Cerrar mensaje de compra y volver a entradas"
      @click="cerrarPantallaGracias"
    >
      <div class="pantalla-gracias-inner">
        <p class="pantalla-gracias-texto">
          Las entradas se descargarán automáticamente en tu dispositivo -------------------->
        </p>
        <img
          :src="graciasImagen"
          alt="Gracias"
          class="pantalla-gracias-imagen"
        >
      </div>
    </button>
  </main>
</template>

<style scoped>
.entradas-page {
  min-height: 100vh;
  padding-top: 110px;
  overflow-x: hidden;
  background: white;
  color: #004fff;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
}

.cinta-descuento {
  width: 100%;
  overflow: hidden;
  border-top: 2px solid var(--esclat-theme-color, #004fff);
  border-bottom: 2px solid var(--esclat-theme-color, #004fff);
  background: #ffffff;
}

.cinta-descuento-pista {
  display: flex;
  width: max-content;
  white-space: nowrap;
  animation: deslizar-cinta 30s linear infinite;
}

.cinta-descuento-grupo {
  display: flex;
  align-items: center;
  gap: 96px;
  padding-right: 96px;
}

.cinta-descuento-pista span {
  padding: 8px 0;
  color: var(--esclat-theme-color, #004fff);
  font-size: clamp(24px, 2.8vw, 40px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.entradas-contenido {
  width: min(100%, 1320px);
  margin: 0 auto;
  padding: 24px 24px 80px;
}

.titulo {
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-bottom: 50px;
  color: var(--esclat-theme-color, #004fff);
  font-size: clamp(72px, 16vw, 180px);
  line-height: 0.8;
  font-weight: 700;
  text-align: left;
}

.lista-entradas {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 32px 24px;
  align-items: start;
  justify-items: center;
}

.entrada-item {
  width: min(620px, 100%);
  transition: transform 180ms ease;
  justify-self: center;
}

.entrada-item:hover {
  transform: scale(1.01);
  z-index: 5;
}

.entrada-bloque {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
}

.entrada-imagen {
  flex: 1 1 auto;
  min-width: 0;
  width: 100%;
  display: block;
}

.selector-cantidad {
  flex: 0 0 auto;
  border: 1px solid currentColor;
  color: currentColor;
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
  border-top: 8px solid #004fff;
  padding-top: 20px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 24px;
  align-items: end;
}

.codigo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.codigo label {
  font-size: 16px;
}

.codigo input {
  width: 180px;
  border: 2px solid #004fff;
  color: #004fff;
  padding: 6px 8px;
  outline: none;
}

.precio {
  text-align: right;
  font-size: 42px;
  line-height: 1;
}

.descuento {
  margin-bottom: 8px;
  font-size: 16px;
}

.boton-comprar {
  margin-top: 16px;
  background: #004fff;
  color: white;
  border: none;
  padding: 8px 14px;
  font-size: 42px;
  font-weight: 700;
  cursor: pointer;
}

.pantalla-gracias {
  position: fixed;
  inset: 0;
  z-index: 1400;
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  border: none;
  padding: 24px;
  background: #ffffff;
  cursor: pointer;
}

.pantalla-gracias-inner {
  display: grid;
  justify-items: stretch;
  gap: 22px;
  width: 100%;
  text-align: left;
  color: #004fff;
}

.pantalla-gracias-imagen {
  width: min(100%, 1100px);
  height: auto;
  display: block;
  justify-self: center;
}

.pantalla-gracias-texto {
  margin: 0;
  width: 100%;
  max-width: none;
  font-size: clamp(20px, 1.7vw, 28px);
  line-height: 1.08;
  font-weight: 700;
  text-align: left;
}

@keyframes deslizar-cinta {
  from {
    transform: translateX(100vw);
  }

  to {
    transform: translateX(-100%);
  }
}

@media (max-width: 1024px) {
  .cinta-descuento-grupo {
    gap: 64px;
    padding-right: 64px;
  }

  .cinta-descuento-pista span {
    font-size: clamp(20px, 3.5vw, 30px);
  }

  .titulo {
    margin-bottom: 36px;
    font-size: clamp(60px, 15vw, 120px);
  }

  .entrada-item {
    width: min(100%, 560px);
  }

  .resumen-compra {
    margin-top: 72px;
    gap: 18px;
  }

  .precio {
    font-size: 36px;
  }

  .boton-comprar {
    font-size: 34px;
  }
}

@media (max-width: 700px) {
  .entradas-contenido {
    padding: 16px 12px 64px;
  }

  .titulo {
    width: 100%;
    margin-left: 0;
    margin-bottom: 26px;
    font-size: clamp(54px, 20vw, 88px);
    line-height: 0.86;
    text-align: left;
  }

  .lista-entradas {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .entrada-item {
    width: min(100%, 520px);
    justify-self: center;
  }

  .entrada-bloque {
    gap: 8px;
  }

  .entrada-item:hover {
    transform: none;
  }

  .entrada-descripcion {
    opacity: 1;
    font-size: 12px;
  }

  .resumen-compra {
    grid-template-columns: 1fr;
    margin-top: 48px;
    gap: 16px;
    align-items: start;
  }

  .codigo input {
    width: 100%;
    max-width: 280px;
  }

  .precio {
    text-align: left;
    font-size: 30px;
  }

  .boton-comprar {
    font-size: 26px;
  }

  .pantalla-gracias {
    padding: 18px;
  }

  .pantalla-gracias-inner {
    gap: 14px;
  }

  .pantalla-gracias-imagen {
    width: min(100%, 620px);
  }
}
</style>
