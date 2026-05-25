<script setup lang="ts">
import { computed, ref } from 'vue'

type Corto = {
  id: number
  titulo: string
  direccion: string
  duracion: string
  horario: string
  espacio: string
  cartel: string
  sinopsis: string
}

const cortos: Corto[] = [
  {
    id: 1,
    titulo: 'No als poalets',
    direccion: 'laura García Andreu',
    duracion: '20 min',
    horario: 'Día 25, 12:00',
    espacio: 'Sala Proyecciones',
    cartel: '/src/assets/proyecciones/corto-1.jpg',
    sinopsis: 'Los poalets, unos cubos de reciclaje, polarizan a un pueblo entero. Entre masivas protestas, las urnas decidirán si este delirante conflicto cambia su destino'
  },
  {
    id: 2,
    titulo: 'Utopías y otras especies',
    direccion: 'júlia Izaguirre',
    duracion: '17 min',
    horario: 'día 24, 12:00',
    espacio: 'Sala Proyecciones',
    cartel: '/src/assets/proyecciones/corto-2.jpg',
    sinopsis: 'Cercado por nuevos edificios en Vitoria, el barrio ocupado Errekaleor resiste el desalojo en red, entablando un diálogo entre la comunidad y su huerto.'
  },
  {
    id: 3,
    titulo: 'Madre',
    direccion: 'Rodrigo Sorogoyen',
    duracion: '18 min',
    horario: 'Día 23, 12:00',
    espacio: 'Sala Proyecciones',
    cartel: '/src/assets/proyecciones/corto-3.jpg',
    sinopsis: 'La cotidiana conversación entre Marta y su madre se convierte en una trágica situación contrarreloj cuando reciben una llamada de su hijo de 6 años desde una playa francesa perdido sin su padre.'
  },
  {
    id: 4,
    titulo: 'Zona Wao',
    direccion: 'Nagore Eceiza Mujika',
    duracion: '25 min',
    horario: 'Día 23, 18:30',
    espacio: 'Patio Central',
    cartel: '/src/assets/proyecciones/corto-4.jpg',
    sinopsis: ' Nominado al Goya a Mejor Corto Documental. Desde hace más de 50 años, empresas petroleras extraen petróleo de la Amazonía con mayor biodiversidad del planeta.'
  },
  {
    id: 5,
    titulo: 'Uli ',
    direccion: 'CMariana Gil',
    duracion: '17 min',
    horario: 'Día 25, 18:00',
    espacio: 'Sala Proyecciones',
    cartel: '/src/assets/proyecciones/corto-5.jpg',
    sinopsis: 'Una historia que aborda las metamorfosis ocurridas entre la niñez y la adolescencia, desde la imaginación de una zona donde construir nuevas formas de vincularse diversamente.'
  },
  {
    id: 6,
    titulo: 'Me',
    direccion: 'Don Hertzfeldt',
    duracion: '20 min',
    horario: 'Día 24, 18:00',
    espacio: 'Sala Proyecciones',
    cartel: '/src/assets/proyecciones/corto-6.jpg',
    sinopsis: 'Preseleccionado para los Oscar a mejor cortometraje de animación, el aclamado maestro de la animación Don Hertzfeldt ("World of Tomorrow") vuelve con esta odisea musical existencialista.'
  }
]

const cantidadVisible = 3
const carruselInicio = ref(0)

const indiceCentralVisible = computed(() => (carruselInicio.value + 1) % cortos.length)
const cortoSeleccionado = computed(() => cortos[indiceCentralVisible.value]!)

const cortosVisibles = computed(() => {
  const totalVisibles = Math.min(cantidadVisible, cortos.length)

  return Array.from({ length: totalVisibles }, (_, offset) => {
    const indiceReal = (carruselInicio.value + offset) % cortos.length
    return {
      indiceReal,
      offset,
      corto: cortos[indiceReal]!
    }
  })
})

function moverCarruselDerecha() {
  carruselInicio.value = (carruselInicio.value + 1) % cortos.length
}

function moverCarruselIzquierda() {
  carruselInicio.value = (carruselInicio.value - 1 + cortos.length) % cortos.length
}
</script>

<template>
  <main class="proyecciones-page min-h-screen px-4 py-28 text-zinc-900 sm:px-6">
    <img
      src="/src/assets/texturas/pixel.png"
      alt=""
      aria-hidden="true"
      class="pixel-texture pixel-texture-top"
    >
    <img
      src="/src/assets/texturas/pixel.png"
      alt=""
      aria-hidden="true"
      class="pixel-texture pixel-texture-bottom"
    >

    <section class="mx-auto max-w-6xl">
      <h1 class="title-proyecciones mb-8 leading-none text-black">
        Proyecciones
      </h1>

      <div class="carousel-wrap relative mx-auto max-w-[1500px] px-24 sm:px-28">
        <button
          class="arrow-btn left-0"
          aria-label="Cortos anteriores"
          @click="moverCarruselIzquierda"
        >
          ‹
        </button>

        <div class="cards-grid">
          <div
            v-for="{ corto, indiceReal, offset } in cortosVisibles"
            :key="`${corto.id}-${indiceReal}`"
            class="poster-card"
            :class="[
              offset === 0 ? 'is-left' : '',
              offset === 1 ? 'is-center' : '',
              offset === 2 ? 'is-right' : '',
              cortoSeleccionado.id === corto.id ? 'is-selected' : ''
            ]"
          >
            <img
              :src="corto.cartel"
              :alt="corto.titulo"
              class="poster-image"
            >
          </div>
        </div>

        <button
          class="arrow-btn right-0"
          aria-label="Siguientes cortos"
          @click="moverCarruselDerecha"
        >
          ›
        </button>
      </div>

      <article
        class="mt-44 mx-auto flex max-w-4xl flex-col items-center gap-7 text-center text-zinc-900"
      >
        <div>
          <p class="mb-3 text-sm uppercase tracking-[0.32em] text-zinc-700">
            Corto seleccionado
          </p>

          <h2 class="mb-4 text-3xl font-black sm:text-4xl">
            {{ cortoSeleccionado.titulo }}
          </h2>

          <p class="mb-1 text-lg"><strong>Direccion:</strong> {{ cortoSeleccionado.direccion }}</p>
          <p class="mb-1 text-lg"><strong>Duracion:</strong> {{ cortoSeleccionado.duracion }}</p>
          <p class="mb-1 text-lg"><strong>Horario:</strong> {{ cortoSeleccionado.horario }}</p>
          <p class="mb-4 text-lg"><strong>Espacio:</strong> {{ cortoSeleccionado.espacio }}</p>

          <p class="mx-auto max-w-2xl text-lg leading-relaxed text-zinc-800">
            {{ cortoSeleccionado.sinopsis }}
          </p>
        </div>

      </article>
    </section>
  </main>
</template>

<style scoped>
.title-proyecciones {
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(4rem, 10vw, 7rem);
  font-weight: 900;
  letter-spacing: -0.1em;
  position: relative;
  z-index: 2;
}

.proyecciones-page {
  background: #ffffff;
  position: relative;
  overflow: hidden;
}

.pixel-texture {
  position: absolute;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  opacity: 1;
}

.pixel-texture-top {
  top: -400px;
  left: -260px;
  width: 680px;
  z-index: 4;
}

.pixel-texture-bottom {
  right: -48px;
  bottom: -200px;
  width: 520;
}

.carousel-wrap {
  padding-top: 2rem;
  padding-bottom: 2rem;
  position: relative;
  z-index: 2;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 340px);
  gap: 1.6rem;
  align-items: end;
  justify-content: center;
}

.poster-card {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 0.85rem;
  background: #e7e7e7;
  color: #111;
  transition: transform 240ms ease, filter 240ms ease, box-shadow 240ms ease;
}

.poster-card.is-left {
  transform: perspective(900px) rotateY(14deg) scale(0.94);
  transform-origin: right center;
}

.poster-card.is-right {
  transform: perspective(900px) rotateY(-14deg) scale(0.94);
  transform-origin: left center;
}

.poster-card.is-center {
  transform: scale(1.02);
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.45);
}

.poster-card.is-selected {
  box-shadow: 0 16px 38px rgba(0, 0, 0, 0.45);
}

.poster-image {
  width: 340px;
  max-height: 560px;
  height: auto;
  object-fit: contain;
  display: block;
}

.arrow-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 15;
  height: 4rem;
  width: 4rem;
  border-radius: 9999px;
  border: 1px solid rgba(24, 24, 27, 0.35);
  background: rgba(24, 24, 27, 0.88);
  color: #fff;
  font-size: 2.4rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 180ms ease, transform 180ms ease;
}

.arrow-btn:hover {
  background: rgba(132, 204, 22, 0.9);
  color: #111;
}

.arrow-btn:active {
  transform: translateY(-50%) scale(0.96);
}

@media (max-width: 767px) {
  .pixel-texture-top {
    width: 210px;
    top: -24px;
    left: -26px;
  }

  .pixel-texture-bottom {
    width: 280px;
    right: -34px;
    bottom: -30px;
  }

  .cards-grid {
    grid-template-columns: repeat(3, 170px);
    gap: 0.75rem;
  }

  .poster-card.is-left,
  .poster-card.is-right {
    transform: scale(0.94);
  }

  .poster-image {
    width: 170px;
    max-height: 280px;
    height: auto;
  }

  .arrow-btn {
    height: 3rem;
    width: 3rem;
    font-size: 2rem;
  }
}
</style>
