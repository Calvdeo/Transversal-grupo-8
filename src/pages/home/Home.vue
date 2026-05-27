<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import logoEsclat from '@/assets/logo/logoazul.png'
import imagenFondo1 from '@/assets/imagenes/imagenfondo1.jpg'

import texturaCera from '@/assets/texturas/peques-06.png'
import texturaPixel from '@/assets/texturas/peques-05.png'
import texturaPosca from '@/assets/texturas/peques-07.png'
import texturaMenu from '@/assets/texturas/peques-04.png'

type Pincel = {
  nombre: string
  valor: 'cera' | 'pixel' | 'posca' | 'subrayador'
  imagen: string
}

type Punto = {
  x: number
  y: number
}

const lienzo = ref<HTMLCanvasElement | null>(null)
const estaPintando = ref(false)
const pincelActual = ref<Pincel | null>(null)
const ultimaPosicion = ref<Punto | null>(null)

const COLOR_AZUL = '#014fff'
const ANCHO_LIENZO = 1700
const ALTO_LIENZO = 1100
const MARGEN_MARCO = 44
const MARGEN_PINTURA = 8

const FUENTE_POSTAL =
  '"Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif'

const fondoEscena = `url(${imagenFondo1})`

const coloresDisponibles = [
  '#fe8507',
  '#014fff',
  '#fc0299',
  '#05d181'
] as const

const colorActual = ref<string>(coloresDisponibles[1])

const pinceles: Pincel[] = [
  {
    nombre: 'Subrayador',
    valor: 'subrayador',
    imagen: texturaMenu
  },
  {
    nombre: 'Cera',
    valor: 'cera',
    imagen: texturaCera
  },
  {
    nombre: 'Pixel',
    valor: 'pixel',
    imagen: texturaPixel
  },
  {
    nombre: 'Posca',
    valor: 'posca',
    imagen: texturaPosca
  }
]

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

  canvas.width = ANCHO_LIENZO
  canvas.height = ALTO_LIENZO

  const marco = obtenerMarcoPostal()

  contexto.fillStyle = '#ffffff'
  contexto.fillRect(0, 0, canvas.width, canvas.height)

  contexto.strokeStyle = COLOR_AZUL
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

  contexto.fillStyle = COLOR_AZUL
  contexto.textBaseline = 'top'

  contexto.font = `300 46px ${FUENTE_POSTAL}`
  contexto.textAlign = 'left'

  contexto.fillText(
    'FESTIVAL DE',
    textoIzquierdaX,
    textoSuperiorY
  )

  contexto.fillText(
    'MÚSICA,',
    textoIzquierdaX,
    textoSuperiorY + 50
  )

  contexto.fillText(
    'PENSAMENT I',
    textoIzquierdaX,
    textoSuperiorY + 100
  )

  contexto.fillText(
    'CREATIVITAT',
    textoIzquierdaX,
    textoSuperiorY + 150
  )

  const fechaY1 = baseInferiorY - 136
  const fechaY2 = baseInferiorY - 56

  contexto.font = `700 72px ${FUENTE_POSTAL}`

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
  contexto.font = `300 64px ${FUENTE_POSTAL}`

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

  contexto.font = `300 34px ${FUENTE_POSTAL}`

  contexto.fillText(
    'Entradas en: www.esclat.es',
    textoDerechaX,
    marco.y + marco.alto - 72
  )

  const logo = new Image()

  logo.src = logoEsclat

  logo.onload = () => {
    const logoAncho = Math.round(marco.ancho * 0.49)

    const proporcionOriginal =
      logo.height / logo.width

    const logoAlto = Math.round(
      logoAncho * proporcionOriginal
    )

    const logoX = textoDerechaX - logoAncho
    const logoY = marco.y - 8

    contexto.drawImage(
      logo,
      logoX,
      logoY,
      logoAncho,
      logoAlto
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
    const tamanoPixel = 14

    const dx = fin.x - inicio.x
    const dy = fin.y - inicio.y

    const distancia = Math.hypot(dx, dy)

    const pasos = Math.max(
      1,
      Math.ceil(distancia / (tamanoPixel / 2))
    )

    contexto.save()

    aplicarRecortePostal(contexto)

    contexto.fillStyle = colorActual.value

    for (let i = 0; i <= pasos; i++) {
      const t = i / pasos

      const x = inicio.x + dx * t
      const y = inicio.y + dy * t

      const pixelX =
        Math.round(x / tamanoPixel) *
        tamanoPixel

      const pixelY =
        Math.round(y / tamanoPixel) *
        tamanoPixel

      contexto.fillRect(
        pixelX,
        pixelY,
        tamanoPixel,
        tamanoPixel
      )
    }

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

onMounted(() => {
  pincelActual.value = pinceles[0] ?? null

  prepararLienzo()
})
</script>

<template>
  <main
    class="home-page"
    :style="{ '--fondo-escena': fondoEscena }"
  >
    <section class="hero-home">
      <div
        id="inicio"
        class="hero-poster"
      >
        <div class="hero-info">
          <p>FESTIVAL DE</p>
          <p>MÚSICA,</p>
          <p>PENSAMENT I</p>
          <p>CREATIVITAT</p>
        </div>

        <img
          :src="logoEsclat"
          alt="ESCLAT"
          class="hero-main-logo"
        >

        <img
          :src="texturaCera"
          alt=""
          class="hero-texture hero-texture-cera"
        >

        <img
          :src="texturaPixel"
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
          Este cartel no está terminado.
        </h1>

        <p class="studio-text">
          Añade una textura, una forma o
          un gesto utilizando los
          pinceles de ESCLAT.
        </p>
      </div>

      <div class="workbench">
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

          <div class="color-list">
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
        </aside>
      </div>

      <div class="actions">
        <button
          class="stamp-button"
          @click="limpiarLienzo"
        >
          Borrar
        </button>

        <button
          class="stamp-button"
          @click="exportarImagen"
        >
          Guardar
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  overflow-x: hidden;

  background: #ffffff;

  color: #014fff;

  font-family:
    "Alte Haas Grotesk",
    "Helvetica Neue",
    Arial,
    sans-serif;
}

.hero-home {
  min-height: 100vh;

  background: #ffffff;

  padding-top: 110px;
}

.hero-poster {
  position: relative;

  min-height: calc(100vh - 110px);

  overflow: hidden;

  padding: 42px 36px;
}

.hero-info {
  position: absolute;

  left: 36px;
  top: 42px;

  z-index: 4;

  color: #014fff;

  font-size: clamp(22px, 2.4vw, 39px);

  line-height: 0.98;

  font-weight: 700;
}

.hero-main-logo {
  position: absolute;

  top: 70px;
  right: 58px;

  z-index: 4;

  width: clamp(360px, 48vw, 820px);

  height: auto;
}

.hero-texture {
  position: absolute;

  z-index: 2;

  pointer-events: none;
}

.hero-texture-cera {
  width: clamp(560px, 70vw, 1080px);

  left: 14%;
  top: 26%;
}

.hero-texture-pixel {
  width: clamp(260px, 34vw, 560px);

  left: 8%;
  top: 48%;
}

.hero-date {
  position: absolute;

  left: 42px;
  bottom: 105px;

  z-index: 5;

  font-size: clamp(54px, 7vw, 112px);

  line-height: 0.86;

  font-weight: 300;
}

.hero-line {
  position: absolute;

  left: clamp(220px, 23vw, 420px);
  bottom: 175px;

  width: clamp(160px, 17vw, 320px);

  height: 6px;

  background: #014fff;
}

.hero-line::after {
  content: "";

  position: absolute;

  right: -10px;
  top: -7px;

  width: 20px;
  height: 20px;

  border-radius: 999px;

  background: #014fff;
}

.hero-place {
  position: absolute;

  right: 50px;
  bottom: 120px;

  z-index: 5;

  text-align: right;

  font-size: clamp(50px, 6.4vw, 106px);

  line-height: 0.88;

  font-weight: 300;
}

.studio {
  min-height: 100vh;

  background-image:
    linear-gradient(
      rgba(0, 0, 0, 0.34),
      rgba(0, 0, 0, 0.34)
    ),
    var(--fondo-escena);

  background-size: cover;

  background-position: center;

  background-attachment: fixed;

  padding: 90px 24px 120px;
}

.studio-heading {
  max-width: 1820px;

  margin: 0 auto 28px;

  color: #ffffff;
}

.studio-kicker {
  color: #ffffff;

  font-size: 18px;

  text-transform: uppercase;

  letter-spacing: 0.35em;
}

.hero-title {
  color: #ffffff;

  font-size: clamp(38px, 5vw, 86px);

  font-weight: 700;

  line-height: 0.96;

  margin: 8px 0 10px;
}

.studio-text {
  max-width: 760px;

  color: #ffffff;

  font-size: clamp(18px, 1.8vw, 28px);

  line-height: 1.1;
}

.workbench {
  max-width: 1820px;

  margin: 0 auto;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    340px;

  gap: 16px;

  align-items: stretch;
}

.canvas-wrap {
  min-width: 0;
}

.poster-canvas {
  width: 100%;

  aspect-ratio: 17 / 11;

  min-height: min(78vh, 980px);

  display: block;

  cursor: crosshair;

  background: #ffffff;
}

.tools-panel {
  display: flex;

  flex-direction: column;

  justify-content: flex-start;

  gap: 22px;

  min-height: 100%;
}

.brush-list {
  display: flex;

  flex-direction: column;

  justify-content: space-between;

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

  filter:
    drop-shadow(
      0 0 10px rgba(1, 79, 255, 0.45)
    );
}

.brush-chip.is-active {
  transform:
    translateX(-22px)
    scale(1.07);

  filter:
    drop-shadow(
      0 0 12px rgba(1, 79, 255, 0.55)
    );
}

.brush-thumb {
  width: 100%;

  height: 190px;

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

.color-dot {
  width: 52px;
  height: 52px;

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
    0 0 0 4px #014fff;
}

.actions {
  max-width: 1820px;

  margin: 18px auto 0;

  display: flex;

  gap: 22px;

  padding-left: 24px;
}

.stamp-button {
  border: none;

  padding: 10px 26px;

  color: #ffffff;

  background: #014fff;

  font-family:
    "Alte Haas Grotesk",
    "Helvetica Neue",
    Arial,
    sans-serif;

  font-size: 50px;

  font-weight: 700;

  line-height: 1;

  cursor: pointer;

  clip-path: polygon(
    6% 0,
    94% 0,
    100% 20%,
    95% 100%,
    5% 100%,
    0 18%
  );
}

@media (max-width: 1120px) {
  .hero-main-logo {
    top: 125px;
    right: 28px;
  }

  .hero-texture-cera {
    left: -4%;
    top: 34%;
  }

  .hero-texture-pixel {
    left: 2%;
    top: 55%;
  }

  .hero-place {
    right: 28px;
  }

  .workbench {
    grid-template-columns: 1fr;
  }

  .tools-panel {
    gap: 16px;
  }

  .brush-list {
    display: grid;

    grid-template-columns:
      repeat(2, minmax(0, 1fr));

    gap: 10px;
  }

  .actions {
    padding-left: 0;

    justify-content: flex-start;

    flex-wrap: wrap;
  }

  .stamp-button {
    font-size: 42px;
  }
}
</style>