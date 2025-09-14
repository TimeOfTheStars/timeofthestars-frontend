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
                    v-if="tournamentTeamsData"
                    class="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <div
                        v-for="team in tournamentTeamsData"
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
    title: 'Наши команды',
})

const { data: turnirdata } = useFetch(
    'https://api.timeofthestars.ru/api/tournaments'
)

const tournamentTeamsData = computed(() => {
    if (!turnirdata.value || turnirdata.value.length === 0) {
        return { games: [], teams: [] }
    }
    return turnirdata.value[0].teams
})
</script>
