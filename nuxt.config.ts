// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/public/assets/sass/main.scss'],
  app: {
    baseURL: '/slg-bad',
    head: {
      title: 'SLG Badminton - Limoges',
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: './assets/icons/logo.svg'
        }
      ]
    }
  }
})
