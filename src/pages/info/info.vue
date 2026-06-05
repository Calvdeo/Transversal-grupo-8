<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

import mapaNivel1 from '@/assets/mapa/mapa-nivel-1.jpg'
import mapaNivel2 from '@/assets/mapa/mapa-nivel-2.jpg'
import texturaCeraGrande from '@/assets/texturas/ceraazul.png'
import texturaPixelGrande from '@/assets/texturas/pixelazul.png'
import texturaCeraNaranja from '@/assets/texturas/ceranaranja.png'
import texturaCeraRosa from '@/assets/texturas/cerarosa.png'
import texturaCeraVerde from '@/assets/texturas/ceraverde.png'
import texturaPixelNaranja from '@/assets/texturas/pixelnaranja.png'
import texturaPixelRosa from '@/assets/texturas/pixelrosa.png'
import texturaPixelVerde from '@/assets/texturas/pixelverde.png'
import videoEsclat from '@/assets/videos/animacion-prueba.mp4'

type Zona = {
  id: number
  nombre: string
  nivel: 1 | 2
  color: string
  actividades: ActividadInfo[]
}

type ActividadInfo = {
  titulo: string
  color: string
}

const COLOR_MUSICA = '#004fff'
const COLOR_TALLER = '#ff3f9e'
const COLOR_CHARLA = '#1f9f47'
const COLOR_CORTO = '#ff7a00'

const CLAVE_INDICE_TEMA = 'esclat-theme-index'
const archivosMapa = import.meta.glob(
  '../../assets/mapa/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
) as Record<string, string>

const zonaActiva = ref<number | null>(null)
const zonaFijada = ref<number | null>(null)
const admiteHover = ref(false)
const videoInfo = ref<HTMLVideoElement | null>(null)
const sonidoActivo = ref(true)
const mapaNivel1Actual = ref(mapaNivel1)
const mapaNivel2Actual = ref(mapaNivel2)
const texturaCeraActual = ref(texturaCeraGrande)
const texturaPixelActual = ref(texturaPixelGrande)

const zonas: Zona[] = [
  {
    id: 1,
    nombre: 'La Polivalent',
    nivel: 1,
    color: COLOR_CORTO,
    actividades: [
      { titulo: '"Madre" - Rodrigo Sorogoyen', color: COLOR_CORTO },
      { titulo: '"Zona Wao" - Nagore Eceiza Mujika', color: COLOR_CORTO },
      { titulo: '"Utopias y otras especies" - Julia Izaguirre', color: COLOR_CORTO },
      { titulo: '"Me" - Don Hertzfeldt', color: COLOR_CORTO },
      { titulo: '"No als poalets" - Laura Garcia Andreu', color: COLOR_CORTO },
      { titulo: '"Uli" - Mariana Gil', color: COLOR_CORTO }
    ]
  },
 
  {
    id: 3,
    nombre: 'Factoría',
    nivel: 2,
    color: COLOR_TALLER,
    actividades: [
      { titulo: 'Cadaver exquisito', color: COLOR_TALLER },
      { titulo: 'Escritura creativa', color: COLOR_TALLER },
      { titulo: 'Improvisacion teatral', color: COLOR_TALLER },
      { titulo: 'Clase de produccion musical', color: COLOR_TALLER },
      { titulo: 'Piel de platano - Miss Beige', color: COLOR_CHARLA },
      { titulo: 'La performance - TER', color: COLOR_CHARLA }
    ]
  },
  {
    id: 4,
    nombre: 'Visual Room',
    nivel: 2,
    color: COLOR_TALLER,
    actividades: [
      { titulo: 'Taller de cianotipia', color: COLOR_TALLER },
      { titulo: 'Taller de fanzines', color: COLOR_TALLER }
    ]
  },
  {
    id: 5,
    nombre: 'Sala de Exposiciones',
    nivel: 1,
    color: COLOR_CHARLA,
    actividades: [
      { titulo: 'Manipulamos o nos manipulan - Diego Álvarez', color: COLOR_CHARLA },
      { titulo: '¿Esta todo inventado? - PutoMikel', color: COLOR_CHARLA },
      { titulo: 'Espanul - Lamine Thior', color: COLOR_CHARLA },
      { titulo: 'Qué nos dice la música - Jaime Altozano', color: COLOR_CHARLA }
    ]
  },
  {
    id: 6,
    nombre: 'Patio 1',
    nivel: 1,
    color: COLOR_MUSICA,
    actividades: [
      { titulo: 'CORTE! / Escandaloso Xposito / La Paloma / Shego', color: COLOR_MUSICA },
      { titulo: 'La Fumiga / Aiko el grupo / Ariel Pink / Mala gestión', color: COLOR_MUSICA },
      { titulo: 'Los Punsetes / Las Petunias / Amor Liquido / zoo', color: COLOR_MUSICA }
    ]
  },
  {
    id: 7,
    nombre: 'Patio 2',
    nivel: 1,
    color: COLOR_MUSICA,
    actividades: [
      { titulo: 'Valeria Castro / Figa Flawas', color: COLOR_MUSICA },
      { titulo: 'El Kanka / Belen Aguilera', color: COLOR_MUSICA },
      { titulo: 'Silvana Estrada / Oques Grasses', color: COLOR_MUSICA }
    ]
  }
]

const zonasVisibles = computed(() => {
  return zonas.filter((zona) => zona.nombre !== 'Hall La Polivalent')
})

const zonaMostradaId = computed(() => {
  return zonaActiva.value ?? zonaFijada.value
})

const zonaSeleccionada = computed(() => {
  return zonasVisibles.value.find(
    (zona) => zona.id === zonaMostradaId.value
  )
})

const colorZonaSeleccionada = computed(() => {
  return zonaSeleccionada.value?.color ?? 'var(--esclat-theme-color, #004fff)'
})

function mostrarZonaTemporal(id: number) {
  if (!admiteHover.value) return

  zonaActiva.value = id
}

function ocultarZonaTemporal() {
  if (!admiteHover.value) return

  zonaActiva.value = null
}

function seleccionarZona(id: number) {
  zonaActiva.value = null
  zonaFijada.value = id
}

function alternarSonidoInfo() {
  const video = videoInfo.value
  sonidoActivo.value = !sonidoActivo.value

  if (!video) return

  video.muted = !sonidoActivo.value
  video.volume = sonidoActivo.value ? 1 : 0

  if (sonidoActivo.value) {
    video.play().catch(() => {
      sonidoActivo.value = false
      video.muted = true
    })
  }
}

function obtenerIndiceTemaGuardado() {
  let indiceTema = 0

  try {
    const guardado = window.localStorage.getItem(CLAVE_INDICE_TEMA)

    if (guardado !== null) {
      const numero = Number.parseInt(guardado, 10)

      if (Number.isFinite(numero)) {
        indiceTema = ((numero % 4) + 4) % 4
      }
    }
  } catch {
    indiceTema = 0
  }

  return indiceTema
}

function buscarMapaTematico(
  nivel: 1 | 2,
  palabrasClave: string[],
  fallback: string
) {
  const coincidencia = Object.entries(archivosMapa).find(([ruta]) => {
    const rutaNormalizada = ruta.toLowerCase()
    const coincideNivel =
      rutaNormalizada.includes(`nivel-${nivel}`) ||
      rutaNormalizada.includes(`nivel${nivel}`) ||
      rutaNormalizada.includes(`nave-${nivel}`) ||
      rutaNormalizada.includes(`nave${nivel}`)

    const coincideColor = palabrasClave.some((palabra) =>
      rutaNormalizada.includes(palabra)
    )

    return coincideNivel && coincideColor
  })

  return coincidencia?.[1] ?? fallback
}

onMounted(() => {
  admiteHover.value =
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  const indiceTema = obtenerIndiceTemaGuardado()
  const palabrasTema =
    [
      ['azul', 'blue'],
      ['naranja', 'orange'],
      ['rosa', 'pink', 'fucsia', 'magenta'],
      ['verde', 'green']
    ][indiceTema] ?? ['azul', 'blue']

  const texturasTema =
    [
      {
        cera: texturaCeraGrande,
        pixel: texturaPixelGrande
      },
      {
        cera: texturaCeraNaranja,
        pixel: texturaPixelNaranja
      },
      {
        cera: texturaCeraRosa,
        pixel: texturaPixelRosa
      },
      {
        cera: texturaCeraVerde,
        pixel: texturaPixelVerde
      }
    ][indiceTema] ?? {
      cera: texturaCeraGrande,
      pixel: texturaPixelGrande
    }

  mapaNivel1Actual.value = buscarMapaTematico(1, palabrasTema, mapaNivel1)
  mapaNivel2Actual.value = buscarMapaTematico(2, palabrasTema, mapaNivel2)
  texturaCeraActual.value = texturasTema.cera
  texturaPixelActual.value = texturasTema.pixel

  if (videoInfo.value) {
    videoInfo.value.muted = false
    videoInfo.value.volume = 1
    videoInfo.value.play().catch(() => {})
  }
})
</script>

<template>
  <main class="info-page">
    <section class="info-intro">
      <div
        class="info-texturas"
        :class="{ 'is-hovered': zonaActiva !== null }"
        aria-hidden="true"
      >
        <img :src="texturaCeraActual" alt="" class="info-textura info-textura-cera">
        <img :src="texturaPixelActual" alt="" class="info-textura info-textura-pixel">
      </div>

      <h1>¿Qué es esclat?</h1>

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

    <section class="info-video">
      <div class="info-video-marco">
        <div class="info-video-frame">
          <video
            ref="videoInfo"
            autoplay
            :muted="!sonidoActivo"
            loop
            playsinline
            class="info-video-player"
          >
            <source :src="videoEsclat" type="video/mp4">
          </video>

          <button
            class="info-video-sound"
            type="button"
            :aria-pressed="sonidoActivo"
            @click="alternarSonidoInfo"
          >
            {{ sonidoActivo ? 'Quitar sonido' : 'Activar sonido' }}
          </button>
        </div>
      </div>
    </section>

    <section class="info-mapa">
      <h2>Mapa del festival</h2>

      <div class="mapa-wrapper">
        <div class="mapa-main">
          <div class="mapas">
            <article class="mapa-bloque">
              <img
                :src="mapaNivel2Actual"
                alt="Mapa nivel 2"
                class="mapa-imagen"
              >
            </article>

            <article class="mapa-bloque">
              <img
                :src="mapaNivel1Actual"
                alt="Mapa nivel 1"
                class="mapa-imagen"
              >
            </article>
          </div>

          <div
            v-if="zonaSeleccionada"
            class="zona-info"
            :style="{ '--zona-color': colorZonaSeleccionada }"
          >
            <p class="zona-info-kicker">
              Nivel {{ zonaSeleccionada.nivel }}
            </p>

            <h3>
              {{ zonaSeleccionada.nombre }}
            </h3>

            <ul>
              <li
                v-for="actividad in zonaSeleccionada.actividades"
                :key="actividad.titulo"
                :style="{ '--actividad-color': actividad.color }"
              >
                {{ actividad.titulo }}
              </li>
            </ul>
          </div>

          <div
            v-else
            class="zona-info zona-info-vacia"
          >
            <p>Pasa el ratón o toca una zona numerada para ver qué ocurre ahí.</p>
          </div>
        </div>

        <aside class="mapa-panel">
          <div class="mapa-leyenda">
            <button
              v-for="(zona, indiceVisible) in zonasVisibles"
              :key="zona.id"
              class="leyenda-item"
              :class="zonaMostradaId === zona.id ? 'is-active' : ''"
              :aria-pressed="zonaMostradaId === zona.id"
              :style="{ '--zona-color': zona.color }"
              @pointerenter="mostrarZonaTemporal(zona.id)"
              @pointerleave="ocultarZonaTemporal()"
              @click="seleccionarZona(zona.id)"
            >
              <span>{{ String(indiceVisible + 1).padStart(2, '0') }}</span>
              {{ zona.nombre }}
            </button>
          </div>
        </aside>
      </div>

    </section>
  </main>
</template>

<style scoped>
.info-page {
  min-height: 100vh;
  background: #ffffff;
  color: var(--esclat-theme-color, #004fff);
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  overflow-x: hidden;
}

.info-intro {
  position: relative;
  width: min(100%, 1180px);
  margin: 0;
  padding: 8rem 1.5rem 4rem;
}

.info-texturas {
  position: absolute;
  top: clamp(0.5rem, 2vw, 1.5rem);
  right: clamp(-52rem, -36vw, -30rem);
  width: clamp(560px, 62vw, 920px);
  height: clamp(340px, 44vw, 680px);
  pointer-events: none;
  transform: rotate(50deg);
  transform-origin: center;
}

.info-textura {
  position: absolute;
  display: block;
  height: auto;
  transition:
    transform 220ms ease,
    opacity 220ms ease,
    filter 220ms ease;
}

.info-textura-cera {
  top: 0;
  right: 0;
  width: clamp(340px, 40vw, 620px);
  opacity: 0.96;
}

.info-textura-pixel {
  right: clamp(4rem, 11vw, 11rem);
  bottom: clamp(0.5rem, 2vw, 1.5rem);
  width: clamp(280px, 32vw, 460px);
  opacity: 0.82;
  transform: rotate(-8deg);
}

.info-texturas.is-hovered .info-textura-cera {
  opacity: 0.72;
  transform: translate3d(-18px, 8px, 0) rotate(8deg) scale(0.96);
}

.info-texturas.is-hovered .info-textura-pixel {
  opacity: 1;
  transform: translate3d(16px, -10px, 0) rotate(6deg) scale(1.08);
  filter: saturate(1.08);
}

.info-intro h1 {
  margin: 0 0 2rem;
  color: var(--esclat-theme-color, #004fff);
  font-size: clamp(3.4rem, 9vw, 8rem);
  line-height: 0.9;
  font-weight: 700;
  letter-spacing: -0.02em;
  text-align: left;
}

.info-columnas {
  max-width: 980px;
}

.info-columnas p {
  margin: 0;
  color: var(--esclat-theme-color, #004fff);
  font-size: clamp(1.15rem, 1.9vw, 1.9rem);
  line-height: 1.2;
}

.info-mapa {
  position: relative;
  width: 100%;
  padding: 2rem 0 8rem;
}

.info-mapa h2 {
  width: min(100%, 1180px);
  margin: 0 0 2rem;
  padding: 0 1.5rem;
  text-align: left;
  color: var(--esclat-theme-color, #004fff);
  font-size: clamp(3rem, 8vw, 8rem);
  line-height: 0.85;
  font-weight: 700;
}

.mapa-wrapper {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: clamp(32px, 4vw, 72px);
  align-items: start;
  width: min(100%, 1440px);
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

.mapa-main {
  display: grid;
  gap: 2.5rem;
  align-content: start;
}

.mapas {
  display: grid;
  grid-template-columns: minmax(0, 430px) minmax(0, 560px);
  gap: clamp(24px, 3vw, 48px);
  align-items: start;
  justify-content: start;
  padding: 0 clamp(12px, 2vw, 28px) 0 0;
}

.mapa-bloque:first-child {
  width: 100%;
}

.mapa-bloque:nth-child(2) {
  width: 100%;
}

.mapa-bloque {
  position: relative;
  max-width: none;
}

.mapa-imagen {
  width: 100%;
  display: block;
  height: auto;
  object-fit: contain;
}

.mapa-panel {
  position: sticky;
  top: 130px;
  display: grid;
  gap: 32px;
}

.mapa-leyenda {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.leyenda-item {
  display: flex;
  align-items: center;
  gap: 14px;
  border: none;
  background: transparent;
  color: var(--esclat-theme-color, #004fff);
  width: 100%;
  min-height: 56px;
  padding: 10px 12px;
  text-align: left;
  font-size: clamp(1.6rem, 2.4vw, 2.7rem);
  line-height: 1;
  font-weight: 700;
  cursor: pointer;
  opacity: 0.82;
  border-radius: 18px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition:
    transform 0.16s ease,
    background-color 0.16s ease,
    color 0.16s ease,
    opacity 0.16s ease;
}

.leyenda-item span {
  width: 34px;
  height: 34px;
  border-radius: 999px;
  border: 2px solid var(--esclat-theme-color, #004fff);
  background: #ffffff;
  color: var(--esclat-theme-color, #004fff);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  font-size: 0.95rem;
  font-weight: 700;
  transition:
    background-color 0.16s ease,
    box-shadow 0.16s ease,
    transform 0.16s ease;
}

.leyenda-item:hover,
.leyenda-item.is-active {
  color: var(--zona-color, var(--esclat-theme-color, #004fff));
  opacity: 1;
  background: color-mix(in srgb, var(--zona-color, var(--esclat-theme-color, #004fff)) 10%, white);
}

.leyenda-item:hover {
  transform: translateX(8px);
}

.leyenda-item:hover span,
.leyenda-item.is-active span {
  border-color: var(--zona-color, var(--esclat-theme-color, #004fff));
  background: var(--zona-color, var(--esclat-theme-color, #004fff));
  color: #ffffff;
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--zona-color, var(--esclat-theme-color, #004fff)) 18%, white);
  transform: scale(1.05);
}

.leyenda-item.is-active {
  font-weight: 800;
}

.zona-info {
  border-top: 2px solid var(--zona-color, var(--esclat-theme-color, #004fff));
  padding-top: 18px;
  color: var(--zona-color, var(--esclat-theme-color, #004fff));
}

.zona-info-kicker {
  margin: 0 0 6px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
}

.zona-info h3 {
  margin: 0 0 18px;
  font-size: clamp(2rem, 4vw, 4rem);
  line-height: 0.9;
  font-weight: 700;
}

.zona-info ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.zona-info li {
  padding-bottom: 8px;
  color: var(--actividad-color, currentColor);
  border-bottom: 1px solid var(--actividad-color, currentColor);
  font-size: 1.05rem;
}

.zona-info-vacia p {
  margin: 0;
  font-size: 1.1rem;
}
.info-video {
  width: 100%;
  padding: 1rem 0 5rem;
}

.info-video-marco {
  width: min(100%, 1180px);
  margin: 0 auto;
  padding: 0 1.5rem;
}

.info-video-frame {
  position: relative;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  border: 2px solid currentColor;
  border-radius: 2rem;
  background: #000;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.12);
}

.info-video-player {
  width: 100%;
  height: 100%;
  display: block;
  background: #000;
  object-fit: cover;
}

.info-video-sound {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  z-index: 2;
  border: 2px solid currentColor;
  border-radius: 999px;
  background: color-mix(in srgb, #ffffff 88%, transparent);
  color: var(--esclat-theme-color, #004fff);
  padding: 0.75rem 1.1rem;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.18);
}

.info-video-sound:hover {
  background: var(--esclat-theme-color, #004fff);
  color: #ffffff;
}

@media (max-width: 1200px) {
  .info-texturas {
    right: clamp(-32rem, -28vw, -18rem);
    width: clamp(460px, 54vw, 760px);
    height: clamp(280px, 38vw, 520px);
  }


  .mapa-wrapper {
    gap: 32px;
  }

  .mapas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 900px) {
  .info-intro {
    width: min(100%, 760px);
    padding: 6.5rem 1rem 3rem;
  }

  .info-intro h1 {
    margin-bottom: 1.25rem;
    font-size: clamp(3rem, 14vw, 5.6rem);
  }

  .info-columnas {
    max-width: none;
  }

  .info-columnas p {
    font-size: clamp(1.05rem, 3.8vw, 1.45rem);
  }

  .info-texturas {
    position: relative;
    top: auto;
    right: auto;
    width: clamp(220px, 62vw, 340px);
    height: clamp(150px, 40vw, 260px);
    margin: 0 0 1.25rem auto;
    transform: rotate(36deg);
  }

  .info-textura-cera {
    width: clamp(150px, 42vw, 240px);
  }

  .info-textura-pixel {
    right: clamp(1.5rem, 10vw, 4rem);
    width: clamp(120px, 34vw, 190px);
  }

  .info-mapa {
    padding: 1rem 0 5rem;
  }

  .info-video {
    padding: 0.75rem 0 4rem;
  }

  .info-video-marco {
    padding: 0 1rem;
  }

  .info-video-frame {
    border-width: 1.5px;
    border-radius: 1.5rem;
  }

  .info-mapa h2 {
    margin-bottom: 1.25rem;
    padding: 0 1rem;
    font-size: clamp(2.6rem, 12vw, 4.8rem);
  }

  .mapa-wrapper {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .mapa-main {
    gap: 1.5rem;
  }

  .mapas {
    min-height: auto;
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 0;
  }

  .mapa-bloque {
    position: relative;
    width: 100%;
  }

  .mapa-bloque:first-child,
  .mapa-bloque:nth-child(2) {
    top: auto;
    left: auto;
    width: 100%;
  }

  .mapa-panel {
    position: static;
    gap: 20px;
  }

  .mapa-leyenda {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .leyenda-item {
    align-items: center;
    gap: 12px;
    font-size: clamp(1.15rem, 3.6vw, 1.55rem);
    line-height: 1.02;
  }

  .leyenda-item span {
    width: 30px;
    height: 30px;
    flex: 0 0 30px;
  }

  .zona-info {
    padding-top: 14px;
  }

  .zona-info h3 {
    margin-bottom: 14px;
    font-size: clamp(1.75rem, 7vw, 3rem);
  }

  .zona-info li {
    font-size: 1rem;
  }

  .zona-info-vacia p {
    font-size: 1rem;
  }
}

@media (max-width: 640px) {
  .info-intro {
    padding: 6rem 0.75rem 2.5rem;
  }

  .info-texturas {
    width: min(250px, 72vw);
    height: 160px;
    margin-bottom: 1rem;
  }

  .info-video {
    padding: 0.5rem 0 3rem;
  }

  .info-video-marco {
    padding: 0 0.75rem;
  }

  .info-video-frame {
    border-radius: 1.1rem;
  }

  .info-textura-cera {
    width: min(180px, 52vw);
  }

  .info-textura-pixel {
    right: 0.75rem;
    bottom: 0.5rem;
    width: min(130px, 40vw);
  }

  .info-mapa h2 {
    padding: 0 0.75rem;
  }

  .mapa-wrapper {
    padding: 0 0.75rem;
  }

  .mapa-leyenda {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .leyenda-item {
    gap: 10px;
    font-size: 1.1rem;
  }

  .zona-info ul {
    gap: 6px;
  }

  .zona-info li {
    padding-bottom: 6px;
  }
}
</style>
