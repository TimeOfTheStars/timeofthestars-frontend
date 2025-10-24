<template>
    <div class="min-h-screen bg-gray-900 text-white">
        <Header />

        <!-- Tournament Header -->
        <section class="relative overflow-hidden mt-16">
            <div
                class="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-red/20"
            ></div>
            <div class="gradient-bg py-20 px-4 relative">
                <div class="max-w-6xl mx-auto text-center">
                    <div class="text-7xl mb-6">🏆</div>
                    <h1 class="text-4xl md:text-6xl font-bold mb-4 text-white">
                        Предсезонный турнир
                    </h1>
                    <p class="text-xl text-white/90 mb-8">
                        среди любительских спорткоманд
                    </p>
                </div>
            </div>
        </section>

        <!-- Tournament Stats -->
        <section class="py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <!-- Команды -->
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            👥
                        </div>
                        <div class="text-4xl font-bold text-gradient">
                            {{ teamData.teamCount }}
                        </div>
                        <div class="text-gray-300">Команд</div>
                    </div>

                    <!-- Матчи -->
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            🏒
                        </div>
                        <div class="text-4xl font-bold text-gradient">
                            {{ teamData.gamesCount }}
                        </div>
                        <div class="text-gray-300">Матчей</div>
                    </div>

                    <!-- Дата начала -->
                    <div class="space-y-2 group">
                        <div
                            class="text-5xl group-hover:scale-110 transition-transform"
                        >
                            📅
                        </div>
                        <div
                            class="text-3xl md:text-4xl font-bold text-gradient"
                        >
                            {{ teamData.start_date }}
                        </div>
                        <div class="text-gray-300">Дата начала турнира</div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Navigation Tabs -->
        <section class="py-8 px-4 bg-gray-800 border-b border-gray-700">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-wrap justify-center gap-4">
                    <button
                        class="w-48 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg"
                        :class="{
                            'bg-primary-blue text-white':
                                activeTab === 'participants',
                            'bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors':
                                activeTab !== 'participants',
                        }"
                        @click="activeTab = 'participants'"
                    >
                        👥 Участники
                    </button>
                    <button
                        class="w-48 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg"
                        :class="{
                            'bg-primary-blue text-white':
                                activeTab === 'calendar',
                            'bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors':
                                activeTab !== 'calendar',
                        }"
                        @click="activeTab = 'calendar'"
                    >
                        📅 Календарь
                    </button>
                    <button
                        class="w-48 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg"
                        :class="{
                            'bg-primary-blue text-white': activeTab === 'table',
                            'bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors':
                                activeTab !== 'table',
                        }"
                        @click="activeTab = 'table'"
                    >
                        📊 Таблица
                    </button>
                    <!-- <button
                        class="w-48 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg"
                        :class="{
                            'bg-primary-blue text-white':
                                activeTab === 'results',
                            'bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors':
                                activeTab !== 'results',
                        }"
                        @click="activeTab = 'results'"
                    >
                        🏆 Результаты
                    </button> -->
                </div>
            </div>
        </section>

        <!-- Participants -->
        <section v-if="activeTab === 'participants'" class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    👥 Участники турнира
                </h2>

                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <NuxtLink
                        v-for="team in tournamentTeamsData"
                        :key="team.id"
                        :to="`/teams/${team.id}`"
                        class="bg-gray-800 rounded-xl p-6 card-hover border border-gray-700 block hover:bg-gray-700 transition-colors"
                    >
                        <TurnirParticipants :team="team" />
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Calendar Tab -->
        <section v-if="activeTab === 'calendar'" class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    📅 Календарь турнира
                </h2>
                <div class="bg-gray-800 rounded-xl p-8 text-center">
                    <Kalendar :turnirData="turnirdata" />
                </div>
            </div>
        </section>

        <!-- Table Tab -->
        <section v-if="activeTab === 'table'" class="py-16 px-4">
            <Table />
        </section>

        <!-- Results Tab -->
        <!-- <section v-if="activeTab === 'results'" class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    🏆 Результаты матчей
                </h2>
                <div class="space-y-4 max-w-4xl mx-auto">
                    <div
                        v-for="(match, index) in matches"
                        :key="index"
                        class="bg-gray-800 rounded-xl p-6 card-hover"
                    >
                        <Matches :match="match" />
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Winner Section -->
        <section class="py-20 px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl font-bold mb-12">
                    🏆 Победитель товарищеского турнира
                </h2>

                <div class="relative">
                    <div
                        class="absolute inset-0 bg-gradient-to-br from-primary-blue/20 to-primary-red/20 rounded-2xl"
                    ></div>
                    <div
                        class="bg-gradient-to-br from-primary-blue to-primary-red p-12 rounded-2xl relative"
                    >
                        <div
                            class="bg-white/10 backdrop-blur-sm rounded-xl p-8"
                        >
                            <div class="w-32 h-32 relative mx-auto mb-6">
                                <img
                                    src="/photo_53844715688281.png (2).webp"
                                    alt="ХК Переславль-Залесский"
                                    class="w-full h-full object-contain rounded-full"
                                />
                            </div>
                            <h3 class="text-3xl font-bold mb-2 text-white">
                                ХК Вымпел-V
                            </h3>
                            <p class="text-white/80 mb-8 text-lg">
                                г. Ярославль
                            </p>

                            <div class="mt-8">
                                <div class="text-white/80 text-lg">
                                    Поздравляем победителей!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Tournament Gallery -->
        <!-- <section class="py-16 px-4 bg-gray-800">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    📸 Фотогалерея турнира
                </h2>

                <div class="grid md:grid-cols-3 gap-6">
                    <div
                        v-for="index in 6"
                        :key="index"
                        class="bg-gray-700 rounded-xl overflow-hidden card-hover group"
                    >
                        <div
                            class="h-48 bg-gradient-to-br from-primary-blue to-primary-red flex items-center justify-center group-hover:scale-105 transition-transform"
                        >
                            <span class="text-4xl">📸</span>
                        </div>
                        <div class="p-4">
                            <h3 class="font-semibold mb-2">
                                Матч #{{ index }}
                            </h3>
                            <p class="text-gray-400 text-sm">
                                Лучшие моменты игры
                            </p>
                        </div>
                    </div>
                </div>

                <div class="text-center mt-8">
                    <button
                        class="bg-gradient-to-r from-primary-blue to-primary-red text-white px-8 py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
                    >
                        📸 Посмотреть все фото
                    </button>
                </div>
            </div>
        </section> -->
        <Footer />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead } from '#imports'

// Set page title
useHead({
    title: 'Предсезонный турнир - ВРЕМЯ ЗВЁЗД',
    meta: [
        {
            name: 'description',
            content:
                'Информация о предсезонном турнире по хоккею в Ярославле. Участники, календарь, таблица и результаты.',
        },
        {
            name: 'keywords',
            content:
                'хоккей, предсезонный турнир, ярославль, расписание, таблица, участники, результаты',
        },
        { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
        {
            property: 'og:title',
            content: 'Предсезонный турнир - ВРЕМЯ ЗВЁЗД',
        },
        {
            property: 'og:description',
            content:
                'Вся информация о предсезонном турнире по хоккею среди любительских команд Ярославля.',
        },
        { property: 'og:type', content: 'website' },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://timeofthestars.ru/pre-season-tournament',
        },
    ],
})

// Активная вкладка
const activeTab = ref('participants')

const { data: turnirdata } = useFetch(
    'https://api.timeofthestars.ru/api/tournaments'
)

const tournamentTeamsData = computed(() => {
    if (
        !turnirdata.value ||
        turnirdata.value.length === 0 ||
        !turnirdata.value[0].teams
    ) {
        return []
    }
    return turnirdata.value[0].teams
})

const teamData = computed(() => {
    if (
        !turnirdata.value ||
        turnirdata.value.length === 0 ||
        !turnirdata.value[0].start_date
    ) {
        return { teamCount: 0, gamesCount: 0, start_date: 'Не определена' }
    } else {
        const date = new Date(turnirdata.value[0].start_date)
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        })
        return {
            teamCount: turnirdata.value[0].teams.length,
            gamesCount: turnirdata.value[0].games.length,
            start_date: formattedDate,
        }
    }
})
</script>
