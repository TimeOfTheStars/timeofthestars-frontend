<template>
    <div class="min-h-screen bg-gray-900 text-white overflow-x-hidden">
        <Header />

        <!-- Вставляем компонент календаря -->
        <div class="pt-24 px-4">
            <Kalendar
                v-if="turnirdata && turnirdata.length > 0"
                :turnirData="turnirdata"
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
const turnirdata = ref([])
onMounted(async () => {
    try {
        turnirdata.value = await $fetch(
            'https://api.timeofthestars.ru/championships/'
        )
        console.log('dasdasdasdas', turnirdata.value)
    } catch (error) {
        console.error('Ошибка при получении данных чемпионата:', error)
    }
})
// Получаем данные чемпионата
</script>
