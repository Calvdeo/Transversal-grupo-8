<script setup lang="ts">
import { RouterLink } from 'vue-router'
import {
  Instagram,
  Music2
} from 'lucide-vue-next'

import texturaSubrayador from '@/assets/texturas/peques-04.png'
import logoEsclatInstitucion from '@/assets/logo/instituciones/esclat.png'
import logoInstitucionesOrganiza from '@/assets/logo/instituciones/logis.png'
import logoInstitucionesColabora from '@/assets/logo/instituciones/valen.png'
import logoIVAJ from '@/assets/logo/instituciones/ivaj.png'
import logoTuria from '@/assets/logo/instituciones/turia.png'
import logoCocaCola from '@/assets/logo/instituciones/coca.png'
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__content">
      <nav class="site-footer__links" aria-label="Enlaces del pie">
        <RouterLink to="/preguntas-frecuentes" class="site-footer__text-link">
          FAQs
        </RouterLink>

        <RouterLink to="/contacto" class="site-footer__text-link">
          Contacto
        </RouterLink>
      </nav>

      <RouterLink
        to="/entradas"
        class="site-footer__cta"
      >
        <span>Consigue tus entradas</span>
        <img
          :src="texturaSubrayador"
          alt=""
          class="site-footer__texture"
        >
      </RouterLink>

      <div class="site-footer__socials">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          class="site-footer__social-link"
        >
          <Instagram :size="24" />
        </a>

        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noreferrer"
          aria-label="TikTok"
          class="site-footer__social-link"
        >
          <Music2 :size="24" />
        </a>

      </div>

      <div class="site-footer__logos">
        <div class="site-footer__logo-group">
          <span class="site-footer__label">organiza</span>

          <img
            :src="logoEsclatInstitucion"
            alt="Esclat"
            class="site-footer__logo site-footer__logo--esclat"
          >

          <img
            :src="logoInstitucionesOrganiza"
            alt="Ajuntament de Valencia y Las Naves"
            class="site-footer__logo site-footer__logo--organiza"
          >
        </div>

        <div class="site-footer__logo-group">
          <span class="site-footer__label">colabora</span>

          <img
            :src="logoInstitucionesColabora"
            alt="Diputacio de Valencia"
            class="site-footer__logo"
          >

          <img
            :src="logoIVAJ"
            alt="IVAJ"
            class="site-footer__logo"
          >

          <img
            :src="logoTuria"
            alt="Turia"
            class="site-footer__logo"
          >

          <img
            :src="logoCocaCola"
            alt="Coca-Cola"
            class="site-footer__logo"
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  background: var(--esclat-theme-color, #004fff);
  border-top: 2px solid rgba(255, 255, 255, 0.55);
}

.site-footer__content {
  max-width: 1680px;
  margin: 0 auto;
  padding: 34px 22px 20px;
}

.site-footer__cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #ffffff;
  text-decoration: none;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(30px, 4.6vw, 54px);
  line-height: 1;
  transition: transform 130ms ease;
}

.site-footer__cta:hover {
  transform: translateY(-2px);
}

.site-footer__texture {
  width: clamp(120px, 14vw, 220px);
  height: auto;
  filter: brightness(0) invert(1);
  transform: rotate(-12deg);
}

.site-footer__socials {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 2px;
  margin-bottom: 18px;
}

.site-footer__social-link {
  color: #ffffff;
  width: 58px;
  height: 58px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.08);
  clip-path: polygon(
    8% 0,
    92% 0,
    100% 16%,
    100% 84%,
    92% 100%,
    8% 100%,
    0 84%,
    0 16%
  );
  transition:
    transform 140ms ease,
    box-shadow 180ms ease,
    background-color 160ms ease,
    color 160ms ease;
}

.site-footer__social-link:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.22);
  background: #ffffff;
  color: var(--esclat-theme-color, #004fff);
}

.site-footer__links {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: clamp(16px, 2.4vw, 34px);
  margin-bottom: 18px;
  flex-wrap: wrap;
  width: 100%;
}

.site-footer__text-link {
  color: #ffffff;
  text-decoration: none;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(18px, 1.7vw, 26px);
  line-height: 1;
  opacity: 0.96;
  transition:
    transform 130ms ease,
    opacity 130ms ease;
}

.site-footer__text-link:hover {
  transform: translateY(-1px);
  opacity: 0.72;
}

.site-footer__logos {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 2vw, 32px);
  flex-wrap: wrap;
  padding-top: 8px;
}

.site-footer__logo-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(8px, 1vw, 14px);
  flex-wrap: wrap;
}

.site-footer__label {
  color: #ffffff;
  font-size: clamp(14px, 1.25vw, 20px);
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  line-height: 1;
  opacity: 0.96;
  margin-right: 2px;
}

.site-footer__logo {
  height: clamp(28px, 2.7vw, 44px);
  width: auto;
  object-fit: contain;
}

.site-footer__logo--organiza {
  height: clamp(23px, 2.2vw, 36px);
}

.site-footer__logo--esclat {
  height: clamp(22px, 2.1vw, 34px);
}

@media (max-width: 860px) {
  .site-footer__content {
    padding: 28px 14px 16px;
  }

  .site-footer__cta {
    font-size: clamp(26px, 8.2vw, 44px);
  }

  .site-footer__texture {
    width: clamp(110px, 34vw, 180px);
  }

  .site-footer__social-link {
    width: 52px;
    height: 52px;
  }

  .site-footer__links {
    gap: 10px 18px;
    margin-bottom: 14px;
    justify-content: flex-start;
  }

  .site-footer__text-link {
    font-size: 18px;
  }

  .site-footer__logos {
    gap: 10px 14px;
    justify-content: center;
  }

  .site-footer__logo-group {
    gap: 6px 10px;
  }

  .site-footer__label {
    font-size: 14px;
  }

  .site-footer__logo {
    height: 24px;
  }

  .site-footer__logo--organiza {
    height: 21px;
  }

  .site-footer__logo--esclat {
    height: 20px;
  }
}
</style>
