<script setup lang="ts">
import { onMounted, ref } from 'vue'
import texturaPoscaAzul from '@/assets/texturas/peques-07.png'
import texturaPixelNaranja from '@/assets/texturas/pixelnaranja.png'
import texturaCeraRosa from '@/assets/texturas/pequesrosa-06.png'
import texturaSubrayadorVerde from '@/assets/texturas/pequesverde-04.png'
import { Instagram, Music2 } from 'lucide-vue-next'

const nombre = ref('')
const correo = ref('')
const mensaje = ref('')

const formularioEnviado = ref(false)
const colorTema = ref('#0040f2')
const texturaTema = ref(texturaPoscaAzul)
const CLAVE_INDICE_TEMA = 'esclat-theme-index'
const temasContacto = [
  { color: '#0040f2', textura: texturaPoscaAzul },
  { color: '#fe8507', textura: texturaPixelNaranja },
  { color: '#fc0299', textura: texturaCeraRosa },
  { color: '#05d181', textura: texturaSubrayadorVerde }
] as const

const enviarFormulario = () => {
  console.log({
    nombre: nombre.value,
    correo: correo.value,
    mensaje: mensaje.value
  })

  formularioEnviado.value = true

  nombre.value = ''
  correo.value = ''
  mensaje.value = ''
}

function obtenerIndiceTemaGuardado() {
  let indiceTema = 0

  try {
    const guardado = window.localStorage.getItem(CLAVE_INDICE_TEMA)

    if (guardado !== null) {
      const numero = Number.parseInt(guardado, 10)

      if (Number.isFinite(numero)) {
        indiceTema = (numero + temasContacto.length) % temasContacto.length
      }
    }
  } catch {
    indiceTema = 0
  }

  return indiceTema
}

onMounted(() => {
  const indiceTema = obtenerIndiceTemaGuardado()
  const tema = temasContacto[indiceTema] ?? temasContacto[0]
  if (!tema) return

  colorTema.value = tema.color
  texturaTema.value = tema.textura
})
</script>

<template>
  <section
    class="contacto-page min-h-screen w-full px-6 pb-32"
    :style="{ '--contacto-color': colorTema }"
  >
    <div
      class="contacto-textura"
      aria-hidden="true"
    >
      <img :src="texturaTema" alt="">
    </div>

    <div class="contacto-wrap mx-auto max-w-6xl">
      <section class="contacto-layout contacto-contenido">
        <div class="contacto-copy">
         

          <h1 class="contacto-titulo">
            CONTACTO
          </h1>

          <p class="contacto-descripcion">
            Si tienes dudas sobre actividades, acceso, artistas o participacion
            en el festival, puedes escribirnos mediante este formulario.
          </p>

          <aside class="contacto-info">
            <div>
              <p class="contacto-info-label">Localización</p>
              <p>Valencia · Octubre 2026</p>
            </div>

            <div>
              <p class="contacto-info-label">Escríbenos</p>
              <p>info@esclatfestival.com</p>
            </div>

            <div>
              <p class="contacto-info-label">SIGUENOS</p>

              <div class="contacto-redes">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                >
                  <Instagram :size="22" />
                </a>

                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="TikTok"
                >
                  <Music2 :size="22" />
                </a>
              </div>
            </div>

          </aside>
        </div>

        <form
          class="contacto-form"
          @submit.prevent="enviarFormulario"
        >
          <div class="contacto-form-grid">
            <div class="contacto-field-group">
              <label
                for="nombre"
                class="contacto-field-label"
              >
                Tu nombre
              </label>

              <input
                id="nombre"
                v-model="nombre"
                type="text"
                placeholder="Escribe tu nombre"
                class="contacto-field outline-none transition"
              >
            </div>

            <div class="contacto-field-group">
              <label
                for="correo"
                class="contacto-field-label"
              >
                Tu email
              </label>

              <input
                id="correo"
                v-model="correo"
                type="email"
                placeholder="ejemplo@email.com"
                class="contacto-field outline-none transition"
              >
            </div>

            <div class="contacto-field-group contacto-field-group--full">
              <label
                for="mensaje"
                class="contacto-field-label"
              >
                Cuentanos tu duda
              </label>

              <textarea
                id="mensaje"
                v-model="mensaje"
                rows="6"
                placeholder="Escribe aqui tu mensaje"
                class="contacto-field contacto-field--textarea resize-none outline-none transition"
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            class="contacto-boton rounded-full px-6 py-3 text-sm font-medium transition"
          >
            Enviar mensaje
          </button>

          <p
            v-if="formularioEnviado"
            class="contacto-confirmacion"
          >
            Formulario enviado correctamente.
          </p>
        </form>
      </section>
    </div>
  </section>
</template>

<style scoped>
.contacto-titulo {
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(6rem, 15vw, 14rem);
  letter-spacing: -0.096em;
  line-height: 0.85;
  font-weight: 700;
  color: var(--contacto-color);
  margin-top: 0;
  margin-bottom: 0;
  margin-left: clamp(-60rem, -15vw, -10rem);
  text-align: left;
  justify-self: start;
}
.contacto-page {
  position: relative;
  isolation: isolate;
  background: #ffffff;
  color: var(--contacto-color);
  padding-top: 110px;
}

.contacto-wrap {
  position: relative;
  z-index: 2;
  padding-top: 18px;
}

.contacto-contenido {
  position: relative;
  z-index: 2;
}

.contacto-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: clamp(2.5rem, 6vw, 6rem);
  align-items: start;
}

.contacto-copy {
  display: grid;
  gap: 1.5rem;
}

.contacto-kicker {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.contacto-textura {
  position: absolute;
  top: 220px;
  left: 0;
  z-index: 1;
  width: clamp(220px, 34vw, 520px);
  aspect-ratio: 1 / 1;
  transform: translateX(-38%);
  pointer-events: none;
}

.contacto-textura img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.95;
}

.contacto-form {
  display: grid;
  gap: 1.5rem;
  margin-top: clamp(10rem, 18vw, 120rem);
  padding-top: 0;
  width: min(100%, 36rem);
  margin-left: auto;
  justify-self: end;
  align-self: start;
}

.contacto-descripcion {
  max-width: 28rem;
  font-size: clamp(1rem, 1.6vw, 1.3rem);
  line-height: 1.35;
}

.contacto-info {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
  max-width: 32rem;
  padding-top: 1rem;
}

.contacto-info-label {
  margin-bottom: 0.35rem;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.contacto-form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem 1.5rem;
}

.contacto-field-group {
  display: grid;
  gap: 0.35rem;
}

.contacto-field-group--full {
  grid-column: 1 / -1;
}

.contacto-field-label {
  font-size: 0.72rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  opacity: 0.8;
}

.contacto-field {
  width: 100%;
  border: none;
  border-bottom: 1px solid color-mix(in srgb, var(--contacto-color) 38%, white);
  background: transparent;
  padding: 0.6rem 0 0.8rem;
  color: var(--contacto-color);
}

.contacto-field::placeholder {
  color: color-mix(in srgb, var(--contacto-color) 58%, white);
}

.contacto-field:focus {
  border-color: var(--contacto-color);
}

.contacto-field--textarea {
  min-height: 9rem;
}

.contacto-boton {
  width: fit-content;
  border: 1px solid var(--contacto-color);
  background: var(--contacto-color);
  color: #ffffff;
}

.contacto-confirmacion {
  font-size: 0.9rem;
}

.contacto-redes {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: nowrap;
}

.contacto-redes a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: var(--contacto-color);
  text-decoration: none;
  transition: opacity 0.2s ease;
}

.contacto-redes a:hover {
  opacity: 0.6;
}

@media (max-width: 900px) {
  .contacto-page {
    padding-top: 110px;
    padding-bottom: 7rem;
  }

  .contacto-wrap {
    padding-top: 12px;
  }

  .contacto-textura {
    top: 140px;
    width: clamp(170px, 42vw, 280px);
    transform: translateX(-45%);
  }

  .contacto-layout {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .contacto-info {
    grid-template-columns: 1fr;
    gap: 1rem;
    max-width: none;
  }

  .contacto-form {
    margin-top: 2rem;
    width: 100%;
  }

  .contacto-form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
