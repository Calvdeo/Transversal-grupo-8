<script setup lang="ts">
import { computed, ref } from 'vue'
import texturaPoscaAzul from '@/assets/texturas/peques-07.png'
import texturaCeraRosa from '@/assets/texturas/pequesrosa-06.png'
import texturaSubrayadorVerde from '@/assets/texturas/pequesverde-04.png'
import texturaPixelNaranja from '@/assets/texturas/pixelnaranja.png'

type Dia = 'todos' | 'viernes' | 'sabado' | 'domingo'
type Categoria = 'musica' | 'taller' | 'charla' | 'corto'

type Actuacion = {
  hora: string
  artista: string
}

type Evento = {
  dia: Exclude<Dia, 'todos'>
  fecha: string
  hora: string
  titulo: string
  descripcion: string
  categoria: Categoria
  espacio: string
  actuaciones?: Actuacion[]
}

const diaActivo = ref<Dia>('todos')
const categoriaActiva = ref<Categoria | 'todas'>('todas')
const bloquesAbiertos = ref<Record<string, boolean>>({})

const etiquetaCategoria: Record<Categoria, string> = {
  musica: 'artista',
  taller: 'taller',
  charla: 'charla',
  corto: 'corto'
}

const artistasDestacados = new Set([
  'valeria castro',
  'figa flawas',
  'el kanka',
  'belen aguilera',
  'silvana estrada',
  'oques grasses'
])

function normalizarTexto(valor: string): string {
  return valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

function esArtistaDestacado(nombre: string): boolean {
  return artistasDestacados.has(normalizarTexto(nombre))
}

function actuacionesDe(evento: Evento): Actuacion[] {
  return evento.actuaciones ?? []
}

function claveEvento(evento: Evento): string {
  return `${evento.fecha}-${evento.categoria}-${evento.titulo}`
}

function esBloqueArtistas(evento: Evento): boolean {
  return evento.categoria === 'musica' && Boolean(evento.actuaciones?.length)
}

function alternarBloque(evento: Evento) {
  const clave = claveEvento(evento)
  bloquesAbiertos.value[clave] = !bloquesAbiertos.value[clave]
}

function bloqueAbierto(evento: Evento): boolean {
  return Boolean(bloquesAbiertos.value[claveEvento(evento)])
}

const eventos: Evento[] = [
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '--:--',
    titulo: 'Valeria Castro/ Figa flawas',
    descripcion: 'Pulsa para ver horario.',
    categoria: 'musica',
    espacio: 'Patio 2',
    actuaciones: [
      { hora: '18h', artista: 'Figa Flawas' },
      { hora: '21h', artista: 'Valeria Castro' }
      
    ]
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '--:--',
    titulo: 'CORTE! / Escandaloso Xposito / La Paloma / Shego',
    descripcion: 'Pulsa para ver horario.',
    categoria: 'musica',
    espacio: 'Patio 1',
    actuaciones: [
      { hora: '11h', artista: 'Shego' },
      { hora: '12h30', artista: 'Escandaloso Xposito' },
      { hora: '16h', artista: 'La Paloma' },
       { hora: '19h', artista: 'CORTE!' }
    ]
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '--:--',
    titulo: 'El Kanka / Belen Aguilera',
    descripcion: 'Pulsa para ver horario.',
    categoria: 'musica',
    espacio: 'Patio 2',
    actuaciones: [
      { hora: '18h', artista: 'Belen Aguilera' },
      { hora: '21h', artista: 'El Kanka' },
      
    
    ]
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '--:--',
    titulo: 'La Fúmiga / Aiko el grupo / Ariel Pink / Mala gestión',
    descripcion: 'Pulsa para ver horario.',
    categoria: 'musica',
    espacio: 'Patio 1',
    actuaciones: [
      { hora: '11h', artista: 'Ariel Pink' },
      { hora: '12h30', artista: 'Aiko el grupo' },
      { hora: '16h', artista: 'Mala Gestión' },
      { hora: '19h', artista: 'La fúmiga' }
    
    ]
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '--:--',
    titulo: 'Silvana Estrada / Oques Grasses',
    descripcion: 'Pulsa para ver horario.',
    categoria: 'musica',
    espacio: 'Patio 2',
    actuaciones: [
      { hora: '19h', artista: 'Silvana Estrada' },
      { hora: '21h', artista: 'Oques Grasses' }
   
    ]
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '--:--',
    titulo: 'Los Punsetes / Las Petunias / Amor Liquido/ zoo',
    descripcion: 'Pulsa para ver horario.',
    categoria: 'musica',
    espacio: 'Patio 1',
    actuaciones: [
      { hora: '11h', artista: 'Amor Liquido' },
      { hora: '12h30', artista: 'Las Petunias' },
      { hora: '16h', artista: 'Zoo' },
      { hora: '16h', artista: 'Los Punsetes' }
      
      
    ]
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '13h',
    titulo: 'Taller de cianotipia',
    descripcion: 'Pintar con luz y revelar accidentes felices.',
    categoria: 'taller',
    espacio: 'Visual Room'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '18h30',
    titulo: 'Cadaver exquisito',
    descripcion: 'Crear juntos sin saber adónde vamos',
    categoria: 'taller',
    espacio: 'Factoría'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '13h30',
    titulo: 'Escritura creativa',
    descripcion: 'Encontrar historias donde parecía que no había nada.',
    categoria: 'taller',
    espacio: 'Factoría'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '18h30',
    titulo: 'Improvisacion teatral',
    descripcion: 'Menos control. Más juego.',
    categoria: 'taller',
    espacio: 'Factoría'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '13h30',
    titulo: 'Taller de fanzines',
    descripcion: 'Hazlo tú mismo antes de que alguien te diga cómo.',
    categoria: 'taller',
    espacio: 'Visual Room'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '18h30',
    titulo: 'Clase de produccion musical',
    descripcion: 'Convertir una idea en algo que realmente suceda.',
    categoria: 'taller',
    espacio: 'Factoría'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '11h',
    titulo: 'Manipulamos o nos manipulan - Diego Alvarez',
    descripcion: 'Quien manipula y quien es manipulado.',
    categoria: 'charla',
    espacio: 'Sala de Exposiciones'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '16h',
    titulo: 'Piel de platano - Miss Beige',
    descripcion: 'Este encuentro es un intento de poner el centro las prácticas artísticas cómicas. La risa nos libera de tensiones, y eso es un asunto serio.',
    categoria: 'charla',
    espacio: 'Factoría'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '11h',
    titulo: '¿Esta todo inventado? - PutoMikel',
    descripcion: 'Crear después de internet: una conversación incómodamente necesaria.',
    categoria: 'charla',
    espacio: 'Sala de Exposiciones'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '16h',
    titulo: 'La performance - TER',
    descripcion: 'Cuando el cuerpo deja de explicar y empieza a decir.',
    categoria: 'charla',
    espacio: 'Factoría'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '11h',
    titulo: 'Espanul - Lamine Thior',
    descripcion: 'Entre idiomas, fronteras y etiquetas que nunca terminan de encajar.',
    categoria: 'charla',
    espacio: 'Sala de Exposiciones'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '18h',
    titulo: 'Qué nos dice la música - Jaime Altozano',
    descripcion: 'Escuchar más allá de las canciones.',
    categoria: 'charla',
    espacio: 'Sala de Exposiciones'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '12h',
    titulo: '"Madre" - Rodrigo Sorogoyen',
    descripcion: 'La cotidiana conversación entre Marta y su madre se convierte en una trágica situación contrarreloj cuando reciben una llamada de su hijo de 6 años desde una playa francesa perdido sin su padre .',
    categoria: 'corto',
    espacio: 'La Polivalent'
  },
  {
    dia: 'viernes',
    fecha: '23.10.26',
    hora: '18h30',
    titulo: '"Zona Wao" - Nagore Eceiza Mujika',
    descripcion: 'Nominado al Goya a Mejor Corto Documental. Desde hace más de 50 años, empresas petroleras extraen petróleo de la Amazonía con mayor biodiversidad del planeta.',
    categoria: 'corto',
    espacio: 'La Polivalent'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '12h',
    titulo: '"Utopias y otras especies" - Julia Izaguirre',
    descripcion: 'Cercado por nuevos edificios en Vitoria, el barrio ocupado Errekaleor resiste el desalojo en red, entablando un diálogo entre la comunidad y su huerto.',
    categoria: 'corto',
    espacio: 'La Polivalent'
  },
  {
    dia: 'sabado',
    fecha: '24.10.26',
    hora: '18h30',
    titulo: '"Me" - Don Hertzfeldt',
    descripcion: 'Preseleccionado para los Oscar a mejor cortometraje de animación, el aclamado maestro de la animación Don Hertzfeldt ("World of Tomorrow") vuelve con esta odisea musical.',
    categoria: 'corto',
    espacio: 'La Polivalent'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '12h',
    titulo: '"No als poalets" - Laura Garcia Andreu',
    descripcion: 'Los poalets, unos cubos de reciclaje, polarizan a un pueblo entero. Entre masivas protestas, las urnas decidirán si este delirante conflicto cambia su destino.',
    categoria: 'corto',
    espacio: 'La Polivalent'
  },
  {
    dia: 'domingo',
    fecha: '25.10.26',
    hora: '18h30',
    titulo: '"Uli" - Mariana Gil',
    descripcion: 'Una historia que aborda las metamorfosis ocurridas entre la niñez y la adolescencia, desde la imaginación de una zona donde construir nuevas formas de vincularse diversamente.',
    categoria: 'corto',
    espacio: 'La Polivalent'
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

const claseTemaUI = computed(() => {
  if (categoriaActiva.value === 'taller') return 'tema-taller'
  if (categoriaActiva.value === 'charla') return 'tema-charla'
  if (categoriaActiva.value === 'corto') return 'tema-corto'
  return 'tema-musica'
})

const texturaActiva = computed(() => {
  if (categoriaActiva.value === 'taller') {
    return {
      imagen: texturaCeraRosa,
      alt: 'Textura cera rosa'
    }
  }

  if (categoriaActiva.value === 'charla') {
    return {
      imagen: texturaSubrayadorVerde,
      alt: 'Textura verde para charlas'
    }
  }

  if (categoriaActiva.value === 'corto') {
    return {
      imagen: texturaPixelNaranja,
      alt: 'Textura pixel naranja'
    }
  }

  return {
    imagen: texturaPoscaAzul,
    alt: 'Textura posca azul'
  }
})
</script>

<template>
  <main class="programa-page" :class="claseTemaUI">
    <section class="programa-header">
     
      <h1>Programa</h1>
      <div class="textura-esquina">
        <img :src="texturaActiva.imagen" :alt="texturaActiva.alt">
      </div>
    </section>

    <section class="programa-filtros">
      <div>
        <p>Dias</p>
        <button :class="diaActivo === 'todos' ? 'activo' : ''" @click="diaActivo = 'todos'">Todo</button>
        <button :class="diaActivo === 'viernes' ? 'activo' : ''" @click="diaActivo = 'viernes'">Viernes</button>
        <button :class="diaActivo === 'sabado' ? 'activo' : ''" @click="diaActivo = 'sabado'">Sabado</button>
        <button :class="diaActivo === 'domingo' ? 'activo' : ''" @click="diaActivo = 'domingo'">Domingo</button>
      </div>

      <div>
        <p>Categorias</p>
        <button :class="categoriaActiva === 'todas' ? 'activo' : ''" @click="categoriaActiva = 'todas'">Todas</button>
        <button :class="categoriaActiva === 'musica' ? 'activo' : ''" @click="categoriaActiva = 'musica'">Artista</button>
        <button :class="categoriaActiva === 'taller' ? 'activo' : ''" @click="categoriaActiva = 'taller'">Taller</button>
        <button :class="categoriaActiva === 'charla' ? 'activo' : ''" @click="categoriaActiva = 'charla'">Charlas</button>
        <button :class="categoriaActiva === 'corto' ? 'activo' : ''" @click="categoriaActiva = 'corto'">Cortos</button>
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
        :key="claveEvento(evento)"
        class="tabla-fila"
        :class="`categoria-${evento.categoria}`"
      >
        <p class="fecha-celda" data-label="Fecha">{{ evento.fecha }}</p>

        <div class="hora-celda" data-label="Hora">
          <button
            v-if="esBloqueArtistas(evento)"
            type="button"
            class="hora-toggle"
            :aria-expanded="bloqueAbierto(evento)"
            @click.stop="alternarBloque(evento)"
          >
            {{ bloqueAbierto(evento) ? 'v' : '>' }}
          </button>
          <p v-else>{{ evento.hora }}</p>
        </div>

        <div
          class="actividad-celda"
          :class="{ 'actividad-celda-expandible': esBloqueArtistas(evento) }"
          data-label="Actividad"
          @click="esBloqueArtistas(evento) && alternarBloque(evento)"
        >
          <h2 v-if="esBloqueArtistas(evento)">
            <template
              v-for="(actuacion, index) in actuacionesDe(evento)"
              :key="`${evento.titulo}-principal-${actuacion.artista}`"
            >
              <span :class="{ 'artista-destacado': esArtistaDestacado(actuacion.artista) }">
                {{ actuacion.artista }}
              </span>
              <span v-if="index < actuacionesDe(evento).length - 1"> / </span>
            </template>
          </h2>
          <h2 v-else>{{ evento.titulo }}</h2>
          <p>{{ evento.descripcion }}</p>
        </div>

        <p class="categoria-celda" data-label="Categoria">{{ etiquetaCategoria[evento.categoria] }}</p>
        <p class="espacio-celda" data-label="Espacio">{{ evento.espacio }}</p>

        <div
          v-if="esBloqueArtistas(evento) && bloqueAbierto(evento)"
          class="detalle-expandido"
        >
          <div
            v-for="actuacion in evento.actuaciones"
            :key="`${evento.titulo}-${actuacion.hora}-${actuacion.artista}`"
            class="detalle-expandido-fila"
          >
            <p></p>
            <p class="detalle-hora" data-label="Hora">{{ actuacion.hora }}</p>
            <p class="detalle-artista" data-label="Artista">{{ actuacion.artista }}</p>
            <p></p>
            <p></p>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.programa-page {
  --ui-color: #004fff;
  min-height: 100vh;
  padding: 236px 32px 90px;
  background: #f7f7f4;
  color: var(--ui-color);
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
}

.programa-page.tema-musica {
  --ui-color: #004fff;
}

.programa-page.tema-taller {
  --ui-color: #ff3f9e;
}

.programa-page.tema-charla {
  --ui-color: #1f9f47;
}

.programa-page.tema-corto {
  --ui-color: #ff7a00;
}

.programa-header {
  position: relative;
  margin-bottom: 70px;
  padding-right: clamp(80px, 16vw, 260px);
}

.programa-kicker {
  font-size: 18px;
  font-weight: 700;
  text-transform: uppercase;
}

.programa-header h1 {
  max-width: 900px;
  color: var(--ui-color);
  font-size: clamp(76px, 15vw, 190px);
  line-height: 0.78;
  font-weight: 700;
}

.textura-esquina {
  position: absolute;
  top: -360px;
  right: 0;
  width: clamp(220px, 50vw, 780px);
  aspect-ratio: 1 / 1;
  pointer-events: none;
}

.textura-esquina img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0.95;
}

.programa-filtros {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 32px;
  margin-bottom: 60px;
  border-top: 2px solid var(--ui-color);
  border-bottom: 2px solid var(--ui-color);
  padding: 18px 0;
}

.programa-filtros p {
  margin-bottom: 10px;
  font-size: 14px;
  text-transform: uppercase;
}

.programa-filtros button {
  margin: 0 8px 8px 0;
  border: 1px solid var(--ui-color);
  border-radius: 999px;
  background: transparent;
  color: var(--ui-color);
  padding: 5px 12px;
  text-transform: uppercase;
  cursor: pointer;
}

.programa-filtros button.activo {
  background: var(--ui-color);
  color: #ffffff;
}

.programa-tabla {
  border-top: 2px solid var(--ui-color);
  overflow-x: auto;
}

.tabla-cabecera,
.tabla-fila,
.detalle-expandido-fila {
  display: grid;
  grid-template-columns: 110px 90px minmax(0, 1fr) 160px 180px;
  gap: 18px;
  align-items: start;
}

.tabla-cabecera {
  padding: 10px 0;
  color: var(--ui-color);
  border-bottom: 1px solid var(--ui-color);
  text-transform: uppercase;
  font-size: 14px;
}

.tabla-fila {
  --categoria-color: #004fff;
  min-height: 105px;
  padding: 16px 0;
  color: var(--categoria-color);
  border-bottom: 1px solid var(--categoria-color);
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

.tabla-fila.categoria-musica {
  --categoria-color: #004fff;
}

.tabla-fila.categoria-taller {
  --categoria-color: #ff3f9e;
}

.tabla-fila.categoria-charla {
  --categoria-color: #1f9f47;
}

.tabla-fila.categoria-corto {
  --categoria-color: #ff7a00;
}

.actividad-celda-expandible {
  cursor: pointer;
}

.hora-celda {
  display: flex;
  align-items: center;
  min-height: 24px;
}

.hora-toggle {
  border: 0;
  background: none;
  color: currentColor;
  width: auto;
  height: auto;
  padding: 0;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 700;
}

.espacio-celda {
  text-transform: none !important;
}

.detalle-expandido {
  grid-column: 1 / -1;
  margin-top: 8px;
  border-top: 1px solid currentColor;
}

.detalle-expandido-fila {
  position: relative;
  padding: 8px 0;
  font-size: 14px;
}

.detalle-expandido-fila::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  border-bottom: 1px solid currentColor;
}

.detalle-expandido-fila p {
  margin: 0;
}

.detalle-hora {
  font-weight: 700;
}

.artista-destacado {
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  font-weight: 500;
  letter-spacing: 0.01em;
}

@media (max-width: 900px) {
  .programa-page {
    padding-top: 188px;
    padding-inline: 18px;
    padding-bottom: 64px;
  }

  .programa-header {
    padding-right: clamp(70px, 20vw, 120px);
    margin-bottom: 42px;
  }

  .programa-kicker {
    font-size: 15px;
  }

  .programa-header h1 {
    max-width: 560px;
    font-size: clamp(62px, 14vw, 110px);
  }

  .textura-esquina {
    top: -180px;
    width: clamp(180px, 34vw, 300px);
  }

  .programa-filtros {
    grid-template-columns: 1fr;
    gap: 18px;
    margin-bottom: 38px;
    padding: 14px 0;
  }

  .programa-filtros p {
    margin-bottom: 8px;
    font-size: 12px;
  }

  .programa-filtros button {
    margin: 0 6px 6px 0;
    padding: 7px 12px;
    font-size: 13px;
  }

  .tabla-cabecera,
  .tabla-fila,
  .detalle-expandido-fila {
    grid-template-columns: 92px 74px minmax(0, 1fr) 110px 120px;
    gap: 14px;
  }

  .tabla-fila {
    min-height: 88px;
    padding: 14px 0;
  }

  .tabla-fila h2 {
    font-size: clamp(20px, 3vw, 28px);
  }

  .tabla-fila p,
  .detalle-expandido-fila,
  .tabla-cabecera {
    font-size: 12px;
  }
}

@media (max-width: 700px) {
  .programa-page {
    padding-top: 158px;
    padding-inline: 12px;
    padding-bottom: 48px;
  }

  .programa-header {
    margin-bottom: 28px;
    padding-right: 72px;
  }

  .programa-kicker {
    font-size: 12px;
  }

  .programa-header h1 {
    max-width: 320px;
    font-size: clamp(44px, 17vw, 72px);
    line-height: 0.84;
  }

  .textura-esquina {
    top: -92px;
    right: -10px;
    width: 138px;
  }

  .programa-filtros {
    gap: 14px;
    margin-bottom: 26px;
    padding: 12px 0;
  }

  .programa-filtros button {
    padding: 6px 10px;
    font-size: 12px;
  }

  .programa-tabla {
    overflow: visible;
    border-top-width: 1px;
  }

  .tabla-cabecera {
    display: none;
  }

  .tabla-fila {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    grid-template-areas:
      "fecha categoria"
      "hora espacio"
      "actividad actividad"
      "detalle detalle";
    gap: 10px 14px;
    min-height: 0;
    padding: 14px 0 16px;
  }

  .fecha-celda {
    grid-area: fecha;
  }

  .categoria-celda {
    grid-area: categoria;
    text-align: right;
  }

  .hora-celda {
    grid-area: hora;
    min-height: 20px;
  }

  .espacio-celda {
    grid-area: espacio;
    text-align: right;
  }

  .actividad-celda {
    grid-area: actividad;
  }

  .detalle-expandido {
    grid-area: detalle;
    margin-top: 2px;
  }

  .tabla-fila > p,
  .hora-celda,
  .espacio-celda,
  .categoria-celda {
    position: relative;
    padding-top: 12px;
  }

  .fecha-celda::before,
  .hora-celda::before,
  .categoria-celda::before,
  .espacio-celda::before {
    content: attr(data-label);
    position: absolute;
    top: 0;
    left: 0;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    opacity: 0.72;
  }

  .categoria-celda::before,
  .espacio-celda::before {
    left: auto;
    right: 0;
  }

  .tabla-fila h2 {
    font-size: clamp(18px, 6vw, 28px);
    line-height: 0.98;
  }

  .tabla-fila p {
    font-size: 12px;
    line-height: 1.18;
  }

  .actividad-celda p {
    margin-top: 6px;
  }

  .hora-toggle {
    width: 24px;
    height: 24px;
    font-size: 18px;
  }

  .detalle-expandido-fila {
    display: grid;
    grid-template-columns: 72px minmax(0, 1fr);
    gap: 10px;
    padding: 10px 0;
  }

  .detalle-expandido-fila > p:first-child,
  .detalle-expandido-fila > p:nth-child(4),
  .detalle-expandido-fila > p:nth-child(5) {
    display: none;
  }

  .detalle-hora {
    font-size: 12px;
  }

  .detalle-artista {
    font-size: 13px;
    line-height: 1.14;
  }
}

@media (max-width: 420px) {
  .programa-page {
    padding-top: 146px;
    padding-inline: 10px;
  }

  .programa-header {
    padding-right: 58px;
  }

  .programa-header h1 {
    max-width: 250px;
    font-size: clamp(38px, 16vw, 58px);
  }

  .textura-esquina {
    top: -74px;
    width: 112px;
  }

  .programa-filtros button {
    padding: 5px 9px;
    font-size: 11px;
  }

  .tabla-fila {
    gap: 8px 12px;
  }

  .tabla-fila h2 {
    font-size: 17px;
  }

  .tabla-fila p,
  .detalle-artista {
    font-size: 11px;
  }
}
</style>
