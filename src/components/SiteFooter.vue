<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__content">
      <RouterLink to="/entradas" class="site-footer__cta">
        CONSIGUE TUS ENTRADAS
      </RouterLink>

      <div class="site-footer__socials">
        <span class="site-footer__label">Redes sociales</span>
        <a href="#" aria-label="Instagram">Instagram</a>
        <a href="#" aria-label="TikTok">TikTok</a>
        <a href="#" aria-label="YouTube">YouTube</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  width: 100%;
  background: linear-gradient(90deg, #0040f2 0%, #0040f2 100%);
  border-top: 4px solid #ffffff;
}

.site-footer__content {
  max-width: 1600px;
  margin: 0 auto;
  padding: 38px 24px 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}

.site-footer__cta {
  color: #ffffff;
  text-decoration: none;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(34px, 6.5vw, 92px);
  font-weight: 700;
  line-height: 0.95;
}

.site-footer__socials {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  color: #ffffff;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
}

.site-footer__label {
  font-size: 22px;
  font-weight: 700;
  margin-right: 8px;
}

.site-footer__socials a {
  color: #ffffff;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.9);
  padding: 8px 14px;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  transition: background-color 150ms ease, color 150ms ease;
}

.site-footer__socials a:hover {
  background: #ffffff;
  color: #0040f2;
}

@media (max-width: 860px) {
  .site-footer__content {
    padding: 28px 16px 32px;
    gap: 18px;
  }

  .site-footer__label {
    width: 100%;
    margin-right: 0;
    font-size: 20px;
  }

  .site-footer__socials a {
    font-size: 18px;
  }
}
</style>

