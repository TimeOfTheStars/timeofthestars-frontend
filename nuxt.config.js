// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    components: true,
    devtools: { enabled: true },
    css: ['~/assets/main.css'],
    modules: ['@nuxt/icon', '@nuxt/image'],
    vite: {
        plugins: [tailwindcss()],
    },
    axios: {
        baseURL: 'http://127.0.0.1:8000/api',
    },
})
