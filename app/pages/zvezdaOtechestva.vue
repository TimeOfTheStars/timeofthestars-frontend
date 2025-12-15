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



        <!-- Navigation Tabs -->
        <section
            id="tabs-nav"
            class="py-8 px-4 bg-gray-800 border-b border-gray-700"
        >
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
                        @click="
                            () => {
                                activeTab = 'participants'
                                scrollToTabs()
                            }
                        "
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
                        @click="
                            () => {
                                activeTab = 'calendar'
                                scrollToTabs()
                            }
                        "
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
                        @click="
                            () => {
                                activeTab = 'table'
                                scrollToTabs()
                            }
                        "
                    >
                        📊 Таблица
                    </button>

                    <button
                        class="w-48 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold shadow-lg"
                        :class="{
                            'bg-primary-blue text-white':
                                activeTab === 'bestPlayers',
                            'bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors':
                                activeTab !== 'bestPlayers',
                        }"
                        @click="
                            () => {
                                activeTab = 'bestPlayers'
                                scrollToTabs()
                            }
                        "
                    >
                        🏆 Лучшие игроки
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
                        v-for="team in teamData"
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
            <Table :turnirData="teamData" />
        </section>

        <!-- Best Players Tab -->
        <section v-if="activeTab === 'bestPlayers'" class="py-16 px-4">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-3xl font-bold mb-8 text-center">
                    🏆 Лучшие игроки чемпионата
                </h2>
                <div class="bg-gray-800 rounded-xl p-4 md:p-8 overflow-x-auto">
                    <BestPlayers />
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
                            {{ teamData.length }}
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
                            {{ gameData.length }}
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
                            {{ formatDateToRussian(turnirdata[0]?.start_date) }}
                        </div>
                        <div class="text-gray-300">Дата начала турнира</div>
                    </div>
                </div>
            </div>
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
import { ref, computed, nextTick } from 'vue'
import { useHead, useRoute, onMounted } from '#imports'

useHead({
    title: 'Звезда Отечества - ВРЕМЯ ЗВЁЗД',
})

// Активная вкладка
const activeTab = ref('participants')

// плавный скролл к табам
function scrollToTabs() {
    const nav = document.getElementById('tabs-nav')
    if (nav) {
        nav.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
}

// Применение таба из URL и скролл
onMounted(() => {
    const route = useRoute()
    const validTabs = ['participants', 'calendar', 'table', 'bestPlayers']
    const tabFromQuery = route.query.tab

    if (tabFromQuery && validTabs.includes(tabFromQuery)) {
        activeTab.value = tabFromQuery

        nextTick(() => {
            scrollToTabs()
        })
    }
})

const teamData = ref([])
const gameData = ref([])
const turnirdata = ref([])
const playersData = ref([])

onMounted(async () => {
    try {
        const tournaments = await $fetch(
            `https://api.timeofthestars.ru/championships/`
        )
        turnirdata.value = tournaments

        if (tournaments.length > 0) {
            const tournamentId = tournaments[0].id

            teamData.value = await $fetch(
                `https://api.timeofthestars.ru/championships/${tournamentId}/teams`
            )
            gameData.value = await $fetch(
                `https://api.timeofthestars.ru/championships/${tournamentId}/games`
            )
            playersData.value = await $fetch(
                `https://api.timeofthestars.ru/championships/${tournamentId}/players-stats`
            )
        }
    } catch (error) {
        console.error('Ошибка при получении данных:', error)
    }
})

function formatDateToRussian(dateString) {
    if (!dateString) return ''
    const [year, month, day] = dateString.split('-').map(Number)
    const date = new Date(year, month - 1, day)
    return date
        .toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
        .replace(' г.', '')
}
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
