<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Instagram, Music2 } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__content">
      <Button
        as-child
        class="site-footer__cta"
      >
        <RouterLink to="/entradas">
          CONSIGUE TUS ENTRADAS
        </RouterLink>
      </Button>

      <div class="site-footer__socials">
        <a href="#" aria-label="Instagram" class="site-footer__social-link">
          <Instagram :size="24" />
        </a>
        <a href="#" aria-label="TikTok" class="site-footer__social-link">
          <Music2 :size="24" />
        </a>
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
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.9);
  color: #ffffff !important;
  font-family: "Alte Haas Grotesk", "Helvetica Neue", Arial, sans-serif;
  font-size: clamp(26px, 5vw, 58px);
  font-weight: 700;
  line-height: 0.95;
  letter-spacing: 0.01em;
  padding: 14px 24px;
  border-radius: 0;
}

.site-footer__socials {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.site-footer__social-link {
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.9);
  width: 50px;
  height: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: background-color 150ms ease, color 150ms ease, transform 120ms ease;
}

.site-footer__social-link:hover {
  background: #ffffff;
  color: #0040f2;
  transform: translateY(-2px);
}

@media (max-width: 860px) {
  .site-footer__content {
    padding: 28px 16px 32px;
    gap: 18px;
  }

  .site-footer__cta {
    width: 100%;
    justify-content: center;
  }

  .site-footer__social-link {
    width: 46px;
    height: 46px;
  }
}
</style>
