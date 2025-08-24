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
    app: {
        head: {
            link: [
                // Основная favicon .ico
                {
                    rel: 'icon',
                    type: 'image/x-icon',
                    href: '/favicon.ico',
                },
                // PNG версии
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '16x16',
                    href: '/favicon-16x16.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '32x32',
                    href: '/favicon-32x32.png',
                },
                // Для Apple устройств
                {
                    rel: 'apple-touch-icon',
                    sizes: '180x180',
                    href: '/apple-touch-icon.png',
                },
                // Для Android
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '192x192',
                    href: '/android-chrome-192x192.png',
                },
                {
                    rel: 'icon',
                    type: 'image/png',
                    sizes: '512x512',
                    href: '/android-chrome-512x512.png',
                },
                // Web manifest
                {
                    rel: 'manifest',
                    href: '/site.webmanifest',
                },
            ],
            meta: [
                // Цвет темы для мобильных устройств
                {
                    name: 'theme-color',
                    content: '#ffffff', // или другой цвет, если указан в manifest
                },
                // Для Windows Metro
                {
                    name: 'msapplication-TileColor',
                    content: '#da532c', // или другой цвет
                },
                {
                    name: 'msapplication-TileImage',
                    content: '/mstile-144x144.png', // если у вас есть такой файл
                },
            ],
        },
    },
})
