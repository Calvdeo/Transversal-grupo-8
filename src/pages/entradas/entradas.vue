<script setup lang="ts">
import { computed, ref } from 'vue'

import entradaAbono from '@/assets/entradas/entrada-1.jpg'
import entradaDia23 from '@/assets/entradas/entrada-2.jpg'
import entradaDia24 from '@/assets/entradas/entrada-3.jpg'
import entradaDia25 from '@/assets/entradas/entrada-4.jpg'
import graciasImagen from '@/assets/entradas/gracias.png'
import toteBagImagen from '@/assets/entradas/totebag.png'

type Entrada = {
  id: number
  nombre: string
  imagen: string
  descripcion: string
  rotacion: string
  color: string
}

const mostrarPantallaGracias = ref(false)

const entradas = ref<Entrada[]>([
  {
    id: 1,
    nombre: 'Entrada general 3 días',
    imagen: entradaAbono,
    descripcion: 'Esta entrada incluye acceso a todas las actividades de los tres días.',
    rotacion: '-rotate-6',
    color: '#004fff'
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
    color: '#f26a00'
  },
  {
    id: 4,
    nombre: 'Entrada día 25.10.26',
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

const entradasSeleccionadas = computed(() => {
  return entradas.value.filter((entrada) => {
    return (cantidades.value[entrada.id] ?? 0) > 0
  })
})

const hayAccesosSeleccionados = computed(() => {
  return entradasSeleccionadas.value.length > 0
})

const totalEntradasSeleccionadas = computed(() => {
  return entradasSeleccionadas.value.reduce((total, entrada) => {
    return total + (cantidades.value[entrada.id] ?? 0)
  }, 0)
})

function descargarImagen(url: string, nombreArchivo: string) {
  const enlace = document.createElement('a')

  enlace.href = url
  enlace.download = nombreArchivo

  enlace.click()
}

function descargarAccesos() {
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
      aria-label="Promoción de entradas"
    >
      <div class="cinta-descuento-pista">
        <div class="cinta-descuento-grupo">
          <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
          <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
          <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
        </div>

        <div
          class="cinta-descuento-grupo"
          aria-hidden="true"
        >
          <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
          <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
          <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
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
        <div
          class="promo-regalo"
          aria-label="Tote bag de regalo"
        >
          <span class="promo-etiqueta promo-etiqueta-arriba">Regalo</span>

          <img
            :src="toteBagImagen"
            alt="Tote bag de regalo"
            class="promo-imagen"
          >

          <span class="promo-etiqueta promo-etiqueta-abajo">con tus entradas</span>
        </div>

        <div
          v-if="hayAccesosSeleccionados"
          class="resumen-seleccion"
        >
          <p class="resumen-titulo">
            Has seleccionado {{ totalEntradasSeleccionadas }} entrada{{ totalEntradasSeleccionadas === 1 ? '' : 's' }}
          </p>

          <ul class="resumen-lista">
            <li
              v-for="entrada in entradasSeleccionadas"
              :key="entrada.id"
            >
              {{ cantidades[entrada.id] }} x {{ entrada.nombre }}
            </li>
          </ul>

          <button
            class="boton-comprar"
            @click="descargarAccesos"
          >
            Descargar accesos
          </button>
        </div>
        <p
          v-else
          class="aviso-accesos"
        >
          Selecciona la cantidad de entradas que quieres descargar.
        </p>
      </section>
    </section>

    <button
      v-if="mostrarPantallaGracias"
      type="button"
      class="pantalla-gracias"
      aria-label="Cerrar mensaje de entradas y volver"
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
  max-width: 920px;
  border-top: 8px solid #004fff;
  padding-top: 20px;
  display: grid;
  grid-template-columns: minmax(180px, 0.8fr) minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.promo-imagen {
  position: relative;
  z-index: 1;
  width: min(100%, 300px);
  border-radius: 28px;
  display: block;
  justify-self: center;
  filter: drop-shadow(16px 18px 0 color-mix(in srgb, var(--esclat-theme-color, #004fff) 72%, transparent));
}

.promo-regalo {
  position: relative;
  justify-self: center;
  width: min(100%, 340px);
  padding: 28px 18px 18px;
  transform: rotate(-4deg);
  transition: transform 220ms ease;
}

.promo-regalo:hover {
  transform: rotate(3deg) translateY(-10px) scale(1.04);
}

.promo-regalo::before {
  content: "";
  position: absolute;
  inset: 42px 0 10px;
  border: 3px solid var(--esclat-theme-color, #004fff);
  border-radius: 34px;
  transform: rotate(7deg);
}

.promo-etiqueta {
  position: absolute;
  z-index: 2;
  display: inline-block;
  border: 2px solid currentColor;
  border-radius: 999px;
  background: #ffffff;
  color: var(--esclat-theme-color, #004fff);
  padding: 0.3rem 0.7rem;
  font-size: clamp(18px, 2vw, 28px);
  font-weight: 700;
  line-height: 0.9;
  text-transform: uppercase;
}

.promo-etiqueta-arriba {
  top: 0;
  left: 0;
  transform: rotate(11deg);
}

.promo-etiqueta-abajo {
  right: -0.25rem;
  bottom: 0;
  transform: rotate(-7deg);
}

.resumen-seleccion {
  display: grid;
  gap: 14px;
  color: #004fff;
}

.resumen-titulo {
  margin: 0;
  font-size: clamp(24px, 3.4vw, 42px);
  font-weight: 700;
  line-height: 0.95;
}

.resumen-lista {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: clamp(16px, 2vw, 24px);
  font-weight: 700;
  line-height: 1.05;
}

.aviso-accesos {
  margin: 0;
  color: #004fff;
  font-size: clamp(20px, 3vw, 34px);
  font-weight: 700;
  line-height: 1;
  text-align: center;
}

.boton-comprar {
  background: #004fff;
  color: white;
  border: none;
  padding: 10px 18px;
  font-size: clamp(28px, 4vw, 42px);
  font-weight: 700;
  cursor: pointer;
  line-height: 0.95;
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
    justify-content: stretch;
  }

  .promo-imagen {
    width: min(100%, 240px);
  }

  .promo-regalo {
    width: min(100%, 280px);
    padding-top: 22px;
  }

  .boton-comprar {
    width: 100%;
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
