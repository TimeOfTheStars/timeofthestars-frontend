<template>
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
            <!-- Навигация -->
            <div
                class="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6 md:mb-8"
            >
                <NuxtLink
                    to="/"
                    class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105 bg-gray-900/80 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 py-2 md:px-6 md:py-3 shadow-lg border border-blue-800 w-full sm:w-auto justify-center"
                    :class="{
                        'opacity-100 translate-x-0': isVisible,
                        'opacity-0 -translate-x-10': !isVisible,
                    }"
                >
                    <span class="mr-2 text-lg md:text-xl">←</span>
                    <span class="font-semibold text-sm md:text-base"
                        >На главную</span
                    >
                </NuxtLink>
                <NuxtLink
                    to="/teamsPage"
                    class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105 bg-gray-900/80 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 py-2 md:px-6 md:py-3 shadow-lg border border-blue-800 w-full sm:w-auto justify-center"
                    :class="{
                        'opacity-100 translate-x-0': isVisible,
                        'opacity-0 -translate-x-10': !isVisible,
                    }"
                >
                    <span class="font-semibold text-sm md:text-base"
                        >К списку команд</span
                    >
                    <span class="ml-2 text-lg md:text-xl">→</span>
                </NuxtLink>
            </div>

            <!-- Header с анимацией -->
            <div
                class="text-center mb-8 md:mb-12 transition-all duration-1000"
                :class="
                    isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-10'
                "
            >
                <div class="mb-4 md:mb-6">
                    <div
                        class="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-4 text-sm md:text-lg lg:text-xl text-gray-300"
                    ></div>
                </div>
            </div>

            <!-- Main Team Card с улучшенным дизайном -->
            <div
                class="bg-gray-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden mb-8 md:mb-12 border border-white/20 transition-all duration-1000"
                :class="
                    isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-20'
                "
            >
                <!-- Team Photo Section с параллакс эффектом -->
                <div
                    class="relative h-57 md:h-72 lg:h-96 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 flex items-center justify-center overflow-hidden"
                >
                    <!-- Анимированные частицы -->
                    <div class="absolute inset-0">
                        <div
                            v-for="i in 10"
                            :key="`particle-${i}`"
                            class="absolute w-1.5 h-1.5 md:w-2 md:h-2 bg-white/20 rounded-full animate-ping"
                            :style="{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`,
                            }"
                        ></div>
                    </div>

                    <div
                        class="text-center text-white relative z-10 px-4 pb-4 md:pb-0"
                    >
                        <div
                            class="text-6xl md:text-8xl lg:text-[12rem] mb-4 md:mb-6 animate-bounce"
                            style="animation-duration: 3s"
                        >
                            🏒
                        </div>
                        <h2
                            class="text-2xl md:text-4xl lg:text-6xl font-black mb-2 md:mb-3 tracking-wider"
                        >
                            {{ teamData.name }}
                        </h2>
                        <p
                            class="text-sm md:text-xl lg:text-2xl opacity-90 font-light"
                        >
                            г. {{ teamData.city }}
                        </p>
                    </div>

                    <div
                        class="absolute top-3 right-3 md:top-6 md:right-6 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl px-3 py-1 md:px-6 md:py-3 border border-white/30"
                    >
                        <span
                            class="text-white font-bold flex items-center space-x-1 md:space-x-2 text-xs md:text-base"
                        >
                            <span class="animate-pulse text-xs md:text-base">
                                🏆
                            </span>
                            <span>Сезон 2025/26</span>
                        </span>
                    </div>

                    <!-- Floating stats -->
                    <div
                        class="absolute bottom-3 left-3 md:bottom-6 md:left-6 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl px-2 py-1 md:px-4 md:py-2 border border-white/30"
                    >
                        <span
                            class="text-white text-xs md:text-sm font-semibold"
                        >
                            🔥 Серия: 0 побед подряд
                        </span>
                    </div>
                </div>

                <!-- Team Stats с улучшенной анимацией -->
                <div class="p-4 md:p-8 lg:p-12">
                    <div
                        class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12"
                    >
                        <div
                            v-for="(stat, index) in teamStats"
                            :key="`stat-${index}`"
                            class="text-center group cursor-pointer p-2 md:p-0 flex flex-col items-center justify-center"
                            :style="{
                                animationDelay: `${index * 200}ms`,
                                animation: isVisible
                                    ? 'fadeInUp 0.8s ease-out forwards'
                                    : 'none',
                            }"
                        >
                            <div
                                class="text-2xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300"
                                :class="`text-${stat.color}-600`"
                            >
                                {{ stat.value }}
                            </div>
                            <div
                                class="text-xs md:text-sm text-gray-400 font-medium mb-1"
                            >
                                {{ stat.label }}
                            </div>
                            <div class="text-xs text-green-500 font-semibold">
                                {{ stat.trend }} 
                            </div>
                        </div>
                    </div>

                    <!-- Team Form с 3D эффектом -->
                    <div class="mb-8 md:mb-12">
                        <h3
                            class="text-xl md:text-3xl font-black mb-6 md:mb-8 text-gray-200 flex items-center space-x-2 md:space-x-3"
                        >
                            <span class="animate-pulse"> 🔥 </span>
                            <span>Форма команды</span>
                        </h3>
                        <div
                            class="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl md:rounded-3xl p-4 md:p-8 shadow-inner"
                        >
                            <div
                                class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8"
                            >
                                <div class="group">
                                    <h4
                                        class="font-bold mb-3 md:mb-4 text-blue-600 text-base md:text-lg flex items-center space-x-2"
                                    >
                                        <span>🏠</span>
                                        <span>Домашняя форма</span>
                                    </h4>
                                    <div
                                        class="flex items-center space-x-4 md:space-x-6"
                                    >
                                        <div class="relative">
                                            <div
                                                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300 group-hover:rotate-12 transition-transform"
                                            >
                                                <span
                                                    class="text-white font-black text-xl md:text-2xl"
                                                >
                                                    С
                                                </span>
                                            </div>
                                            <div
                                                class="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full flex items-center justify-center"
                                            >
                                                <span
                                                    class="text-[8px] md:text-xs"
                                                >
                                                    ⭐
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p
                                                class="font-bold text-gray-200 text-base md:text-lg mb-1"
                                            >
                                                Красно-белая
                                            </p>
                                            <p
                                                class="text-xs md:text-sm text-gray-400 mb-2"
                                            >
                                                Основная форма
                                            </p>
                                            <div class="flex space-x-1">
                                                <div
                                                    v-for="i in 5"
                                                    :key="`home-dot-${i}`"
                                                    class="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="group">
                                    <h4
                                        class="font-bold mb-3 md:mb-4 text-red-600 text-base md:text-lg flex items-center space-x-2"
                                    >
                                        <span>✈️</span>
                                        <span>Гостевая форма</span>
                                    </h4>
                                    <div
                                        class="flex items-center space-x-4 md:space-x-6"
                                    >
                                        <div class="relative">
                                            <div
                                                class="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300 group-hover:rotate-12 transition-transform"
                                            >
                                                <span
                                                    class="text-white font-black text-xl md:text-2xl"
                                                >
                                                    С
                                                </span>
                                            </div>
                                            <div
                                                class="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-4 h-4 md:w-6 md:h-6 bg-green-400 rounded-full flex items-center justify-center"
                                            >
                                                <span
                                                    class="text-[8px] md:text-xs"
                                                >
                                                    🔥
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <p
                                                class="font-bold text-base text-gray-200 md:text-lg mb-1"
                                            >
                                                Сине-белая
                                            </p>
                                            <p
                                                class="text-xs md:text-sm text-gray-400 mb-2"
                                            >
                                                Выездная форма
                                            </p>
                                            <div class="flex space-x-1">
                                                <div
                                                    v-for="i in 5"
                                                    :key="`away-dot-${i}`"
                                                    class="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full"
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Top Players с улучшенным дизайном -->
                    <!-- <div class="mb-8 md:mb-12">
                        <h3
                            class="text-xl md:text-3xl font-black mb-6 md:mb-8 text-gray-200 flex items-center space-x-2 md:space-x-3"
                        >
                            <span
                                style="animation-duration: 3s"
                                class="animate-spin"
                            >
                                🌟
                            </span>
                            <span>Лучшие игроки</span>
                        </h3>
                        <div
                            class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6"
                        >
                            <NuxtLink>
                                <div
                                    class="group bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl md:rounded-3xl p-4 md:p-8 cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-blue-700 hover:border-blue-500 relative overflow-hidden"
                                >
                                    <div
                                        class="absolute top-2 right-2 md:top-4 md:right-4 bg-yellow-400 text-yellow-900 rounded-full px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-bold"
                                    >
                                        MVP
                                    </div>
                                    <div class="text-center">
                                        <div
                                            class="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:animate-bounce"
                                        >
                                            🥇
                                        </div>
                                        <h4
                                            class="font-black text-gray-200 text-lg md:text-xl mb-2"
                                        >
                                            Александров И.
                                        </h4>
                                        <p
                                            class="text-blue-600 font-bold mb-3 md:mb-4 text-sm md:text-base"
                                        >
                                            Нападающий
                                        </p>
                                        <div
                                            class="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm"
                                        >
                                            <div
                                                class="bg-white/50 rounded-lg p-1 md:p-2"
                                            >
                                                <span
                                                    class="block font-bold text-blue-600"
                                                >
                                                    23
                                                </span>
                                                <span
                                                    class="text-gray-600 text-[10px] md:text-xs"
                                                >
                                                    🏒 гола
                                                </span>
                                            </div>
                                            <div
                                                class="bg-white/50 rounded-lg p-1 md:p-2"
                                            >
                                                <span
                                                    class="block font-bold text-red-600"
                                                >
                                                    15
                                                </span>
                                                <span
                                                    class="text-gray-600 text-[10px] md:text-xs"
                                                >
                                                    🎯 передач
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NuxtLink>

                            <div
                                class="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl md:rounded-3xl p-4 md:p-8 border-2 border-red-700 relative overflow-hidden"
                            >
                                <div
                                    class="absolute top-2 right-2 md:top-4 md:right-4 bg-red-400 text-white rounded-full px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-bold"
                                >
                                    TOP
                                </div>
                                <div class="text-center">
                                    <div
                                        class="text-4xl md:text-5xl mb-3 md:mb-4"
                                    >
                                        🥈
                                    </div>
                                    <h4
                                        class="font-black text-gray-200 text-lg md:text-xl mb-2"
                                    >
                                        Петров В.
                                    </h4>
                                    <p
                                        class="text-red-600 font-bold mb-3 md:mb-4 text-sm md:text-base"
                                    >
                                        Защитник
                                    </p>
                                    <div
                                        class="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm"
                                    >
                                        <div
                                            class="bg-white/50 rounded-lg p-1 md:p-2"
                                        >
                                            <span
                                                class="block font-bold text-blue-600"
                                            >
                                                8
                                            </span>
                                            <span
                                                class="text-gray-600 text-[10px] md:text-xs"
                                            >
                                                🏒 голов
                                            </span>
                                        </div>
                                        <div
                                            class="bg-white/50 rounded-lg p-1 md:p-2"
                                        >
                                            <span
                                                class="block font-bold text-red-600"
                                            >
                                                22
                                            </span>
                                            <span
                                                class="text-gray-600 text-[10px] md:text-xs"
                                            >
                                                🎯 передачи
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div
                                class="bg-gradient-to-br from-purple-900 to-purple-800 rounded-2xl md:rounded-3xl p-4 md:p-8 border-2 border-purple-700 relative overflow-hidden"
                            >
                                <div
                                    class="absolute top-2 right-2 md:top-4 md:right-4 bg-purple-400 text-white rounded-full px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-bold"
                                >
                                    WALL
                                </div>
                                <div class="text-center">
                                    <div
                                        class="text-4xl md:text-5xl mb-3 md:mb-4"
                                    >
                                        🥉
                                    </div>
                                    <h4
                                        class="font-black text-gray-200 text-lg md:text-xl mb-2"
                                    >
                                        Сидоров М.
                                    </h4>
                                    <p
                                        class="text-purple-600 font-bold mb-3 md:mb-4 text-sm md:text-base"
                                    >
                                        Вратарь
                                    </p>
                                    <div
                                        class="grid grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm"
                                    >
                                        <div
                                            class="bg-white/50 rounded-lg p-1 md:p-2"
                                        >
                                            <span
                                                class="block font-bold text-green-600"
                                            >
                                                87%
                                            </span>
                                            <span
                                                class="text-gray-600 text-[10px] md:text-xs"
                                            >
                                                🛡️ сейвов
                                            </span>
                                        </div>
                                        <div
                                            class="bg-white/50 rounded-lg p-1 md:p-2"
                                        >
                                            <span
                                                class="block font-bold text-blue-600"
                                            >
                                                12
                                            </span>
                                            <span
                                                class="text-gray-600 text-[10px] md:text-xs"
                                            >
                                                🚫 "сухих"
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> -->

                    <!-- Team Composition с улучшенными табами -->
                    <div class="mb-8 md:mb-12">
                        <div
                            class="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-3"
                        >
                            <h3
                                class="text-xl md:text-3xl font-black text-gray-200 flex items-center space-x-2 md:space-x-3"
                            >
                                <span>👥</span>
                                <span>Состав команды</span>
                            </h3>
                            <div
                                class="text-sm bg-blue-900/30 text-blue-300 px-3 py-1 md:px-4 md:py-2 rounded-full self-start md:self-auto"
                            >
                                Всего: {{ teamData.players_count }} игроков
                            </div>
                        </div>

                        <!-- Улучшенная навигация по табам -->
                        <div
                            class="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 p-1 md:p-2 bg-gray-800 rounded-xl md:rounded-2xl"
                        >
                            <button
                                v-for="tab in tabs"
                                :key="tab.key"
                                @click="activeTab = tab.key"
                                class="flex-1 px-3 py-2 md:px-6 md:py-4 rounded-lg md:rounded-xl font-bold transition-all duration-300 relative overflow-hidden text-xs md:text-base"
                                :class="
                                    activeTab === tab.key
                                        ? `bg-${tab.color}-600 text-white shadow-lg transform scale-105`
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                "
                            >
                                <span
                                    class="relative z-10 flex items-center justify-center space-x-1 md:space-x-2"
                                >
                                    <span class="hidden sm:inline">{{
                                        tab.label
                                    }}</span>
                                    <span class="sm:hidden">{{
                                        tab.label.slice(0, 3)
                                    }}</span>
                                    <span
                                        class="px-1.5 py-0.5 md:px-2 md:py-1 rounded-full text-[10px] md:text-xs"
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
                            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                        >
                            <NuxtLink
                                v-for="(player, index) in currentPlayers"
                                :key="player.id"
                            >
                                <div
                                    class="group bg-gray-800 rounded-xl md:rounded-2xl p-3 md:p-5 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-105 border border-gray-700 hover:border-blue-600 relative overflow-hidden"
                                    :style="{
                                        animationDelay: `${index * 100}ms`,
                                        animation: isVisible
                                            ? 'slideInUp 0.6s ease-out forwards'
                                            : 'none',
                                    }"
                                >
                                    <!-- Градиентный фон при ховере -->
                                    <div
                                        class="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-red-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    ></div>

                                    <div class="relative z-10">
                                        <div
                                            class="flex items-center justify-between mb-2 md:mb-3"
                                        >
                                            <div
                                                class="flex items-center space-x-2 md:space-x-3"
                                            >
                                                <h5
                                                    class="font-bold text-gray-200 text-base md:text-lg group-hover:text-blue-600 transition-colors duration-200"
                                                >
                                                    {{ player.full_name }}
                                                </h5>
                                                <span
                                                    class="text-xs md:text-sm font-medium"
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
                                                class="flex items-center space-x-1 md:space-x-2"
                                            >
                                                <span
                                                    class="bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-xs md:text-sm font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-200"
                                                >
                                                    {{
                                                        player.pivot?.number ||
                                                        '0'
                                                    }}
                                                </span>
                                            </div>
                                        </div>

                                        <p
                                            class="text-xs md:text-sm text-gray-400 mb-2 md:mb-3 font-medium"
                                        >
                                            {{
                                                player.pivot?.position ||
                                                player.position ||
                                                '0'
                                            }}
                                        </p>

                                        <div
                                            class="flex justify-between items-center text-xs md:text-sm mb-2"
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
                                                            player.saves ||
                                                            '0'
                                                        }}%</span
                                                    >
                                                </span>
                                                <span
                                                    class="flex items-center space-x-1"
                                                >
                                                    <span>🚫</span>
                                                    <span
                                                        class="font-semibold"
                                                        >                                                        {{
                                                            player.shutouts ||
                                                            0
                                                        }}</span
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
                                                        {{
                                                            player.pivot
                                                                ?.goals ||
                                                            player.goals ||
                                                            0
                                                        }}
                                                    </span>
                                                </span>
                                                <span
                                                    class="flex items-center space-x-1"
                                                >
                                                    <span>🎯</span>
                                                    <span
                                                        class="font-semibold text-red-600"
                                                    >
                                                        {{
                                                            player.pivot
                                                                ?.assists ||
                                                            player.assists ||
                                                            0
                                                        }}
                                                    </span>
                                                </span>
                                            </template>
                                        </div>

                                        <!-- Рейтинг игрока -->
                                        <div
                                            class="flex items-center justify-between pt-2 border-t border-gray-700"
                                        >
                                            <span
                                                class="text-[10px] md:text-xs text-gray-500"
                                            >
                                                Рейтинг
                                            </span>
                                            <div
                                                class="flex items-center space-x-1"
                                            >
                                                <span
                                                    class="text-yellow-500 text-sm md:text-base"
                                                >
                                                    ⭐
                                                </span>
                                                <span
                                                    class="font-bold text-yellow-600 text-xs md:text-sm"
                                                >
                                                    {{ player.rating || 0 }}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>

                    <!-- Recent Matches с timeline дизайном -->
                    
                    <!-- Action Buttons с улучшенным дизайном -->
                    <div
                        class="flex flex-col md:flex-row gap-4 md:gap-6 mb-8 md:mb-12"
                    >
                        <!-- <button
                            class="group flex-1 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-700 hover:via-blue-800 hover:to-blue-900 text-white font-bold py-4 md:py-6 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden"
                        >
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                            ></div>
                            <span
                                class="relative z-10 flex items-center justify-center space-x-2 md:space-x-3 text-sm md:text-lg"
                            >
                                <span>🔍</span>
                                <span>Подробнее о команде</span>
                                <span
                                    class="group-hover:translate-x-1 transition-transform duration-200"
                                >
                                    →
                                </span>
                            </span>
                        </button> -->
                        <button
                            class="group flex-1 bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bold py-4 md:py-6 px-6 md:px-8 rounded-xl md:rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl relative overflow-hidden"
                        >
                            <div
                                class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
                            ></div>
                            <span
                                class="relative z-10 flex items-center justify-center space-x-2 md:space-x-3 text-sm md:text-lg"
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
                class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12"
            >
                <div
                    v-for="(stat, index) in additionalStats"
                    :key="`add-stat-${index}`"
                    class="group bg-gray-900/80 backdrop-blur-xl rounded-2xl md:rounded-3xl p-4 md:p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-rotate-1 border border-white/20 relative overflow-hidden"
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
                        :class="`bg-gradient-to-br from-${stat.color}-900/20 to-${stat.color}-800/20`"
                    ></div>

                    <div class="relative z-10">
                        <div
                            class="text-4xl md:text-6xl mb-3 md:mb-4 group-hover:animate-bounce transition-all duration-300"
                        >
                            {{ stat.icon }}
                        </div>
                        <div
                            class="text-2xl md:text-4xl font-black mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300"
                            :class="`text-${stat.color}-600`"
                        >
                            {{ stat.value }}
                        </div>
                        <div
                            class="text-xs md:text-sm text-gray-400 font-bold mb-1 md:mb-2"
                        >
                            {{ stat.label }}
                        </div>
                        <div
                            class="text-[10px] md:text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                            {{ stat.description }}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Навигация (дубликат) -->
            <div
                class="flex flex-col sm:flex-row justify-between items-center gap-3 mt-8 md:mt-12"
            >
                <NuxtLink
                    to="/"
                    class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105 bg-gray-900/80 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 py-2 md:px-6 md:py-3 shadow-lg border border-blue-800 w-full sm:w-auto justify-center"
                    :class="{
                        'opacity-100 translate-x-0': isVisible,
                        'opacity-0 -translate-x-10': !isVisible,
                    }"
                >
                    <span class="mr-2 text-lg md:text-xl">←</span>
                    <span class="font-semibold text-sm md:text-base"
                        >На главную</span
                    >
                </NuxtLink>
                <NuxtLink
                    to="/teamsPage"
                    class="inline-flex items-center text-blue-600 hover:text-blue-800 transition-all duration-300 hover:scale-105 bg-gray-900/80 backdrop-blur-sm rounded-xl md:rounded-2xl px-4 py-2 md:px-6 md:py-3 shadow-lg border border-blue-800 w-full sm:w-auto justify-center"
                    :class="{
                        'opacity-100 translate-x-0': isVisible,
                        'opacity-0 -translate-x-10': !isVisible,
                    }"
                >
                    <span class="font-semibold text-sm md:text-base"
                        >К списку команд</span
                    >
                    <span class="ml-2 text-lg md:text-xl">→</span>
                </NuxtLink>
            </div>

            <!-- Footer с социальными сетями -->
            <div class="text-center py-6 md:py-8 border-t border-gray-700">
                <div class="flex justify-center gap-4 md:gap-6 mb-4 md:mb-6">
                    <button
                        v-for="(social, index) in socials"
                        :key="`social-${index}`"
                        class="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1"
                        :class="`bg-${social.color}-900/30 hover:bg-${social.color}-800/50`"
                    >
                        <span class="text-lg md:text-xl">{{
                            social.icon
                        }}</span>
                    </button>
                </div>
                <p class="text-gray-400 text-xs md:text-sm">
                    © 2024 {{ teamData.name }} • Все права защищены • Сделано с
                    ❤️ для болельщиков
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { NuxtLink } from '#components'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const route = useRoute()
const teamId = route.params.id

const { data: teamData, error } = await useAsyncData(`team-${teamId}`, () =>
    $fetch(`https://api.timeofthestars.ru/api/teams/${teamId}`)
)

if (error.value || !teamData.value) {
    throw createError({
        statusCode: 404,
        statusMessage: `Команда не найдена`,
        fatal: true,
    })
}

// --- Интегрированная логика ---

const activeTab = ref('forwards')
const isVisible = ref(false)
const currentTime = ref(new Date())
let timer = null

onMounted(() => {
    isVisible.value = true
    timer = setInterval(() => {
        currentTime.value = new Date()
    }, 1000)
})

onUnmounted(() => {
    if (timer) {
        clearInterval(timer)
    }
})

const formattedTime = computed(() => {
    return currentTime.value.toLocaleTimeString('ru-RU')
})

const getTrendIcon = trend => {
    return '➡️'
}

const getTrendColor = trend => {
    return 'text-gray-500'
}

const teamStats = computed(() => [
    { label: 'Победы', value: teamData.value.wins, color: 'green', trend: '' },
    {
        label: 'Поражения',
        value: teamData.value.losses,
        color: 'red',
        trend: '',
    },
    {
        label: 'Игроки',
        value: teamData.value.players_count,
        color: 'blue',
        trend: '',
    },
   
])

// Объединяем игроков из двух массивов
const allPlayers = computed(() => {
    const players = [
        ...(teamData.value.championship_players || []),
        ...(teamData.value.tournament_players || []),
    ]
    // Убираем дубликаты по ID, если они есть
    const uniquePlayers = new Map()
    players.forEach(p => uniquePlayers.set(p.id, p))
    return Array.from(uniquePlayers.values())
})

// Группируем игроков по позиции
const playersByPosition = computed(() => {
    const groups = {
        forwards: [],
        defenders: [],
        goalkeepers: [],
        other: [],
    }

    allPlayers.value.forEach(player => {
        const pos = (player.position || 'other').toLowerCase()
        if (pos.includes('нападающий') || pos.includes('форвард')) {
            groups.forwards.push(player)
        } else if (pos.includes('защитник')) {
            groups.defenders.push(player)
        } else if (pos.includes('вратарь')) {
            groups.goalkeepers.push(player)
        } else {
            groups.other.push(player)
        }
    })
    return groups
})

const tabs = computed(() =>
    [
        {
            key: 'forwards',
            label: 'Нападающие',
            count: playersByPosition.value.forwards.length,
            color: 'red',
        },
        {
            key: 'defenders',
            label: 'Защитники',
            count: playersByPosition.value.defenders.length,
            color: 'blue',
        },
        {
            key: 'goalkeepers',
            label: 'Вратари',
            count: playersByPosition.value.goalkeepers.length,
            color: 'green',
        },
        {
            key: 'other',
            label: 'Другие',
            count: playersByPosition.value.other.length,
            color: 'gray',
        },
    ].filter(tab => tab.count > 0)
)

const currentPlayers = computed(() => {
    return playersByPosition.value[activeTab.value] || []
})

// Статические данные для демонстрации
const recentMatches = [
    {
        opponent: 'СКА',
        date: '15.12.2024',
        result: '4:2',
        status: 'win',
        venue: 'Дома',
        attendance: '12,450',
    },
    {
        opponent: 'ЦСКА',
        date: '12.12.2024',
        result: '1:3',
        status: 'loss',
        venue: 'В гостях',
        attendance: '8,200',
    },
    {
        opponent: 'Локомотив',
        date: '08.12.2024',
        result: '5:1',
        status: 'win',
        venue: 'Дома',
        attendance: '11,800',
    },
]

const additionalStats = [
    {
        icon: '⚡',
        value: '0%',
        label: 'Владение шайбой',
        color: 'blue',
        description: 'Средний показатель за сезон',
    },
    {
        icon: '🎯',
        value: '0',
        label: 'Броски в створ',
        color: 'red',
        description: 'За последнюю игру',
    },
    {
        icon: '🛡️',
        value: '0%',
        label: 'Силовая игра',
        color: 'green',
        description: 'Эффективность в большинстве',
    },
    {
        icon: '🔥',
        value: '0',
        label: 'Хет-трики',
        color: 'yellow',
        description: 'За всю историю клуба',
    },
]

const achievements = [
    {
        year: '2023',
        title: 'Чемпионы Лиги',
        description: 'Победа в финальной серии',
    },
    {
        year: '2021',
        title: 'Кубок Победителей',
        description: 'Лучший клуб сезона',
    },
    {
        year: '2019',
        title: 'Золотой Шлем',
        description: 'Рекордная серия побед',
    },
]

const socials = [
    { icon: '📘', color: 'blue' },
    { icon: '📷', color: 'pink' },
    { icon: '🐦', color: 'blue' },
    { icon: '📺', color: 'red' },
]
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

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
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

/* Улучшение анимаций для мобильных */
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
</style>
