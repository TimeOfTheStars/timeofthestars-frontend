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
                        {{ tournamentTitle }}
                    </h1>
                    <p class="text-xl text-white/90 mb-8">
                        среди любительских спорткоманд
                    </p>
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
                        v-for="team in teamData"
                        :key="team.id"
                        :to="`/teams/${team.id}${currentTournamentId ? `?context=tournament-${currentTournamentId}` : ''}`"
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
                    <Kalendar
                    :turnirData="selectedTournament ? [selectedTournament] : []"
                    dataType="tournament"
                    :context-key="currentTournamentId ? `tournament-${currentTournamentId}` : ''"
                />
                </div>
            </div>
        </section>

        <!-- Table Tab -->
        <section v-if="activeTab === 'table'" class="py-16 px-4">
            <Table
                    :turnirData="teamData"
                    :context-key="currentTournamentId ? `tournament-${currentTournamentId}` : ''"
                />
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
                            {{ formatDateToRussian(selectedTournament?.start_date) }}
                        </div>
                        <div class="text-gray-300">Дата начала турнира</div>
                    </div>
                </div>
            </div>
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
                                    src="/pictures/teams/vympelv.webp"
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
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useHead } from '#imports'

const route = useRoute()

// Выбранный турнир: из query.id или первый из списка
const turnirdata = ref([])
const currentTournamentId = computed(() => {
    const list = turnirdata.value
    const q = route.query.id
    if (q && list?.length) {
        const t = list.find(t => t.id === Number(q))
        if (t) return t.id
    }
    return list?.[0]?.id ?? null
})
const selectedTournament = computed(() => {
    const id = currentTournamentId.value
    if (!id) return null
    return turnirdata.value?.find(t => t.id === id) ?? null
})

const tournamentTitle = computed(() => selectedTournament.value?.name ?? 'Предсезонный турнир')

// Set page title (dynamic by tournament)
useHead(
    computed(() => {
        const title = `${tournamentTitle.value} - ВРЕМЯ ЗВЁЗД`
        return {
            title,
            meta: [
                {
                    name: 'description',
                    content: `Информация о турнире «${tournamentTitle.value}» по хоккею в Ярославле. Участники, календарь, таблица и результаты.`,
                },
                {
                    name: 'keywords',
                    content:
                        'хоккей, предсезонный турнир, ярославль, расписание, таблица, участники, результаты',
                },
                { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
                { property: 'og:title', content: title },
                {
                    property: 'og:description',
                    content: `Вся информация о турнире «${tournamentTitle.value}» по хоккею среди любительских команд Ярославля.`,
                },
                { property: 'og:type', content: 'website' },
            ],
            link: [
                {
                    rel: 'canonical',
                    href: `https://timeofthestars.ru/pre-season-tournament${route.query.id ? `?id=${route.query.id}` : ''}`,
                },
            ],
        }
    })
)

// Активная вкладка
const activeTab = ref('participants')
const teamData = ref([])
const gameData = ref([])

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

// Загрузка списка турниров
onMounted(async () => {
    try {
        const tournaments = await $fetch(
            `https://api.timeofthestars.ru/tournaments/`
        )
        turnirdata.value = tournaments ?? []
    } catch (error) {
        console.error('Ошибка при получении списка турниров:', error)
    }
})

// Загрузка команд и матчей выбранного турнира
watch(
    currentTournamentId,
    async (tournamentId) => {
        if (!tournamentId) {
            teamData.value = []
            gameData.value = []
            return
        }
        try {
            teamData.value = await $fetch(
                `https://api.timeofthestars.ru/tournaments/${tournamentId}/teams`
            )
            gameData.value = await $fetch(
                `https://api.timeofthestars.ru/tournaments/${tournamentId}/games`
            )
        } catch (error) {
            console.error('Ошибка при получении данных турнира:', error)
            teamData.value = []
            gameData.value = []
        }
    },
    { immediate: true }
)
</script>
