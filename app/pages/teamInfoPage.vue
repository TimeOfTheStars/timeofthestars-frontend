<template>
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
            <!-- Header с анимацией -->
            <div
                class="text-center mb-12 transition-all duration-1000"
                :class="
                    isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                "
            >
                <div class="mb-6">
                    <h1
                        class="text-5xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 bg-clip-text text-transparent mb-6 tracking-tight"
                    >
                        🏒 ХК "СПАРТАК" ⭐
                    </h1>
                    <div
                        class="flex items-center justify-center space-x-4 text-lg md:text-xl text-gray-600 dark:text-gray-300"
                    >
                        <span> 🚀 Легендарная команда российского хоккея </span>
                        <span class="hidden md:inline"> • </span>
                        <span
                            class="hidden md:inline text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full"
                        >
                            🔴 LIVE {{ formattedTime }}
                        </span>
                    </div>
                </div>
            </div>

            <!-- Main Team Card с улучшенным дизайном -->
            <div
                class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden mb-12 border border-white/20 transition-all duration-1000"
                :class="
                    isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-20'
                "
            >
                <!-- Team Photo Section с параллакс эффектом -->
                <div
                    class="relative h-72 md:h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 flex items-center justify-center overflow-hidden"
                >
                    <!-- Анимированные частицы -->
                    <div class="absolute inset-0">
                        <div
                            v-for="i in 20"
                            :key="`particle-${i}`"
                            class="absolute w-2 h-2 bg-white/20 rounded-full animate-ping"
                            :style="{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                            }"
                        ></div>
                    </div>

                    <div class="text-center text-white relative z-10">
                        <div
                            class="text-9xl md:text-[12rem] mb-6 animate-bounce"
                            style="animation-duration: 3s"
                        >
                            🏒
                        </div>
                        <h2
                            class="text-4xl md:text-6xl font-black mb-3 tracking-wider"
                        >
                            ХК "СПАРТАК"
                        </h2>
                        <p class="text-xl md:text-2xl opacity-90 font-light">
                            г. Москва
                        </p>
                    </div>

                    <div
                        class="absolute top-6 right-6 bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30"
                    >
                        <span
                            class="text-white font-bold flex items-center space-x-2"
                        >
                            <span class="animate-pulse"> 🏆 </span>
                            <span>Сезон 2024/25</span>
                        </span>
                    </div>

                    <!-- Floating stats -->
                    <div
                        class="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md rounded-2xl px-4 py-2 border border-white/30"
                    >
                        <span class="text-white text-sm font-semibold">
                            🔥 Серия: 5 побед подряд
                        </span>
                    </div>
                </div>

                <!-- Team Stats с улучшенной анимацией -->
                <div class="p-8 md:p-12">
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div
                            v-for="(stat, index) in teamStats"
                            :key="`stat-${index}`"
                            class="text-center group cursor-pointer"
                            :style="{
                                animationDelay: `${index * 200}ms`,
                                animation: isVisible
                                    ? 'fadeInUp 0.8s ease-out forwards'
                                    : 'none',
                            }"
                        >
                            <div
                                class="text-4xl md:text-5xl font-black mb-3 group-hover:scale-110 transition-transform duration-300"
                                :class="`text-${stat.color}-600`"
                            >
                                {{ stat.value }}
                            </div>
                            <div
                                class="text-gray-600 dark:text-gray-400 font-medium mb-1"
                            >
                                {{ stat.label }}
                            </div>
                            <div class="text-xs text-green-500 font-semibold">
                                {{ stat.trend }} за месяц
                            </div>
                        </div>
                    </div>

                    <!-- Team Form с 3D эффектом -->
                    <div class="mb-12">
                        <h3
                            class="text-3xl font-black mb-8 text-gray-800 dark:text-gray-200 flex items-center space-x-3"
                        >
                            <span class="animate-pulse"> 🔥 </span>
                            <span>Форма команды</span>
                        </h3>
                        <div
                            class="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 shadow-inner"
                        >
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div class="group">
                                    <h4
                                        class="font-bold mb-4 text-blue-600 text-lg flex items-center space-x-2"
                                    >
                                        <span>🏠</span>
                                        <span>Домашняя форма</span>
                                    </h4>
                                    <div class="flex items-center space-x-6">
                                        <div class="relative">
                                            <div
                                                class="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300 group-hover:rotate-12 transition-transform"
                                            >
                                                <span
                                                    class="text-white font-black text-2xl"
                                                >
                                                    С
                                                </span>
                                            </div>
                                            <div
                                                class="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                                            >
                                                <span class="text-xs">
                                                    ⭐
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="font-bold text-lg mb-1">
                                                Красно-белая
                                            </p>
                                            <p
                                                class="text-sm text-gray-600 dark:text-gray-400 mb-2"
                                            >
                                                Основная форма
                                            </p>
                                            <div class="flex space-x-1">
                                                <div
                                                    v-for="i in 5"
                                                    :key="`home-dot-${i}`"
                                                    class="w-2 h-2 bg-red-500 rounded-full"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="group">
                                    <h4
                                        class="font-bold mb-4 text-red-600 text-lg flex items-center space-x-2"
                                    >
                                        <span>✈️</span>
                                        <span>Гостевая форма</span>
                                    </h4>
                                    <div class="flex items-center space-x-6">
                                        <div class="relative">
                                            <div
                                                class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300 group-hover:rotate-12 transition-transform"
                                            >
                                                <span
                                                    class="text-white font-black text-2xl"
                                                >
                                                    С
                                                </span>
                                            </div>
                                            <div
                                                class="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                                            >
                                                <span class="text-xs">
                                                    🔥
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="font-bold text-lg mb-1">
                                                Сине-белая
                                            </p>
                                            <p
                                                class="text-sm text-gray-600 dark:text-gray-400 mb-2"
                                            >
                                                Выездная форма
                                            </p>
                                            <div class="flex space-x-1">
                                                <div
                                                    v-for="i in 5"
                                                    :key="`away-dot-${i}`"
                                                    class="w-2 h-2 bg-blue-500 rounded-full"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Players с улучшенным дизайном -->
                    <div class="mb-12">
                        <h3
                            class="text-3xl font-black mb-8 text-gray-800 dark:text-gray-200 flex items-center space-x-3"
                        >
                            <span
                                style="animation-duration: 3s"
                                class="animate-spin"
                            >
                                🌟
                            </span>
                            <span>Лучшие игроки</span>
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <router-link to="/playersinfopage">
                                <div
                                    class="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-3xl p-8 cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500 relative overflow-hidden"
                                >
                                    <div
                                        class="absolute top-4 right-4 bg-yellow-400 text-yellow-900 rounded-full px-3 py-1 text-xs font-bold"
                                    >
                                        MVP
                                    </div>
                                    <div class="text-center">
                                        <div
                                            class="text-5xl mb-4 group-hover:animate-bounce"
                                        >
                                            🥇
                                        </div>
                                        <h4 class="font-black text-xl mb-2">
                                            Александров И.
                                        </h4>
                                        <p class="text-blue-600 font-bold mb-4">
                                            Нападающий
                                        </p>
                                        <div
                                            class="grid grid-cols-2 gap-4 text-sm"
                                        >
                                            <div
                                                class="bg-white/50 rounded-lg p-2"
                                            >
                                                <span
                                                    class="block font-bold text-blue-600"
                                                >
                                                    23
                                                </span>
                                                <span class="text-gray-600">
                                                    🏒 гола
                                                </span>
                                            </div>
                                            <div
                                                class="bg-white/50 rounded-lg p-2"
                                            >
                                                <span
                                                    class="block font-bold text-red-600"
                                                >
                                                    15
                                                </span>
                                                <span class="text-gray-600">
                                                    🎯 передач
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>

                            <div
                                class="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-800 rounded-3xl p-8 border-2 border-red-200 dark:border-red-700 relative overflow-hidden"
                            >
                                <div
                                    class="absolute top-4 right-4 bg-red-400 text-white rounded-full px-3 py-1 text-xs font-bold"
                                >
                                    TOP
                                </div>
                                <div class="text-center">
                                    <div class="text-5xl mb-4">🥈</div>
                                    <h4 class="font-black text-xl mb-2">
                                        Петров В.
                                    </h4>
                                    <p class="text-red-600 font-bold mb-4">
                                        Защитник
                                    </p>
                                    <div class="grid grid-cols-2 gap-4 text-sm">
                                        <div class="bg-white/50 rounded-lg p-2">
                                            <span
                                                class="block font-bold text-blue-600"
                                            >
                                                8
                                            </span>
                                            <span class="text-gray-600">
                                                🏒 голов
                                            </span>
                                        </div>
                                        <div class="bg-white/50 rounded-lg p-2">
                                            <span
                                                class="block font-bold text-red-600"
                                            >
                                                22
                                            </span>
                                            <span class="text-gray-600">
                                                🎯 передачи
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-3xl p-8 border-2 border-purple-200 dark:border-purple-700 relative overflow-hidden"
                            >
                                <div
                                    class="absolute top-4 right-4 bg-purple-400 text-white rounded-full px-3 py-1 text-xs font-bold"
                                >
                                    WALL
                                </div>
                                <div class="text-center">
                                    <div class="text-5xl mb-4">🥉</div>
                                    <h4 class="font-black text-xl mb-2">
                                        Сидоров М.
                                    </h4>
                                    <p class="text-purple-600 font-bold mb-4">
                                        Вратарь
                                    </p>
                                    <div class="grid grid-cols-2 gap-4 text-sm">
                                        <div class="bg-white/50 rounded-lg p-2">
                                            <span
                                                class="block font-bold text-green-600"
                                            >
                                                87%
                                            </span>
                                            <span class="text-gray-600">
                                                🛡️ сейвов
                                            </span>
                                        </div>
                                        <div class="bg-white/50 rounded-lg p-2">
                                            <span
                                                class="block font-bold text-blue-600"
                                            >
                                                12
                                            </span>
                                            <span class="text-gray-600">
                                                🚫 "сухих"
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Team Composition с улучшенными табами -->
                    <div class="mb-12">
                        <h3
                            class="text-3xl font-black mb-8 text-gray-800 dark:text-gray-200 flex items-center space-x-3"
                        >
                            <span>👥</span>
                            <span>Состав команды</span>
                            <div
                                class="ml-auto text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full"
                            >
                                Всего: {{ totalPlayers }} игроков
                            </div>
                        </h3>

                        <!-- Улучшенная навигация по табам -->
                        <div
                            class="flex flex-wrap gap-3 mb-8 p-2 bg-gray-100 dark:bg-gray-800 rounded-2xl"
                        >
                            <button
                                v-for="tab in tabs"
                                :key="tab.key"
                                @click="activeTab = tab.key"
                                class="flex-1 px-6 py-4 rounded-xl font-bold transition-all duration-300 relative overflow-hidden"
                                :class="
                                    activeTab === tab.key
                                        ? `bg-${tab.color}-600 text-white shadow-lg transform scale-105`
                                        : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'
                                "
                            >
                                <span
                                    class="relative z-10 flex items-center justify-center space-x-2"
                                >
                                    <span>{{ tab.label }}</span>
                                    <span
                                        class="px-2 py-1 rounded-full text-xs"
                                        :class="
                                            activeTab === tab.key
                                                ? 'bg-white/20'
                                                : `bg-${tab.color}-100 text-${tab.color}-600`
                                        "
                                    >
                                        {{ tab.count }}
                                    </span>
                                </span>
                                <div
                                    v-if="activeTab === tab.key"
                                    class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"
                                ></div>
                            </button>
                        </div>

                        <!-- Players Grid с анимацией -->
                        <div
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        >
                            <router-link
                                v-for="(player, index) in currentPlayers"
                                :key="player.id"
                                :to="`/player/${player.id}`"
                            >
                                <div
                                    class="group bg-white dark:bg-gray-800 rounded-2xl p-5 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 relative overflow-hidden"
                                    :style="{
                                        animationDelay: `${index * 100}ms`,
                                        animation: isVisible
                                            ? 'slideInUp 0.6s ease-out forwards'
                                            : 'none',
                                    }"
                                >
                                    <!-- Градиентный фон при ховере -->
                                    <div
                                        class="absolute inset-0 bg-gradient-to-br from-blue-50 to-red-50 dark:from-blue-900/20 dark:to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    ></div>

                                    <div class="relative z-10">
                                        <div
                                            class="flex items-center justify-between mb-3"
                                        >
                                            <div
                                                class="flex items-center space-x-3"
                                            >
                                                <h5
                                                    class="font-bold text-lg group-hover:text-blue-600 transition-colors duration-200"
                                                >
                                                    {{ player.name }}
                                                </h5>
                                                <span
                                                    class="text-sm font-medium"
                                                    :class="
                                                        getTrendColor(
                                                            player.trend
                                                        )
                                                    "
                                                >
                                                    {{
                                                        getTrendIcon(
                                                            player.trend
                                                        )
                                                    }}
                                                </span>
                                            </div>
                                            <div
                                                class="flex items-center space-x-2"
                                            >
                                                <span
                                                    class="bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-200"
                                                >
                                                    {{ player.number }}
                                                </span>
                                            </div>
                                        </div>

                                        <p
                                            class="text-sm text-gray-600 dark:text-gray-400 mb-3 font-medium"
                                        >
                                            {{ player.position }}
                                        </p>

                                        <div
                                            class="flex justify-between items-center text-sm mb-2"
                                        >
                                            <template
                                                v-if="
                                                    activeTab === 'goalkeepers'
                                                "
                                            >
                                                <span
                                                    class="flex items-center space-x-1"
                                                >
                                                    <span>🛡️</span>
                                                    <span class="font-semibold"
                                                        >{{
                                                            player.saves
                                                        }}%</span
                                                    >
                                                    <span class="text-gray-500"
                                                        >сейвов</span
                                                    >
                                                </span>
                                                <span
                                                    class="flex items-center space-x-1"
                                                >
                                                    <span>🚫</span>
                                                    <span
                                                        class="font-semibold"
                                                        >{{
                                                            player.shutouts
                                                        }}</span
                                                    >
                                                    <span class="text-gray-500"
                                                        >"сухих"</span
                                                    >
                                                </span>
                                            </template>
                                            <template v-else>
                                                <span
                                                    class="flex items-center space-x-1"
                                                >
                                                    <span>🏒</span>
                                                    <span
                                                        class="font-semibold text-blue-600"
                                                    >
                                                        {{ player.goals }}
                                                    </span>
                                                    <span class="text-gray-500"
                                                        >голов</span
                                                    >
                                                </span>
                                                <span
                                                    class="flex items-center space-x-1"
                                                >
                                                    <span>🎯</span>
                                                    <span
                                                        class="font-semibold text-red-600"
                                                    >
                                                        {{ player.assists }}
                                                    </span>
                                                    <span class="text-gray-500"
                                                        >передач</span
                                                    >
                                                </span>
                                            </template>
                                        </div>

                                        <!-- Рейтинг игрока -->
                                        <div
                                            class="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700"
                                        >
                                            <span class="text-xs text-gray-500">
                                                Рейтинг
                                            </span>
                                            <div
                                                class="flex items-center space-x-1"
                                            >
                                                <span class="text-yellow-500">
                                                    ⭐
                                                </span>
                                                <span
                                                    class="font-bold text-yellow-600"
                                                >
                                                    {{ player.rating }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>

                    <!-- Recent Matches с timeline дизайном -->
                    <div class="mb-12">
                        <h3
                            class="text-3xl font-black mb-8 text-gray-800 dark:text-gray-200 flex items-center space-x-3"
                        >
                            <span>📅</span>
                            <span>Последние матчи</span>
                            <div
                                class="ml-auto text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-4 py-2 rounded-full"
                            >
                                Серия: 2 победы
                            </div>
                        </h3>
                        <div class="space-y-6 relative">
                            <!-- Timeline line -->
                            <div
                                class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-green-400 to-red-500"
                            ></div>

                            <div
                                v-for="(match, index) in recentMatches"
                                :key="`match-${index}`"
                                class="relative pl-20 pr-6 py-6 rounded-2xl border-2 transition-all duration-300 hover:scale-102 cursor-pointer"
                                :class="
                                    match.status === 'win'
                                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-400'
                                        : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 hover:border-red-400'
                                "
                            >
                                <!-- Timeline dot -->
                                <div
                                    class="absolute left-6 top-8 w-4 h-4 rounded-full border-4 border-white shadow-lg"
                                    :class="
                                        match.status === 'win'
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                    "
                                ></div>

                                <div class="flex justify-between items-start">
                                    <div class="flex-1">
                                        <div
                                            class="flex items-center space-x-3 mb-2"
                                        >
                                            <h4 class="font-bold text-lg">
                                                ХК "Спартак" vs
                                                {{ match.opponent }}
                                            </h4>
                                            <span
                                                class="px-3 py-1 rounded-full text-xs font-bold"
                                                :class="
                                                    match.venue === 'Дома'
                                                        ? 'bg-blue-100 text-blue-700'
                                                        : 'bg-purple-100 text-purple-700'
                                                "
                                            >
                                                {{ match.venue }}
                                            </span>
                                        </div>
                                        <p
                                            class="text-sm text-gray-600 dark:text-gray-400 mb-1"
                                        >
                                            {{ match.date }}
                                        </p>
                                        <p class="text-xs text-gray-500">
                                            👥 Зрителей: {{ match.attendance }}
                                        </p>
                                    </div>
                                    <div class="text-right">
                                        <p
                                            class="text-3xl font-black mb-1"
                                            :class="
                                                match.status === 'win'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            "
                                        >
                                            {{ match.result }}
                                        </p>
                                        <p
                                            class="text-sm font-bold flex items-center space-x-1"
                                            :class="
                                                match.status === 'win'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                            "
                                        >
                                            <span>
                                                {{
                                                    match.status === 'win'
                                                        ? '✅'
                                                        : '❌'
                                                }}
                                            </span>
                                            <span>
                                                {{
                                                    match.status === 'win'
                                                        ? 'Победа'
                                                        : 'Поражение'
                                                }}
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons с улучшенным дизайном -->
                    <div class="flex flex-col md:flex-row gap-6 mb-12">
                        <button
                            class="group flex-1 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden"
                        >
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                            ></div>
                            <span
                                class="relative z-10 flex items-center justify-center space-x-3 text-lg"
                            >
                                <span>🔍</span>
                                <span>Подробнее о команде</span>
                                <span
                                    class="group-hover:translate-x-1 transition-transform duration-200"
                                >
                                    →
                                </span>
                            </span>
                        </button>
                        <button
                            class="group flex-1 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden"
                        >
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                            ></div>
                            <span
                                class="relative z-10 flex items-center justify-center space-x-3 text-lg"
                            >
                                <span>📅</span>
                                <span>Смотреть расписание</span>
                                <span
                                    class="group-hover:translate-x-1 transition-transform duration-200"
                                >
                                    →
                                </span>
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Additional Stats с 3D карточками -->
            <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
            >
                <div
                    v-for="(stat, index) in additionalStats"
                    :key="`add-stat-${index}`"
                    class="group bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border border-white/20 relative overflow-hidden"
                    :style="{
                        animationDelay: `${index * 150}ms`,
                        animation: isVisible
                            ? 'slideInUp 0.8s ease-out forwards'
                            : 'none',
                    }"
                >
                    <!-- Floating background effect -->
                    <div
                        class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        :class="`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 dark:from-${stat.color}-900/20 dark:to-${stat.color}-800/20`"
                    ></div>

                    <div class="relative z-10">
                        <div
                            class="text-6xl mb-4 group-hover:animate-bounce transition-all duration-300"
                        >
                            {{ stat.icon }}
                        </div>
                        <div
                            class="text-4xl font-black mb-3 group-hover:scale-110 transition-transform duration-300"
                            :class="`text-${stat.color}-600`"
                        >
                            {{ stat.value }}
                        </div>
                        <div
                            class="text-gray-600 dark:text-gray-400 font-bold mb-2"
                        >
                            {{ stat.label }}
                        </div>
                        <div
                            class="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            {{ stat.description }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Новая секция - Достижения команды -->
            <div
                class="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl p-8 md:p-12 mb-12 border-2 border-yellow-200 dark:border-yellow-800 transition-all duration-1000"
                :class="
                    isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-20'
                "
            >
                <h3
                    class="text-3xl font-black mb-8 text-center text-gray-800 dark:text-gray-200 flex items-center justify-center space-x-3"
                >
                    <span class="animate-pulse"> 🏆 </span>
                    <span>Зал славы</span>
                    <span class="animate-pulse"> 🏆 </span>
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        v-for="(achievement, index) in achievements"
                        :key="`achievement-${index}`"
                        class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300 border border-yellow-300 dark:border-yellow-700"
                    >
                        <div class="text-4xl mb-3">🏆</div>
                        <div class="text-2xl font-bold text-yellow-600 mb-2">
                            {{ achievement.year }}
                        </div>
                        <h4 class="font-bold text-lg mb-2">
                            {{ achievement.title }}
                        </h4>
                        <p class="text-sm text-gray-600 dark:text-gray-400">
                            {{ achievement.description }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer с социальными сетями -->
            <div
                class="text-center py-8 border-t border-gray-200 dark:border-gray-700"
            >
                <div class="flex justify-center space-x-6 mb-6">
                    <button
                        v-for="(social, index) in socials"
                        :key="`social-${index}`"
                        class="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                        :class="`bg-${social.color}-100 dark:bg-${social.color}-900/30 hover:bg-${social.color}-200 dark:hover:bg-${social.color}-800/50`"
                    >
                        <span class="text-xl">{{ social.icon }}</span>
                    </button>
                </div>
                <p class="text-gray-600 dark:text-gray-400 text-sm">
                    © 2024 ХК "Спартак" • Все права защищены • Сделано с ❤️ для
                    болельщиков
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted } from 'vue'

export default {
    setup() {
        const activeTab = ref('forwards')
        const isVisible = ref(false)
        const currentTime = ref(new Date())

        const players = {
            forwards: [
                {
                    id: 1,
                    name: 'Александров И.',
                    number: 91,
                    goals: 23,
                    assists: 15,
                    position: 'Центральный нападающий',
                    rating: 9.2,
                    trend: 'up',
                },
                {
                    id: 2,
                    name: 'Кузнецов А.',
                    number: 17,
                    goals: 18,
                    assists: 12,
                    position: 'Правый крайний',
                    rating: 8.7,
                    trend: 'up',
                },
                {
                    id: 3,
                    name: 'Морозов В.',
                    number: 24,
                    goals: 15,
                    assists: 20,
                    position: 'Левый крайний',
                    rating: 8.9,
                    trend: 'stable',
                },
                {
                    id: 4,
                    name: 'Волков С.',
                    number: 13,
                    goals: 12,
                    assists: 8,
                    position: 'Центральный нападающий',
                    rating: 8.1,
                    trend: 'down',
                },
                {
                    id: 5,
                    name: 'Лебедев М.',
                    number: 77,
                    goals: 10,
                    assists: 14,
                    position: 'Правый крайний',
                    rating: 8.3,
                    trend: 'up',
                },
                {
                    id: 6,
                    name: 'Соколов Д.',
                    number: 19,
                    goals: 8,
                    assists: 11,
                    position: 'Левый крайний',
                    rating: 7.9,
                    trend: 'stable',
                },
            ],
            defenders: [
                {
                    id: 7,
                    name: 'Петров В.',
                    number: 4,
                    goals: 8,
                    assists: 22,
                    position: 'Левый защитник',
                    rating: 9.0,
                    trend: 'up',
                },
                {
                    id: 8,
                    name: 'Смирнов А.',
                    number: 27,
                    goals: 5,
                    assists: 18,
                    position: 'Правый защитник',
                    rating: 8.5,
                    trend: 'stable',
                },
                {
                    id: 9,
                    name: 'Козлов И.',
                    number: 55,
                    goals: 3,
                    assists: 15,
                    position: 'Левый защитник',
                    rating: 8.2,
                    trend: 'up',
                },
                {
                    id: 10,
                    name: 'Новиков П.',
                    number: 2,
                    goals: 4,
                    assists: 12,
                    position: 'Правый защитник',
                    rating: 7.8,
                    trend: 'down',
                },
            ],
            goalkeepers: [
                {
                    id: 11,
                    name: 'Сидоров М.',
                    number: 30,
                    saves: 87,
                    shutouts: 12,
                    position: 'Основной вратарь',
                    rating: 9.1,
                    trend: 'up',
                },
                {
                    id: 12,
                    name: 'Федоров К.',
                    number: 1,
                    saves: 82,
                    shutouts: 8,
                    position: 'Запасной вратарь',
                    rating: 8.4,
                    trend: 'stable',
                },
                {
                    id: 13,
                    name: 'Орлов Н.',
                    number: 35,
                    saves: 79,
                    shutouts: 5,
                    position: 'Третий вратарь',
                    rating: 8.0,
                    trend: 'up',
                },
            ],
        }

        const getTrendIcon = trend => {
            switch (trend) {
                case 'up':
                    return '📈'
                case 'down':
                    return '📉'
                default:
                    return '➡️'
            }
        }

        const getTrendColor = trend => {
            switch (trend) {
                case 'up':
                    return 'text-green-500'
                case 'down':
                    return 'text-red-500'
                default:
                    return 'text-gray-500'
            }
        }

        onMounted(() => {
            isVisible.value = true
        })

        return {
            activeTab,
            isVisible,
            currentTime,
            players,
            getTrendIcon,
            getTrendColor,
        }
    },
}
</script>