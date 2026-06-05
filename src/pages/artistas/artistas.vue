<script setup lang="ts">
import { ref } from 'vue'

type Cantante = {
  id: number
  nombre: string
  hora: string
  escenario: string
  descripcion: string
  rutaImagen: string | null
}

const COLORES_ARTISTAS = [
  '#004fff',
  '#fe8507',
  '#fc0299',
  '#05d181'
] as const

const cantantes = ref<Cantante[]>([
  {
    id: 1,
    nombre: 'Belen Aguilera',
    hora: 'Dia 24, 17h',
    escenario: 'Patio 2',
    descripcion: 'Pop emocional con letras intimas y estribillos potentes.',
    rutaImagen: '/src/assets/artistas/art-05.jpg'
  },
  {
    id: 2,
    nombre: 'Silvana Estrada',
    hora: 'Dia 25, 19h',
    escenario: 'Patio 2',
    descripcion: 'Folk latino de voz delicada y arreglos acusticos organicos.',
    rutaImagen: '/src/assets/artistas/art-06.jpg'
  },
  {
    id: 3,
    nombre: 'El Kanka',
    hora: 'Dia 24, 21h',
    escenario: 'Patio 2',
    descripcion: 'Cancion de autor con humor, cercania y mucho carisma en directo.',
    rutaImagen: '/src/assets/artistas/art-07.jpg'
  },
  {
    id: 4,
    nombre: 'valeria Castro',
    hora: 'Dia 25, 20h15',
    escenario: 'Patio 2',
    descripcion: 'Pop de raiz con sensibilidad vocal y atmosfera cinematica.',
    rutaImagen: '/src/assets/artistas/art-08.jpg'
  },
  {
    id: 5,
    nombre: 'Figa Flawas',
    hora: 'Dia 25, 21h',
    escenario: 'Patio 2',
    descripcion: 'Ritmos urbanos y fiesta mediterranea con energia joven.',
    rutaImagen: '/src/assets/artistas/art-19.jpg'
  },
  {
    id: 6,
    nombre: 'Oques Grasses',
    hora: 'Dia 25, 21h45',
    escenario: 'Patio 2',
    descripcion: 'Mestizaje pop y electronica con himnos para cantar en grupo.',
    rutaImagen: '/src/assets/artistas/art-11.jpg'
  }
])

const cantantesSecundarios = ref<Cantante[]>([
  {
    id: 112,
    nombre: 'La Paloma',
    hora: 'Dia 23, 16h',
    escenario: 'Patio 1',
    descripcion: 'Rock alternativo con guitarras tensas y pulso post punk.',
    rutaImagen: '/src/assets/artistas/art-12.jpg'
  },
  {
    id: 113,
    nombre: 'Shego',
    hora: 'Dia 23, 11h',
    escenario: 'Patio 1',
    descripcion: 'Garage punk directo, ironico y lleno de actitud.',
    rutaImagen: '/src/assets/artistas/art-13.jpg'
  },
  {
    id: 114,
    nombre: 'Corte!',
    hora: 'Dia 23, 19h',
    escenario: 'Patio 1',
    descripcion: 'Post punk crudo y melodias rapidas para no parar de saltar.',
    rutaImagen: '/src/assets/artistas/art-14.jpg'
  },
  {
    id: 115,
    nombre: 'Escandaloso expósito',
    hora: 'Dia 23, 12h30',
    escenario: 'Patio 1',
    descripcion: 'Rap narrativo con metales, groove y mucha presencia escenica.',
    rutaImagen: '/src/assets/artistas/art-15.jpg'
  },
  {
    id: 116,
    nombre: 'Mala gestión',
    hora: 'Dia 24, 16h',
    escenario: 'Patio 1',
    descripcion: 'Indie pop fresco con estribillos pegadizos y actitud DIY.',
    rutaImagen: '/src/assets/artistas/art-16.jpg'
  },
  {
    id: 117,
    nombre: 'Aiko el grupo',
    hora: 'Dia 24, 12h30',
    escenario: 'Patio 1',
    descripcion: 'Punk pop afilado, divertido y sin filtros.',
    rutaImagen: '/src/assets/artistas/art-17.jpg'
  },
  {
    id: 118,
    nombre: 'Ariel Pink',
    hora: 'Dia 25, 16h',
    escenario: 'Patio 1',
    descripcion: 'Pop lo fi psicodelico con sonidos retro y raros encantadores.',
    rutaImagen: '/src/assets/artistas/art-18.jpg'
  },
  {
    id: 120,
    nombre: 'La fúmiga',
    hora: 'Dia 25, 17h30',
    escenario: 'Patio 1',
    descripcion: 'Brass pop festivo con letras cercanas y ritmo contagioso.',
    rutaImagen: '/src/assets/artistas/art-20.jpg'
  },
  {
    id: 121,
    nombre: 'Los Punsetes',
    hora: 'Dia 25, 18h15',
    escenario: 'Patio 1',
    descripcion: 'Indie rock mordaz con guitarras secas y humor negro.',
    rutaImagen: '/src/assets/artistas/art-21.jpg'
  },
  {
    id: 122,
    nombre: 'Las petunias',
    hora: 'Dia 25, 19h',
    escenario: 'Patio 1',
    descripcion: 'Punk pop irreverente con melodias simples y mucha chispa.',
    rutaImagen: '/src/assets/artistas/art-22.jpg'
  },
  {
    id: 123,
    nombre: 'Amor líquido',
    hora: 'Dia 25, 19h45',
    escenario: 'Patio 1',
    descripcion: 'Electro pop experimental con capas de voz y texturas densas.',
    rutaImagen: '/src/assets/artistas/art-23.jpg'
  }
])

const cantanteActivo = ref<Cantante | null>(null)
const spotifyEmbedUrl = 'https://open.spotify.com/embed/playlist/6tDLx8XUI6zjXoulHDEHvV?utm_source=generator&theme=0'

function crearMapaColoresSinRepeticion(
  bloques: Cantante[][]
) {
  const mapa = new Map<number, string>()
  let indiceAnterior = -1

  for (const bloque of bloques) {
    for (const cantante of bloque) {
      const indicesDisponibles =
        COLORES_ARTISTAS
          .map((_, indice) => indice)
          .filter(
            (indice) =>
              indice !== indiceAnterior
          )

      const indiceElegido =
        indicesDisponibles[
          Math.floor(
            Math.random() *
              indicesDisponibles.length
          )
        ] ?? 0

      const colorSeleccionado =
        COLORES_ARTISTAS[indiceElegido] ??
        COLORES_ARTISTAS[0]

      mapa.set(cantante.id, colorSeleccionado)
      indiceAnterior = indiceElegido
    }
  }

  return mapa
}

const mapaColorPorCantante =
  crearMapaColoresSinRepeticion([
    cantantes.value,
    cantantesSecundarios.value
  ])

function asignarColorAleatorioNuevo(id: number) {
  const colorActual =
    mapaColorPorCantante.get(id) ??
    COLORES_ARTISTAS[0]

  const opciones =
    COLORES_ARTISTAS.filter(
      (color) => color !== colorActual
    )

  const colorNuevo =
    opciones[
      Math.floor(
        Math.random() * opciones.length
      )
    ] ?? COLORES_ARTISTAS[0]

  mapaColorPorCantante.set(id, colorNuevo)
}

function obtenerColorCantante(id: number) {
  return (
    mapaColorPorCantante.get(id) ??
    COLORES_ARTISTAS[0]
  )
}

function activarCantante(cantante: Cantante) {
  cantanteActivo.value = cantante
}

function manejarHoverCantante(
  cantante: Cantante
) {
  asignarColorAleatorioNuevo(cantante.id)
  activarCantante(cantante)
}

function limpiarCantanteActivo() {
  cantanteActivo.value = null
}
</script>

<template>
  <main class="fondo-cantantes min-h-screen px-6 py-24 sm:px-10">
    <section class="panel-cantantes mx-auto max-w-[1320px] p-8 sm:p-10">
      <header class="mb-12 flex items-start justify-between gap-4">
        <h1 class="titulo-cantantes">Artistas</h1>
      </header>

      <div class="rejilla-cantantes">
        <button
          v-for="cantante in cantantes"
          :key="cantante.id"
          type="button"
          class="tarjeta-cantante"
          @pointerenter="manejarHoverCantante(cantante)"
          @pointerleave="limpiarCantanteActivo"
          @click="manejarHoverCantante(cantante)"
          @focus="activarCantante(cantante)"
          @blur="limpiarCantanteActivo"
        >
         

          <div
            v-if="cantante.rutaImagen"
            class="miniatura-cantante"
            :style="{
              '--tinte-cantante': obtenerColorCantante(cantante.id)
            }"
          >
            <img
              :src="cantante.rutaImagen"
              :alt="cantante.nombre"
              class="imagen-cantante"
            >
            <div
              class="overlay-cantante"
              :class="{ 'is-visible': cantanteActivo?.id === cantante.id }"
            >
              <p class="overlay-nombre">{{ cantante.nombre }}</p>
              <p>{{ cantante.hora }}</p>
              <p>{{ cantante.escenario }}</p>
              <p class="overlay-descripcion">{{ cantante.descripcion }}</p>
            </div>
          </div>

          <div
            v-else
            class="hueco-cantante"
          >
            Foto pendiente
          </div>
        </button>
      </div>

      <p class="etiqueta-bloque etiqueta-secundaria"></p>
      <div class="rejilla-secundaria">
        <button
          v-for="cantante in cantantesSecundarios"
          :key="cantante.id"
          type="button"
          class="tarjeta-secundaria"
          @pointerenter="manejarHoverCantante(cantante)"
          @pointerleave="limpiarCantanteActivo"
          @click="manejarHoverCantante(cantante)"
          @focus="activarCantante(cantante)"
          @blur="limpiarCantanteActivo"
        >
          <div
            class="miniatura-secundaria"
            :style="{
              '--tinte-cantante': obtenerColorCantante(cantante.id)
            }"
          >
            <img
              :src="cantante.rutaImagen!"
              :alt="cantante.nombre"
              class="imagen-cantante"
            >
            <div
              class="overlay-cantante"
              :class="{ 'is-visible': cantanteActivo?.id === cantante.id }"
            >
              <p class="overlay-nombre">{{ cantante.nombre }}</p>
              <p>{{ cantante.hora }}</p>
              <p>{{ cantante.escenario }}</p>
              <p class="overlay-descripcion">{{ cantante.descripcion }}</p>
            </div>
          </div>
        </button>
      </div>

      <section
        class="spotify-preview"
        aria-label="Reproductor de Spotify"
      >
        <iframe
          class="spotify-embed"
          :src="spotifyEmbedUrl"
          loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </section>
    </section>
  </main>
</template>

<style scoped>
.fondo-cantantes {
  background-color: #ffffff !important;
  background-image: none;
}

.panel-cantantes {
  background: transparent;
}

.titulo-cantantes {
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  text-align: left;
  font-size: 11.25rem;
  letter-spacing: 0;
  font-weight: 700;
  line-height: 0.8;
  color: var(--esclat-theme-color, #004fff);
}

.spotify-preview {
  margin: 2.4rem auto 0;
  width: min(100%, 980px);
}

.spotify-embed {
  width: 100%;
  height: 352px;
  border: 0;
  border-radius: 16px;
  display: block;
  background: #0b0b0b;
}

.texto-auxiliar {
  font-size: 0.92rem;
  opacity: 0.7;
}

.etiqueta-bloque {
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  opacity: 0.72;
  margin-bottom: 0.45rem;
}

.rejilla-cantantes {
  display: flex;
  gap: 0;
  align-items: flex-end;
  overflow: hidden;
  width: 100vw;
  margin-left: calc(50% - 50vw);
}

.tarjeta-cantante {
  flex: 1 1 0;
  min-width: 0;
  border: 0;
  appearance: none;
  background: transparent;
  text-align: left;
  padding: 0;
  cursor: default;
  position: relative;
  overflow: hidden;
  transition: flex 280ms ease;
}

.nombre-cantante {
  font-size: 1.15rem;
  margin-bottom: 0.35rem;
}

.miniatura-cantante,
.hueco-cantante {
  width: 100%;
  height: 360px;
  transition: box-shadow 260ms ease;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.miniatura-cantante::after,
.miniatura-secundaria::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: var(--tinte-cantante, #004fff);
  mix-blend-mode: multiply;
  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms ease;
}

.tarjeta-cantante:hover .miniatura-cantante::after,
.tarjeta-secundaria:hover .miniatura-secundaria::after {
  opacity: 0.86;
}

.imagen-cantante {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: relative;
  z-index: 0;
  transition: transform 280ms ease;
}

.rejilla-cantantes:hover .tarjeta-cantante {
  flex: 0.52 1 0;
}

.tarjeta-cantante:hover {
  flex: 4.6 1 0;
}

.tarjeta-cantante:hover .miniatura-cantante,
.tarjeta-cantante:hover .hueco-cantante {
  box-shadow: 0 24px 44px rgba(0, 0, 0, 0.24);
}

.tarjeta-cantante:hover .imagen-cantante {
  transform: scale(1.2);
}

.etiqueta-secundaria {
  margin-top: 2.4rem;
}

.rejilla-secundaria {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0;
  width: 100%;
  overflow: visible;
}

.tarjeta-secundaria {
  flex: 0 0 calc(100% / 7);
  border: 0;
  appearance: none;
  background: transparent;
  text-align: left;
  padding: 0;
  overflow: hidden;
}

.miniatura-secundaria {
  width: 100%;
  aspect-ratio: 1 / 1;
  height: auto;
  transition: box-shadow 220ms ease;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.tarjeta-secundaria:hover .imagen-cantante {
  transform: scale(1.16);
}

.tarjeta-secundaria:hover .miniatura-secundaria {
  box-shadow: 0 14px 26px rgba(0, 0, 0, 0.18);
}

.tarjeta-cantante:focus-visible,
.tarjeta-secundaria:focus-visible {
  outline: 3px solid var(--esclat-theme-color, #004fff);
  outline-offset: 4px;
  z-index: 3;
}

.hueco-cantante {
  border: 1px dashed #777;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #555;
  background: #f1f1f1;
}

.overlay-cantante {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: rgba(255, 255, 255, 0.55);
  color: #004fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 0.2rem;
  padding: 1rem;
  font-size: 0.82rem;
  line-height: 1.3;
  opacity: 0;
  transform: translateY(8px);
  transition: opacity 220ms ease, transform 220ms ease;
  pointer-events: none;
}

.overlay-cantante.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.tarjeta-cantante:focus-visible .overlay-cantante,
.tarjeta-secundaria:focus-visible .overlay-cantante {
  opacity: 1;
  transform: translateY(0);
}

.overlay-nombre {
  font-size: 1rem;
  font-weight: 700;
}

.overlay-descripcion {
  margin-top: 0.35rem;
  font-size: 0.76rem;
  line-height: 1.28;
}

.texto-ayuda-hover {
  opacity: 0.75;
}

@media (max-width: 980px) {
  .titulo-cantantes {
    font-size: 8rem;
  }

  .spotify-preview {
    margin: 2rem auto 0;
  }

  .spotify-embed {
    height: 300px;
  }

  .rejilla-cantantes {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
    width: 100%;
    margin-left: 0;
    overflow: visible;
  }

  .tarjeta-cantante {
    flex: unset;
  }

  .miniatura-cantante,
  .hueco-cantante {
    height: 250px;
  }

  .rejilla-cantantes:hover .tarjeta-cantante,
  .tarjeta-cantante:hover {
    flex: unset;
  }

  .rejilla-secundaria {
    justify-content: center;
  }

  .tarjeta-secundaria {
    flex: 0 0 calc(100% / 4);
  }

  .miniatura-secundaria {
    aspect-ratio: 1 / 1;
    height: auto;
  }
}

@media (max-width: 760px) {
  .fondo-cantantes {
    padding: 7.5rem 1.25rem 3.5rem !important;
  }

  .panel-cantantes {
    padding: 0 !important;
  }

  .titulo-cantantes {
    width: 100%;
    margin-left: 0;
    font-size: 5.75rem;
    line-height: 0.9;
  }

  .rejilla-cantantes {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .miniatura-cantante,
  .hueco-cantante {
    height: auto;
    aspect-ratio: 4 / 5;
  }

  .rejilla-secundaria {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .tarjeta-secundaria {
    flex: unset;
  }

  .miniatura-secundaria {
    aspect-ratio: 4 / 5;
  }
}

@media (max-width: 640px) {
  .titulo-cantantes {
    font-size: 4.25rem;
  }

  .rejilla-cantantes {
    gap: 0.55rem;
  }

  .rejilla-secundaria {
    gap: 0.55rem;
  }

  .miniatura-cantante,
  .miniatura-secundaria,
  .hueco-cantante {
    aspect-ratio: 1 / 1;
  }

  .overlay-cantante {
    padding: 0.65rem;
    font-size: 0.72rem;
    gap: 0.08rem;
  }

  .overlay-nombre {
    font-size: 0.8rem;
  }

  .overlay-descripcion {
    display: none;
  }

  .spotify-embed {
    height: 232px;
    border-radius: 12px;
  }
}

@media (max-width: 420px) {
  .fondo-cantantes {
    padding-inline: 1rem !important;
  }

  .titulo-cantantes {
    font-size: 3.5rem;
  }

  .fondo-cantantes {
    padding-top: 7.25rem !important;
  }
}

@media (hover: none) {
  .miniatura-cantante::after,
  .miniatura-secundaria::after {
    opacity: 0.78;
  }

  .overlay-cantante {
    opacity: 1;
    transform: none;
    background: linear-gradient(
      to top,
      rgba(255, 255, 255, 0.92),
      rgba(255, 255, 255, 0.2)
    );
  }

  .tarjeta-cantante:hover .imagen-cantante,
  .tarjeta-secundaria:hover .imagen-cantante {
    transform: none;
  }
}
</style>
