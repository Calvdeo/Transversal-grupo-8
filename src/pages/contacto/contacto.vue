<script setup lang="ts">
import { ref } from 'vue'

const nombre = ref('')
const correo = ref('')
const mensaje = ref('')

const formularioEnviado = ref(false)

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
</script>

<template>
  <section class="mx-auto flex min-h-screen max-w-4xl flex-col px-6 py-32">

    <div class="mb-12">
      <p class="mb-2 text-sm uppercase tracking-[0.3em] text-zinc-500">
        ESCLAT FESTIVAL
      </p>

      <h1 class="mb-4 text-5xl font-bold tracking-tight">
        Contacto
      </h1>

      <p class="max-w-xl text-zinc-600">
        Si tienes dudas sobre actividades, acceso, artistas o participación
        en el festival, puedes escribirnos mediante este formulario.
      </p>
    </div>

    <form
      class="flex flex-col gap-6 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm"
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
          class="rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
        >
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="correo"
          class="text-sm font-medium"
        >
          Correo electrónico
        </label>

        <input
          id="correo"
          v-model="correo"
          type="email"
          placeholder="ejemplo@email.com"
          class="rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
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
          placeholder="Escribe aquí tu mensaje"
          class="resize-none rounded-xl border border-zinc-300 px-4 py-3 outline-none transition focus:border-black"
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-fit rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        Enviar formulario
      </button>

      <p
        v-if="formularioEnviado"
        class="text-sm text-green-600"
      >
        Formulario enviado correctamente.
      </p>

    </form>
  </section>
</template>