<template>
    <div class="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Header />

        <!-- Вставляем компонент календаря -->
        <div class="pt-24 px-4">
            <Kalendar
                v-if="allGames && allGames.length > 0"
                :externalGames="allGames"
                :gameTournamentNames="gameTournamentNames"
            />
        </div>
    </div>
</template>

<script setup>
import { useHead } from '#imports'
import { onMounted, ref } from '#imports'
// Импортируем компонент календаря
import Kalendar from '@/components/Kalendar.vue'

useHead({
    title: 'Расписание матчей - ВРЕМЯ ЗВЁЗД',
    meta: [
        {
            name: 'description',
            content:
                'Общее расписание матчей всех турниров любительской хоккейной лиги "ВРЕМЯ ЗВЁЗД" в Ярославле. Даты, время и место проведения игр.',
        },
        {
            name: 'keywords',
            content:
                'хоккей, расписание, матчи, ярославль, календарь игр, время звезд',
        },
        { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
        {
            property: 'og:title',
            content: 'Расписание матчей - ВРЕМЯ ЗВЁЗД',
        },
        {
            property: 'og:description',
            content:
                'Актуальное расписание матчей всех турниров любительской хоккейной лиги "ВРЕМЯ ЗВЁЗД".',
        },
        { property: 'og:type', content: 'website' },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://timeofthestars.ru/schedule',
        },
    ],
})
const allGames = ref([])
const gameTournamentNames = ref({})

onMounted(async () => {
    try {
        allGames.value = await $fetch(
            'https://api.timeofthestars.ru/games/'
        )
        const map = {}
        const championships = await $fetch(
            'https://api.timeofthestars.ru/championships/'
        ).catch(() => [])
        for (const c of championships) {
            const games = await $fetch(
                `https://api.timeofthestars.ru/championships/${c.id}/games`
            ).catch(() => [])
            for (const g of games) {
                if (g && g.id != null) map[g.id] = c.name
            }
        }
        const tournaments = await $fetch(
            'https://api.timeofthestars.ru/tournaments/'
        ).catch(() => [])
        for (const t of tournaments) {
            const games = await $fetch(
                `https://api.timeofthestars.ru/tournaments/${t.id}/games`
            ).catch(() => [])
            for (const g of games) {
                if (g && g.id != null) map[g.id] = t.name
            }
        }
        gameTournamentNames.value = map
    } catch (error) {
        console.error('Ошибка при получении расписания:', error)
    }
})
</script>
