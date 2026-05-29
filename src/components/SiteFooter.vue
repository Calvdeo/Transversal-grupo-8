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
            :src="logoInstitucionesOrganiza"
            alt="Ajuntament de Valencia y Las Naves"
            class="site-footer__logo site-footer__logo--organiza"
          >

          <img
            :src="logoEsclatInstitucion"
            alt="Esclat"
            class="site-footer__logo site-footer__logo--esclat"
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
  background: #0040f2;
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
  color: #0040f2;
}

.site-footer__logos {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 2.6vw, 44px);
  flex-wrap: wrap;
  padding-top: 12px;
}

.site-footer__logo-group {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 1.2vw, 18px);
  flex-wrap: wrap;
}

.site-footer__label {
  color: #ffffff;
  font-size: clamp(20px, 1.8vw, 30px);
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  line-height: 1;
  opacity: 0.96;
  margin-right: 2px;
}

.site-footer__logo {
  height: clamp(42px, 3.9vw, 64px);
  width: auto;
  object-fit: contain;
}

.site-footer__logo--organiza {
  height: clamp(40px, 3.7vw, 62px);
}

.site-footer__logo--esclat {
  height: clamp(34px, 3vw, 52px);
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

  .site-footer__logos {
    gap: 12px 18px;
    justify-content: center;
  }

  .site-footer__logo-group {
    gap: 8px 12px;
  }

  .site-footer__label {
    font-size: 18px;
  }

  .site-footer__logo {
    height: 34px;
  }

  .site-footer__logo--organiza {
    height: 32px;
  }

  .site-footer__logo--esclat {
    height: 28px;
  }
}
</style>

