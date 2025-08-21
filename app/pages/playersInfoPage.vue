<template>
    <!-- Основной контейнер -->
    <div
        class="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 dark:from-blue-950 dark:via-gray-900 dark:to-red-950 p-4 md:p-8 relative overflow-hidden"
    >
        <!-- Анимированный фон -->
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
            <div
                class="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"
            ></div>
            <div
                class="absolute -bottom-40 -left-40 w-80 h-80 bg-red-400/10 rounded-full blur-3xl animate-pulse"
                style="animation-delay: 1s"
            ></div>
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
            <!-- Кнопка назад -->
            <router-link
                to="/"
                class="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-all duration-300 hover:scale-105 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-blue-200 dark:border-blue-800"
                :class="{
                    'opacity-100 translate-x-0': isVisible,
                    'opacity-0 -translate-x-10': !isVisible,
                }"
            >
                <span class="mr-3 text-xl">←</span>
                <span class="font-semibold">Назад к команде</span>
            </router-link>

            <!-- Если игрок не найден -->
            <div
                v-if="!player"
                class="w-full min-h-screen bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-950 dark:to-red-950 flex items-center justify-center"
            >
                <div
                    class="text-center bg-white dark:bg-gray-900 rounded-3xl p-12 shadow-2xl"
                >
                    <div class="text-6xl mb-4">😕</div>
                    <h1
                        class="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4"
                    >
                        Игрок не найден
                    </h1>
                    <p class="text-gray-600 dark:text-gray-400 mb-6">
                        Возможно, вы перешли по неверной ссылке
                    </p>
                    <router-link
                        to="/"
                        class="bg-gradient-to-r from-blue-600 to-red-600 text-white px-8 py-3 rounded-2xl font-semibold hover:scale-105 transition-transform duration-200 inline-block"
                    >
                        🏒 Вернуться к команде
                    </router-link>
                </div>
            </div>

            <!-- Если игрок найден -->
            <div v-else>
                <!-- Шапка игрока -->
                <div
                    class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mb-12 border border-white/20 transition-all duration-1000"
                    :class="{
                        'opacity-100 translate-y-0': isVisible,
                        'opacity-0 translate-y-20': !isVisible,
                    }"
                >
                    <!-- Фото игрока -->
                    <div
                        class="relative h-80 md:h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 flex items-center justify-center overflow-hidden"
                    >
                        <!-- Анимированные частицы -->
                        <div class="absolute inset-0">
                            <div
                                v-for="i in 15"
                                :key="i"
                                class="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
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

                        <div class="text-center text-white relative z-10">
                            <div
                                class="text-8xl md:text-9xl mb-6 animate-bounce"
                                style="animation-duration: 3s"
                            >
                                🏒
                            </div>
                            <h1
                                class="text-4xl md:text-6xl font-black mb-4 tracking-wider"
                            >
                                {{ player.name }}
                            </h1>
                            <div
                                class="flex items-center justify-center space-x-4 text-xl md:text-2xl opacity-90"
                            >
                                <span
                                    class="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2"
                                    >#{{ player.number }}</span
                                >
                                <span>•</span>
                                <span>{{ player.position }}</span>
                            </div>
                        </div>

                        <!-- Рейтинг игрока -->
                        <div
                            class="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30"
                        >
                            <span
                                class="text-white font-bold flex items-center space-x-2"
                            >
                                <span class="animate-pulse">⭐</span>
                                <span>Рейтинг: {{ player.rating }}</span>
                            </span>
                        </div>

                        <!-- Статистика -->
                        <div
                            class="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/30"
                        >
                            <span class="text-white text-sm font-semibold">
                                🔥 {{ player.goals + player.assists }} очков в
                                сезоне
                            </span>
                        </div>
                    </div>

                    <!-- Информация об игроке -->
                    <div class="p-8 md:p-12">
                        <!-- Быстрая статистика -->
                        <div
                            class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12"
                        >
                            <div
                                v-for="(stat, index) in quickStats"
                                :key="index"
                                class="text-center group cursor-pointer"
                                :style="{
                                    animationDelay: `${index * 100}ms`,
                                    animation: isVisible
                                        ? 'fadeInUp 0.8s ease-out forwards'
                                        : 'none',
                                }"
                            >
                                <div
                                    :class="`text-2xl font-black text-${stat.color}-600 mb-2 group-hover:scale-110 transition-transform duration-300`"
                                >
                                    {{ stat.value }}
                                </div>
                                <div
                                    class="text-sm text-gray-600 dark:text-gray-400 font-medium"
                                >
                                    {{ stat.label }}
                                </div>
                            </div>
                        </div>

                        <!-- Вкладки статистики -->
                        <div class="mb-8">
                            <div
                                class="flex flex-wrap gap-3 mb-6 p-2 bg-gray-100 dark:bg-gray-800 rounded-2xl"
                            >
                                <button
                                    v-for="tab in statTabs"
                                    :key="tab.key"
                                    @click="activeStatTab = tab.key"
                                    class="flex-1 px-6 py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden"
                                    :class="{
                                        'bg-blue-600 text-white shadow-lg transform scale-105':
                                            activeStatTab === tab.key,
                                        'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600':
                                            activeStatTab !== tab.key,
                                    }"
                                >
                                    <span
                                        class="flex items-center justify-center space-x-2"
                                    >
                                        <span>{{ tab.icon }}</span>
                                        <span>{{ tab.label }}</span>
                                    </span>
                                </button>
                            </div>

                            <!-- Текущий сезон -->
                            <div
                                v-if="activeStatTab === 'current'"
                                class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                            >
                                <div
                                    v-for="(stat, index) in currentSeasonStats"
                                    :key="index"
                                    :class="`bg-${stat.color}-50 dark:bg-${stat.color}-900/30 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 border border-${stat.color}-200 dark:border-${stat.color}-800`"
                                >
                                    <div
                                        :class="`text-3xl font-black text-${stat.color}-600 mb-2`"
                                    >
                                        {{ stat.value }}
                                    </div>
                                    <div
                                        class="text-sm text-gray-600 dark:text-gray-400 font-medium mb-1"
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
                                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                <div
                                    v-for="(stat, index) in advancedStats"
                                    :key="index"
                                    :class="`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-${stat.color}-900/30 dark:to-${stat.color}-800/30 rounded-2xl p-6 hover:scale-105 transition-all duration-300 border border-${stat.color}-200 dark:border-${stat.color}-700`"
                                >
                                    <h4
                                        :class="`font-bold text-${stat.color}-600 mb-3 text-lg`"
                                    >
                                        {{ stat.label }}
                                    </h4>
                                    <div
                                        :class="`text-3xl font-black text-${stat.color}-700 mb-2`"
                                    >
                                        {{ stat.value }}
                                    </div>
                                    <div
                                        class="text-sm text-gray-600 dark:text-gray-400"
                                    >
                                        {{ stat.description }}
                                    </div>
                                </div>
                            </div>

                            <!-- Последние игры -->
                            <div
                                v-if="activeStatTab === 'recent'"
                                class="space-y-4"
                            >
                                <div
                                    v-for="(game, index) in player.recentGames"
                                    :key="index"
                                    class="bg-white dark:bg-gray-800 rounded-2xl p-6 border-l-4 hover:scale-102 transition-all duration-300"
                                    :class="{
                                        'border-green-500 bg-green-50/50 dark:bg-green-900/20':
                                            game.result.startsWith('W'),
                                        'border-red-500 bg-red-50/50 dark:bg-red-900/20':
                                            !game.result.startsWith('W'),
                                    }"
                                >
                                    <div
                                        class="flex justify-between items-center"
                                    >
                                        <div
                                            class="flex items-center space-x-4"
                                        >
                                            <div class="text-center">
                                                <div
                                                    class="text-sm text-gray-500 mb-1"
                                                >
                                                    {{ game.date }}
                                                </div>
                                                <div class="font-bold">
                                                    vs {{ game.opponent }}
                                                </div>
                                            </div>
                                            <div
                                                class="px-3 py-1 rounded-full text-sm font-bold"
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
                                            class="flex items-center space-x-6 text-center"
                                        >
                                            <div>
                                                <div
                                                    class="text-2xl font-bold text-blue-600"
                                                >
                                                    {{ game.goals }}
                                                </div>
                                                <div
                                                    class="text-xs text-gray-500"
                                                >
                                                    🏒 Голы
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="text-2xl font-bold text-red-600"
                                                >
                                                    {{ game.assists }}
                                                </div>
                                                <div
                                                    class="text-xs text-gray-500"
                                                >
                                                    🎯 Передачи
                                                </div>
                                            </div>
                                            <div>
                                                <div
                                                    class="text-2xl font-bold text-yellow-600"
                                                >
                                                    {{ game.rating }}
                                                </div>
                                                <div
                                                    class="text-xs text-gray-500"
                                                >
                                                    ⭐ Рейтинг
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Биография -->
                        <div class="mb-12">
                            <h3
                                class="text-3xl font-black mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-3"
                            >
                                <span>📖</span>
                                <span>Биография</span>
                            </h3>
                            <div
                                class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-inner"
                            >
                                <p
                                    class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg mb-6"
                                >
                                    {{ player.bio }}
                                </p>
                                <div
                                    class="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm"
                                >
                                    <div
                                        class="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4"
                                    >
                                        <strong class="text-blue-600"
                                            >Место рождения:</strong
                                        >
                                        {{ player.birthPlace }}
                                    </div>
                                    <div
                                        class="bg-white/50 dark:bg-gray-800/50 rounded-2xl p-4"
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
                        <div class="mb-12">
                            <h3
                                class="text-3xl font-black mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-3"
                            >
                                <span class="animate-pulse">🏆</span>
                                <span>Достижения</span>
                            </h3>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div
                                    v-for="(
                                        achievement, index
                                    ) in player.achievements"
                                    :key="index"
                                    class="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-2xl p-6 border-2 border-yellow-200 dark:border-yellow-800 hover:scale-105 transition-all duration-300 group"
                                >
                                    <div class="flex items-center space-x-4">
                                        <div
                                            class="text-4xl group-hover:animate-bounce"
                                        >
                                            🏆
                                        </div>
                                        <div>
                                            <p
                                                class="font-bold text-gray-800 dark:text-gray-200 text-lg"
                                            >
                                                {{ achievement }}
                                            </p>
                                            <p class="text-sm text-yellow-600">
                                                Престижная награда
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Статистика по сезонам -->
                        <div class="mb-12">
                            <h3
                                class="text-3xl font-black mb-6 text-gray-800 dark:text-gray-200 flex items-center space-x-3"
                            >
                                <span>📈</span>
                                <span>Статистика по сезонам</span>
                            </h3>
                            <div class="overflow-x-auto">
                                <table
                                    class="w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700"
                                >
                                    <thead
                                        class="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white"
                                    >
                                        <tr>
                                            <th
                                                class="px-6 py-4 text-left font-bold"
                                            >
                                                Сезон
                                            </th>
                                            <th
                                                class="px-6 py-4 text-left font-bold"
                                            >
                                                Команда
                                            </th>
                                            <th
                                                class="px-6 py-4 text-center font-bold"
                                            >
                                                И
                                            </th>
                                            <th
                                                class="px-6 py-4 text-center font-bold"
                                            >
                                                Г
                                            </th>
                                            <th
                                                class="px-6 py-4 text-center font-bold"
                                            >
                                                П
                                            </th>
                                            <th
                                                class="px-6 py-4 text-center font-bold"
                                            >
                                                О
                                            </th>
                                            <th
                                                class="px-6 py-4 text-center font-bold"
                                            >
                                                Г/И
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                stat, index
                                            ) in player.careerStats"
                                            :key="index"
                                            :class="{
                                                'bg-gray-50 dark:bg-gray-700':
                                                    index % 2 === 0,
                                                'bg-white dark:bg-gray-800':
                                                    index % 2 !== 0,
                                                'hover:bg-blue-50 dark:hover:bg-blue-900/30': true,
                                            }"
                                            class="transition-colors duration-200"
                                        >
                                            <td
                                                class="px-6 py-4 font-bold text-blue-600"
                                            >
                                                {{ stat.season }}
                                            </td>
                                            <td class="px-6 py-4 font-semibold">
                                                {{ stat.team }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-center font-bold"
                                            >
                                                {{ stat.games }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-center font-bold text-blue-600"
                                            >
                                                {{ stat.goals }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-center font-bold text-red-600"
                                            >
                                                {{ stat.assists }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-center font-bold text-green-600"
                                            >
                                                {{ stat.points }}
                                            </td>
                                            <td
                                                class="px-6 py-4 text-center font-bold text-purple-600"
                                            >
                                                {{
                                                    (
                                                        stat.goals / stat.games
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
                            <router-link to="/">
                                <button
                                    class="group bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 hover:from-blue-700 hover:via-purple-700 hover:to-red-700 text-white font-bold py-6 px-12 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden"
                                >
                                    <div
                                        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                                    ></div>
                                    <span
                                        class="relative z-10 flex items-center space-x-3 text-lg"
                                    >
                                        <span>🏒</span>
                                        <span>Вернуться к команде</span>
                                        <span
                                            class="group-hover:translate-x-1 transition-transform duration-200"
                                            >→</span
                                        >
                                    </span>
                                </button>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isVisible = ref(false)
const activeStatTab = ref('current')

onMounted(() => {
    isVisible.value = true
})

const playerId = 1

const data = await useFetch(`/players/1`)
console.log(data)
// Данные игроков
const playersData = {
    1: {
        name: 'Александров Иван',
        number: 91,
        position: 'Центральный нападающий',
        age: 28,
        height: '185 см',
        weight: '82 кг',
        nationality: 'Россия',
        birthPlace: 'Москва',
        goals: 23,
        assists: 15,
        points: 38,
        gamesPlayed: 25,
        plusMinus: '+12',
        penaltyMinutes: 18,
        powerPlayGoals: 8,
        shortHandedGoals: 2,
        gameWinningGoals: 4,
        shots: 156,
        shootingPercentage: '14.7%',
        faceoffWins: '58.3%',
        averageTimeOnIce: '18:42',
        rating: 9.2,
        marketValue: '2.5M €',
        contract: '2025',
        bio: 'Опытный центральный нападающий, капитан команды. Известен своим лидерством на льду и способностью забивать важные голы в решающие моменты. Воспитанник московского хоккея.',
        achievements: [
            'Лучший бомбардир сезона 2023/24',
            'Участник Матча звезд КХЛ',
            'Обладатель Кубка Гагарина 2022',
            'Капитан сборной России U-20',
        ],
        careerStats: [
            {
                season: '2024/25',
                team: 'ХК Спартак',
                games: 25,
                goals: 23,
                assists: 15,
                points: 38,
            },
            {
                season: '2023/24',
                team: 'ХК Спартак',
                games: 68,
                goals: 31,
                assists: 28,
                points: 59,
            },
            {
                season: '2022/23',
                team: 'ХК Спартак',
                games: 65,
                goals: 28,
                assists: 24,
                points: 52,
            },
            {
                season: '2021/22',
                team: 'ХК Динамо',
                games: 62,
                goals: 22,
                assists: 19,
                points: 41,
            },
        ],
        recentGames: [
            {
                date: '15.01.24',
                opponent: 'Динамо',
                result: 'W 4-2',
                goals: 2,
                assists: 1,
                rating: 9.5,
            },
            {
                date: '12.01.24',
                opponent: 'ЦСКА',
                result: 'W 3-1',
                goals: 1,
                assists: 0,
                rating: 8.2,
            },
            {
                date: '08.01.24',
                opponent: 'СКА',
                result: 'L 2-4',
                goals: 0,
                assists: 1,
                rating: 7.1,
            },
            {
                date: '05.01.24',
                opponent: 'Авангард',
                result: 'W 3-0',
                goals: 1,
                assists: 2,
                rating: 9.0,
            },
            {
                date: '02.01.24',
                opponent: 'Металлург',
                result: 'W 5-1',
                goals: 3,
                assists: 0,
                rating: 9.8,
            },
        ],
    },
}

const player = computed(() => playersData[playerId])

// Вычисляемые свойства для статистики
const quickStats = computed(() => [
    { label: '🎂 Возраст', value: player.value.age, color: 'blue' },
    { label: '📏 Рост', value: player.value.height, color: 'red' },
    { label: '⚖️ Вес', value: player.value.weight, color: 'green' },
    { label: '🏳️ Страна', value: player.value.nationality, color: 'purple' },
    { label: '💰 Стоимость', value: player.value.marketValue, color: 'yellow' },
    {
        label: '📄 Контракт',
        value: `до ${player.value.contract}`,
        color: 'indigo',
    },
])

const statTabs = computed(() => [
    { key: 'current', label: '📊 Текущий сезон', icon: '🔥' },
    { key: 'advanced', label: '🎯 Расширенная', icon: '📈' },
    { key: 'recent', label: '📅 Последние игры', icon: '⚡' },
])

const currentSeasonStats = computed(() => [
    { label: '🏒 Голы', value: player.value.goals, color: 'blue', trend: '+5' },
    {
        label: '🎯 Передачи',
        value: player.value.assists,
        color: 'red',
        trend: '+3',
    },
    {
        label: '🏆 Очки',
        value: player.value.points,
        color: 'green',
        trend: '+8',
    },
    {
        label: '🎮 Игры',
        value: player.value.gamesPlayed,
        color: 'purple',
        trend: '25/30',
    },
    {
        label: '📈 +/-',
        value: player.value.plusMinus,
        color: 'yellow',
        trend: '↗️',
    },
    {
        label: '⏱️ Штраф',
        value: `${player.value.penaltyMinutes} мин`,
        color: 'orange',
        trend: '-2',
    },
    {
        label: '🔥 ПП голы',
        value: player.value.powerPlayGoals,
        color: 'indigo',
        trend: '+2',
    },
    {
        label: '⚡ МН голы',
        value: player.value.shortHandedGoals,
        color: 'pink',
        trend: '+1',
    },
])

const advancedStats = computed(() => [
    {
        label: '🔥 Броски',
        value: player.value.shots,
        description: `Точность: ${player.value.shootingPercentage}`,
        color: 'blue',
    },
    {
        label: '⚡ Вбрасывания',
        value: player.value.faceoffWins,
        description: 'Процент побед',
        color: 'red',
    },
    {
        label: '⏰ Время на льду',
        value: player.value.averageTimeOnIce,
        description: 'В среднем за игру',
        color: 'green',
    },
    {
        label: '🏆 Решающие голы',
        value: player.value.gameWinningGoals,
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
</style>