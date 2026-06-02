<script setup lang="ts">
import { onMounted, ref } from 'vue'
import texturaCeraAzul from '@/assets/texturas/ceraazul.png'
import texturaCeraNaranja from '@/assets/texturas/ceranaranja.png'
import texturaCeraRosa from '@/assets/texturas/cerarosa.png'
import texturaCeraVerde from '@/assets/texturas/ceraverde.png'

const nombre = ref('')
const correo = ref('')
const mensaje = ref('')

const formularioEnviado = ref(false)
const colorTema = ref('#0040f2')
const texturaTema = ref(texturaCeraAzul)

const CLAVE_INDICE_TEMA = 'esclat-theme-index'
const temasContacto = [
  { color: '#0040f2', textura: texturaCeraAzul },
  { color: '#fe8507', textura: texturaCeraNaranja },
  { color: '#fc0299', textura: texturaCeraRosa },
  { color: '#05d181', textura: texturaCeraVerde }
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

onMounted(() => {
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

  const tema = temasContacto[indiceTema] ?? temasContacto[0]
  if (!tema) return

  colorTema.value = tema.color
  texturaTema.value = tema.textura
})
</script>

<template>
  <section
    class="contacto-page mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-32"
    :style="{ '--contacto-color': colorTema }"
  >
    <div
      class="contacto-textura"
      :style="{ backgroundImage: `url(${texturaTema})` }"
    ></div>

    <div class="contacto-contenido mb-12">
      <p class="mb-2 text-sm uppercase tracking-[0.3em]">
        ESCLAT FESTIVAL
      </p>

      <h1 class="mb-4 text-5xl font-bold tracking-tight">
        Contacto
      </h1>

      <p class="max-w-xl">
        Si tienes dudas sobre actividades, acceso, artistas o participacion
        en el festival, puedes escribirnos mediante este formulario.
      </p>
    </div>

    <form
      class="contacto-contenido contacto-form flex flex-col gap-6 rounded-3xl p-8 shadow-sm"
      @submit.prevent="enviarFormulario"
    >
      <div class="flex flex-col gap-2">
        <label
          for="nombre"
          class="text-sm font-medium"
        >
          Nombre
        </label>

        <input
          id="nombre"
          v-model="nombre"
          type="text"
          placeholder="Escribe tu nombre"
          class="contacto-field rounded-xl px-4 py-3 outline-none transition"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="correo"
          class="text-sm font-medium"
        >
          Correo electronico
        </label>

        <input
          id="correo"
          v-model="correo"
          type="email"
          placeholder="ejemplo@email.com"
          class="contacto-field rounded-xl px-4 py-3 outline-none transition"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="mensaje"
          class="text-sm font-medium"
        >
          Mensaje
        </label>

        <textarea
          id="mensaje"
          v-model="mensaje"
          rows="6"
          placeholder="Escribe aqui tu mensaje"
          class="contacto-field resize-none rounded-xl px-4 py-3 outline-none transition"
        ></textarea>
      </div>

      <button
        type="submit"
        class="contacto-boton w-fit rounded-full px-6 py-3 text-sm font-medium transition"
      >
        Enviar formulario
      </button>

      <p
        v-if="formularioEnviado"
        class="text-sm"
      >
        Formulario enviado correctamente.
      </p>
    </form>
  </section>
</template>

<style scoped>
.contacto-page {
  position: relative;
  isolation: isolate;
  background: #ffffff;
  color: var(--contacto-color);
}

.contacto-contenido {
  position: relative;
  z-index: 2;
}

.contacto-textura {
  position: absolute;
  inset: 0;
  z-index: 1;
  background-repeat: no-repeat;
  background-size: clamp(520px, 78vw, 1200px);
  background-position: 105% 10%;
  opacity: 1;
  filter: saturate(1.1) contrast(1.05);
  pointer-events: none;
}

.contacto-form {
  border: 1px solid var(--contacto-color);
  background: #ffffff;
}

.contacto-field {
  border: 1px solid color-mix(in srgb, var(--contacto-color) 45%, white);
  color: var(--contacto-color);
  background: color-mix(in srgb, white 95%, var(--contacto-color) 5%);
}

.contacto-field::placeholder {
  color: color-mix(in srgb, var(--contacto-color) 55%, white);
}

.contacto-field:focus {
  border-color: var(--contacto-color);
}

.contacto-boton {
  background: var(--contacto-color);
  color: #ffffff;
}
</style>
