<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import { Eraser, Save } from 'lucide-vue-next'

import logoSubAzul from '@/assets/logo/logosubazul.png'
import imagenFondo1 from '@/assets/imagenes/imagenfondo1.jpg'

import texturaCeraGrande from '@/assets/texturas/ceraazul.png'
import texturaPixelGrande from '@/assets/texturas/pixelazul.png'
import texturaCeraNaranja from '@/assets/texturas/ceranaranja.png'
import texturaCeraRosa from '@/assets/texturas/cerarosa.png'
import texturaCeraVerde from '@/assets/texturas/ceraverde.png'
import texturaPixelNaranja from '@/assets/texturas/pixelnaranja.png'
import texturaPixelRosa from '@/assets/texturas/pixelrosa.png'
import texturaPixelVerde from '@/assets/texturas/pixelverde.png'
import logoSubNaranja from '@/assets/logo/logosubnaranja.png'
import logoSubRosa from '@/assets/logo/logosubrosa.png'
import logoSubVerde from '@/assets/logo/logosubverde.png'
import pequesAzul04 from '@/assets/texturas/peques-04.png'
import pequesAzul05 from '@/assets/texturas/peques-05.png'
import pequesAzul06 from '@/assets/texturas/peques-06.png'
import pequesAzul07 from '@/assets/texturas/peques-07.png'
import pequesNaranja04 from '@/assets/texturas/pequesnaranja (2).png'
import pequesNaranja05 from '@/assets/texturas/pequesnaranja (3).png'
import pequesNaranja06 from '@/assets/texturas/pequesnaranja (4).png'
import pequesNaranja07 from '@/assets/texturas/pequesnaranja (1).png'
import pequesRosa04 from '@/assets/texturas/pequesrosa-04.png'
import pequesRosa05 from '@/assets/texturas/pequesrosa-05.png'
import pequesRosa06 from '@/assets/texturas/pequesrosa-06.png'
import pequesRosa07 from '@/assets/texturas/pequesrosa-07.png'
import pequesVerde04 from '@/assets/texturas/pequesverde-04.png'
import pequesVerde05 from '@/assets/texturas/pequesverde-05.png'
import pequesVerde06 from '@/assets/texturas/pequesverde-06.png'
import pequesVerde07 from '@/assets/texturas/pequesverde-07.png'

type Pincel = {
  nombre: string
  valor: 'cera' | 'pixel' | 'posca' | 'subrayador'
  imagen: string
}

type Punto = {
  x: number
  y: number
}

type TemaVisual = {
  color: string
  logoSub: string
  texturaCera: string
  texturaPixel: string
  pequesSubrayador: string
  pequesPixel: string
  pequesCera: string
  pequesPosca: string
}

const lienzo = ref<HTMLCanvasElement | null>(null)
const estaPintando = ref(false)
const pincelActual = ref<Pincel | null>(null)
const ultimaPosicion = ref<Punto | null>(null)

const COLOR_AZUL = '#0040f2'
const ANCHO_LIENZO = 1700
const ALTO_LIENZO = 1100
const MARGEN_MARCO = 44
const MARGEN_PINTURA = 8

const FUENTE_INTER =
  '"Inter", "Helvetica Neue", Arial, sans-serif'

const fondoEscena = `url(${imagenFondo1})`
const videoInicioUrl = '/videos/inicio.mp4'

const coloresDisponibles = [
  '#fe8507',
  '#0040f2',
  '#fc0299',
  '#05d181'
] as const

const colorActual = ref<string>(coloresDisponibles[1])
const colorTema = ref(COLOR_AZUL)
const logoSubTema = ref(logoSubAzul)
const texturaCeraHero = ref(texturaCeraGrande)
const texturaPixelHero = ref(texturaPixelGrande)
const indiceTemaActual = ref(0)
const CLAVE_INDICE_TEMA = 'esclat-theme-index'

const temasVisuales: TemaVisual[] = [
  {
    color: '#0040f2',
    logoSub: logoSubAzul,
    texturaCera: texturaCeraGrande,
    texturaPixel: texturaPixelGrande,
    pequesSubrayador: pequesAzul04,
    pequesPixel: pequesAzul05,
    pequesCera: pequesAzul06,
    pequesPosca: pequesAzul07
  },
  {
    color: '#fe8507',
    logoSub: logoSubNaranja,
    texturaCera: texturaCeraNaranja,
    texturaPixel: texturaPixelNaranja,
    pequesSubrayador: pequesNaranja04,
    pequesPixel: pequesNaranja05,
    pequesCera: pequesNaranja06,
    pequesPosca: pequesNaranja07
  },
  {
    color: '#fc0299',
    logoSub: logoSubRosa,
    texturaCera: texturaCeraRosa,
    texturaPixel: texturaPixelRosa,
    pequesSubrayador: pequesRosa04,
    pequesPixel: pequesRosa05,
    pequesCera: pequesRosa06,
    pequesPosca: pequesRosa07
  },
  {
    color: '#05d181',
    logoSub: logoSubVerde,
    texturaCera: texturaCeraVerde,
    texturaPixel: texturaPixelVerde,
    pequesSubrayador: pequesVerde04,
    pequesPixel: pequesVerde05,
    pequesCera: pequesVerde06,
    pequesPosca: pequesVerde07
  }
]

const pinceles = computed<Pincel[]>(() => {
  const tema =
    temasVisuales[indiceTemaActual.value] ??
    temasVisuales[0]

  if (!tema) return []

  return [
    {
      nombre: 'Subrayador',
      valor: 'subrayador',
      imagen: tema.pequesSubrayador
    },
    {
      nombre: 'Cera',
      valor: 'cera',
      imagen: tema.pequesCera
    },
    {
      nombre: 'Pixel',
      valor: 'pixel',
      imagen: tema.pequesPixel
    },
    {
      nombre: 'Posca',
      valor: 'posca',
      imagen: tema.pequesPosca
    }
  ]
})

function obtenerMarcoPostal() {
  return {
    x: MARGEN_MARCO,
    y: MARGEN_MARCO,
    ancho: ANCHO_LIENZO - MARGEN_MARCO * 2,
    alto: ALTO_LIENZO - MARGEN_MARCO * 2
  }
}

function obtenerAreaPintable() {
  const marco = obtenerMarcoPostal()

  return {
    x: marco.x + MARGEN_PINTURA,
    y: marco.y + MARGEN_PINTURA,
    ancho: marco.ancho - MARGEN_PINTURA * 2,
    alto: marco.alto - MARGEN_PINTURA * 2
  }
}

function estaDentroDelAreaPintable(punto: Punto) {
  const area = obtenerAreaPintable()

  return (
    punto.x >= area.x &&
    punto.x <= area.x + area.ancho &&
    punto.y >= area.y &&
    punto.y <= area.y + area.alto
  )
}

function aplicarRecortePostal(contexto: CanvasRenderingContext2D) {
  const area = obtenerAreaPintable()

  contexto.beginPath()
  contexto.rect(area.x, area.y, area.ancho, area.alto)
  contexto.clip()
}

function prepararLienzo() {
  const canvas = lienzo.value

  if (!canvas) return

  const contexto = canvas.getContext('2d')

  if (!contexto) return

  const colorPostal = colorTema.value || COLOR_AZUL

  canvas.width = ANCHO_LIENZO
  canvas.height = ALTO_LIENZO

  const marco = obtenerMarcoPostal()

  contexto.fillStyle = '#ffffff'
  contexto.fillRect(0, 0, canvas.width, canvas.height)

  contexto.strokeStyle = colorPostal
  contexto.lineWidth = 5

  contexto.strokeRect(
    marco.x,
    marco.y,
    marco.ancho,
    marco.alto
  )

  const textoIzquierdaX = marco.x + 46
  const textoSuperiorY = marco.y + 58
  const textoDerechaX = marco.x + marco.ancho - 38
  const baseInferiorY = marco.y + marco.alto - 64

  contexto.fillStyle = colorPostal
  contexto.textBaseline = 'top'
  contexto.textAlign = 'left'

  const fechaY1 = baseInferiorY - 136
  const fechaY2 = baseInferiorY - 56

  contexto.font = `400 72px ${FUENTE_INTER}`

  contexto.fillText(
    '23.10',
    textoIzquierdaX,
    fechaY1
  )

  contexto.fillText(
    '25.10.2026',
    textoIzquierdaX,
    fechaY2
  )

  contexto.fillRect(
    textoIzquierdaX + 218,
    fechaY1 + 38,
    205,
    6
  )

  contexto.textAlign = 'right'
  contexto.font = `400 64px ${FUENTE_INTER}`

  contexto.fillText(
    'LAS NAVES,',
    textoDerechaX,
    baseInferiorY - 138
  )

  contexto.fillText(
    'VALÈNCIA',
    textoDerechaX,
    baseInferiorY - 68
  )

  contexto.font = `400 34px ${FUENTE_INTER}`

  contexto.fillText(
    'Entradas en: www.esclat.es',
    textoDerechaX,
    marco.y + marco.alto - 72
  )

  const logoSub = new Image()
  logoSub.src = logoSubTema.value

  logoSub.onload = () => {
    const logoSubAncho = Math.round(marco.ancho * 0.4)
    const proporcionOriginal =
      logoSub.height / logoSub.width
    const logoSubAlto = Math.round(
      logoSubAncho * proporcionOriginal
    )
    const logoSubX = textoIzquierdaX
    const logoSubY = textoSuperiorY - 6

    contexto.drawImage(
      logoSub,
      logoSubX,
      logoSubY,
      logoSubAncho,
      logoSubAlto
    )
  }
}

function obtenerPosicion(evento: MouseEvent) {
  const canvas = lienzo.value

  if (!canvas) {
    return { x: 0, y: 0 }
  }

  const rect = canvas.getBoundingClientRect()

  return {
    x:
      (evento.clientX - rect.left) *
      (canvas.width / rect.width),

    y:
      (evento.clientY - rect.top) *
      (canvas.height / rect.height)
  }
}

function empezarPintar(evento: MouseEvent) {
  const puntoInicial = obtenerPosicion(evento)

  if (!estaDentroDelAreaPintable(puntoInicial)) {
    return
  }

  estaPintando.value = true
  ultimaPosicion.value = puntoInicial

  pintarSegmento(
    puntoInicial,
    puntoInicial
  )
}

function terminarPintar() {
  estaPintando.value = false
  ultimaPosicion.value = null
}

function pintar(evento: MouseEvent) {
  if (
    !estaPintando.value ||
    !pincelActual.value
  ) {
    return
  }

  const posicionActual =
    obtenerPosicion(evento)

  const posicionAnterior =
    ultimaPosicion.value ??
    posicionActual

  if (pincelActual.value.valor === 'pixel') {
    const distanciaDesdeUltimaMarca = Math.hypot(
      posicionActual.x - posicionAnterior.x,
      posicionActual.y - posicionAnterior.y
    )

    if (distanciaDesdeUltimaMarca < 18) {
      return
    }
  }

  pintarSegmento(
    posicionAnterior,
    posicionActual
  )

  ultimaPosicion.value = posicionActual
}

function pintarSegmento(
  inicio: Punto,
  fin: Punto
) {
  const canvas = lienzo.value

  if (!canvas || !pincelActual.value) {
    return
  }

  const contexto = canvas.getContext('2d')

  if (!contexto) return

  if (pincelActual.value.valor === 'posca') {
    contexto.save()

    aplicarRecortePostal(contexto)

    contexto.strokeStyle = colorActual.value
    contexto.lineCap = 'round'
    contexto.lineJoin = 'round'
    contexto.lineWidth = 24

    contexto.beginPath()

    contexto.moveTo(inicio.x, inicio.y)
    contexto.lineTo(fin.x, fin.y)

    contexto.stroke()

    contexto.restore()

    return
  }

  if (pincelActual.value.valor === 'subrayador') {
    contexto.save()

    aplicarRecortePostal(contexto)

    contexto.strokeStyle = colorActual.value
    contexto.lineCap = 'square'

    contexto.globalAlpha = 0.55
    contexto.lineWidth = 44

    contexto.beginPath()

    contexto.moveTo(inicio.x, inicio.y)
    contexto.lineTo(fin.x, fin.y)

    contexto.stroke()

    contexto.restore()

    return
  }

  if (pincelActual.value.valor === 'cera') {
    const dx = fin.x - inicio.x
    const dy = fin.y - inicio.y

    const distancia = Math.hypot(dx, dy)

    const pasos = Math.max(
      4,
      Math.ceil(distancia / 2.5)
    )

    const longitud = Math.max(1, distancia)

    const nx = -dy / longitud
    const ny = dx / longitud

    contexto.save()

    aplicarRecortePostal(contexto)

    contexto.strokeStyle = colorActual.value
    contexto.lineCap = 'round'

    contexto.globalAlpha = 0.92
    contexto.lineWidth = 11

    contexto.beginPath()

    contexto.moveTo(inicio.x, inicio.y)
    contexto.lineTo(fin.x, fin.y)

    contexto.stroke()

    contexto.fillStyle = colorActual.value

    for (let i = 0; i <= pasos; i++) {
      const t = i / pasos

      const x = inicio.x + dx * t
      const y = inicio.y + dy * t

      for (let g = 0; g < 6; g++) {
        const offset =
          (Math.random() - 0.5) * 16

        const advance =
          (Math.random() - 0.5) * 3

        const jitterX =
          nx * offset +
          dx * (advance / (distancia + 1))

        const jitterY =
          ny * offset +
          dy * (advance / (distancia + 1))

        const tamano =
          0.8 + Math.random() * 1.6

        contexto.globalAlpha =
          0.35 + Math.random() * 0.45

        contexto.fillRect(
          x + jitterX,
          y + jitterY,
          tamano,
          tamano
        )
      }
    }

    contexto.restore()

    return
  }

  if (pincelActual.value.valor === 'pixel') {
    const radioBase = 8
    const irregularidad = 0.35
    const segmentos = 12

    contexto.save()

    aplicarRecortePostal(contexto)

    contexto.fillStyle = colorActual.value
    contexto.globalAlpha = 0.95

    contexto.beginPath()

    for (let i = 0; i <= segmentos; i++) {
      const angulo =
        (i / segmentos) * Math.PI * 2

      const factor =
        1 +
        (Math.random() * 2 - 1) *
          irregularidad

      const radio = radioBase * factor

      const x =
        fin.x + Math.cos(angulo) * radio

      const y =
        fin.y + Math.sin(angulo) * radio

      if (i === 0) {
        contexto.moveTo(x, y)
      } else {
        contexto.lineTo(x, y)
      }
    }

    contexto.closePath()
    contexto.fill()

    contexto.restore()
  }
}

function seleccionarPincel(pincel: Pincel) {
  pincelActual.value = pincel
}

function seleccionarColor(color: string) {
  colorActual.value = color
}

function limpiarLienzo() {
  ultimaPosicion.value = null
  prepararLienzo()
}

function exportarImagen() {
  const canvas = lienzo.value

  if (!canvas) return

  const enlace =
    document.createElement('a')

  enlace.download = 'postal-esclat.png'

  enlace.href = canvas.toDataURL('image/png')

  enlace.click()
}

function aplicarTemaActual() {
  let indiceTema = 0

  try {
    const guardado =
      window.localStorage.getItem(CLAVE_INDICE_TEMA)

    if (guardado !== null) {
      const numero = Number.parseInt(guardado, 10)

      if (Number.isFinite(numero)) {
        indiceTema =
          (numero + temasVisuales.length) %
          temasVisuales.length
      }
    }
  } catch {
    indiceTema = 0
  }

  const tema =
    temasVisuales[indiceTema] ?? temasVisuales[0]

  if (!tema) return

  indiceTemaActual.value = indiceTema
  colorTema.value = tema.color
  logoSubTema.value = tema.logoSub
  texturaCeraHero.value = tema.texturaCera
  texturaPixelHero.value = tema.texturaPixel
  colorActual.value = tema.color

  document.documentElement.style.setProperty(
    '--esclat-theme-color',
    tema.color
  )
}

onMounted(() => {
  aplicarTemaActual()
  pincelActual.value = pinceles.value[0] ?? null

  prepararLienzo()
})
</script>

<template>
  <main
    class="home-page"
    :style="{
      '--fondo-escena': fondoEscena,
      '--color-tema': colorTema
    }"
  >
    <section class="hero-home">
      <div
        id="inicio"
        class="hero-poster"
      >
        <img
          :src="logoSubTema"
          alt="Esclat subtítulo"
          class="hero-sub-logo"
        >

        <img
          :src="texturaCeraHero"
          alt=""
          class="hero-texture hero-texture-cera"
        >

        <img
          :src="texturaPixelHero"
          alt=""
          class="hero-texture hero-texture-pixel"
        >

        <div class="hero-date">
          <p>23.10</p>
          <p>25.10.2026</p>
        </div>

        <div class="hero-line"></div>

        <div class="hero-place">
          <p>LAS NAVES,</p>
          <p>VALÈNCIA</p>
        </div>
      </div>

      <section class="hero-video">
        <div class="hero-video-inner">
          <video
            class="hero-video-player"
            controls
            playsinline
            preload="metadata"
          >
            <source
              :src="videoInicioUrl"
              type="video/mp4"
            >
            Tu navegador no soporta vídeo HTML5.
          </video>
        </div>
      </section>
    </section>

    <section
      id="pizarra"
      class="studio"
    >
      <div class="studio-heading">
        <p class="studio-kicker">
          Participa
        </p>

        <h1 class="hero-title">
          ¿Cómo suena esclat para ti?
        </h1>

        <p class="studio-text">
          Compartelo y disfruta conociendo otras texturas
        </p>
      </div>

      <div class="workbench">
        <div class="actions actions-side">
          <button
            class="icon-action"
            aria-label="Borrar pizarra"
            @click="limpiarLienzo"
          >
            <Eraser
              :size="44"
              class="stamp-icon"
            />
          </button>

          <button
            class="icon-action"
            aria-label="Guardar imagen"
            @click="exportarImagen"
          >
            <Save
              :size="44"
              class="stamp-icon"
            />
          </button>

          <div class="color-list color-list-side">
            <button
              v-for="color in coloresDisponibles"
              :key="color"
              class="color-dot"
              :class="colorActual === color
                ? 'is-active'
                : ''"
              :style="{
                backgroundColor: color
              }"
              @click="seleccionarColor(color)"
            ></button>
          </div>
        </div>

        <div class="canvas-wrap">
          <canvas
            ref="lienzo"
            class="poster-canvas"
            @mousedown="empezarPintar"
            @mousemove="pintar"
            @mouseup="terminarPintar"
            @mouseleave="terminarPintar"
          ></canvas>
        </div>

        <aside class="tools-panel">
          <div class="brush-list">
            <button
              v-for="pincel in pinceles"
              :key="pincel.valor"
              class="brush-chip"
              :class="pincelActual?.valor === pincel.valor
                ? 'is-active'
                : ''"
              @click="seleccionarPincel(pincel)"
            >
              <img
                :src="pincel.imagen"
                :alt="pincel.nombre"
                class="brush-thumb"
              >
            </button>
          </div>

        </aside>
      </div>
    </section>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap');
.home-page {
  min-height: 100vh;
  overflow-x: hidden;

  background: #ffffff;

  color: var(--color-tema);

  font-family:
    "Alte Haas Grotesk",
    "Helvetica Neue",
    Arial,
    sans-serif;
}

.hero-home {
  min-height: 100vh;

  background: #ffffff;

  padding-top: 0;
}

.hero-poster {
  position: relative;

  min-height: 100vh;

  overflow: hidden;

  padding: 42px 36px;
}

.hero-sub-logo {
  position: absolute;
  left: 10px;
  top: 30px;
  z-index: 4;
  width: clamp(280px, 50vw, 800px);
  height: auto;
}

.hero-texture {
  position: absolute;

  z-index: 2;

  pointer-events: none;
}

.hero-texture-cera {
  width: clamp(500px, 62vw, 920px);

  left: 38%;
  top: -39%;

  transform: rotate(90deg);
  transform-origin: center;
}

.hero-texture-pixel {
  width: clamp(250px, 31vw, 520px);

  left: 33%;
  top: 2%;
}

.hero-date {
  position: absolute;

  left: 42px;
  bottom: 105px;

  z-index: 5;

  font-size: clamp(54px, 7vw, 112px);

  line-height: 0.86;
  letter-spacing: -0.05em;

  font-family:
    "Inter",
    "Helvetica Neue",
    Arial,
    sans-serif;

  font-weight: 400;
  color: var(--color-tema);
}

.hero-line {
  position: absolute;

  left: clamp(220px, 23vw, 420px);
  bottom:250px;

  width: clamp(160px, 17vw, 320px);

  height: 6px;

  background: var(--color-tema);
}

.hero-place {
  position: absolute;

  right: 50px;
  bottom: 90px;

  z-index: 5;

  text-align: right;

  font-size: clamp(50px, 6.4vw, 106px);

  line-height: 1.1;

  font-family:
    "Inter",
    "Helvetica Neue",
    Arial,
    sans-serif;

  font-weight: 400;
  color: var(--color-tema);
}

.hero-video {
  width: 100%;
  background: #ffffff;
  padding: 20px 16px 24px;
}

.hero-video-inner {
  width: min(100%, 1280px);
  margin: 0 auto;
}

.hero-video-player {
  width: 100%;
  display: block;
  border: 0;
  background: #000000;
}

.studio {
  min-height: auto;

  background: #ffffff;

  padding: 64px 24px 88px;
}

.studio-heading {
  max-width: 1820px;
  margin: 0 auto 28px;
  color: var(--color-tema);
}

.studio-kicker {
  color: var(--color-tema);
  font-size: 18px;
  text-transform: uppercase;
  letter-spacing: 0.35em;
}

.hero-title {
  color: var(--color-tema);
  font-size: clamp(38px, 5vw, 86px);
  font-weight: 700;
  line-height: 0.96;
  margin: 8px 0 10px;
}

.studio-text {
  max-width: 760px;
  color: var(--color-tema);
  font-size: clamp(18px, 1.8vw, 28px);
  line-height: 1.1;
}

.workbench {
  max-width: 1500px;

  margin: 0 auto;

  display: grid;

  grid-template-columns:
    clamp(46px, 6vw, 84px)
    minmax(0, 1fr)
    clamp(120px, 22vw, 300px);

  gap: clamp(8px, 1.4vw, 16px);

  align-items: stretch;
}

.actions-side {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: clamp(8px, 1.3vw, 14px);
  padding-top: clamp(8px, 1.8vw, 20px);
}

.canvas-wrap {
  min-width: 0;
}

.poster-canvas {
  width: 100%;

  aspect-ratio: 17 / 11;

  height: auto;
  min-height: 0;

  display: block;

  cursor: crosshair;

  background: #ffffff;
}

.tools-panel {
  display: flex;

  flex-direction: column;

  justify-content: flex-start;

  gap: clamp(8px, 1.2vw, 12px);

  min-height: 100%;
  padding-top: 0;
  padding-bottom: 0;
}

.brush-list {
  display: flex;

  flex-direction: column;

  justify-content: space-between;
  gap: 0;

  flex: 1;
}

.brush-chip {
  border: none;

  background: transparent;

  padding: 0;

  cursor: pointer;

  transition:
    transform 140ms ease,
    filter 140ms ease;
}

.brush-chip:hover {
  transform:
    scale(1.08)
    translateX(-12px);

  filter: drop-shadow(0 0 10px var(--color-tema));
}

.brush-chip.is-active {
  transform:
    translateX(-22px)
    scale(1.07);

  filter: drop-shadow(0 0 12px var(--color-tema));
}

.brush-thumb {
  width: 100%;

  height: clamp(58px, 10vw, 158px);

  object-fit: contain;

  object-position: center;

  display: block;
}

.color-list {
  display: flex;

  align-items: center;

  justify-content: flex-start;

  gap: 16px;

  padding-left: 2px;
  padding-bottom: 4px;
}

.color-list-side {
  flex-direction: column;
  justify-content: flex-start;
  gap: clamp(8px, 1.2vw, 12px);
  padding-left: 0;
  padding-bottom: 0;
}

.color-dot {
  width: clamp(30px, 3.8vw, 52px);
  height: clamp(30px, 3.8vw, 52px);

  border-radius: 999px;

  border: none;

  cursor: pointer;

  transition: transform 120ms ease;
}

.color-dot:hover {
  transform: scale(1.08);
}

.color-dot.is-active {
  box-shadow:
    0 0 0 2px #ffffff,
    0 0 0 4px var(--color-tema);
}

.stamp-icon {
  width: clamp(24px, 3.2vw, 44px);
  height: clamp(24px, 3.2vw, 44px);
  color: var(--color-tema);
  stroke-width: 2.1;
}

.icon-action {
  border: none;
  padding: 0;
  background: transparent;
  color: var(--color-tema);
  cursor: pointer;
  line-height: 0;
  transition:
    transform 120ms ease,
    filter 120ms ease,
    opacity 120ms ease;
}

.icon-action:hover {
  transform: scale(1.08);
  filter: drop-shadow(0 0 10px var(--color-tema));
}

.icon-action:active {
  transform: scale(0.96);
}

@media (max-width: 1120px) {
  .hero-texture-cera {
    width: clamp(660px, 70vw, 1180px);
    left: 29%;
    top: -15%;
    transform: rotate(80deg);
  }

  .hero-texture-pixel {
    width: clamp(520px, 36vw, 560px);
    left: 15%;
    top: 7%;
  }

  .hero-place {
    right: 28px;
  }

}

@media (max-width: 700px) {
  .hero-poster {
    height: min(100vh, 720px);
    height: min(100svh, 720px);
    min-height: 620px;
    padding: 28px 18px;
  }

  .hero-sub-logo {
    left: 14px;
    top: -6px;
    width: min(74vw, 500px);
  }

  .hero-date {
    font-size: clamp(34px, 8.2vw, 46px);
  }

  .hero-place {
    font-size: clamp(24px, 6.2vw, 34px);
  }
}

@media (max-width: 700px) {
  .studio {
    padding: 48px 14px 72px;
  }

  .hero-title {
    font-size: 42px;
  }

  .studio-text {
    font-size: 18px;
  }

  .poster-canvas {
    min-height: auto;
    aspect-ratio: 17 / 11;
  }

}

@media (orientation: portrait) and (max-width: 430px) {
  .hero-poster {
    height: clamp(430px, 69svh, 560px);
    min-height: 430px;
    padding: 18px 10px;
  }

  .hero-sub-logo {
    left: 6px;
    top: -14px;
    width: min(86vw, 370px);
  }

  .hero-texture-cera {
    width: 98vw;
    left: 50%;
    top: 18%;
    transform: rotate(96deg);
  }

  .hero-texture-pixel {
    width: 52vw;
    left: 6%;
    top: 50%;
  }

  .hero-date {
    left: 10px;
    bottom: 52px;
    font-size: clamp(26px, 9.4vw, 44px);
    line-height: 0.9;
  }

  .hero-line {
    left: 32%;
    bottom: 98px;
    width: 22vw;
    height: 4px;
  }

  .hero-place {
    right: 10px;
    bottom: 58px;
    font-size: clamp(18px, 7vw, 34px);
    line-height: 0.92;
  }

}

</style>
