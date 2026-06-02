<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import texturaCeraGrande from '@/assets/texturas/ceraazul.png'
import texturaPixelGrande from '@/assets/texturas/pixelazul.png'
import texturaCeraNaranja from '@/assets/texturas/ceranaranja.png'
import texturaCeraRosa from '@/assets/texturas/cerarosa.png'
import texturaCeraVerde from '@/assets/texturas/ceraverde.png'
import texturaPixelNaranja from '@/assets/texturas/pixelnaranja.png'
import texturaPixelRosa from '@/assets/texturas/pixelrosa.png'
import texturaPixelVerde from '@/assets/texturas/pixelverde.png'

type Pregunta = {
  id: number
  pregunta: string
  respuesta: string
  enlaceTexto?: string
  enlaceRuta?: string
}

const CLAVE_INDICE_TEMA = 'esclat-theme-index'
const archivosTextura = import.meta.glob(
  '../../assets/texturas/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' }
) as Record<string, string>

const preguntas: Pregunta[] = [
  {
    id: 1,
    pregunta: '¿Dónde se celebra ESCLAT?',
    respuesta:
      'El festival se celebra en Las Naves de Valencia. Puedes consultar el mapa completo con los espacios y accesos aquí:',
    enlaceTexto: 'ver mapa e información',
    enlaceRuta: '/info'
  },
  {
    id: 2,
    pregunta: '¿Cómo funcionan las entradas?',
    respuesta:
      'Puedes comprar tus entradas desde la sección de entradas. Allí verás las modalidades disponibles.'
  },
  {
    id: 3,
    pregunta: '¿Qué tipo de actividades habrá?',
    respuesta:
      'ESCLAT reúne conciertos, cortos, talleres y conversaciones. La programación está distribuida por espacios para que puedas combinar propuestas durante todo el festival.'
  },
  {
    id: 4,
    pregunta: '¿Puedo entrar y salir del recinto?',
    respuesta:
      'Sí, en la entrada se proporcinarán unas pulseras que te identificarán como parte del festival'
  },
  {
    id: 5,
    pregunta: '¿Habrá actividades con aforo reducido?',
    respuesta:
      'Sí. Algunos talleres y encuentros tienen plazas limitadas, así que conviene llegar con antelación y consultar la programación para organizar tu ruta.'
  }
]

const preguntaAbierta = ref<number>(4)
const texturaCeraActual = ref(texturaCeraGrande)
const texturaPixelActual = ref(texturaPixelGrande)

function alternarPregunta(id: number) {
  preguntaAbierta.value = preguntaAbierta.value === id ? 0 : id
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

function buscarTexturaTema(
  familia: string[],
  color: string[],
  fallback: string
) {
  const coincidencia = Object.entries(archivosTextura).find(([ruta]) => {
    const rutaNormalizada = ruta.toLowerCase()
    const coincideFamilia = familia.some((palabra) =>
      rutaNormalizada.includes(palabra)
    )
    const coincideColor = color.some((palabra) =>
      rutaNormalizada.includes(palabra)
    )

    return coincideFamilia && coincideColor
  })

  return coincidencia?.[1] ?? fallback
}

onMounted(() => {
  const indiceTema = obtenerIndiceTemaGuardado()
  const coloresTema =
    [
      ['azul', 'blue'],
      ['naranja', 'orange'],
      ['rosa', 'pink', 'fucsia', 'magenta'],
      ['verde', 'green']
    ][indiceTema] ?? ['azul', 'blue']

  const texturasTema =
    [
      {
        cera: buscarTexturaTema(
          ['subrayador', 'subra', 'sub'],
          coloresTema,
          texturaCeraGrande
        ),
        pixel: buscarTexturaTema(
          ['posca'],
          coloresTema,
          texturaPixelGrande
        )
      },
      {
        cera: buscarTexturaTema(
          ['subrayador', 'subra', 'sub'],
          coloresTema,
          texturaCeraNaranja
        ),
        pixel: buscarTexturaTema(
          ['posca'],
          coloresTema,
          texturaPixelNaranja
        )
      },
      {
        cera: buscarTexturaTema(
          ['subrayador', 'subra', 'sub'],
          coloresTema,
          texturaCeraRosa
        ),
        pixel: buscarTexturaTema(
          ['posca'],
          coloresTema,
          texturaPixelRosa
        )
      },
      {
        cera: buscarTexturaTema(
          ['subrayador', 'subra', 'sub'],
          coloresTema,
          texturaCeraVerde
        ),
        pixel: buscarTexturaTema(
          ['posca'],
          coloresTema,
          texturaPixelVerde
        )
      }
    ][indiceTema] ?? {
      cera: buscarTexturaTema(
        ['subrayador', 'subra', 'sub'],
        coloresTema,
        texturaCeraGrande
      ),
      pixel: buscarTexturaTema(
        ['posca'],
        coloresTema,
        texturaPixelGrande
      )
    }

  texturaCeraActual.value = texturasTema.cera
  texturaPixelActual.value = texturasTema.pixel
})
</script>

<template>
  <main class="faq-page">
    <section class="faq-shell">
      <div class="faq-texturas" aria-hidden="true">
        <img :src="texturaCeraActual" alt="" class="faq-textura faq-textura-cera">
        <img :src="texturaPixelActual" alt="" class="faq-textura faq-textura-pixel">
      </div>

      <header class="faq-header">
        <p class="faq-kicker">ESCLAT 2026</p>
        <h1>Preguntas frecuentes</h1>
      </header>

      <section class="faq-lista" aria-label="Preguntas frecuentes">
        <article
          v-for="item in preguntas"
          :key="item.id"
          class="faq-item"
          :class="{ 'is-open': preguntaAbierta === item.id }"
        >
          <button
            class="faq-trigger"
            type="button"
            :aria-expanded="preguntaAbierta === item.id"
            @click="alternarPregunta(item.id)"
          >
            <span class="faq-question">{{ item.pregunta }}</span>
            <span class="faq-icon" aria-hidden="true">
              {{ preguntaAbierta === item.id ? '−' : '+' }}
            </span>
          </button>

          <div v-if="preguntaAbierta === item.id" class="faq-answer">
            <p>
              {{ item.respuesta }}
              <RouterLink
                v-if="item.enlaceTexto && item.enlaceRuta"
                :to="item.enlaceRuta"
                class="faq-link"
              >
                {{ item.enlaceTexto }}
              </RouterLink>
            </p>
          </div>
        </article>
      </section>
    </section>
  </main>
</template>

<style scoped>
.faq-page {
  min-height: 100vh;
  padding: 138px 24px 90px;
  background: #ffffff;
  color: var(--esclat-theme-color, #0040f2);
}

.faq-shell {
  position: relative;
  width: min(100%, 1060px);
  margin: 0;
}

.faq-texturas {
  position: absolute;
  top: clamp(-1.5rem, -1vw, -0.5rem);
  right: clamp(-44rem, -32vw, -24rem);
  width: clamp(520px, 62vw, 980px);
  height: clamp(320px, 40vw, 700px);
  pointer-events: none;
}

.faq-textura {
  position: absolute;
  display: block;
  height: auto;
  opacity: 0.95;
}

.faq-textura-cera {
  top: 0;
  right: 0;
  width: clamp(320px, 36vw, 560px);
}

.faq-textura-pixel {
  right: clamp(3rem, 9vw, 8rem);
  bottom: 0;
  width: clamp(250px, 28vw, 420px);
  transform: rotate(-10deg);
}

.faq-header {
  padding: 0 58px 34px;
}

.faq-kicker {
  margin: 0 0 18px;
  color: var(--esclat-theme-color, #0040f2);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.faq-header h1 {
  margin: 0;
  max-width: 780px;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(3.6rem, 7.4vw, 5.6rem);
  line-height: 0.92;
  font-weight: 700;
  letter-spacing: -0.06em;
}

.faq-lista {
  padding: 18px 58px 42px;
}

.faq-item {
  border-top: 1px solid color-mix(in srgb, var(--esclat-theme-color, #0040f2) 18%, white);
}

.faq-trigger {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 24px;
  align-items: center;
  border: none;
  background: transparent;
  color: inherit;
  padding: 28px 0;
  text-align: left;
  cursor: pointer;
}

.faq-question {
  font-size: clamp(1.55rem, 2.5vw, 2.3rem);
  line-height: 1.05;
  font-weight: 700;
}

.faq-icon {
  color: var(--esclat-theme-color, #0040f2);
  font-size: clamp(2.2rem, 4vw, 3rem);
  line-height: 1;
  font-weight: 400;
}

.faq-answer {
  max-width: 760px;
  padding: 0 72px 28px 0;
}

.faq-answer p {
  margin: 0;
  color: color-mix(in srgb, var(--esclat-theme-color, #0040f2) 74%, white);
  font-size: clamp(1rem, 1.45vw, 1.35rem);
  line-height: 1.7;
}

.faq-link {
  color: var(--esclat-theme-color, #0040f2);
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.16em;
}

.faq-item.is-open .faq-question {
  color: var(--esclat-theme-color, #0040f2);
}

@media (max-width: 900px) {
  .faq-page {
    padding: 122px 16px 72px;
  }

  .faq-texturas {
    top: -0.25rem;
    right: -1.5rem;
    width: clamp(220px, 54vw, 340px);
    height: clamp(140px, 34vw, 220px);
  }

  .faq-textura-cera {
    width: clamp(140px, 34vw, 220px);
  }

  .faq-textura-pixel {
    right: clamp(1.5rem, 8vw, 4rem);
    width: clamp(110px, 26vw, 170px);
  }

  .faq-header {
    padding: 0 22px 26px;
  }

  .faq-lista {
    padding: 8px 22px 28px;
  }

  .faq-trigger {
    padding: 22px 0;
    gap: 14px;
  }

  .faq-answer {
    padding: 0 0 24px;
  }
}
</style>
