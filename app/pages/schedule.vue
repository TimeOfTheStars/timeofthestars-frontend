<template>
    <div class="min-h-screen bg-gray-900 text-white overflow-x-hidden mt-16">
        <Header />

        <!-- Вставляем компонент календаря -->
        <Kalendar :turnirData="turnirdata" />
    </div>
</template>

<script setup>
import { useHead } from '#imports'
// Импортируем компонент календаря
import Kalendar from '@/components/Kalendar.vue'

useHead({
    title: 'Расписание матчей чемпионата - ВРЕМЯ ЗВЁЗД',
    meta: [
        {
            name: 'description',
            content:
                'Расписание матчей чемпионата "Звезда Отечества" любительской хоккейной лиги "ВРЕМЯ ЗВЁЗД" в Ярославле. Даты, время и место проведения игр.',
        },
        {
            name: 'keywords',
            content:
                'хоккей, расписание, матчи, ярославль, календарь игр, время звезд',
        },
        { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
        {
            property: 'og:title',
            content: 'Расписание матчей чемпионата - ВРЕМЯ ЗВЁЗД',
        },
        {
            property: 'og:description',
            content:
                'Актуальное расписание матчей чемпионата "Звезда Отечества" любительской хоккейной лиги "ВРЕМЯ ЗВЁЗД".',
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

// Получаем данные чемпионата
const { data: turnirdata } = useFetch(
    'https://api.timeofthestars.ru/api/championships'
)
</script>
