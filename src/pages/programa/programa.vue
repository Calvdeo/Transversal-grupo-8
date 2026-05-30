<template>
  <main class="programa-page">
    <section class="programa-header">
      <p class="programa-kicker">ESCLAT 2026</p>
      <h1>Programa</h1>
    </section>

    <section class="programa-filtros">
      <div>
        <p>Días</p>
        <button>Todo</button>
        <button>Viernes</button>
        <button>Sábado</button>
        <button>Domingo</button>
      </div>

      <div>
        <p>Categorías</p>
        <button>Música</button>
        <button>Talleres</button>
        <button>Conversaciones</button>
        <button>Audiovisual</button>
      </div>
    </section>

    <section class="programa-tabla">
      <div class="tabla-cabecera">
        <p>Fecha</p>
        <p>Hora</p>
        <p>Actividad</p>
        <p>Categoría</p>
        <p>Espacio</p>
      </div>

      <article class="tabla-fila">
        <p>23.10</p>
        <p>18:00</p>
        <div>
          <h2>Valeria Castro</h2>
          <p>Concierto de apertura del festival.</p>
        </div>
        <p>Música</p>
        <p>Escenario principal</p>
      </article>

      <article class="tabla-fila">
        <p>23.10</p>
        <p>19:30</p>
        <div>
          <h2>Taller de cianotipia</h2>
          <p>Experimentación visual con luz, papel y composición.</p>
        </div>
        <p>Taller</p>
        <p>Aula taller</p>
      </article>

      <article class="tabla-fila">
        <p>23.10</p>
        <p>20:00</p>
        <div>
          <h2>Manipulamos o nos manipulan</h2>
          <p>Conversación con Diego Álvarez.</p>
        </div>
        <p>Conversación</p>
        <p>Sala diálogo</p>
      </article>

      <article class="tabla-fila">
        <p>24.10</p>
        <p>18:00</p>
        <div>
          <h2>Utopías y otras especies</h2>
          <p>Proyección audiovisual de Júlia Izaguirre.</p>
        </div>
        <p>Audiovisual</p>
        <p>Sala proyecciones</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.programa-page {
  min-height: 100vh;
  padding: 140px 32px 90px;
  background: #f7f7f4;
  color: #111;
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
  border-top: 2px solid #111;
  border-bottom: 2px solid #111;
  padding: 18px 0;
}

.programa-filtros p {
  margin-bottom: 10px;
  font-size: 14px;
  text-transform: uppercase;
}

.programa-filtros button {
  margin: 0 8px 8px 0;
  border: 1px solid #111;
  border-radius: 999px;
  background: transparent;
  padding: 5px 12px;
  text-transform: uppercase;
  cursor: pointer;
}

.programa-tabla {
  border-top: 2px solid #111;
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
  border-bottom: 1px solid #111;
  text-transform: uppercase;
  font-size: 14px;
}

.tabla-fila {
  min-height: 105px;
  padding: 16px 0;
  border-bottom: 1px solid #111;
}

.tabla-fila h2 {
  font-size: clamp(28px, 3vw, 52px);
  line-height: 0.95;
  font-weight: 500;
}

.tabla-fila p {
  font-size: 14px;
}

.tabla-fila > p {
  text-transform: uppercase;
}

@media (max-width: 800px) {
  .programa-page {
    padding-inline: 18px;
  }

  .programa-filtros {
    grid-template-columns: 1fr;
  }

  .tabla-cabecera {
    display: none;
  }

  .tabla-fila {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .tabla-fila > p {
    font-size: 13px;
  }
}
</style>