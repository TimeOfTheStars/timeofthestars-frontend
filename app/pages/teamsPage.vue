<template>
    <div class="min-h-screen bg-gray-900 text-white overflow-x-hidden">
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
                    v-if="teamsdata"
                    class="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    <div
                        v-for="team in teamsdata"
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
const { data: teamsdata, error } = useFetch(
    'https://api.timeofthestars.ru/api/teams'
)
</script>
