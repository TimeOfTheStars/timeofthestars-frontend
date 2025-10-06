<template>
    <!-- Основной контейнер -->
    <div
        class="w-full min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-red-950 p-3 md:p-8 relative overflow-hidden"
    >
        <!-- Анимированный фон -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-20 -right-20 w-40 h-40 md:-top-40 md:-right-40 md:w-80 md:h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
            ></div>
            <div
                class="absolute -bottom-20 -left-20 w-40 h-40 md:-bottom-40 md:-left-40 md:w-80 md:h-80 bg-red-400/10 rounded-full blur-3xl animate-pulse"
                style="animation-delay: 1s"
            ></div>
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
            <!-- Кнопка назад -->
            <button
                @click="goBackToTeam()"
                class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 md:mb-8 transition-all duration-300 hover:scale-105 bg-gray-900/80 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 py-2 md:px-6 md:py-3 shadow-lg border border-blue-800"
                :class="{
                    'opacity-100 translate-x-0': isVisible,
                    'opacity-0 -translate-x-10': !isVisible,
                }"
            >
                <span class="mr-2 text-lg md:text-xl">←</span>
                <span class="font-semibold text-sm md:text-base"
                    >Назад к команде</span
                >
            </button>

            <!-- Если игрок не найден -->
            <div
                v-if="!player"
                class="w-full min-h-screen bg-gradient-to-br from-blue-950 to-red-950 flex items-center justify-center px-4"
            >
                <div
                    class="text-center bg-gray-900 rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl w-full max-w-md"
                >
                    <div class="text-5xl md:text-6xl mb-4">😕</div>
                    <h1
                        class="text-2xl md:text-4xl font-bold text-gray-200 mb-4"
                    >
                        Игрок не найден
                    </h1>
                    <p class="text-gray-400 mb-6 text-sm md:text-base">
                        Возможно, вы перешли по неверной ссылке
                    </p>
                    <button
                        @click="goBackToTeam()"
                        class="bg-gradient-to-r from-blue-600 to-red-600 text-white px-6 py-2 md:px-8 md:py-3 rounded-xl md:rounded-2xl font-semibold hover:scale-105 transition-transform duration-200 inline-block text-sm md:text-base"
                    >
                        🏒 Вернуться к команде
                    </button>
                </div>
            </div>

            <!-- Если игрок найден -->
            <div v-else>
                <!-- Шапка игрока -->
                <div
                    class="bg-gray-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mb-8 md:mb-12 border border-white/20 transition-all duration-1000"
                    :class="{
                        'opacity-100 translate-y-0': isVisible,
                        'opacity-0 translate-y-20': !isVisible,
                    }"
                >
                    <!-- Фото игрока -->
                    <div
                        class="relative h-60 md:h-80 lg:h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 flex items-center justify-center overflow-hidden"
                    >
                        <!-- Анимированные частицы -->
                        <div class="absolute inset-0">
                            <div
                                v-for="i in 10"
                                :key="i"
                                class="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-white/20 rounded-full animate-ping"
                                :style="{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 3}s`,
                                    animationDuration: `${
                                        2 + Math.random() * 2
                                    }s`,
                                }"
                            ></div>
                        </div>

                        <div class="text-center text-white relative z-10 px-4">
                            <div
                                class="text-6xl md:text-8xl lg:text-9xl mb-4 md:mb-6 animate-bounce"
                                style="animation-duration: 3s"
                            >
                                🏒
                            </div>
                            <h1
                                class="text-2xl md:text-4xl lg:text-6xl font-black mb-3 md:mb-4 tracking-wider"
                            >
                                {{ player.full_name }}
                            </h1>
                            <div
                                class="flex items-center justify-center space-x-2 md:space-x-4 text-sm md:text-xl lg:text-2xl opacity-90 flex-wrap"
                            >
                                <span
                                    class="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 md:px-4 md:py-2 text-xs md:text-base"
                                    >#{{ player.number }}</span
                                >
                                <span class="hidden md:inline">•</span>
                                <span class="md:ml-2">{{
                                    player.position
                                }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Информация об игроке -->
                    <div class="p-4 md:p-8 lg:p-12">
                        <!-- Быстрая статистика -->
                        <div
                            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-6 mb-8 md:mb-12"
                        >
                            <div
                                v-for="(stat, index) in quickStats"
                                :key="index"
                                class="text-center group cursor-pointer p-2 md:p-0 text-gray-200"
                                :style="{
                                    animationDelay: `${index * 100}ms`,
                                    animation: isVisible
                                        ? 'fadeInUp 0.8s ease-out forwards'
                                        : 'none',
                                }"
                            >
                                <div
                                    :class="`text-lg md:text-2xl font-black text-${stat.color}-600 mb-1 md:mb-2 group-hover:scale-110 transition-transform duration-300`"
                                >
                                    {{ stat.value }}
                                </div>
                                <div
                                    class="text-xs md:text-sm text-gray-400 font-medium"
                                >
                                    {{ stat.label }}
                                </div>
                            </div>
                        </div>

                        <!-- Вкладки статистики -->
                        <div class="mb-6 md:mb-8">
                            <div
                                class="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6 p-1 md:p-2 bg-gray-800 rounded-xl md:rounded-2xl"
                            >
                                <button
                                    v-for="tab in statTabs"
                                    :key="tab.key"
                                    @click="activeStatTab = tab.key"
                                    class="flex-1 px-3 py-2 md:px-6 md:py-4 rounded-lg md:rounded-xl font-bold transition-all duration-300 relative overflow-hidden text-xs md:text-base"
                                    :class="{
                                        'bg-blue-600 text-white shadow-lg transform scale-105':
                                            activeStatTab === tab.key,
                                        'bg-gray-700 text-gray-300 hover:bg-gray-600':
                                            activeStatTab !== tab.key,
                                    }"
                                >
                                    <span
                                        class="flex items-center justify-center space-x-1 md:space-x-2"
                                    >
                                        <span class="text-xs md:text-base">{{
                                            tab.icon
                                        }}</span>
                                        <span class="hidden sm:inline">{{
                                            tab.label
                                        }}</span>
                                        <span class="sm:hidden">{{
                                            tab.label.split(' ')[0]
                                        }}</span>
                                    </span>
                                </button>
                            </div>

                            <!-- Текущий сезон -->
                            <div
                                v-if="activeStatTab === 'current'"
                                class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 md:gap-6"
                            >
                                <div
                                    v-for="(stat, index) in currentSeasonStats"
                                    :key="index"
                                    :class="`bg-${stat.color}-900/30 text-gray-200 rounded-xl md:rounded-2xl p-3 md:p-6 text-center hover:scale-105 transition-all duration-300 border border-${stat.color}-800`"
                                >
                                    <div
                                        :class="`text-xl md:text-3xl font-black text-${stat.color}-600 mb-1 md:mb-2`"
                                    >
                                        {{ stat.value }}
                                    </div>
                                    <div
                                        class="text-xs md:text-sm text-gray-400 font-medium mb-1"
                                    >
                                        {{ stat.label }}
                                    </div>
                                    <div
                                        class="text-xs text-green-500 font-semibold"
                                    >
                                        {{ stat.trend }}
                                    </div>
                                </div>
                            </div>

                            <!-- Расширенная статистика -->
                            <div
                                v-if="activeStatTab === 'advanced'"
                                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6"
                            >
                                <div
                                    v-for="(stat, index) in advancedStats"
                                    :key="index"
                                    :class="`bg-gradient-to-br from-${stat.color}-900/30 to-${stat.color}-800/30 rounded-xl md:rounded-2xl p-4 md:p-6 hover:scale-105 transition-all duration-300 border border-${stat.color}-700`"
                                >
                                    <h4
                                        :class="`font-bold text-${stat.color}-600 mb-2 md:mb-3 text-sm md:text-lg`"
                                    >
                                        {{ stat.label }}
                                    </h4>
                                    <div
                                        :class="`text-xl md:text-3xl font-black text-${stat.color}-700 mb-1 md:mb-2`"
                                    >
                                        {{ stat.value }}
                                    </div>
                                    <div
                                        class="text-xs md:text-sm text-gray-400"
                                    >
                                        {{ stat.description }}
                                    </div>
                                </div>
                            </div>

                            <!-- Последние игры -->
                            <div
                                v-if="activeStatTab === 'recent'"
                                class="space-y-3 md:space-y-4"
                            >
                                <div
                                    v-for="(game, index) in player.recentGames"
                                    :key="index"
                                    class="bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-6 border-l-4 hover:scale-102 transition-all duration-300"
                                    :class="{
                                        'border-green-500 bg-green-900/20':
                                            game.result.startsWith('W'),
                                        'border-red-500 bg-red-900/20':
                                            !game.result.startsWith('W'),
                                    }"
                                >
                                    <div
                                        class="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-3 sm:space-y-0"
                                    >
                                        <div
                                            class="flex items-center space-x-3 md:space-x-4"
                                        >
                                            <div class="text-center">
                                                <div
                                                    class="text-xs md:text-sm text-gray-500 mb-1"
                                                >
                                                    {{ game.date }}
                                                </div>
                                                <div
                                                    class="font-bold text-sm md:text-base"
                                                >
                                                    vs {{ game.opponent }}
                                                </div>
                                            </div>
                                            <div
                                                class="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold"
                                                :class="{
                                                    'bg-green-100 text-green-700':
                                                        game.result.startsWith(
                                                            'W'
                                                        ),
                                                    'bg-red-100 text-red-700':
                                                        !game.result.startsWith(
                                                            'W'
                                                        ),
                                                }"
                                            >
                                                {{ game.result }}
                                            </div>
                                        </div>
                                        <div
                                            class="flex items-center justify-between sm:justify-end space-x-4 md:space-x-6 text-center"
                                        >
                                            <div>
                                                <div
                                                    class="text-lg md:text-2xl font-bold text-blue-600"
                                                >
                                                    {{ game.goals }}
                                                </div>
                                                <div
                                                    class="text-xs text-gray-500"
                                                >
                                                    🏒
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="text-lg md:text-2xl font-bold text-red-600"
                                                >
                                                    {{ game.assists }}
                                                </div>
                                                <div
                                                    class="text-xs text-gray-500"
                                                >
                                                    🎯
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="text-lg md:text-2xl font-bold text-yellow-600"
                                                >
                                                    {{ game.rating }}
                                                </div>
                                                <div
                                                    class="text-xs text-gray-500"
                                                >
                                                    ⭐
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Биография -->
                        <div class="mb-8 md:mb-12">
                            <h3
                                class="text-xl md:text-3xl font-black mb-4 md:mb-6 text-gray-200 flex items-center space-x-2 md:space-x-3"
                            >
                                <span>📖</span>
                                <span>Биография</span>
                            </h3>
                            <div
                                class="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-inner"
                            >
                                <p
                                    class="text-gray-300 leading-relaxed text-sm md:text-lg mb-4 md:mb-6"
                                >
                                    {{ player.bio }}
                                </p>
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 text-xs md:text-sm"
                                >
                                    <div
                                        class="bg-gray-800/50 rounded-xl md:rounded-2xl p-3 md:p-4"
                                    >
                                        <strong class="text-blue-600"
                                            >Место рождения:</strong
                                        >
                                        {{ player.birthPlace }}
                                    </div>
                                    <div
                                        class="bg-gray-800/50 rounded-xl md:rounded-2xl text-gray-200 p-3 md:p-4"
                                    >
                                        <strong class="text-red-600"
                                            >Позиция:</strong
                                        >
                                        {{ player.position }}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Достижения -->
                        <div class="mb-8 md:mb-12">
                            <h3
                                class="text-xl md:text-3xl font-black mb-4 md:mb-6 text-gray-200 flex items-center space-x-2 md:space-x-3"
                            >
                                <span class="animate-pulse">🏆</span>
                                <span>Достижения</span>
                            </h3>
                            <div
                                class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6"
                            >
                                <div
                                    v-for="(
                                        achievement, index
                                    ) in player.achievements"
                                    :key="index"
                                    class="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-yellow-800 hover:scale-105 transition-all duration-300 group"
                                >
                                    <div
                                        class="flex items-center space-x-3 md:space-x-4"
                                    >
                                        <div
                                            class="text-2xl md:text-4xl group-hover:animate-bounce"
                                        >
                                            🏆
                                        </div>
                                        <div>
                                            <p
                                                class="font-bold text-gray-200 text-sm md:text-lg"
                                            >
                                                {{ achievement }}
                                            </p>
                                            <p
                                                class="text-xs md:text-sm text-yellow-600"
                                            >
                                                Престижная награда
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Статистика по сезонам -->
                        <div class="mb-8 md:mb-12">
                            <h3
                                class="text-xl md:text-3xl font-black mb-4 md:mb-6 text-gray-200 flex items-center space-x-2 md:space-x-3"
                            >
                                <span>📈</span>
                                <span>Статистика за сезон</span>
                            </h3>
                            <div class="overflow-x-auto">
                                <table
                                    class="w-full bg-gray-800 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-gray-700 min-w-[500px]"
                                >
                                    <thead
                                        class="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white"
                                    >
                                        <tr>
                                            <th
                                                class="px-3 py-2 md:px-6 md:py-4 text-left font-bold text-xs md:text-base"
                                            >
                                                Сезон
                                            </th>
                                            <th
                                                class="px-3 py-2 md:px-6 md:py-4 text-left font-bold text-xs md:text-base"
                                            >
                                                Команда
                                            </th>
                                            <th
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-xs md:text-base"
                                            >
                                                И
                                            </th>
                                            <th
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-xs md:text-base"
                                            >
                                                Г
                                            </th>
                                            <th
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-xs md:text-base"
                                            >
                                                П
                                            </th>
                                            <th
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-xs md:text-base"
                                            >
                                                О
                                            </th>
                                            <th
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-xs md:text-base"
                                            >
                                                Г/И
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            :class="{
                                                'bg-gray-700': index % 2 === 0,
                                                'bg-gray-800': index % 2 !== 0,
                                                'hover:bg-blue-900/30': true,
                                            }"
                                            class="transition-colors duration-200"
                                        >
                                            <td
                                                class="px-3 py-2 md:px-6 md:py-4 font-bold text-blue-600 text-xs md:text-base"
                                            >
                                                1
                                            </td>
                                            <td
                                                class="px-3 py-2 md:px-6 md:py-4 font-semibold text-xs md:text-base"
                                            >
                                                {{ player.team }}
                                            </td>
                                            <td
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-xs md:text-base"
                                            >
                                                {{ player.games }}
                                            </td>
                                            <td
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-blue-600 text-xs md:text-base"
                                            >
                                                {{ player.goals }}
                                            </td>
                                            <td
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-red-600 text-xs md:text-base"
                                            >
                                                {{ player.assists }}
                                            </td>
                                            <td
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-green-600 text-xs md:text-base"
                                            >
                                                {{ player.points }}
                                            </td>
                                            <td
                                                class="px-3 py-2 md:px-6 md:py-4 text-center font-bold text-purple-600 text-xs md:text-base"
                                            >
                                                {{
                                                    (
                                                        player.goals /
                                                        player.games
                                                    ).toFixed(2)
                                                }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <!-- Кнопка действия -->
                        <div class="text-center">
                            <button
                                @click="goBackToTeam()"
                                class="group bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 hover:from-blue-700 hover:via-purple-700 hover:to-red-700 text-white font-bold py-4 px-8 md:py-6 md:px-12 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden w-full sm:w-auto"
                            >
                                <div
                                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                ></div>
                                <span
                                    class="relative z-10 flex items-center justify-center space-x-2 md:space-x-3 text-sm md:text-lg"
                                >
                                    <span>🏒</span>
                                    <span>Вернуться к команде</span>
                                    <span
                                        class="group-hover:translate-x-1 transition-transform duration-200"
                                        >→</span
                                    >
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '#imports'
import { getPlayerPhoto } from '@/utils/PicturesAdmin'

const route = useRoute()
const router = useRouter()
const isVisible = ref(false)
const activeStatTab = ref('current')

const goBackToTeam = () => {
    const fromPath = route.query.from
    if (fromPath) {
        router.push(fromPath)
    } else {
        // Fallback если параметр отсутствует
        router.push('/teams')
    }
}

onMounted(() => {
    isVisible.value = true
})
const playerId = route.params.id

const { data: playerData, error } = await useAsyncData(
    `player-${playerId}`,
    () => $fetch(`https://api.timeofthestars.ru/api/players/${playerId}`)
)

if (error.value || !playerData.value) {
    throw createError({
        statusCode: 404,
        statusMessage: `Игрок не найден`,
        fatal: true,
    })
}

const player = playerData.value

useHead(computed(() => ({
    title: `${player.full_name || 'Игрок'} - ВРЕМЯ ЗВЁЗД`,
    meta: [
        {
            name: 'description',
            content: `Страница хоккеиста ${player.full_name}. Статистика, биография, и новости.`,
        },
        {
            name: 'keywords',
            content: `хоккей, хоккеист, ${player.full_name}, ярославль, статистика, биография, время звезд`,
        },
        { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
        {
            property: 'og:title',
            content: `${player.full_name} - ВРЕМЯ ЗВЁЗД`,
        },
        {
            property: 'og:description',
            content: `Вся информация о хоккеисте ${player.full_name}: статистика, биография, и новости.`,
        },
        { property: 'og:type', content: 'profile' },
        { property: 'og:image', content: getPlayerPhoto(player.id) },
    ],
    link: [
        {
            rel: 'canonical',
            href: `https://timeofthestars.ru/players/${player.id}`,
        },
    ],
})))

// Вычисляемые свойства для статистики
const quickStats = computed(() => [
    { label: '🎂 Возраст', value: player.birth_date, color: 'blue' },
    { label: '📏 Рост', value: player.height, color: 'red' },
    { label: '⚖️ Вес', value: player.weight, color: 'green' },
    { label: '🏳️ Страна', value: player.nationality, color: 'purple' },
    { label: '💰 Стоимость', value: player.marketValue, color: 'yellow' },
    {
        label: '📄 Контракт',
        value: '0',
        color: 'indigo',
    },
])

const statTabs = computed(() => [
    { key: 'current', label: '📊 Текущий сезон', icon: '🔥' },
    { key: 'advanced', label: '🎯 Расширенная', icon: '📈' },
    { key: 'recent', label: '📅 Последние игры', icon: '⚡' },
])

const currentSeasonStats = computed(() => [
    { label: '🏒 Голы', value: player.goals, color: 'blue', trend: '' },
    {
        label: '🎯 Передачи',
        value: player.assists,
        color: 'red',
        trend: '',
    },

    {
        label: '🎮 Игры',
        value: player.gamesPlayed,
        color: 'purple',
        trend: '',
    },

    {
        label: '⏱️ ',
        value: '0 мин',
        color: 'orange',
        trend: '',
    },
    {
        label: '🔥 ПП голы',
        value: player.powerPlayGoals,
        color: 'indigo',
        trend: '',
    },
    {
        label: '⚡ МН голы',
        value: player.shortHandedGoals,
        color: 'pink',
        trend: '',
    },
])

const advancedStats = computed(() => [
    {
        label: '🔥 Броски',
        value: player.shots,
        description: `Точность: ${player.shootingPercentage}`,
        color: 'blue',
    },
    {
        label: '⚡ Вбрасывания',
        value: player.faceoffWins,
        description: 'Процент побед',
        color: 'red',
    },
    {
        label: '⏰ Время на льду',
        value: player.averageTimeOnIce,
        description: 'В среднем за игру',
        color: 'green',
    },
    {
        label: '🏆 Решающие голы',
        value: player.gameWinningGoals,
        description: 'Победных голов',
        color: 'purple',
    },
])
</script>

<style>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hover\:scale-102:hover {
    transform: scale(1.02);
}

/* Адаптивные стили для мобильных устройств */
@media (max-width: 640px) {
    .min-w-\[500px\] {
        min-width: 500px;
    }
}

@media (max-width: 480px) {
    .text-2xl {
        font-size: 1.5rem;
        line-height: 2rem;
    }

    .text-xl {
        font-size: 1.25rem;
        line-height: 1.75rem;
    }

    .text-lg {
        font-size: 1.125rem;
        line-height: 1.75rem;
    }
}

/* Улучшение скролла на мобильных */
.overflow-x-auto {
    -webkit-overflow-scrolling: touch;
}
</style>
