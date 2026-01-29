// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    components: true,
    devtools: { enabled: true },
    ssr: true,
    nitro: {
        preset: 'node-server',
        crawlLinks: true,
    },
    css: ['~/assets/main.css'],
    modules: ['@nuxt/icon', '@nuxt/image', '@nuxtjs/sitemap', 'nuxt-swiper'],
    site: {
        url: 'https://timeofthestars.ru',
    },
    sitemap: {
        hostname: 'https://timeofthestars.ru',
        gzip: true,
        async routes() {
            const axios = require('axios')
            const staticRoutes = [
                '/',
                '/schedule',
                '/teams',
                '/pre-season-tournament',
                '/teamsPage',
            ]

            const players = await axios.get(
                'https://api.timeofthestars.ru/api/players'
            )
            const playerRoutes = players.data.data.map(
                player => `/players/${player.id}`
            )

            const teams = await axios.get(
                'https://api.timeofthestars.ru/api/teams'
            )
            const teamRoutes = teams.data.data.map(team => `/teams/${team.id}`)

            return staticRoutes.concat(playerRoutes, teamRoutes)
        },
    },

    vite: {
        plugins: [tailwindcss()],
    },
    axios: {
        baseURL: 'http://127.0.0.1:8000/api',
    },
    app: {
        head: {
            title: 'ВРЕМЯ ЗВЁЗД — хоккей, расписание, команды и игроки',

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
                {
                    name: 'description',
                    content:
                        'Новости, результаты и расписание хоккейных матчей проекта ВРЕМЯ ЗВЁЗД. Следите за игроками и командами онлайн.',
                },
                // Цвет темы для мобильных устройств
                {
                    name: 'theme-color',
                    content: '#0f0f0f', // или другой цвет, если указан в manifest
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
                { property: 'og:locale', content: 'ru_RU' },
                { property: 'og:site_name', content: 'ВРЕМЯ ЗВЁЗД' },
                {
                    property: 'og:image',
                    content:
                        'https://timeofthestars.ru/android-chrome-192x192.png',
                },
                { property: 'og:type', content: 'website' },
                { property: 'og:title', content: 'ВРЕМЯ ЗВЁЗД' },
            ],
            htmlAttrs: {
                lang: 'ru',
            },
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
            script: [
                {
                    type: 'application/ld+json',
                    children: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'SportsOrganization',
                        name: 'ВРЕМЯ ЗВЁЗД',
                        url: 'https://timeofthestars.ru',
                        logo: 'https://timeofthestars.ru/android-chrome-192x192.png',
                        sameAs: ['https://vk.com/yourleaguepage'],
                    }),
                },
            ],
        },
    },
})