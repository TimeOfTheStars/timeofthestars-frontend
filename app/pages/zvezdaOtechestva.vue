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
                    <div class="flex justify-center mb-6">
                        <img
                            class="w-60 h-70"
                            src="/zvezdalogo.webp"
                            alt="Zvezda Logo"
                        />
                    </div>
                    <h1 class="text-4xl md:text-6xl font-bold mb-4 text-white">
                        Звезда Отечества
                    </h1>
                    <p class="text-xl text-white/90 mb-8">
                        Чемпионат среди любительских спорткоманд
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
                    📅 Календарь чемпионата
                </h2>
                <div class="bg-gray-800 rounded-xl p-8 text-center">
                    <Kalendar :turnirData="turnirdata" />
                </div>
            </div>
        </section>

        <!-- Table Tab -->
        <section v-if="activeTab === 'table'" class="py-16 px-4">
            <Table :turnirData="turnirdata" />
        </section>

        <!-- Winner Section -->
        <section class="py-20 px-4">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl font-bold mb-12">
                    🏆 Победитель чемпионата
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
                            Информация о победителе отобразиться здесь по
                            окончании турнира
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useHead } from '#imports'

// Set page title
useHead({
    title: 'Звезда Отечества - ВРЕМЯ ЗВЁЗД',
    meta: [
        {
            name: 'description',
            content:
                'Информация о чемпионате Звезда Отечества по хоккею в Ярославле. Участники, календарь, таблица и результаты.',
        },
        {
            name: 'keywords',
            content:
                'хоккей, звезда отечества, чемпионат, ярославль, расписание, таблица, участники, результаты',
        },
        { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
        {
            property: 'og:title',
            content: 'Звезда Отечества - ВРЕМЯ ЗВЁЗД',
        },
        {
            property: 'og:description',
            content:
                'Вся информация о чемпионате Звезда Отечества по хоккею среди любительских команд Ярославля.',
        },
        { property: 'og:type', content: 'website' },
    ],
    link: [
        {
            rel: 'canonical',
            href: 'https://timeofthestars.ru/zvezdaOtechestva',
        },
    ],
})

// Активная вкладка
const activeTab = ref('participants')

const { data: turnirdata } = useFetch(
    'https://api.timeofthestars.ru/api/championships'
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

<style scoped>
.gradient-bg {
    background: linear-gradient(135deg, #1e3a8a 0%, #9f1239 100%);
}
.text-gradient {
    background: linear-gradient(90deg, #3b82f6 0%, #ef4444 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
.card-hover {
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-hover:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
        0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
