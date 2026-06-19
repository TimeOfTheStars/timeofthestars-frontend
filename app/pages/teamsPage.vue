<template>
    <div class="min-h-screen bg-gray-900 text-white overflow-x-hidden mt-16">
        <Header />
        <section class="py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4">
                        🏒 Наши команды
                    </h2>
                    <p class="text-xl text-gray-300">
                        ⭐ Познакомьтесь с командами нашей лиги 🏆
                    </p>
                </div>

                <div
                    v-if="turnirdata"
                    class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <div
                        v-for="team in turnirdata"
                        :key="team.id"
                        class="bg-gray-700 rounded-xl p-6 card-hover text-center"
                    >
                        <TeamCard :team="team" />
                    </div>
                </div>
                <div v-else-if="error" class="text-center text-red-500">
                    Ошибка загрузки команд.
                </div>
                <div v-else class="text-center">Загрузка команд...</div>
            </div>
        </section>
        <Footer />
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useHead } from '#imports'

useHead({
    title: 'Команды - ВРЕМЯ ЗВЁЗД',
    meta: [
        {
            name: 'description',
            content:
                'Список команд-участниц любительской хоккейной лиги "ВРЕМЯ ЗВЁЗД" в Ярославле. Информация о командах, составы.',
        },
        {
            name: 'keywords',
            content:
                'хоккей, команды, ярославль, хоккейные команды, лига, время звезд',
        },
        { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
        {
            property: 'og:title',
            content: 'Команды - ВРЕМЯ ЗВЁЗД',
        },
        {
            property: 'og:description',
            content:
                'Познакомьтесь с командами нашей лиги. Вся информация о командах-участницах.',
        },
        { property: 'og:type', content: 'website' },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://timeofthestars.ru/teamsPage',
        },
    ],
})

const turnirdata = apiData('https://api.timeofthestars.ru/teams/') || []
</script>
