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
                    @mouseenter="isLogoHovered = true"
                    @mouseleave="isLogoHovered = false"
                    :style="teamBackgroundStyle"
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

                    <!-- Overlay for better text readability -->
                    <div class="absolute inset-0 bg-black/50"></div>

                    <div
                        class="text-center text-white relative z-10 px-4 pb-4 md:pb-0"
                    >
                        <div
                            class="w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 mx-auto mb-4 md:mb-6 transition-all duration-300"
                            :class="{
                                'opacity-0 scale-90':
                                    isLogoHovered && hasCustomBackground,
                            }"
                        >
                            <img
                                :src="getTeamLogo(teamData.logo_url)"
                                class="w-full h-full object-contain"
                            />
                        </div>
                        <h2
                            class="text-2xl md:text-4xl lg:text-6xl font-black mb-2 md:mb-3 tracking-wider"
                            :class="{
                                'opacity-0':
                                    isLogoHovered && hasCustomBackground,
                            }"
                        >
                            {{ teamData.name }}
                        </h2>
                        <p
                            class="text-sm md:text-xl lg:text-2xl opacity-90 font-light"
                            :class="{
                                'opacity-0':
                                    isLogoHovered && hasCustomBackground,
                            }"
                        >
                            г. {{ teamData.city }}
                        </p>
                    </div>

                    <div
                        class="absolute top-3 right-3 md:top-6 md:right-6 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl px-3 py-1 md:px-6 md:py-3 border border-white/30 transition-all duration-300"
                        :class="{
                            'opacity-0': isLogoHovered && hasCustomBackground,
                        }"
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
                </div>

                <!-- Team Stats с улучшенной анимацией -->
                <div class="p-4 md:p-8 lg:p-12">
                    <div
                        class="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 md:mb-12"
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
                                Всего:
                                {{ totalPlayers }}
                            </div>
                        </div>

                        <!-- Улучшенная навигация по табам -->
                        <div
                            class="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 p-1 md:p-2 bg-gray-800 rounded-xl md:rounded-2xl"
                            v-if="teamPlayers.length > 0"
                        >
                            <button
                                v-for="tab in tabs"
                                :key="tab.key"
                                @click="activeTab = tab.key"
                                class="flex-1 px-3 py-2 md:px-6 md:py-4 rounded-lg md:rounded-xl font-bold transition-all duration-300 relative overflow-hidden text-xs md:text-base cursor-pointer"
                                :class="
                                    activeTab === tab.key
                                        ? `bg-${tab.color}-600 text-white shadow-lg transform scale-105 `
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
                        <div
                            class="text-xl md:text-3xl font-black text-gray-200 flex items-center space-x-2 md:space-x-3 justify-center"
                            v-else
                        >
                            Информация об игроках пока не доступна.
                        </div>
                        <!-- Players Grid -->
                        <div>
                            <!-- Desktop Grid -->
                            <div
                                class="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                            >
                                <NuxtLink
                                    v-for="(player, index) in filteredPlayers"
                                    :key="player.id"
                                    :to="`/players/${player.id}`"
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
                                        <!-- Player card content from original grid -->
                                        <div class="relative z-10 text-center">
                                            <div
                                                class="flex justify-center mb-3"
                                            >
                                                <img
                                                    :src="
                                                        getPlayerPhoto(
                                                            player.photo_url,
                                                        )
                                                    "
                                                    :alt="player.full_name"
                                                    class="w-20 h-20 rounded-full object-cover border-4 border-gray-700 group-hover:border-blue-500 transition-all duration-300"
                                                />
                                            </div>
                                            <div
                                                class="flex flex-col items-center mb-2 md:mb-3"
                                            >
                                                <h5
                                                    class="font-bold text-gray-200 text-base md:text-lg group-hover:text-blue-600 transition-colors duration-200 mb-2"
                                                >
                                                    {{ player.full_name }}
                                                </h5>
                                                <span
                                                    class="bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg group-hover:shadow-xl transition-shadow duration-200"
                                                >
                                                    {{
                                                        player.stats?.number ||
                                                        '0'
                                                    }}
                                                </span>
                                            </div>

                                            <p
                                                class="text-xs md:text-sm text-gray-400 mb-2 md:mb-3 font-medium"
                                            >
                                                {{ player.position || '0' }}
                                            </p>

                                            <div
                                                class="grid grid-cols-2 gap-x-2 gap-y-3 text-xs md:text-sm"
                                            >
                                                <template
                                                    v-if="isGoalkeeper(player)"
                                                >
                                                    <div class="text-center">
                                                        <div
                                                            class="font-semibold text-blue-600"
                                                        >
                                                            {{
                                                                player?.stats
                                                                    ?.gaa ||
                                                                '0'
                                                            }}%
                                                        </div>
                                                        <div
                                                            class="text-[10px] text-gray-400"
                                                        >
                                                            К/Н
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div
                                                            class="font-semibold text-blue-400"
                                                        >
                                                            {{
                                                                player.shutouts ||
                                                                0
                                                            }}
                                                        </div>
                                                        <div
                                                            class="text-[10px] text-gray-400"
                                                        >
                                                            Сухие матчи
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div
                                                            class="font-bold text-yellow-500"
                                                        >
                                                            {{
                                                                player.stats
                                                                    ?.penalties ||
                                                                0
                                                            }}
                                                        </div>
                                                        <div
                                                            class="text-[10px] text-gray-400"
                                                        >
                                                            Штрафы
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div
                                                            class="font-bold text-gray-400"
                                                        >
                                                            {{
                                                                player.stats
                                                                    ?.matches ||
                                                                0
                                                            }}
                                                        </div>
                                                        <div
                                                            class="text-[10px] text-gray-400"
                                                        >
                                                            Игры
                                                        </div>
                                                    </div>
                                                </template>
                                                <template v-else>
                                                    <div class="text-center">
                                                        <div
                                                            class="font-bold text-green-600"
                                                        >
                                                            {{
                                                                getPlayerPoints(
                                                                    player,
                                                                )
                                                            }}
                                                        </div>
                                                        <div
                                                            class="text-[10px] text-gray-400"
                                                        >
                                                            Очки
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div
                                                            class="font-bold text-blue-600"
                                                        >
                                                            {{
                                                                player?.stats
                                                                    ?.goals || 0
                                                            }}
                                                        </div>
                                                        <div
                                                            class="text-[10px] text-gray-400"
                                                        >
                                                            Голы
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div
                                                            class="font-bold text-red-600"
                                                        >
                                                            {{
                                                                player?.stats
                                                                    ?.assists ||
                                                                0
                                                            }}
                                                        </div>
                                                        <div
                                                            class="text-[10px] text-gray-400"
                                                        >
                                                            Передачи
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div
                                                            class="font-bold text-yellow-500"
                                                        >
                                                            {{
                                                                player?.stats
                                                                    ?.penalties ||
                                                                0
                                                            }}
                                                        </div>
                                                        <div
                                                            class="text-[10px] text-gray-400"
                                                        >
                                                            Штрафы
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div
                                                            class="font-bold text-gray-400"
                                                        >
                                                            {{
                                                                player?.stats
                                                                    ?.matches ||
                                                                0
                                                            }}
                                                        </div>
                                                        <div
                                                            class="text-[10px] text-gray-400"
                                                        >
                                                            Игры
                                                        </div>
                                                    </div>
                                                </template>
                                            </div>
                                        </div>
                                    </div>
                                </NuxtLink>
                            </div>

                            <!-- Mobile Accordion -->
                            <div class="space-y-2 md:hidden">
                                <div
                                    v-for="(player, index) in filteredPlayers"
                                    :key="player.id"
                                    class="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
                                >
                                    <button
                                        @click="
                                            openedPlayer =
                                                openedPlayer === index
                                                    ? null
                                                    : index
                                        "
                                        class="w-full text-left p-3"
                                    >
                                        <div
                                            class="flex justify-between items-start"
                                        >
                                            <div
                                                class="flex items-center space-x-3"
                                            >
                                                <img
                                                    :src="
                                                        getPlayerPhoto(
                                                            player.photo_url,
                                                        )
                                                    "
                                                    :alt="player.full_name"
                                                    class="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
                                                />
                                                <div class="flex-1">
                                                    <h4
                                                        class="font-bold text-gray-200 text-sm truncate"
                                                    >
                                                        {{ player.full_name }}
                                                    </h4>
                                                    <div
                                                        class="flex items-center space-x-3 text-xs text-gray-400 mt-1.5"
                                                    >
                                                        <template
                                                            v-if="
                                                                isGoalkeeper(
                                                                    player,
                                                                )
                                                            "
                                                        >
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <span
                                                                    class="font-mono text-gray-300 mr-1"
                                                                    >И:</span
                                                                >
                                                                <span
                                                                    class="font-bold text-white"
                                                                    >{{
                                                                        player
                                                                            .stats
                                                                            ?.matches ||
                                                                        0
                                                                    }}</span
                                                                >
                                                            </div>
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <span
                                                                    class="font-mono text-gray-300 mr-1"
                                                                    >КН:</span
                                                                >
                                                                <span
                                                                    class="font-bold text-white"
                                                                    >{{
                                                                        player
                                                                            ?.stats
                                                                            ?.gaa ||
                                                                        '0'
                                                                    }}%</span
                                                                >
                                                            </div>
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <span
                                                                    class="font-mono text-gray-300 mr-1"
                                                                    >СМ:</span
                                                                >
                                                                <span
                                                                    class="font-bold text-white"
                                                                    >{{
                                                                        player.shutouts ||
                                                                        0
                                                                    }}</span
                                                                >
                                                            </div>
                                                        </template>
                                                        <template v-else>
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <span
                                                                    class="font-mono text-green-400 mr-1"
                                                                    >О:</span
                                                                >
                                                                <span
                                                                    class="font-bold text-white"
                                                                    >{{
                                                                        getPlayerPoints(
                                                                            player,
                                                                        )
                                                                    }}</span
                                                                >
                                                            </div>
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <span
                                                                    class="font-mono text-gray-300 mr-1"
                                                                    >И:</span
                                                                >
                                                                <span
                                                                    class="font-bold text-white"
                                                                    >{{
                                                                        player
                                                                            .stats
                                                                            ?.matches ||
                                                                        0
                                                                    }}</span
                                                                >
                                                            </div>
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <span
                                                                    class="font-mono text-blue-400 mr-1"
                                                                    >Г:</span
                                                                >
                                                                <span
                                                                    class="font-bold text-white"
                                                                    >{{
                                                                        player
                                                                            .stats
                                                                            ?.goals ||
                                                                        0
                                                                    }}</span
                                                                >
                                                            </div>
                                                            <div
                                                                class="flex items-center"
                                                            >
                                                                <span
                                                                    class="font-mono text-red-400 mr-1"
                                                                    >П:</span
                                                                >
                                                                <span
                                                                    class="font-bold text-white"
                                                                    >{{
                                                                        player
                                                                            .stats
                                                                            ?.assists ||
                                                                        0
                                                                    }}</span
                                                                >
                                                            </div>
                                                        </template>
                                                    </div>
                                                </div>
                                            </div>
                                            <span
                                                class="transform transition-transform duration-300 text-gray-500 pt-1"
                                                :class="{
                                                    'rotate-180':
                                                        openedPlayer === index,
                                                }"
                                                >▼</span
                                            >
                                        </div>
                                    </button>
                                    <transition name="expand">
                                        <div
                                            v-if="openedPlayer === index"
                                            class="p-4 bg-gray-900"
                                        >
                                            <!-- Player card content -->
                                            <div
                                                class="relative z-10 text-center"
                                            >
                                                <div
                                                    class="flex justify-center mb-3"
                                                >
                                                    <img
                                                        :src="
                                                            getPlayerPhoto(
                                                                player.photo_url,
                                                            )
                                                        "
                                                        :alt="player.full_name"
                                                        class="w-20 h-20 rounded-full object-cover border-4 border-gray-700"
                                                    />
                                                </div>
                                                <div
                                                    class="flex flex-col items-center mb-2"
                                                >
                                                    <span
                                                        class="bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg mb-2"
                                                    >
                                                        {{
                                                            player.stats
                                                                ?.number || '0'
                                                        }}
                                                    </span>
                                                    <p
                                                        class="text-sm text-gray-400 mb-2 font-medium"
                                                    >
                                                        {{
                                                            player.position ||
                                                            '0'
                                                        }}
                                                    </p>
                                                </div>

                                                <div
                                                    class="grid grid-cols-2 gap-x-2 gap-y-3 text-sm"
                                                >
                                                    <template
                                                        v-if="
                                                            isGoalkeeper(player)
                                                        "
                                                    >
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="font-semibold text-blue-600"
                                                            >
                                                                {{
                                                                    player
                                                                        ?.stats
                                                                        ?.gaa ||
                                                                    '0'
                                                                }}%
                                                            </div>
                                                            <div
                                                                class="text-[10px] text-gray-400"
                                                            >
                                                                К/Н
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="font-semibold text-blue-400"
                                                            >
                                                                {{
                                                                    player.shutouts ||
                                                                    0
                                                                }}
                                                            </div>
                                                            <div
                                                                class="text-[10px] text-gray-400"
                                                            >
                                                                Сухие матчи
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="font-bold text-yellow-500"
                                                            >
                                                                {{
                                                                    player.stats
                                                                        ?.penalties ||
                                                                    0
                                                                }}
                                                            </div>
                                                            <div
                                                                class="text-[10px] text-gray-400"
                                                            >
                                                                Штрафы
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="font-bold text-gray-400"
                                                            >
                                                                {{
                                                                    player.stats
                                                                        ?.matches ||
                                                                    0
                                                                }}
                                                            </div>
                                                            <div
                                                                class="text-[10px] text-gray-400"
                                                            >
                                                                Игры
                                                            </div>
                                                        </div>
                                                    </template>
                                                    <template v-else>
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="font-bold text-green-600"
                                                            >
                                                                {{
                                                                    getPlayerPoints(
                                                                        player,
                                                                    )
                                                                }}
                                                            </div>
                                                            <div
                                                                class="text-[10px] text-gray-400"
                                                            >
                                                                Очки
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="font-bold text-blue-600"
                                                            >
                                                                {{
                                                                    player
                                                                        ?.stats
                                                                        ?.goals ||
                                                                    0
                                                                }}
                                                            </div>
                                                            <div
                                                                class="text-[10px] text-gray-400"
                                                            >
                                                                Голы
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="font-bold text-red-600"
                                                            >
                                                                {{
                                                                    player
                                                                        ?.stats
                                                                        ?.assists ||
                                                                    0
                                                                }}
                                                            </div>
                                                            <div
                                                                class="text-[10px] text-gray-400"
                                                            >
                                                                Передачи
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="font-bold text-yellow-500"
                                                            >
                                                                {{
                                                                    player
                                                                        ?.stats
                                                                        ?.penalties ||
                                                                    0
                                                                }}
                                                            </div>
                                                            <div
                                                                class="text-[10px] text-gray-400"
                                                            >
                                                                Штрафы
                                                            </div>
                                                        </div>
                                                        <div
                                                            class="text-center"
                                                        >
                                                            <div
                                                                class="font-bold text-gray-400"
                                                            >
                                                                {{
                                                                    player
                                                                        ?.stats
                                                                        ?.matches ||
                                                                    0
                                                                }}
                                                            </div>
                                                            <div
                                                                class="text-[10px] text-gray-400"
                                                            >
                                                                Игры
                                                            </div>
                                                        </div>
                                                    </template>
                                                </div>
                                            </div>
                                        </div>
                                    </transition>
                                </div>
                            </div>
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
                            <NuxtLink to="/schedule"
                                ><div
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
                            </NuxtLink>
                        </button>
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
                    © 2025 {{ teamData.name }} • Все права защищены • Сделано с
                    ❤️ для болельщиков
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { NuxtLink } from '#components'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getTeamLogo, getPlayerPhoto } from '@/utils/PicturesAdmin'

const route = useRoute()
const teamId = computed(() => Number(route.params.id))

const { data, error } = await useAsyncData(
    () => `team-data-${teamId.value}`,
    async () => {
        if (!teamId.value) return { teamsList: [], playersList: [] }

        const basePath =
            teamId.value === 3
                ? 'https://api.timeofthestars.ru/tournaments/1'
                : 'https://api.timeofthestars.ru/championships/1'

        let teamsList = []
        let playersList = []

        try {
            teamsList = await $fetch(`${basePath}/teams`)
        } catch (err) {
            console.error('Ошибка при получении teams для team page:', err)
            teamsList = []
        }

        try {
            playersList = await $fetch(`${basePath}/players`)
        } catch (err) {
            console.error('Ошибка при получении players для team page:', err)
            playersList = []
        }

        return { teamsList, playersList }
    },
)

if (error.value) {
    console.error('useAsyncData error for team-data:', error.value)
}

const teamsList = computed(() => data.value?.teamsList || [])
const playersList = computed(() => data.value?.playersList || [])

const teamData = computed(() => {
    return teamsList.value.find(team => team.id === teamId.value)
})

// Players that belong to this team
const teamPlayers = computed(() => {
    if (playersList.value && playersList.value.length) {
        return playersList.value.filter(p => p.team_id === teamId.value)
    }
    return []
})

// If team not found, avoid throwing fatal error during prerender; render a not-found state instead.
if (!teamData.value) {
    console.warn(`Команда с ID ${teamId.value} не найдена (prerender-safe)`)
}
useHead(
    computed(() => ({
        title: `${teamData.value?.name || 'Команда'} - ВРЕМЯ ЗВЁЗД`,
        meta: [
            {
                name: 'description',
                content: `Страница хоккейной команды ${
                    teamData.value?.name || ''
                }. Состав, статистика, расписание игр и новости команды.`,
            },
            {
                name: 'keywords',
                content: `хоккей, команда, ${
                    teamData.value?.name || ''
                }, ярославль, состав, статистика, игроки, время звезд`,
            },
            { name: 'author', content: 'ВРЕМЯ ЗВЁЗД' },
            {
                property: 'og:title',
                content: `${teamData.value?.name || 'Команда'} - ВРЕМЯ ЗВЁЗД`,
            },
            {
                property: 'og:description',
                content: `Вся информация о хоккейной команде ${
                    teamData.value?.name || ''
                }: состав, статистика, новости.`,
            },
            { property: 'og:type', content: 'website' },
        ],
    })),
)

const teamColors = computed(() => usePlayerColor(teamId.value))

// --- Интегрированная логика ---

const activeTab = ref('all')
const isVisible = ref(false)
const currentTime = ref(new Date())
const isLogoHovered = ref(false)
const openedPlayer = ref(null)
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

const teamBackgroundStyle = computed(() => {
    const teamName = teamData.value?.name.toLowerCase()
    const baseStyle = {
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }
    if (teamName.includes('переславль')) {
        return {
            ...baseStyle,
            backgroundImage: `url('/pictures/teams/Переславль_фото_команды.jpg')`,
        }
    }
    if (teamName.includes('явву пво')) {
        return {
            ...baseStyle,
            backgroundImage: `url('/pictures/teams/ПВО_фото_команды.JPG')`,
        }
    }
    return {}
})

const hasCustomBackground = computed(() => {
    const teamName = teamData.value?.name.toLowerCase()
    return teamName.includes('переславль') || teamName.includes('явву пво')
})

const teamStats = computed(() => [
    {
        label: 'Победы',
        value: teamData.value?.stats?.wins || 0,
        color: 'green',
        trend: '',
    },
    {
        label: 'Поражения',
        value: teamData.value?.stats?.losses || 0,
        color: 'red',
        trend: '',
    },
    {
        label: 'Игроки',
        value: teamData.value?.players_count || 0,
        color: 'blue',
        trend: '',
    },
])

// Группируем игроков по позиции
const playersByPosition = computed(() => {
    const groups = {
        forwards: [],
        defenders: [],
        goalkeepers: [],
        other: [],
    }

    teamPlayers.value.forEach(player => {
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
            key: 'all',
            label: 'Все',
            count: teamData.value?.players_count,
            color: 'yellow',
        },
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
    ].filter(tab => tab.count > 0),
)

const isGoalkeeper = player => {
    const pos = (player.position || '').toLowerCase()
    return pos.includes('вратарь')
}

const getPlayerPoints = player => {
    if (!player?.stats) return 0
    return (player.stats.goals || 0) + (player.stats.assists || 0)
}

const filteredPlayers = computed(() => {
    switch (activeTab.value) {
        case 'forwards':
            return playersByPosition.value.forwards
        case 'defenders':
            return playersByPosition.value.defenders
        case 'goalkeepers':
            return playersByPosition.value.goalkeepers
        case 'other':
            return playersByPosition.value.other
        case 'all':
        default:
            // Сортируем по очкам от лучшего к худшему
            return [...teamPlayers.value].sort((a, b) => {
                return getPlayerPoints(b) - getPlayerPoints(a)
            })
    }
})

const totalPlayers = computed(() => {
    return filteredPlayers.value.length
})
</script>

<style>
.expand-enter-active,
.expand-leave-active {
    transition: max-height 0.3s ease-out, opacity 0.3s ease-out;
    overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
    max-height: 0;
    opacity: 0;
}

.expand-enter-to,
.expand-leave-from {
    max-height: 500px; /* Should be higher than the content */
    opacity: 1;
}

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
