<script setup lang="ts">
import { computed, ref } from 'vue'

type Dia = 'todos' | 'viernes' | 'sabado' | 'domingo'
type Categoria = 'musica' | 'taller' | 'charla' | 'corto'

type Evento = {
  dia: Exclude<Dia, 'todos'>
  fecha: string
  hora: string
  titulo: string
  descripcion: string
  categoria: Categoria
  espacio: string
}

const diaActivo = ref<Dia>('todos')
const categoriaActiva = ref<Categoria | 'todas'>('todas')

const etiquetaCategoria: Record<Categoria, string> = {
  musica: 'artista',
  taller: 'taller',
  charla: 'charla',
  corto: 'corto'
}

const eventos: Evento[] = [
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '--:--',
    titulo: 'Valeria Castro · Figa Flawas · Shego',
    descripcion: 'Bloque de conciertos.',
    categoria: 'musica',
    espacio: 'Escenario principal'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '--:--',
    titulo: 'CORTE! · Escandaloso Xposito · La Paloma',
    descripcion: 'Bloque de conciertos.',
    categoria: 'musica',
    espacio: 'Escenario principal'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '--:--',
    titulo: 'El Kanka · Belen Aguilera · Mala Gestion',
    descripcion: 'Bloque de conciertos.',
    categoria: 'musica',
    espacio: 'Escenario principal'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '--:--',
    titulo: 'La Fumiga · Aiko el grupo · Ariel Pink',
    descripcion: 'Bloque de conciertos.',
    categoria: 'musica',
    espacio: 'Escenario principal'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '--:--',
    titulo: 'Silvana Estrada · Oques Grasses · Zoo',
    descripcion: 'Bloque de conciertos.',
    categoria: 'musica',
    espacio: 'Escenario principal'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '--:--',
    titulo: 'Los Punsetes · Las Petunias · Amor Liquido',
    descripcion: 'Bloque de conciertos.',
    categoria: 'musica',
    espacio: 'Escenario principal'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '12:30',
    titulo: 'Taller de cianotipia',
    descripcion: 'Actividad practica.',
    categoria: 'taller',
    espacio: 'Aula taller'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '17:30',
    titulo: 'Cadaver exquisito',
    descripcion: 'Actividad practica.',
    categoria: 'taller',
    espacio: 'Aula taller'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '12:30',
    titulo: 'Escritura creativa',
    descripcion: 'Actividad practica.',
    categoria: 'taller',
    espacio: 'Aula taller'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '17:30',
    titulo: 'Improvisacion teatral',
    descripcion: 'Actividad practica.',
    categoria: 'taller',
    espacio: 'Aula taller'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '12:30',
    titulo: 'Taller de fanzines',
    descripcion: 'Actividad practica.',
    categoria: 'taller',
    espacio: 'Aula taller'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '18:00',
    titulo: 'Clase de produccion musical',
    descripcion: 'Actividad practica.',
    categoria: 'taller',
    espacio: 'Aula taller'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '11:00',
    titulo: 'Manipulamos o nos manipulan - Diego Alvarez',
    descripcion: 'Encuentro en formato charla.',
    categoria: 'charla',
    espacio: 'Foro'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '16:00',
    titulo: 'Piel de platano - Miss Beige',
    descripcion: 'Encuentro en formato charla.',
    categoria: 'charla',
    espacio: 'Foro'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '11:00',
    titulo: 'Esta todo inventado? - PutoMikel',
    descripcion: 'Encuentro en formato charla.',
    categoria: 'charla',
    espacio: 'Foro'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '16:00',
    titulo: 'La performance - TER',
    descripcion: 'Encuentro en formato charla.',
    categoria: 'charla',
    espacio: 'Foro'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '11:00',
    titulo: 'Espanul - Lamine Thior',
    descripcion: 'Encuentro en formato charla.',
    categoria: 'charla',
    espacio: 'Foro'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '18:00',
    titulo: 'Trap del terraplanismo - Jaime Altozano',
    descripcion: 'Encuentro en formato charla.',
    categoria: 'charla',
    espacio: 'Foro'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '12:00',
    titulo: '"Madre" - Rodrigo Sorogoyen',
    descripcion: 'Proyeccion de cortometraje.',
    categoria: 'corto',
    espacio: 'Sala proyecciones'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '18:30',
    titulo: '"Zona Wao" - Nagore Eceiza Mujika',
    descripcion: 'Proyeccion de cortometraje.',
    categoria: 'corto',
    espacio: 'Sala proyecciones'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '12:00',
    titulo: '"Utopias y otras especies" - Julia Izaguirre',
    descripcion: 'Proyeccion de cortometraje.',
    categoria: 'corto',
    espacio: 'Sala proyecciones'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '18:30',
    titulo: '"Me" - Don Hertzfeldt',
    descripcion: 'Proyeccion de cortometraje.',
    categoria: 'corto',
    espacio: 'Sala proyecciones'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '12:00',
    titulo: '"No als poalets" - Laura Garcia Andreu',
    descripcion: 'Proyeccion de cortometraje.',
    categoria: 'corto',
    espacio: 'Sala proyecciones'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '18:00',
    titulo: '"Uli" - Mariana Gil',
    descripcion: 'Proyeccion de cortometraje.',
    categoria: 'corto',
    espacio: 'Sala proyecciones'
  }
]

const eventosFiltrados = computed(() => {
  let resultado = eventos

  if (diaActivo.value !== 'todos') {
    resultado = resultado.filter((evento) => evento.dia === diaActivo.value)
  }

  if (categoriaActiva.value !== 'todas') {
    resultado = resultado.filter((evento) => evento.categoria === categoriaActiva.value)
  }

  return resultado
})
</script>

<template>
  <main class="programa-page">
    <section class="programa-header">
      <p class="programa-kicker">ESCLAT 2026</p>
      <h1>Programa</h1>
    </section>

    <section class="programa-filtros">
      <div>
        <p>Dias</p>
        <button
          :class="diaActivo === 'todos' ? 'activo' : ''"
          @click="diaActivo = 'todos'"
        >
          Todo
        </button>
        <button
          :class="diaActivo === 'viernes' ? 'activo' : ''"
          @click="diaActivo = 'viernes'"
        >
          Viernes
        </button>
        <button
          :class="diaActivo === 'sabado' ? 'activo' : ''"
          @click="diaActivo = 'sabado'"
        >
          Sabado
        </button>
        <button
          :class="diaActivo === 'domingo' ? 'activo' : ''"
          @click="diaActivo = 'domingo'"
        >
          Domingo
        </button>
      </div>

      <div>
        <p>Categorias</p>
        <button
          :class="categoriaActiva === 'todas' ? 'activo' : ''"
          @click="categoriaActiva = 'todas'"
        >
          Todas
        </button>
        <button
          :class="categoriaActiva === 'musica' ? 'activo' : ''"
          @click="categoriaActiva = 'musica'"
        >
          Artista
        </button>
        <button
          :class="categoriaActiva === 'taller' ? 'activo' : ''"
          @click="categoriaActiva = 'taller'"
        >
          Taller
        </button>
        <button
          :class="categoriaActiva === 'charla' ? 'activo' : ''"
          @click="categoriaActiva = 'charla'"
        >
          Charlas
        </button>
        <button
          :class="categoriaActiva === 'corto' ? 'activo' : ''"
          @click="categoriaActiva = 'corto'"
        >
          Cortos
        </button>
      </div>
    </section>

    <section class="programa-tabla">
      <div class="tabla-cabecera">
        <p>Fecha</p>
        <p>Hora</p>
        <p>Actividad</p>
        <p>Categoria</p>
        <p>Espacio</p>
      </div>
      <article
        v-for="evento in eventosFiltrados"
        :key="`${evento.fecha}-${evento.hora}-${evento.titulo}`"
        class="tabla-fila"
      >
        <p>{{ evento.fecha }}</p>
        <p>{{ evento.hora }}</p>
        <div>
          <h2>{{ evento.titulo }}</h2>
          <p>{{ evento.descripcion }}</p>
        </div>
        <p>{{ etiquetaCategoria[evento.categoria] }}</p>
        <p>{{ evento.espacio }}</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.programa-page {
  min-height: 100vh;
  padding: 140px 32px 90px;
  background: #f7f7f4;
  color: #0040f2;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
}

.programa-header {
  margin-bottom: 70px;
}

.programa-kicker {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}

.programa-header h1 {
  max-width: 900px;
  color: #0040f2;
  font-size: clamp(76px, 15vw, 190px);
  line-height: 0.78;
  font-weight: 700;
}

.programa-filtros {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  margin-bottom: 60px;
  border-top: 2px solid #0040f2;
  border-bottom: 2px solid #0040f2;
  padding: 18px 0;
}

.programa-filtros p {
  margin-bottom: 10px;
  font-size: 14px;
  text-transform: uppercase;
}

.programa-filtros button {
  margin: 0 8px 8px 0;
  border: 1px solid #0040f2;
  border-radius: 999px;
  background: transparent;
  color: #0040f2;
  padding: 5px 12px;
  text-transform: uppercase;
  cursor: pointer;
}

.programa-filtros button.activo {
  background: #0040f2;
  color: #ffffff;
}

.programa-tabla {
  border-top: 2px solid #0040f2;
  overflow-x: auto;
}

.tabla-cabecera,
.tabla-fila {
  display: grid;
  grid-template-columns: 110px 90px minmax(0, 1fr) 160px 180px;
  gap: 18px;
  align-items: start;
}

.tabla-cabecera {
  padding: 10px 0;
  border-bottom: 1px solid #0040f2;
  text-transform: uppercase;
  font-size: 14px;
}

.tabla-fila {
  min-height: 105px;
  padding: 16px 0;
  border-bottom: 1px solid #0040f2;
}

.tabla-fila h2 {
  font-size: clamp(24px, 2.6vw, 38px);
  line-height: 0.95;
  font-weight: 500;
}

.tabla-fila p {
  font-size: 14px;
}

.tabla-fila > p {
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .programa-page {
    padding-inline: 18px;
  }

  .programa-filtros {
    grid-template-columns: 1fr;
  }
}
</style>
