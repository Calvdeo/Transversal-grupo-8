<script lang="ts" setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Eraser, Save } from 'lucide-vue-next'

import logoSubAzul from '@/assets/logo/logoazul-subtitulo.png'
import imagenFondo1 from '@/assets/imagenes/imagenfondo1.jpg'
import fotoFondoAzul from '@/assets/foticos/azul.png'
import fotoFondoNaranja from '@/assets/foticos/narnaj.png'
import fotoFondoRosa from '@/assets/foticos/rosa.png'
import fotoFondoVerde from '@/assets/foticos/foto1.png'
import cartelPrincipal from '@/assets/carteles/cartel principal.png'
import cartelSecundario from '@/assets/carteles/cartel 2.png'
import cartelCortos from '@/assets/carteles/carteleras-04.png'
import cartelTalleres from '@/assets/carteles/carteleras-05.png'
import artistaBelen from '@/assets/artistas/art-05.jpg'
import artistaSilvana from '@/assets/artistas/art-06.jpg'
import artistaKanka from '@/assets/artistas/art-07.jpg'
import artistaValeria from '@/assets/artistas/art-08.jpg'
import artistaFiga from '@/assets/artistas/art-19.jpg'
import artistaOques from '@/assets/artistas/art-11.jpg'
import videoInicioAzulMp4 from '@/assets/videos/Secuencia 01 azul.mp4'
import videoInicioNaranjaMp4 from '@/assets/videos/Secuencia 01 naranja.mp4'
import videoInicioRosaMp4 from '@/assets/videos/Secuencia 01 rosa.mp4'
import videoInicioVerdeMp4 from '@/assets/videos/Secuencia 01 verde.mp4'
import entradaAbono from '@/assets/entradas/entrada-1.jpg'

import texturaCeraGrande from '@/assets/texturas/ceraazul.png'
import texturaPixelGrande from '@/assets/texturas/pixelazul.png'
import texturaCeraNaranja from '@/assets/texturas/ceranaranja.png'
import texturaCeraRosa from '@/assets/texturas/cerarosa.png'
import texturaCeraVerde from '@/assets/texturas/ceraverde.png'
import texturaPixelNaranja from '@/assets/texturas/pixelnaranja.png'
import texturaPixelRosa from '@/assets/texturas/pixelrosa.png'
import texturaPixelVerde from '@/assets/texturas/pixelverde.png'
import texturaPoscaAzul from '@/assets/texturas/poscaazul.png'
import texturaPoscaNaranja from '@/assets/texturas/poscanaranja.png'
import texturaPoscaRosa from '@/assets/texturas/poscarosa.png'
import texturaPoscaVerde from '@/assets/texturas/poscaverde.png'
import texturaSubrayadorAzul from '@/assets/texturas/subrayadorazul.png'
import texturaSubrayadorNaranja from '@/assets/texturas/subrayadornaranja.png'
import texturaSubrayadorRosa from '@/assets/texturas/subrayadorrosa.png'
import texturaSubrayadorVerde from '@/assets/texturas/subrayadorerde.png'
import logoSubNaranja from '@/assets/logo/logonaranja-subtitulo.png'
import logoSubRosa from '@/assets/logo/logorosa-subtitulo.png'
import logoSubVerde from '@/assets/logo/logoverde-subtitulo.png'
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
  texturaPosca: string
  texturaSubrayador: string
  pequesSubrayador: string
  pequesPixel: string
  pequesCera: string
  pequesPosca: string
}

type EntradaInicio = {
  id: number
  nombre: string
  imagen: string
  descripcion: string
  color: string
}

type ArtistaInicio = {
  id: number
  nombre: string
  hora: string
  escenario: string
  imagen: string
}

const lienzo = ref<HTMLCanvasElement | null>(null)
const estaPintando = ref(false)
const pincelActual = ref<Pincel | null>(null)
const ultimaPosicion = ref<Punto | null>(null)

const COLOR_AZUL = '#004fff'
const ANCHO_LIENZO = 1700
const ALTO_LIENZO = 1100
const MARGEN_MARCO = 44
const MARGEN_PINTURA = 8

const FUENTE_INTER =
  '"Inter", "Helvetica Neue", Arial, sans-serif'

const fondoEscena = `url(${imagenFondo1})`
const videosInicioPorColor: Record<string, string> = {
  '#004fff': videoInicioAzulMp4,
  '#fe8507': videoInicioNaranjaMp4,
  '#fc0299': videoInicioRosaMp4,
  '#05d181': videoInicioVerdeMp4
}
const fotosFondoPorColor: Record<string, string> = {
  '#004fff': fotoFondoAzul,
  '#fe8507': fotoFondoNaranja,
  '#fc0299': fotoFondoRosa,
  '#05d181': fotoFondoVerde
}
const artistasInicio: ArtistaInicio[] = [
  {
    id: 1,
    nombre: 'Belen Aguilera',
    hora: 'Dia 24, 17h',
    escenario: 'Patio 2',
    imagen: artistaBelen
  },
  {
    id: 2,
    nombre: 'Silvana Estrada',
    hora: 'Dia 25, 19h',
    escenario: 'Patio 2',
    imagen: artistaSilvana
  },
  {
    id: 3,
    nombre: 'El Kanka',
    hora: 'Dia 24, 21h',
    escenario: 'Patio 2',
    imagen: artistaKanka
  },
  {
    id: 4,
    nombre: 'Valeria Castro',
    hora: 'Dia 25, 20h15',
    escenario: 'Patio 2',
    imagen: artistaValeria
  },
  {
    id: 5,
    nombre: 'Figa Flawas',
    hora: 'Dia 25, 21h',
    escenario: 'Patio 2',
    imagen: artistaFiga
  },
  {
    id: 6,
    nombre: 'Oques Grasses',
    hora: 'Dia 25, 21h45',
    escenario: 'Patio 2',
    imagen: artistaOques
  }
]
const entradasInicio: EntradaInicio[] = [
  {
    id: 1,
    nombre: 'Entrada general 3 días',
    imagen: entradaAbono,
    descripcion: 'Pulsa para conseguir las demás entradas',
    color: '#004fff'
  }
]
const cartelesInicio = [
  {
    id: 1,
    imagen: cartelPrincipal,
    alt: 'Cartel principal de Esclat'
  },
  {
    id: 2,
    imagen: cartelSecundario,
    alt: 'Cartel de programación de Esclat'
  },
  {
    id: 3,
    imagen: cartelCortos,
    alt: 'Cartel de cortos de Esclat'
  },
  {
    id: 4,
    imagen: cartelTalleres,
    alt: 'Cartel de talleres de Esclat'
  }
]

const coloresDisponibles = [
  '#fe8507',
  '#004fff',
  '#fc0299',
  '#05d181'
] as const

const colorActual = ref<string>(coloresDisponibles[1])
const colorTema = ref(COLOR_AZUL)
const videoInicioUrl = computed(() => videosInicioPorColor[colorTema.value] ?? videoInicioAzulMp4)
const fotoFondoUrl = computed(() => fotosFondoPorColor[colorTema.value] ?? fotoFondoAzul)
const logoSubTema = ref(logoSubAzul)
const texturaCeraHero = ref(texturaCeraGrande)
const texturaPixelHero = ref(texturaPixelGrande)
const texturaPoscaHero = ref(texturaPoscaAzul)
const texturaSubrayadorHero = ref(texturaSubrayadorAzul)
const indiceCarruselArtistas = ref(0)
const indiceTemaActual = ref(0)
const mostrarTexturasAlternativas = ref(false)
const CLAVE_INDICE_TEMA = 'esclat-theme-index'
const INTERVALO_CARRUSEL_ARTISTAS = 4200
const INTERVALO_TEXTURAS_HERO = 2500

let temporizadorCarruselArtistas: ReturnType<typeof setInterval> | null = null
let temporizadorTexturasHero: ReturnType<typeof setInterval> | null = null

const temasVisuales: TemaVisual[] = [
  {
    color: '#004fff',
    logoSub: logoSubAzul,
    texturaCera: texturaCeraGrande,
    texturaPixel: texturaPixelGrande,
    texturaPosca: texturaPoscaAzul,
    texturaSubrayador: texturaSubrayadorAzul,
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
    texturaPosca: texturaPoscaNaranja,
    texturaSubrayador: texturaSubrayadorNaranja,
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
    texturaPosca: texturaPoscaRosa,
    texturaSubrayador: texturaSubrayadorRosa,
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
    texturaPosca: texturaPoscaVerde,
    texturaSubrayador: texturaSubrayadorVerde,
    pequesSubrayador: pequesVerde04,
    pequesPixel: pequesVerde05,
    pequesCera: pequesVerde06,
    pequesPosca: pequesVerde07
  }
]

const artistasCarruselVisibles = computed<ArtistaInicio[]>(() => {
  return Array.from({ length: 3 }, (_, offset) => {
    const artista =
      artistasInicio[
        (indiceCarruselArtistas.value + offset) % artistasInicio.length
      ]

    return artista ?? artistasInicio[0]!
  })
})

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

  const fechaY1 = baseInferiorY - 160
  const fechaY2 = baseInferiorY - 58

  contexto.font = `500 104px ${FUENTE_INTER}`

  contexto.fillText(
    '23',
    textoIzquierdaX,
    fechaY1
  )

  contexto.fillText(
    '25.10.2026',
    textoIzquierdaX,
    fechaY2
  )

  contexto.fillRect(
    textoIzquierdaX + 140,
    fechaY1 + 40,
    360,
    4
  )

  contexto.textAlign = 'right'
  contexto.font = `500 78px ${FUENTE_INTER}`

  contexto.fillText(
    'LAS NAVES',
    textoDerechaX,
    baseInferiorY - 186
  )

  contexto.fillText(
    'VALÈNCIA',
    textoDerechaX,
    baseInferiorY - 104
  )

  contexto.font = `400 32px ${FUENTE_INTER}`

  contexto.fillText(
    'Entradas en: www.esclat.es',
    textoDerechaX,
    marco.y + marco.alto - 70
  )

  const logoSub = new Image()
  logoSub.src = logoSubTema.value

  logoSub.onload = () => {
    const logoSubAncho = Math.round(marco.ancho * 0.5)
    const proporcionOriginal =
      logoSub.height / logoSub.width
    const logoSubAlto = Math.round(
      logoSubAncho * proporcionOriginal
    )
    const logoSubX = textoIzquierdaX
    const logoSubY = textoSuperiorY - 12

    contexto.drawImage(
      logoSub,
      logoSubX,
      logoSubY,
      logoSubAncho,
      logoSubAlto
    )
  }
}

function obtenerPosicion(evento: PointerEvent) {
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

function empezarPintar(evento: PointerEvent) {
  evento.preventDefault()

  const canvas = lienzo.value
  const puntoInicial = obtenerPosicion(evento)

  if (!estaDentroDelAreaPintable(puntoInicial)) {
    return
  }

  canvas?.setPointerCapture(evento.pointerId)

  estaPintando.value = true
  ultimaPosicion.value = puntoInicial

  pintarSegmento(
    puntoInicial,
    puntoInicial
  )
}

function terminarPintar(evento?: PointerEvent) {
  const canvas = lienzo.value

  if (evento && canvas?.hasPointerCapture(evento.pointerId)) {
    canvas.releasePointerCapture(evento.pointerId)
  }

  estaPintando.value = false
  ultimaPosicion.value = null
}

function pintar(evento: PointerEvent) {
  if (
    !estaPintando.value ||
    !pincelActual.value
  ) {
    return
  }

  evento.preventDefault()

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

  aplicarTemaVisual(indiceTema)
}

function aplicarTemaVisual(indiceTema: number) {
  const tema =
    temasVisuales[indiceTema] ?? temasVisuales[0]

  if (!tema) return

  indiceTemaActual.value = indiceTema
  colorTema.value = tema.color
  logoSubTema.value = tema.logoSub
  texturaCeraHero.value = tema.texturaCera
  texturaPixelHero.value = tema.texturaPixel
  texturaPoscaHero.value = tema.texturaPosca
  texturaSubrayadorHero.value = tema.texturaSubrayador
  colorActual.value = tema.color

  document.documentElement.style.setProperty(
    '--esclat-theme-color',
    tema.color
  )
}

function avanzarCarruselArtistas() {
  indiceCarruselArtistas.value =
    (indiceCarruselArtistas.value + 1) % artistasInicio.length
}

function detenerCarruselArtistas() {
  if (temporizadorCarruselArtistas !== null) {
    clearInterval(temporizadorCarruselArtistas)
    temporizadorCarruselArtistas = null
  }
}

function iniciarCarruselArtistas() {
  detenerCarruselArtistas()

  temporizadorCarruselArtistas = setInterval(() => {
    avanzarCarruselArtistas()
  }, INTERVALO_CARRUSEL_ARTISTAS)
}

function detenerTexturasHero() {
  if (temporizadorTexturasHero !== null) {
    clearInterval(temporizadorTexturasHero)
    temporizadorTexturasHero = null
  }
}

function iniciarTexturasHero() {
  detenerTexturasHero()

  temporizadorTexturasHero = setInterval(() => {
    mostrarTexturasAlternativas.value = !mostrarTexturasAlternativas.value
  }, INTERVALO_TEXTURAS_HERO)
}

function seleccionarSlideArtistas(indice: number) {
  indiceCarruselArtistas.value = indice
  iniciarCarruselArtistas()
}

onMounted(() => {
  aplicarTemaActual()
  pincelActual.value = pinceles.value[0] ?? null

  prepararLienzo()
  iniciarCarruselArtistas()
  iniciarTexturasHero()
})

onBeforeUnmount(() => {
  detenerCarruselArtistas()
  detenerTexturasHero()
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
        :class="{ 'is-texture-alt': mostrarTexturasAlternativas }"
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

        <img
          :src="texturaSubrayadorHero"
          alt=""
          class="hero-texture hero-texture-subrayador"
        >

        <img
          :src="texturaPoscaHero"
          alt=""
          class="hero-texture hero-texture-posca"
        >

        <div class="hero-date">
          <p>
            <span class="hero-date-desktop">23.10</span>
            <span class="hero-date-mobile">23</span>
          </p>
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
            :key="videoInicioUrl"
            class="hero-video-player"
            autoplay
           muted
           loop
          playsinline
          >
            <source
              :src="videoInicioUrl"
              type="video/mp4"
            >
            Tu navegador no soporta vídeo HTML5.
          </video>
        </div>
      </section>

      <section class="hero-artistas">
        <div class="hero-artistas-inner">
          <div class="hero-artistas-heading">
            <h2>Artistas</h2>
          </div>

          <div class="hero-artistas-track">
            <RouterLink
              v-for="(artista, index) in artistasCarruselVisibles"
              :key="`${artista.id}-${index}`"
              to="/artistas"
              class="hero-artista-card"
              :class="{ 'is-active': index === 0 }"
              :aria-label="`Ir a la pagina de artistas: ${artista.nombre}`"
            >
              <img
                :src="artista.imagen"
                :alt="artista.nombre"
                class="hero-artista-image"
              >

              <div class="hero-artista-overlay">
                <p class="hero-artista-time">
                  {{ artista.hora }} · {{ artista.escenario }}
                </p>
                <h3>{{ artista.nombre }}</h3>
              </div>
            </RouterLink>
          </div>

          <div class="hero-artistas-dots" aria-label="Selector de artistas destacados">
            <button
              v-for="(artista, index) in artistasInicio"
              :key="artista.id"
              type="button"
              class="hero-artistas-dot"
              :class="{ 'is-active': index === indiceCarruselArtistas }"
              :aria-label="`Mostrar ${artista.nombre}`"
              @click="seleccionarSlideArtistas(index)"
            />
          </div>
        </div>
      </section>

      <section class="home-entradas">
        <div
          class="home-entradas-cinta"
          aria-label="Promoción de entradas"
        >
          <div class="home-entradas-cinta-pista">
            <div class="home-entradas-cinta-grupo">
              <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
              <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
              <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
            </div>

            <div
              class="home-entradas-cinta-grupo"
              aria-hidden="true"
            >
              <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
              <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
              <span>Si adquieres ahora tus entradas llévate una tote bag de regalo</span>
            </div>
          </div>
        </div>

        <div class="home-entradas-inner">
          <RouterLink
            v-for="entrada in entradasInicio"
            :key="entrada.id"
            to="/entradas"
            class="home-entrada-item"
            :style="{ color: entrada.color }"
          >
            <div class="home-entrada-bloque">
              <img
                :src="entrada.imagen"
                :alt="entrada.nombre"
                class="home-entrada-imagen"
              >
            </div>

            <p class="home-entrada-descripcion">
              {{ entrada.descripcion }}
            </p>
          </RouterLink>
        </div>
      </section>
    </section>

    <section
      class="home-foto-fondo"
      aria-label="Ambiente del festival"
    >
      <div class="home-foto-fondo__marco">
        <img
          :src="fotoFondoUrl"
          alt=""
          class="home-foto-fondo__imagen"
        >

        <div
          class="home-carteles-loop"
          aria-label="Carteles del festival"
        >
          <div class="home-carteles-loop__stage">
            <img
              v-for="cartel in cartelesInicio"
              :key="cartel.id"
              :src="cartel.imagen"
              :alt="cartel.alt"
              class="home-carteles-loop__poster"
            >
          </div>
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
            @pointerdown="empezarPintar"
            @pointermove="pintar"
            @pointerup="terminarPintar"
            @pointercancel="terminarPintar"
            @lostpointercapture="terminarPintar"
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

  padding-top: 110px;
}

.hero-poster {
  position: relative;

  min-height: 100vh;

  overflow: hidden;

  padding: 42px 36px;
}

.hero-sub-logo {
  position: absolute;
  left: 42px;
  top: 30px;
  z-index: 4;
  width: clamp(280px, 50vw, 800px);
  height: auto;
}

.hero-texture {
  position: absolute;

  z-index: 2;

  pointer-events: none;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.hero-texture-cera {
  width: clamp(500px, 62vw, 920px);

  left: 35%;
  top: -28%;

  transform: rotate(60deg);
  transform-origin: center;
}

.hero-texture-pixel {
  width: clamp(350px, 41vw, 620px);

  left: 30%;
  top: 10%;
}

.hero-texture-subrayador {
  z-index: 3;
  width: clamp(300px, 40vw, 760px);
  left: 50%;
  top: -20%;
  opacity: 0;
  transform: rotate(90deg);
}

.hero-texture-posca {
  z-index: 3;
  width: clamp(240px, 28vw, 600px);
  left: 35%;
  top: 19%;
  opacity: 0;
  transform: rotate(60deg);
}

.hero-poster.is-texture-alt .hero-texture-cera,
.hero-poster.is-texture-alt .hero-texture-pixel {
  opacity: 0;
}

.hero-poster.is-texture-alt .hero-texture-subrayador,
.hero-poster.is-texture-alt .hero-texture-posca {
  opacity: 1;
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

.hero-date-mobile {
  display: none;
}

.hero-line {
  position: absolute;

  left: clamp(220px, 23vw, 420px);
  bottom: 250px;

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

.hero-place p,
.hero-date p {
  margin: 0;
}

.hero-artistas {
  width: 100%;
  padding: 24px 16px 10px;
  background: #ffffff;
}

.hero-artistas-inner {
  width: min(100%, 1280px);
  margin: 0 auto;
}

.hero-artistas-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.hero-artistas-kicker {
  margin: 0;
  color: var(--color-tema);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.hero-artistas-heading h2 {
  margin: 0;
  color: var(--color-tema);
  font-size: clamp(34px, 5vw, 64px);
  font-weight: 700;
  line-height: 0.92;
  text-transform: uppercase;
}

.hero-artistas-track {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.hero-artista-card {
  position: relative;
  min-height: 420px;
  overflow: hidden;
  text-decoration: none;
  background: #000000;
  color: #ffffff;
  transform: translateY(0);
  transition:
    transform 220ms ease,
    box-shadow 220ms ease,
    opacity 220ms ease;
}

.hero-artista-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 42px rgba(0, 0, 0, 0.18);
}

.hero-artista-card.is-active {
  box-shadow: 0 0 0 3px var(--color-tema);
}

.hero-artista-image {
  width: 100%;
  height: 100%;
  min-height: 420px;
  display: block;
  object-fit: cover;
}

.hero-artista-overlay {
  position: absolute;
  inset: auto 0 0 0;
  padding: 18px 18px 16px;
  background:
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.68) 44%,
      rgba(0, 0, 0, 0.92) 100%
    );
}

.hero-artista-time {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.hero-artista-overlay h3 {
  margin: 0;
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 700;
  line-height: 0.94;
  text-transform: uppercase;
}

.hero-artistas-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 18px;
}

.hero-artistas-dot {
  width: 12px;
  height: 12px;
  border: 2px solid var(--color-tema);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  transition:
    transform 160ms ease,
    background-color 160ms ease;
}

.hero-artistas-dot.is-active {
  background: var(--color-tema);
  transform: scale(1.08);
}

.hero-video {
  width: 100%;
  background: var(--color-tema);
  padding: 28px 18px 32px;
}

.hero-video-inner {
  width: min(100%, 1180px);
  margin: 0 auto;
}

.hero-video-player {
  width: 100%;
  height: auto;
  display: block;
  border: 0;
  background: #000000;
}

.home-entradas {
  width: 100%;
  background: #ffffff;
  padding: 0 0 28px;
}

.home-entradas-cinta {
  width: 100%;
  overflow: hidden;
  border-top: 2px solid var(--color-tema);
  border-bottom: 2px solid var(--color-tema);
  background: var(--color-tema);
}

.home-entradas-cinta-pista {
  display: flex;
  width: max-content;
  white-space: nowrap;
  animation: deslizar-cinta 30s linear infinite;
}

.home-entradas-cinta-grupo {
  display: flex;
  align-items: center;
  gap: 96px;
  padding-right: 96px;
}

.home-entradas-cinta-pista span {
  padding: 8px 0;
  color: #ffffff;
  font-size: clamp(24px, 2.8vw, 40px);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}

.home-entradas-inner {
  width: min(100%, 1320px);
  margin: 0 auto;
  padding: 28px 24px 12px;
  display: grid;
  grid-template-columns: minmax(0, 680px);
  gap: 32px 24px;
  align-items: start;
  justify-content: center;
  justify-items: center;
}

.home-entrada-item {
  width: min(620px, 100%);
  color: inherit;
  text-decoration: none;
  transition: transform 180ms ease;
}

.home-entrada-item:hover {
  transform: scale(1.01);
}

.home-entrada-bloque {
  display: block;
  width: 100%;
}

.home-entrada-imagen {
  width: 100%;
  display: block;
}

.home-entrada-descripcion {
  margin: 8px 0 0;
  font-size: 13px;
  line-height: 1.2;
  opacity: 0;
  transition: opacity 160ms ease;
}

.home-entrada-item:hover .home-entrada-descripcion {
  opacity: 1;
}

@keyframes deslizar-cinta {
  from {
    transform: translateX(100vw);
  }

  to {
    transform: translateX(-100%);
  }
}

.home-foto-fondo {
  width: 100%;
  background: #ffffff;
  overflow: hidden;
  padding: 36px 0 44px;
}

.home-foto-fondo__marco {
  position: relative;
  width: 100vw;
  height: clamp(260px, 60vw, 620px);
  margin-left: calc(50% - 50vw);
  overflow: hidden;
}

.home-foto-fondo__imagen {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-carteles-loop {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  pointer-events: none;
}

.home-carteles-loop__stage {
  position: relative;
  width: min(30vw, 260px);
  aspect-ratio: 210 / 297;
  margin: 0 auto;
}

.home-carteles-loop__poster {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transform: translateY(48px) scale(0.94) rotate(-3deg);
  transform-origin: center;
  filter: drop-shadow(0 18px 26px rgb(0 0 0 / 0.14));
  will-change: opacity, transform;
}

.home-carteles-loop__poster:nth-child(1) {
  animation: apilar-cartel-1 9s ease-in-out infinite;
  z-index: 1;
}

.home-carteles-loop__poster:nth-child(2) {
  animation: apilar-cartel-2 9s ease-in-out infinite;
  z-index: 2;
}

.home-carteles-loop__poster:nth-child(3) {
  animation: apilar-cartel-3 9s ease-in-out infinite;
  z-index: 3;
}

.home-carteles-loop__poster:nth-child(4) {
  animation: apilar-cartel-4 9s ease-in-out infinite;
  z-index: 4;
}

@keyframes apilar-cartel-1 {
  0% {
    opacity: 0;
    transform: translateY(48px) scale(0.94) rotate(-3deg);
  }

  8%,
  96% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(-3deg);
  }

  100% {
    opacity: 0;
    transform: translateY(-16px) scale(0.98) rotate(-3deg);
  }
}

@keyframes apilar-cartel-2 {
  0%,
  22% {
    opacity: 0;
    transform: translateY(48px) scale(0.94) rotate(2.5deg);
  }

  30%,
  96% {
    opacity: 1;
    transform: translateY(-8px) scale(1) rotate(2.5deg);
  }

  100% {
    opacity: 0;
    transform: translateY(-24px) scale(0.98) rotate(2.5deg);
  }
}

@keyframes apilar-cartel-3 {
  0%,
  44% {
    opacity: 0;
    transform: translateY(48px) scale(0.94) rotate(-1.5deg);
  }

  52%,
  96% {
    opacity: 1;
    transform: translateY(-16px) scale(1) rotate(-1.5deg);
  }

  100% {
    opacity: 0;
    transform: translateY(-32px) scale(0.98) rotate(-1.5deg);
  }
}

@keyframes apilar-cartel-4 {
  0%,
  66% {
    opacity: 0;
    transform: translateY(48px) scale(0.94) rotate(1deg);
  }

  74%,
  96% {
    opacity: 1;
    transform: translateY(-24px) scale(1) rotate(1deg);
  }

  100% {
    opacity: 0;
    transform: translateY(-40px) scale(0.98) rotate(1deg);
  }
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
  touch-action: none;
  user-select: none;

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

  .hero-texture-subrayador {
    width: clamp(420px, 50vw, 760px);
    left: 50%;
    top: -3%;
    transform: rotate(70deg);
  }

  .hero-texture-posca {
    width: clamp(380px, 45vw, 660px);
    left: 25%;
    top: 20%;
    transform: rotate(70deg);
  }

  .hero-place {
    right: 28px;
  }

  .hero-artistas-track {
    gap: 14px;
  }

  .hero-artista-card,
  .hero-artista-image {
    min-height: 360px;
  }

  .home-entradas-cinta-grupo {
    gap: 64px;
    padding-right: 64px;
  }

  .home-entradas-cinta-pista span {
    font-size: clamp(20px, 3.5vw, 30px);
  }

  .home-entradas-inner {
    gap: 24px 18px;
  }

}

@media (max-width: 700px) {
  .hero-home {
    min-height: auto;
    padding-top: 64px;
  }

  .hero-poster {
    aspect-ratio: 210 / 297;
    height: auto;
    min-height: 0;
    padding: 0;
  }

  .hero-sub-logo {
    left: 2%;
    top: 10%;
    width: 70%;
    height: auto;
    max-width: none;
    object-fit: contain;
  }

  .hero-texture-cera {
    left: 1%;
    top: 3%;
    width: 100%;
    height: auto;
    object-fit: contain;
    transform: rotate(40deg);
  }

  .hero-texture-pixel {
    left: 1%;
    top: 30%;
    width: 75%;
    height: auto;
    object-fit: contain;
    transform: rotate(-1deg);
  }

  .hero-texture-subrayador {
    left: 35%;
    top: 10%;
    width: 70%;
    height: auto;
    object-fit: contain;
    transform: rotate(67deg);
  }

  .hero-texture-posca {
    left: 10%;
    top: 35%;
    width: 60%;
    height: auto;
    object-fit: contain;
    transform: rotate(69deg);
  }

  .hero-date {
    left: 4%;
    top: 87%;
    bottom: 18%;
    width: auto;
    height: auto;
    font-size: clamp(28px, 18vw, 32px);
    line-height: 0.9;
    letter-spacing: 0;
  }

  .hero-date-desktop {
    display: none;
  }

  .hero-date-mobile {
    display: inline;
  }

  .hero-line {
    left: 18%;
    top: 89%;
    bottom: auto;
    width: 29%;
    height: clamp(2px, 1vw, 3px);
  }

  .hero-place {
    left: auto;
    right: 2%;
    top: 89%;
    bottom: auto;
    width: 40%;
    height: auto;
    font-size: clamp(18px, 8vw, 25px);
    line-height: 0.92;
  }

  .hero-place p {
    white-space: nowrap;
  }

  .hero-artistas {
    padding: 8px 10px 4px;
  }

  .hero-artistas-heading {
    margin-bottom: 10px;
  }

  .hero-artistas-heading h2 {
    font-size: 24px;
  }

  .hero-artistas-track {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .hero-artista-card:nth-child(3) {
    display: none;
  }

  .hero-artista-card,
  .hero-artista-image {
    min-height: 180px;
  }

  .hero-artista-overlay {
    padding: 10px;
  }

  .hero-artista-overlay h3 {
    font-size: 18px;
  }

  .hero-artista-time {
    margin-bottom: 4px;
    font-size: 9px;
  }

  .hero-artistas-dots {
    gap: 8px;
    margin-top: 10px;
  }

  .hero-artistas-dot {
    width: 9px;
    height: 9px;
  }

  .home-entradas-inner {
    grid-template-columns: 1fr;
    gap: 36px;
    padding: 18px 12px 8px;
  }

  .home-entrada-item {
    width: min(100%, 520px);
  }

  .home-entrada-descripcion {
    opacity: 1;
    font-size: 12px;
  }

  .home-foto-fondo {
    padding: 28px 0 34px;
  }

  .home-foto-fondo__marco {
    width: 100vw;
    height: clamp(360px, 95vw, 520px);
    margin-left: calc(50% - 50vw);
  }

  .home-foto-fondo__imagen {
    object-position: center;
  }

  .home-carteles-loop__stage {
    width: min(40vw, 180px);
  }
}

@media (max-width: 700px) {
  .studio {
    padding: 48px 14px 72px;
  }

  .workbench {
    grid-template-columns: minmax(0, 1fr);
    gap: 16px;
    width: 100%;
  }

  .actions-side {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    padding-top: 0;
  }

  .color-list-side {
    flex-direction: row;
    gap: 10px;
  }

  .hero-title {
    font-size: 42px;
  }

  .hero-artistas-track {
    grid-template-columns: 1fr;
    justify-items: center;
    gap: 8px;
  }

  .hero-artista-card:nth-child(n + 2) {
    display: none;
  }

  .hero-artista-card,
  .hero-artista-image {
    min-height: 170px;
  }

  .hero-artista-card {
    width: min(78vw, 280px);
  }

  .studio-text {
    font-size: 18px;
  }

  .poster-canvas {
    min-height: auto;
    aspect-ratio: 17 / 11;
  }

  .tools-panel {
    min-height: 0;
  }

  .brush-list {
    flex-direction: row;
    justify-content: center;
    gap: 8px;
  }

  .brush-chip:hover,
  .brush-chip.is-active {
    transform: translateY(-4px) scale(1.04);
  }

  .brush-thumb {
    height: clamp(58px, 18vw, 86px);
  }

}

</style>
