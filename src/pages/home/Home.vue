<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import logoEsclat from '@/assets/logo/logoazul.png'
import imagenFondo1 from '@/assets/imagenes/imagenfondo1.jpg'
import texturaCera from '@/assets/texturas/peques-06.png'
import texturaPixel from '@/assets/texturas/peques-05.png'
import texturaPosca from '@/assets/texturas/peques-07.png'
import texturaSubrayador from '@/assets/texturas/peques-04.png'

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

const COLOR_POSTAL = '#014fff'
const ANCHO_LIENZO = 1700
const ALTO_LIENZO = 1100
const MARGEN_MARCO = 44
const MARGEN_PINTURA = 8
const FUENTE_POSTAL = '"Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif'
const fondoEscena = `url(${imagenFondo1})`

const coloresDisponibles = ['#fe8507', '#014fff', '#fc0299', '#05d181'] as const
const colorActual = ref<string>(coloresDisponibles[1])

const pinceles: Pincel[] = [
  { nombre: 'Subrayador', valor: 'subrayador', imagen: texturaSubrayador },
  { nombre: 'Cera', valor: 'cera', imagen: texturaCera },
  { nombre: 'Pixel', valor: 'pixel', imagen: texturaPixel },
  { nombre: 'Posca', valor: 'posca', imagen: texturaPosca }
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

  contexto.strokeStyle = COLOR_POSTAL
  contexto.lineWidth = 5
  contexto.strokeRect(marco.x, marco.y, marco.ancho, marco.alto)

  const textoIzquierdaX = marco.x + 46
  const textoSuperiorY = marco.y + 58
  const textoDerechaX = marco.x + marco.ancho - 38
  const baseInferiorY = marco.y + marco.alto - 64

  contexto.fillStyle = COLOR_POSTAL
  contexto.textBaseline = 'top'

  contexto.font = `300 46px ${FUENTE_POSTAL}`
  contexto.textAlign = 'left'
  contexto.fillText('FESTIVAL DE', textoIzquierdaX, textoSuperiorY)
  contexto.fillText('MUSICA,', textoIzquierdaX, textoSuperiorY + 50)
  contexto.fillText('PENSAMENT I', textoIzquierdaX, textoSuperiorY + 100)
  contexto.fillText('CREATIVITAT', textoIzquierdaX, textoSuperiorY + 150)

  const fechaY1 = baseInferiorY - 136
  const fechaY2 = baseInferiorY - 56

  contexto.font = `700 72px ${FUENTE_POSTAL}`
  contexto.fillText('23.10', textoIzquierdaX, fechaY1)
  contexto.fillText('25.10.2026', textoIzquierdaX, fechaY2)
  contexto.fillRect(textoIzquierdaX + 218, fechaY1 + 38, 205, 6)

  contexto.textAlign = 'right'
  contexto.font = `300 64px ${FUENTE_POSTAL}`
  contexto.fillText('LAS NAVES,', textoDerechaX, baseInferiorY - 138)
  contexto.fillText('VALENCIA', textoDerechaX, baseInferiorY - 68)

  contexto.font = `300 34px ${FUENTE_POSTAL}`
  contexto.fillText('Entradas en: www.esclat.es', textoDerechaX, marco.y + marco.alto - 72)

  const logo = new Image()
  logo.src = logoEsclat
  logo.onload = () => {
    const logoAncho = Math.round(marco.ancho * 0.49)
    const proporcionOriginal = logo.height / logo.width
    const logoAlto = Math.round(logoAncho * proporcionOriginal)
    const logoX = textoDerechaX - logoAncho
    const logoY = marco.y - 8

    contexto.drawImage(logo, logoX, logoY, logoAncho, logoAlto)
  }
}

function obtenerPosicion(evento: MouseEvent) {
  const canvas = lienzo.value
  if (!canvas) return { x: 0, y: 0 }

  const rect = canvas.getBoundingClientRect()

  return {
    x: (evento.clientX - rect.left) * (canvas.width / rect.width),
    y: (evento.clientY - rect.top) * (canvas.height / rect.height)
  }
}

function empezarPintar(evento: MouseEvent) {
  const puntoInicial = obtenerPosicion(evento)
  if (!estaDentroDelAreaPintable(puntoInicial)) return

  estaPintando.value = true
  ultimaPosicion.value = puntoInicial
  pintarSegmento(puntoInicial, puntoInicial)
}

function terminarPintar() {
  estaPintando.value = false
  ultimaPosicion.value = null
}

function pintar(evento: MouseEvent) {
  if (!estaPintando.value || !pincelActual.value) return

  const posicionActual = obtenerPosicion(evento)
  const posicionAnterior = ultimaPosicion.value ?? posicionActual

  pintarSegmento(posicionAnterior, posicionActual)
  ultimaPosicion.value = posicionActual
}

function pintarSegmento(inicio: Punto, fin: Punto) {
  const canvas = lienzo.value
  if (!canvas || !pincelActual.value) return

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
    contexto.lineJoin = 'miter'
    contexto.globalAlpha = 1
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
    const pasos = Math.max(4, Math.ceil(distancia / 2.5))
    const longitud = Math.max(1, distancia)
    const nx = -dy / longitud
    const ny = dx / longitud

    contexto.save()
    aplicarRecortePostal(contexto)
    contexto.strokeStyle = colorActual.value
    contexto.lineCap = 'round'
    contexto.lineJoin = 'round'
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
        const offset = (Math.random() - 0.5) * 16
        const advance = (Math.random() - 0.5) * 3
        const jitterX = nx * offset + dx * (advance / (distancia + 1))
        const jitterY = ny * offset + dy * (advance / (distancia + 1))
        const tamano = 0.8 + Math.random() * 1.6

        contexto.globalAlpha = 0.35 + Math.random() * 0.45
        contexto.fillRect(x + jitterX, y + jitterY, tamano, tamano)
      }
    }

    contexto.globalAlpha = 0.22
    contexto.lineWidth = 2
    contexto.beginPath()
    contexto.moveTo(inicio.x + nx * 7, inicio.y + ny * 7)
    contexto.lineTo(fin.x + nx * 7, fin.y + ny * 7)
    contexto.moveTo(inicio.x - nx * 7, inicio.y - ny * 7)
    contexto.lineTo(fin.x - nx * 7, fin.y - ny * 7)
    contexto.stroke()

    contexto.restore()
    return
  }

  if (pincelActual.value.valor === 'pixel') {
    const tamanoPixel = 14
    const dx = fin.x - inicio.x
    const dy = fin.y - inicio.y
    const distancia = Math.hypot(dx, dy)
    const pasos = Math.max(1, Math.ceil(distancia / (tamanoPixel / 2)))

    contexto.save()
    aplicarRecortePostal(contexto)
    contexto.fillStyle = colorActual.value
    contexto.globalAlpha = 1

    for (let i = 0; i <= pasos; i++) {
      const t = i / pasos
      const x = inicio.x + dx * t
      const y = inicio.y + dy * t
      const pixelX = Math.round(x / tamanoPixel) * tamanoPixel
      const pixelY = Math.round(y / tamanoPixel) * tamanoPixel
      contexto.fillRect(pixelX, pixelY, tamanoPixel, tamanoPixel)
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

  const enlace = document.createElement('a')
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
  <main class="home-page" :style="{ '--fondo-escena': fondoEscena }">
    <img :src="logoEsclat" alt="Logo ESCLAT" class="home-top-logo">

    <section class="studio">
      <h1 class="hero-title">¿Cómo suena ESCLAT para ti?</h1>

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
              :class="pincelActual?.valor === pincel.valor ? 'is-active' : ''"
              :aria-label="pincel.nombre"
              @click="seleccionarPincel(pincel)"
            >
              <img :src="pincel.imagen" :alt="pincel.nombre" class="brush-thumb">
            </button>
          </div>

          <div class="color-list">
            <button
              v-for="color in coloresDisponibles"
              :key="color"
              class="color-dot"
              :class="colorActual === color ? 'is-active' : ''"
              :style="{ backgroundColor: color }"
              :aria-label="`Color ${color}`"
              @click="seleccionarColor(color)"
            ></button>
          </div>
        </aside>
      </div>

      <div class="actions">
        <button class="stamp-button" @click="limpiarLienzo">Borrar</button>
        <button class="stamp-button" @click="exportarImagen">Guardar</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.home-page {
  height: calc(100vh - 6rem);
  height: calc(100dvh - 6rem);
  overflow-y: auto;
  overflow-x: hidden;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
  background-image: linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.3)
    ),
    var(--fondo-escena);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  padding: 10px 24px 520px;
  color: #014fff;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
}

.home-top-logo {
  display: block;
  width: clamp(180px, 24vw, 360px);
  height: auto;
  margin: 0 auto 16px;
}

.studio {
  max-width: 1820px;
  margin: 0 auto;
}

.hero-title {
  color: #ffffff;
  font-size: clamp(28px, 3.4vw, 56px);
  font-weight: 700;
  line-height: 1.05;
  margin: 8px 0 20px 6px;
}

.workbench {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
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
  padding-top: 0;
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
  transition: transform 140ms ease, filter 140ms ease;
}

.brush-chip:hover {
  transform: scale(1.08) translateX(-12px);
  filter: drop-shadow(0 0 10px rgba(1, 79, 255, 0.45));
}

.brush-chip.is-active {
  transform: translateX(-22px) scale(1.07);
  filter: drop-shadow(0 0 12px rgba(1, 79, 255, 0.55));
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
  margin-top: 0;
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
  box-shadow: 0 0 0 2px #ffffff, 0 0 0 4px #014fff;
}

.actions {
  margin-top: 18px;
  display: flex;
  gap: 22px;
  padding-left: 24px;
}

.stamp-button {
  border: none;
  padding: 10px 26px;
  color: #fff;
  background: #014fff;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  font-size: 50px;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  clip-path: polygon(6% 0, 94% 0, 100% 20%, 95% 100%, 5% 100%, 0 18%);
}

@media (max-width: 1120px) {
  .workbench {
    grid-template-columns: 1fr;
  }

  .tools-panel {
    padding-top: 0;
    gap: 16px;
  }

  .brush-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
